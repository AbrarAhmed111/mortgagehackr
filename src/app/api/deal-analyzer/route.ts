import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cacheUtils, performanceMonitor } from '../../../lib/utils/performance'

export const dynamic = "force-dynamic";

// GET: Paginated, filtered analyzer leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const result_type = searchParams.get('result_type') || undefined
    const source = searchParams.get('source') || undefined
    const timestamp = searchParams.get('_t') // For cache busting

    const monitor = performanceMonitor.start('getAnalyzerDealsList')
    const cacheKey = cacheUtils.generateKey('analyzerLeads', { page, limit, result_type, source, timestamp })
    const cached = cacheUtils.get(cacheKey)
    if (cached && !timestamp) {
      monitor.end()
      return NextResponse.json(cached)
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase
      .from('analyzer_leads')
      .select('*', { count: 'exact' })
      .order('submitted_at', { ascending: false })
      .range(from, to)

    if (result_type) query = query.eq('result_type', result_type)
    if (source) query = query.eq('source', source)

    const { data, count, error } = await query
    if (error) {
      console.error('Failed to fetch analyzer deals:', error)
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }

    const result = {
      success: true,
      data,
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 1,
      },
    }
    if (!timestamp) {
      cacheUtils.set(cacheKey, result, 2 * 60 * 1000)
    }
    monitor.end()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in GET /api/deal-analyzer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE: Remove a lead by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { error } = await supabase
      .from('analyzer_leads')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Failed to delete analyzer lead:', error)
      return NextResponse.json({ error: 'Failed to delete analyzer lead.' }, { status: 500 })
    }
    // Invalidate cache
    cacheUtils.invalidate('analyzerLeads')
    cacheUtils.invalidate('leadsBySource')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/deal-analyzer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 