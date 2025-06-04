'use server'

import { createClient } from '../supabase/server'


// Table or Card Layout
export async function getTopOffers() {
  const supabase = await createClient()

  // Select lender offers with count of clicks from apply_now_clicks
  const { data, error } = await supabase
    .from('lender_offers')
    .select(`
      id,
      lender_name,
      expiration_date,
      apply_now_clicks:apply_now_clicks!inner(lender_offer_id)
    `)

  if (error) {
    console.error(error)
    return []
  }

  // Count clicks per offer
  const offersWithClicks = data.map(offer => ({
    id: offer.id,
    lender_name: offer.lender_name,
    expiration_date: offer.expiration_date,
    click_count: offer.apply_now_clicks ? offer.apply_now_clicks.length : 0
  }))

  // Sort descending by click_count and take top 5
  const top5 = offersWithClicks
    .sort((a, b) => b.click_count - a.click_count)
    .slice(0, 5)

  return top5
}


// Line Chart
export async function getClicksOverTime(timeframe: 'day' | 'week' | 'month' = 'day') {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_clicks_over_time', { period: timeframe })

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return data
}


// PIE CHART

export async function getOfferStatusCounts() {
  const supabase = await createClient()

  // Count active offers
  const { count: activeCount, error: activeError } = await supabase
    .from('lender_offers')
    .select('id', { count: 'exact', head: true })
    .eq('status', true)

  if (activeError) {
    console.error(activeError)
    return { error: activeError.message }
  }

  // Count inactive offers
  const { count: inactiveCount, error: inactiveError } = await supabase
    .from('lender_offers')
    .select('id', { count: 'exact', head: true })
    .eq('status', false)

  if (inactiveError) {
    console.error(inactiveError)
    return { error: inactiveError.message }
  }

  return {
    active: activeCount ?? 0,
    inactive: inactiveCount ?? 0,
  }
}


// BAR CHART
type ResultType = 'Great' | 'Fair' | 'Poor'

export async function getLeadsBySource() {
  const supabase = await createClient()

  // Count contact leads (excluding spam)
  const { count: contactCount, error: contactError } = await supabase
    .from('contact_leads')
    .select('id', { count: 'exact', head: true })
    .eq('is_spam', false)

  if (contactError) {
    console.error(contactError)
    return { error: contactError.message }
  }

  // Count heloc leads
  const { count: helocCount, error: helocError } = await supabase
    .from('heloc_leads')
    .select('id', { count: 'exact', head: true })

  if (helocError) {
    console.error(helocError)
    return { error: helocError.message }
  }

  // Fetch deal analyzer leads
  const { data: dealAnalyzerData, error: dealAnalyzerError } = await supabase
    .from('deal_analyzer_leads')
    .select('result_type, id')

  if (dealAnalyzerError) {
    console.error(dealAnalyzerError)
    return { error: dealAnalyzerError.message }
  }

  const dealCounts: Record<ResultType, number> = {
    Great: 0,
    Fair: 0,
    Poor: 0,
  }

  if (dealAnalyzerData) {
    for (const lead of dealAnalyzerData) {
      // Type guard to check if lead.result_type is one of the keys
      if (lead.result_type && ['Great', 'Fair', 'Poor'].includes(lead.result_type)) {
        dealCounts[lead.result_type as ResultType] += 1
      }
    }
  }

  return {
    contactLeads: contactCount ?? 0,
    helocLeads: helocCount ?? 0,
    dealAnalyzerLeads: dealCounts,
  }
}

