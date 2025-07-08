import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cacheUtils, performanceMonitor } from '../../../../lib/utils/performance'

export const dynamic = "force-dynamic";

type ResultType = 'Great' | 'Fair' | 'Poor'

export async function GET() {
  try {
    const monitor = performanceMonitor.start('getLeadsBySource')
    const cacheKey = cacheUtils.generateKey('leadsBySource', {})
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

    // Count contact leads (excluding spam)
    const { count: contactCount, error: contactError } = await supabase
      .from('contact_leads')
      .select('id', { count: 'exact', head: true })
      .eq('is_spam', false)

    if (contactError) {
      console.error(contactError)
      return NextResponse.json(
        { error: contactError.message },
        { status: 500 }
      )
    }

    // Count heloc leads
    const { count: helocCount, error: helocError } = await supabase
      .from('heloc_leads')
      .select('id', { count: 'exact', head: true })

    if (helocError) {
      console.error(helocError)
      return NextResponse.json(
        { error: helocError.message },
        { status: 500 }
      )
    }

    // Fetch deal analyzer leads
    const { data: dealAnalyzerData, error: dealAnalyzerError } = await supabase
      .from('analyzer_leads')
      .select('result_type, id')

    if (dealAnalyzerError) {
      console.error(dealAnalyzerError)
      return NextResponse.json(
        { error: dealAnalyzerError.message },
        { status: 500 }
      )
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

    const result = {
      contactLeads: contactCount ?? 0,
      helocLeads: helocCount ?? 0,
      dealAnalyzerLeads: dealCounts,
    }
    
    cacheUtils.set(cacheKey, result, 60 * 1000) // 1 minute cache
    monitor.end()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in GET /api/analytics/leads-by-source:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 