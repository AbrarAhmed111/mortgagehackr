import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cacheUtils, performanceMonitor } from '../../../lib/utils/performance'

export const dynamic = "force-dynamic";

// GET: Paginated, filtered prequalification leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const status = searchParams.get('status') || undefined
    const timestamp = searchParams.get('_t') // For cache busting

    const monitor = performanceMonitor.start('getPreQualificationLeads')
    const cacheKey = cacheUtils.generateKey('preQualificationLeads', { page, limit, status, timestamp })
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
      .from('pre_qualification_leads')
      .select('*', { count: 'exact' })
      .order('submitted_at', { ascending: false })
      .range(from, to)

    if (status) query = query.eq('status', status)

    const { data, count, error } = await query
    if (error) {
      console.error('Failed to fetch prequalification leads:', error)
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
    console.error('Error in GET /api/prequalification:', error)
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
      .from('pre_qualification_leads')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Failed to delete prequalification lead:', error)
      return NextResponse.json({ error: 'Failed to delete prequalification lead.' }, { status: 500 })
    }
    // Invalidate cache
    cacheUtils.invalidate('preQualificationLeads')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/prequalification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 