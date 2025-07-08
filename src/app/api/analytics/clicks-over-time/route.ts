import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cacheUtils, performanceMonitor } from '../../../../lib/utils/performance'

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') as 'day' | 'week' | 'month' || 'day'

    const monitor = performanceMonitor.start('getClicksOverTime')
    const cacheKey = cacheUtils.generateKey('clicksOverTime', { timeframe })
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

    const { data, error } = await supabase.rpc('get_clicks_over_time', { period: timeframe })

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    cacheUtils.set(cacheKey, data, 60 * 1000) // 1 minute cache
    monitor.end()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/analytics/clicks-over-time:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 