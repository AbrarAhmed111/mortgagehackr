'use server'

import { createClient } from '../supabase/server'

export async function getAllClicksWithLender() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('apply_now_clicks')
    .select(`
      id,
      lender_offer_id,
      clicked_at,
      user_ip,
      user_agent,
      lender_offers (
        lender_name
      )
    `)
    .order('clicked_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch click data:', error)
    return []
  }

  // Flatten response for easier consumption (optional)
  const formatted = data.map(click => ({
    id: click.id,
    lender_offer_id: click.lender_offer_id,
    clicked_at: click.clicked_at,
    user_ip: click.user_ip,
    user_agent: click.user_agent,
    lender_name: click.lender_offers?.lender_name || 'Unknown'
  }))

  return formatted
}
