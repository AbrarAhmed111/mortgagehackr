'use server'
import { createClient } from '../supabase/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const PreQualificationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  loanAmount: z.string().min(1, 'Loan amount is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  creditScore: z.string().min(1, 'Credit score is required'),
  message: z.string().optional(),
  ip_address: z.string().optional(),
})

const UpdateStatusSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
  status: z.enum(['pending', 'accepted', 'rejected'], {
    errorMap: () => ({ message: 'Status must be pending, accepted, or rejected' })
  }),
  adminNotes: z.string().optional(),
})

export async function submitPreQualification(input: z.infer<typeof PreQualificationSchema>) {
  const supabase = await createClient()
  const parsed = PreQualificationSchema.safeParse(input)

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message || 'Invalid input'
    return { error: firstError }
  }

  const { name, email, phone, loanAmount, propertyType, creditScore, message, ip_address } = parsed.data

  // Rate limiting check
  if (ip_address) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const { count, error: rateLimitError } = await supabase
      .from('pre_qualification_leads')
      .select('id', { count: 'exact', head: true })
      .gte('submitted_at', oneHourAgo)
      .eq('ip_address', ip_address)

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError)
      return { error: 'Failed to check rate limit.' }
    }

    if ((count || 0) >= 3) {
      return { error: 'Rate limit exceeded. Please try again later.' }
    }
  }

  // Insert lead into database
  const { error: insertError } = await supabase.from('pre_qualification_leads').insert([
    {
      name,
      email,
      phone,
      loan_amount: loanAmount,
      property_type: propertyType,
      credit_score: creditScore,
      message: message || null,
      ip_address: ip_address || null,
      status: 'pending', // Default status
    },
  ])

  if (insertError) {
    console.error('Error creating pre-qualification lead:', insertError)
    return { error: 'Failed to submit your request. Please try again.' }
  }

  // Setup email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Email to admin
  const adminHtml = `
    <h2>New Pre-Qualification Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Loan Amount:</strong> ${loanAmount}</p>
    <p><strong>Property Type:</strong> ${propertyType}</p>
    <p><strong>Credit Score:</strong> ${creditScore}</p>
    ${message ? `<p><strong>Additional Message:</strong></p><p>${message}</p>` : ''}
    <p><strong>IP Address:</strong> ${ip_address || 'Not provided'}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `

  // Email to user
  const userHtml = `
    <h2>Thank you for your pre-qualification request!</h2>
    <p>Dear ${name},</p>
    <p>We've received your pre-qualification request with the following details:</p>
    <ul>
      <li><strong>Loan Amount:</strong> ${loanAmount}</li>
      <li><strong>Property Type:</strong> ${propertyType}</li>
      <li><strong>Credit Score:</strong> ${creditScore}</li>
    </ul>
    <p>Our team will review your information and contact you within 24 hours to discuss your mortgage options.</p>
    <p>If you have any immediate questions, please don't hesitate to reach out.</p>
    <p>– The MortgageHackr Team</p>
  `

  try {
    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'Mania@westcapitallending.com',
      subject: `New Pre-Qualification Request from ${name}`,
      html: adminHtml,
    })

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Pre-Qualification Request Received – MortgageHackr',
      html: userHtml,
    })

    return { success: 'Your pre-qualification request has been submitted successfully. We\'ll contact you within 24 hours.' }
  } catch (mailError) {
    console.error('Email sending error:', mailError)
    return { error: 'Request submitted, but failed to send confirmation email. Please check your email address.' }
  }
}

