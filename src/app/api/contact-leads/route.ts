import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cacheUtils } from '@/lib/utils/performance'

// GET: Fetch contact leads with pagination
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const from = (page - 1) * limit
  const to = from + limit - 1

  const supabase = await createClient()
  const { data, count, error } = await supabase
    .from('contact_leads')
    .select('*', { count: 'exact' })
    .order('submitted_at', { ascending: false })
    .range(from, to)

  if (error) {
    return NextResponse.json({ data: [], total: 0, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, total: count ?? 0 })
}

// DELETE: Delete a contact lead by id
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }
  const supabase = await createClient()
  const { error } = await supabase.from('contact_leads').delete().eq('id', id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  cacheUtils.invalidate('contactLeads')
  cacheUtils.invalidate('leadsBySource')
  return NextResponse.json({ success: true })
} 