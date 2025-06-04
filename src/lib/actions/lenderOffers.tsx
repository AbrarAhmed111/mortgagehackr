'use server'

import { createClient } from '../supabase/server'


export async function getOffers(filters?: {
  interestRateMin?: number
  interestRateMax?: number
  lenderName?: string
  loanTerm?: number
  status?: 'active' | 'inactive'
}) {
  const supabase = await createClient()
  let query = supabase.from('offers').select('*')

  if (filters) {
    if (filters.interestRateMin !== undefined)
      query = query.gte('interestRate', filters.interestRateMin)
    if (filters.interestRateMax !== undefined)
      query = query.lte('interestRate', filters.interestRateMax)
    if (filters.lenderName)
      query = query.ilike('lenderName', `%${filters.lenderName}%`)
    if (filters.loanTerm)
      query = query.eq('loanTerm', filters.loanTerm)
    if (filters.status)
      query = query.eq('status', filters.status)
  }

  const { data, error } = await query.order('interestRate', { ascending: true })

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
    .from('lender_offers')
    .insert([{
      lender_name: offerData.lenderName,
      interest_rate: offerData.interestRate,
      apr: offerData.apr,
      loan_term: offerData.loanTerm,
      eligibility_criteria: offerData.eligibilityCriteria ?? null,
      cta_link: offerData.ctaLink,
      expiration_date: offerData.expirationDate,
      status: offerData.status === 'active' // stored as boolean
    }])

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return data?.[0]
}

export async function getOffersWithLink() {
  const supabase = await createClient()

  // Get all lender offers ordered by interest_rate ascending
  const { data: offers, error } = await supabase
    .from('lender_offers')
    .select('*')
    .order('interest_rate', { ascending: true })

  if (error || !offers) {
    console.error(error)
    return []
  }

  // For each offer, fetch the total clicks count
  const offersWithClicks = await Promise.all(
    offers.map(async (offer) => {
      const { count, error: countError } = await supabase
        .from('apply_now_clicks')
        .select('*', { count: 'exact', head: true }) // only count, no rows
        .eq('lender_offer_id', offer.id)

      if (countError) {
        console.error(`Error counting clicks for offer ${offer.id}:`, countError)
        return { ...offer, click_count: 0 }
      }

      return { ...offer, click_count: count ?? 0 }
    })
  )

  return offersWithClicks
}


export async function updateOfferLink(offerId: string, cta_link: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lender_offers')
    .update({
      cta_link,
      updated_at: new Date().toISOString(),
    })
    .eq('id', offerId)
    .select()
    .single()

  if (error) {
    console.error('Error updating offer link:', error)
    return { error: error.message }
  }

  return data
}


export async function toggleOfferStatus(offerId: string, newStatus: 'active' | 'inactive') {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lender_offers')
    .update({
      status: newStatus === 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('id', offerId)
    .select()
    .single()

  if (error) {
    console.error('Error toggling offer status:', error)
    return { error: error.message }
  }

  return data
}

export async function deleteOffer(offerId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lender_offers')
    .delete()
    .eq('id', offerId)
    .select()
    .single()

  if (error) {
    console.error('Error deleting offer:', error)
    return { error: error.message }
  }

  return { success: 'Offer deleted successfully', deletedOffer: data }
}
