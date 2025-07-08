import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cacheUtils, performanceMonitor } from '../../../../lib/utils/performance'

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const monitor = performanceMonitor.start('getOfferStatusCounts')
    const cacheKey = cacheUtils.generateKey('offerStatusCounts', {})
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

    // Count active offers
    const { count: activeCount, error: activeError } = await supabase
      .from('lender_offers')
      .select('id', { count: 'exact', head: true })
      .eq('status', true)

    if (activeError) {
      console.error(activeError)
      return NextResponse.json(
        { error: activeError.message },
        { status: 500 }
      )
    }

    // Count inactive offers
    const { count: inactiveCount, error: inactiveError } = await supabase
      .from('lender_offers')
      .select('id', { count: 'exact', head: true })
      .eq('status', false)

    if (inactiveError) {
      console.error(inactiveError)
      return NextResponse.json(
        { error: inactiveError.message },
        { status: 500 }
      )
    }

    const result = {
      active: activeCount ?? 0,
      inactive: inactiveCount ?? 0,
    }
    
    cacheUtils.set(cacheKey, result, 60 * 1000) // 1 minute cache
    monitor.end()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in GET /api/analytics/offer-status-counts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 