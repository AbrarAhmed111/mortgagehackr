'use server'

import { createClient } from '../supabase/server'
import { cacheUtils, performanceMonitor } from '../utils/performance'

export async function getOffers(filters?: {
  interestRateMin?: number
  interestRateMax?: number
  lenderName?: string
  loanTerm?: number
  status?: boolean
}) {
  const monitor = performanceMonitor.start('getOffers')
  
  // Temporarily disable caching to debug
  // const cacheKey = cacheUtils.generateKey('offers', { filters })
  // const cached = cacheUtils.get(cacheKey)
  // if (cached) {
  //   monitor.end()
  //   return cached
  // }
  
  console.log('Server: getOffers called with filters:', filters)
  
  const supabase = await createClient()
  let query = supabase.from('lender_offers').select('*')

  if (filters) {
    if (filters.interestRateMin !== undefined) {
      query = query.gte('interest_rate', filters.interestRateMin)
      console.log('Server: Applied interestRateMin filter:', filters.interestRateMin)
    }
    if (filters.interestRateMax !== undefined) {
      query = query.lte('interest_rate', filters.interestRateMax)
      console.log('Server: Applied interestRateMax filter:', filters.interestRateMax)
    }
    if (filters.lenderName) {
      query = query.ilike('lender_name', `%${filters.lenderName}%`)
      console.log('Server: Applied lenderName filter:', filters.lenderName)
    }
    if (filters.loanTerm) {
      query = query.eq('loan_term', filters.loanTerm)
      console.log('Server: Applied loanTerm filter:', filters.loanTerm)
    }
    if (filters.status !== undefined) {
      query = query.eq('status', filters.status)
      console.log('Server: Applied status filter:', filters.status)
    }
  }

  const { data, error } = await query.order('interest_rate', {
    ascending: true,
  })

  if (error) {
    console.error('Server: Database error:', error)
    return []
  }
  
  console.log('Server: Query returned', data?.length || 0, 'results')
  console.log('Server: Sample data:', data?.slice(0, 2))
  
  // Temporarily disable caching
  // cacheUtils.set(cacheKey, data, 2 * 60 * 1000)
  monitor.end()
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
    return {
      success: false,
      message: 'Click already logged for this user/IP.',
    }
  }

  // Step 2: Insert new click
  const { data, error } = await supabase.from('apply_now_clicks').insert([
    {
      lender_offer_id: lenderOfferId,
      user_ip: userIp ?? null,
      user_agent: userAgent ?? null,
    },
  ])

  if (error) {
    console.error('Error logging Apply Now click:', error)
    return { error: error.message }
  }
  cacheUtils.invalidate('topOffers')
  cacheUtils.invalidate('clicksOverTime')
  return { success: true, message: 'Applied Successfully' }
}

export async function createOffer(offerData: {
  lenderName: string
  interestRate: number
  apr: number
  loanTerm: number
  eligibilityCriteria?: string
  ctaLink: string
  expirationDate: string // should be in YYYY-MM-DD format
  status: 'active' | 'inactive'
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.from('lender_offers').insert([
    {
      lender_name: offerData.lenderName,
      interest_rate: offerData.interestRate,
      apr: offerData.apr,
      loan_term: offerData.loanTerm,
      eligibility: offerData.eligibilityCriteria ?? null,
      cta_link: offerData.ctaLink,
      expiration_date: offerData.expirationDate,
      status: offerData.status === 'active' ? true : false,
    },
  ])

  if (error) {
    console.error('Error creating offer:', error)
    return { error: error.message }
  }
  cacheUtils.invalidate('offers')
  cacheUtils.invalidate('offersWithLink')
  cacheUtils.invalidate('topOffers')
  cacheUtils.invalidate('offerStatusCounts')
  return data?.[0]
}

export async function getOffersWithLink() {
  const monitor = performanceMonitor.start('getOffersWithLink')
  const cacheKey = cacheUtils.generateKey('offersWithLink', {})
  const cached = cacheUtils.get(cacheKey)
  if (cached) {
    monitor.end()
    return cached
  }
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
    offers.map(async offer => {
      const { count, error: countError } = await supabase
        .from('apply_now_clicks')
        .select('*', { count: 'exact', head: true }) // only count, no rows
        .eq('lender_offer_id', offer.id)

      if (countError) {
        console.error(
          `Error counting clicks for offer ${offer.id}:`,
          countError,
        )
        return { ...offer, click_count: 0 }
      }

      return { ...offer, click_count: count ?? 0 }
    }),
  )

  cacheUtils.set(cacheKey, offersWithClicks, 2 * 60 * 1000)
  monitor.end()
  return offersWithClicks
}

export interface UpdateLenderOfferInput {
  id: string
  lender_name?: string
  interest_rate?: number
  apr?: number
  loan_term?: number
  eligibility?: string
  cta_link?: string
  expiration_date?: string
  status?: boolean
}

export async function updateLenderOffer(input: UpdateLenderOfferInput) {
  const { id, ...fields } = input


  
  if (!id) {
    throw {
      status: 400,
      message: 'Missing required field: id',
    }
  }

  const supabase = await createClient()

  const fieldsToUpdate = {
    ...fields,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('lender_offers')
    .update(fieldsToUpdate)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Supabase error:', error)
    throw {
      status: 500,
      message: 'Failed to update lender offer',
      details: error.message,
    }
  }

  if (!data) {
    throw {
      status: 404,
      message: 'Lender offer not found',
    }
  }
  cacheUtils.invalidate('offers')
  cacheUtils.invalidate('offersWithLink')
  cacheUtils.invalidate('topOffers')
  cacheUtils.invalidate('offerStatusCounts')
  return {
    status: 200,
    message: 'Lender offer updated successfully',
    data,
  }
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

export async function toggleOfferStatus(
  offerId: string,
  newStatus: 'active' | 'inactive',
) {
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
  cacheUtils.invalidate('offers')
  cacheUtils.invalidate('offersWithLink')
  cacheUtils.invalidate('topOffers')
  cacheUtils.invalidate('offerStatusCounts')
  return { success: true }
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
  cacheUtils.invalidate('offers')
  cacheUtils.invalidate('offersWithLink')
  cacheUtils.invalidate('topOffers')
  cacheUtils.invalidate('offerStatusCounts')
  return { success: 'Offer deleted successfully', deletedOffer: data }
}
