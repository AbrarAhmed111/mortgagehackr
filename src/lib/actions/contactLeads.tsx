'use server'
import { createClient } from '../supabase/server'
import nodemailer from 'nodemailer'

export async function createLead(
  name: string,
  email: string,
  message: string,
  ip_address?: string,
  is_spam: boolean = false,
) {
  const supabase = await createClient()

  // Rate limiting check
  if (ip_address) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const { count, error: rateLimitError } = await supabase
      .from('contact_leads')
      .select('id', { count: 'exact', head: true })
      .gte('submitted_at', oneHourAgo)
      .eq('ip_address', ip_address)

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError)
      return { error: 'Failed to check rate limit.' }
    }

    if ((count || 0) >= 3) {
      return { error: `Rate limit exceeded. Please try again later.` }
    }
  }

  // Insert lead
  const { error } = await supabase.from('contact_leads').insert([
    {
      name,
      email,
      message,
      ip_address: ip_address || null,
      is_spam,
    },
  ])

  if (error) {
    console.error('Error creating contact lead:', error)
    return { error: error.message }
  }

  // Email setup
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your SMTP provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Email to admin
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: 'Mania@westcapitallending.com',
    subject: `New Lead from ${name}`,
    html: `
      <h2>New Contact Lead</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <p><strong>IP:</strong> ${ip_address || 'Not provided'}</p>
    `,
  }

  // Email to user
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'We received your message – MortgageHackr',
    html: `
      <h2>Thank you for contacting us!</h2>
      <p>Dear ${name},</p>
      <p>We've received your message:</p>
      <blockquote>${message}</blockquote>
      <p>We'll get back to you shortly.</p>
      <p>– The MortgageHackr Team</p>
    `,
  }

  try {
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(userMailOptions)
  } catch (mailError) {
    console.error('Email sending error:', mailError)
    return { error: 'Lead saved, but failed to send confirmation email.' }
  }

  return { success: 'Lead created and emails sent successfully.' }
}

export async function getContactLeads(page = 1, limit = 10) {
  const supabase = await createClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, count, error } = await supabase
    .from('contact_leads')
    .select('*', { count: 'exact' }) // fetch total count
    .order('created_at', { ascending: false })
    .range(from, to)
  console.log('Data from the backend:', data)

  if (error) {
    console.log('Error fetching leads:', error)
    console.error(error)
    return { data: [], total: 0 }
  }

  return { data, total: count ?? 0 }
}

export async function exportLeads(format: 'csv' | 'json') {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('contact_leads')
    .select('*')
    .order('createdAt', { ascending: false })

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  if (!data || data.length === 0) {
    return { error: 'No leads found for export' }
  }

  if (format === 'json') {
    return JSON.stringify(data, null, 2)
  }

  if (format === 'csv') {
    const headers = Object.keys(data[0])
    const escapeCSV = (value: any) => {
      if (value === null || value === undefined) return ''
      const stringValue = String(value)
      return `"${stringValue.replace(/"/g, '""')}"`
    }

    const csvRows = [
      headers.join(','), // header row
      ...data.map(lead =>
        headers.map(h => escapeCSV((lead as any)[h])).join(','),
      ),
    ]

    return csvRows.join('\n')
  }

  return { error: 'Invalid export format' }
}
