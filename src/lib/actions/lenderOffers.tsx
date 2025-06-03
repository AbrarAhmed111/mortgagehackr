'use server'

import { createClient } from '../supabase/server'

export async function createOffer(offerData: {
  lenderName: string
  interestRate: number
  apr: number
  loanTerm: number
  eligibilityCriteria?: string
  ctaLink: string
  expirationDate: string
  status: 'active' | 'inactive'
}) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('offers')
    .insert([offerData])

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return data?.[0]
}

export async function getOffers(filters?: {
  interestRateMin?: number
  interestRateMax?: number
  lenderName?: string
  loanTerm?: number
  status?: 'active' | 'inactive'
}) {
  const supabase = await createClient()
  let query = supabase.from('lender_offers').select('*')

  if (filters) {
    if (filters.interestRateMin !== undefined)
      query = query.gte('interest_rate', filters.interestRateMin)
    if (filters.interestRateMax !== undefined)
      query = query.lte('interest_rate', filters.interestRateMax)
    if (filters.lenderName)
      query = query.ilike('lender_name', `%${filters.lenderName}%`)
    if (filters.loanTerm)
      query = query.eq('loan_term', filters.loanTerm)
    if (filters.status) {
      const isActive = filters.status === 'active'
      query = query.eq('status', isActive)
    }
  }

  const { data, error } = await query.order('interest_rate', { ascending: true })

  if (error) {
    console.error(error)
    return []
  }

  return data
}


export async function logApplyNowClick({
  lenderOfferId,
  userIp,
  userAgent,
}: {
  lenderOfferId: string
  userIp?: string
  userAgent?: string
}) {
  const supabase = await createClient()

  // Step 1: Check if a click already exists for this combination
  const { data: existing, error: checkError } = await supabase
    .from('apply_now_clicks')
    .select('id')
    .eq('lender_offer_id', lenderOfferId)
    .eq('user_ip', userIp ?? null)
    .eq('user_agent', userAgent ?? null)
    .limit(1)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    // PGRST116 = no rows found for .single()
    console.error('Error checking existing Apply Now click:', checkError)
    return { error: checkError.message }
  }

  if (existing) {
    // Already exists, no need to insert again
    return { success: false, message: 'Click already logged for this user/IP.' }
  }

  // Step 2: Insert new click
  const { data, error } = await supabase
    .from('apply_now_clicks')
    .insert([
      {
        lender_offer_id: lenderOfferId,
        user_ip: userIp ?? null,
        user_agent: userAgent ?? null,
      }
    ])

  if (error) {
    console.error('Error logging Apply Now click:', error)
    return { error: error.message }
  }

  return { success: true, data }
}



export async function getOfferById(offerId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('id', offerId)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function updateOffer(offerId: string, updateData: Partial<{
  lenderName: string
  interestRate: number
  apr: number
  loanTerm: number
  eligibilityCriteria?: string
  ctaLink: string
  expirationDate: string
  status: 'active' | 'inactive'
}>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('offers')
    .update(updateData)
    .eq('id', offerId)
    .select()
    .single()

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return data
}

export async function toggleOfferStatus(offerId: string, newStatus: 'active' | 'inactive') {
  return updateOffer(offerId, { status: newStatus })
}

export async function deleteOffer(offerId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', offerId)

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return { success: 'Offer deleted successfully' }
}
