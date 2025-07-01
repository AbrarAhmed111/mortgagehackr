

'use server'

import nodemailer from 'nodemailer'
import { createClient } from '../supabase/server'
import { z } from 'zod'

const FRED_API_KEY = process.env.NEXT_PUBLIC_FRED_API_KEY!

const SaveAnalyzerLeadSchema = z.object({
  source: z.enum(['DealAnalyzer', 'HELOC']),
  loan_start_month: z.number().min(1).max(12),
  loan_start_year: z.number().min(1900),
  loan_amount: z.number().positive(),
  interest_rate: z.number().positive(),
  loan_term: z.union([z.literal(15), z.literal(30)]),
  ip_address: z.string().optional(),
})

export async function saveAnalyzerLead(input: z.infer<typeof SaveAnalyzerLeadSchema>) {
  const supabase = await createClient()
  const parsed = SaveAnalyzerLeadSchema.safeParse(input)

  if (!parsed.success) return { error: 'Invalid input' }

  const { source, ip_address, loan_start_month, loan_start_year, interest_rate, loan_term, ...rest } = parsed.data

  // 1. Fetch FRED historical rate
  const startDate = `${loan_start_year}-${String(loan_start_month).padStart(2, '0')}-01`
  const endDate = `${loan_start_year}-${String(loan_start_month).padStart(2, '0')}-28`

  const seriesId = loan_term === 30 ? 'MORTGAGE30US' : 'MORTGAGE15US'

  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&observation_start=${startDate}&observation_end=${endDate}`

  let fredRate = null

  try {
    const response = await fetch(url)
    const fredData = await response.json()

    fredRate = parseFloat(fredData?.observations?.[0]?.value)

    if (isNaN(fredRate)) {
      throw new Error('Invalid FRED data')
    }
  } catch (error) {
    console.error('FRED API error:', error)
    return { error: 'Failed to fetch historical rate from FRED.' }
  }

  // 2. Determine result_type
  const rateDiff = interest_rate - fredRate

  let result_type: 'Great' | 'Fair' | 'Poor'

  if (rateDiff <= 0.25) {
    result_type = 'Great'
  } else if (rateDiff <= 1.0) {
    result_type = 'Fair'
  } else {
    result_type = 'Poor'
  }

  // 3. HELOC validation
  if (source === 'HELOC' && result_type !== 'Great') {
    return { error: 'HELOC leads must be rated Great.' }
  }

  // 4. Rate limiting
  if (ip_address) {
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
    const { count, error: rateError } = await supabase
      .from('analyzer_leads')
      .select('id', { count: 'exact', head: true })
      .eq('ip_address', ip_address)
      .gte('submitted_at', oneHourAgo)

    if (rateError) {
      console.error('Rate limit check failed:', rateError)
      return { error: 'Rate limit check failed' }
    }

    if ((count || 0) >= 3) return { error: 'Rate limit exceeded' }
  }

  // 5. Save lead
  const { data, error: insertError } = await supabase
    .from('analyzer_leads')
    .insert([
      {
        email: null,
        source,
        result_type,
        ip_address,
        interest_rate,
        loan_start_month,
        loan_start_year,
        loan_term,
        loan_amount: rest.loan_amount,
      }
    ])
    .select('id')
    .single()

  if (insertError || !data?.id) {
    console.error('Insert error:', insertError)
    return { error: 'Failed to store lead.' }
  }

  return { success: true, id: data.id, result_type, fredRate }
}



const EmailSchema = z.object({
  analyzer_id: z.string().uuid(),
  email: z.string().email(),
})

export async function submitAnalyzerEmail(input: z.infer<typeof EmailSchema>) {
  const supabase = await createClient()
  const parsed = EmailSchema.safeParse(input)

  if (!parsed.success) return { error: 'Invalid input' }

  const { analyzer_id, email } = parsed.data

  // Fetch existing analyzer lead
  const { data: lead, error: fetchError } = await supabase
    .from('analyzer_leads')
    .select('*')
    .eq('id', analyzer_id)
    .single()

  if (fetchError || !lead) {
    console.error('Analyzer lead not found:', fetchError)
    return { error: 'Analyzer record not found.' }
  }

  // Update email in DB
  const { error: updateError } = await supabase
    .from('analyzer_leads')
    .update({ email })
    .eq('id', analyzer_id)

  if (updateError) {
    console.error('Email update failed:', updateError)
    return { error: 'Failed to update email.' }
  }

  // Setup mailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const adminHtml = `
    <h2>New ${lead.source} Submission (Email Follow-up)</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Rating:</strong> ${lead.result_type}</p>
    <p><strong>Loan:</strong> $${lead.loan_amount.toLocaleString()} at ${lead.interest_rate}%</p>
    <p><strong>Term:</strong> ${lead.loan_term} years</p>
    <p><strong>Start:</strong> ${lead.loan_start_month}/${lead.loan_start_year}</p>
    <p><strong>IP:</strong> ${lead.ip_address || 'Not Provided'}</p>
  `

  const userHtml = `
    <h2>Thanks for using Mortgage Deal Analyzer</h2>
    <p>Your result was: <strong>${lead.result_type}</strong>.</p>
    <p>We’ll reach out if needed. Thank you!</p>
    <p>– MortgageHackr Team</p>
  `

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'Mania@westcapitallending.com',
      subject: `New ${lead.source} Lead (${lead.result_type}) – Email Submitted`,
      html: adminHtml,
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your submission – MortgageHackr',
      html: userHtml,
    })

    return { success: true }
  } catch (err) {
    console.error('Email sending failed:', err)
    return { error: 'Email update succeeded but email failed to send.' }
  }
}



type DealResultType = 'Great' | 'Fair' | 'Poor'
type DealSourceType = 'DealAnalyzer' | 'HELOC'

type Params = {
  page?: number
  limit?: number
  result_type?: DealResultType
  source?: DealSourceType
}

export async function getAnalyzerDealsList({
  page = 1,
  limit = 20,
  result_type,
  source,
}: Params = {}) {
  const supabase = await createClient()

  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('analyzer_leads')
    .select('*', { count: 'exact' })
    .order('submitted_at', { ascending: false })
    .range(from, to)

  if (result_type) {
    query = query.eq('result_type', result_type as DealResultType)
  }

  if (source) {
    query = query.eq('source', source as DealSourceType)
  }

  const { data, count, error } = await query

  if (error) {
    console.error('Failed to fetch analyzer deals:', error)
    return { error: 'Failed to fetch data' }
  }

  return {
    success: true,
    data,
    pagination: {
      total: count || 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 1,
    },
  }
}



const DeleteAnalyzerLeadSchema = z.object({
  id: z.string().uuid(),
})

export async function deleteAnalyzerLead(input: z.infer<typeof DeleteAnalyzerLeadSchema>) {
  const supabase = await createClient()
  const parsed = DeleteAnalyzerLeadSchema.safeParse(input)

  if (!parsed.success) return { error: 'Invalid ID format' }

  const { id } = parsed.data

  const { error } = await supabase
    .from('analyzer_leads')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Failed to delete analyzer lead:', error)
    return { error: 'Failed to delete analyzer lead.' }
  }

  return { success: true }
}