export async function updatePreQualificationStatus(input: z.infer<typeof UpdateStatusSchema>) {
  const supabase = await createClient()
  const parsed = UpdateStatusSchema.safeParse(input)

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message || 'Invalid input'
    return { error: firstError }
  }

  const { id, status, adminNotes } = parsed.data

  // First, get the lead details
  const { data: lead, error: fetchError } = await supabase
    .from('pre_qualification_leads')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !lead) {
    console.error('Pre-qualification lead not found:', fetchError)
    return { error: 'Lead not found.' }
  }

  // Update the status
  const { error: updateError } = await supabase
    .from('pre_qualification_leads')
    .update({ 
      status, 
      responded_at: new Date().toISOString() 
    })
    .eq('id', id)

  if (updateError) {
    console.error('Status update failed:', updateError)
    return { error: 'Failed to update status.' }
  }

  // Setup email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Prepare email content based on status
  let subject = ''
  let userHtml = ''

  switch (status) {
    case 'accepted':
      subject = 'Pre-Qualification Approved – MortgageHackr'
      userHtml = `
        <h2>Great News! Your Pre-Qualification Has Been Approved</h2>
        <p>Dear ${lead.name},</p>
        <p>We're excited to let you know that your pre-qualification request has been <strong>approved</strong>!</p>
        <p><strong>Your Request Details:</strong></p>
        <ul>
          <li><strong>Loan Amount:</strong> ${lead.loan_amount}</li>
          <li><strong>Property Type:</strong> ${lead.property_type}</li>
          <li><strong>Credit Score:</strong> ${lead.credit_score}</li>
        </ul>
        <p>Our team will contact you within the next 24 hours to discuss the next steps and help you move forward with your mortgage application.</p>
        ${adminNotes ? `<p><strong>Additional Notes:</strong> ${adminNotes}</p>` : ''}
        <p>If you have any questions in the meantime, please don't hesitate to reach out.</p>
        <p>– The MortgageHackr Team</p>
      `
      break

    case 'rejected':
      subject = 'Pre-Qualification Update – MortgageHackr'
      userHtml = `
        <h2>Pre-Qualification Status Update</h2>
        <p>Dear ${lead.name},</p>
        <p>Thank you for your pre-qualification request. After careful review, we regret to inform you that we are unable to proceed with your application at this time.</p>
        <p><strong>Your Request Details:</strong></p>
        <ul>
          <li><strong>Loan Amount:</strong> ${lead.loan_amount}</li>
          <li><strong>Property Type:</strong> ${lead.property_type}</li>
          <li><strong>Credit Score:</strong> ${lead.credit_score}</li>
        </ul>
        ${adminNotes ? `<p><strong>Reason:</strong> ${adminNotes}</p>` : '<p>This decision was based on our current lending criteria and market conditions.</p>'}
        <p>We encourage you to:</p>
        <ul>
          <li>Improve your credit score if possible</li>
          <li>Consider a smaller loan amount</li>
          <li>Reapply in the future when your financial situation improves</li>
        </ul>
        <p>If you have any questions about this decision, please don't hesitate to contact us.</p>
        <p>– The MortgageHackr Team</p>
      `
      break

    default:
      return { error: 'Invalid status provided.' }
  }

  try {
    // Send email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: lead.email,
      subject,
      html: userHtml,
    })

    // Send notification to admin
    const adminHtml = `
      <h2>Pre-Qualification Status Updated</h2>
      <p><strong>Lead:</strong> ${lead.name} (${lead.email})</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Updated:</strong> ${new Date().toLocaleString()}</p>
      ${adminNotes ? `<p><strong>Admin Notes:</strong> ${adminNotes}</p>` : ''}
    `

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'Mania@westcapitallending.com',
      subject: `Pre-Qualification ${status.charAt(0).toUpperCase() + status.slice(1)} - ${lead.name}`,
      html: adminHtml,
    })

    return { success: `Status updated to ${status} and notification sent to ${lead.name}.` }
  } catch (mailError) {
    console.error('Email sending error:', mailError)
    return { error: 'Status updated, but failed to send notification email.' }
  }
}

export async function getPreQualificationLeads(page = 1, limit = 20, status?: string) {
  const supabase = await createClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('pre_qualification_leads')
    .select('*', { count: 'exact' })
    .order('submitted_at', { ascending: false })
    .range(from, to)

  if (status) {
    query = query.eq('status', status)
  }

  const { data, count, error } = await query

  if (error) {
    console.error('Failed to fetch pre-qualification leads:', error)
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