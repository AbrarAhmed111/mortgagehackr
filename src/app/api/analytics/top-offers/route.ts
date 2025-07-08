import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cacheUtils, performanceMonitor } from '../../../../lib/utils/performance'

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const monitor = performanceMonitor.start('getTopOffers')
    const cacheKey = cacheUtils.generateKey('topOffers', {})
    const cached = cacheUtils.get(cacheKey)
    
    if (cached) {
      monitor.end()
      return NextResponse.json(cached)
    }

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

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
      return NextResponse.json([], { status: 500 })
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

    cacheUtils.set(cacheKey, top5, 60 * 1000) // 1 minute cache
    monitor.end()
    return NextResponse.json(top5)
  } catch (error) {
    console.error('Error in GET /api/analytics/top-offers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 