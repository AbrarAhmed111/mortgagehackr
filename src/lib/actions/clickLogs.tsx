'use server'

import { createClient } from '../supabase/server'

export async function logClick(lenderName: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('click_logs')
    .insert([{ lenderName, clickedAt: new Date().toISOString() }])

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return { success: 'Click logged successfully' }
}

export async function getClickLogs(filters?: {
  lenderName?: string
  startDate?: string // ISO date string
  endDate?: string // ISO date string
}) {
  const supabase = await createClient()
  let query = supabase.from('click_logs').select('*')

  if (filters) {
    if (filters.lenderName)
      query = query.eq('lenderName', filters.lenderName)
    if (filters.startDate)
      query = query.gte('clickedAt', filters.startDate)
    if (filters.endDate)
      query = query.lte('clickedAt', filters.endDate)
  }

  const { data, error } = await query.order('clickedAt', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function exportClickLogs(format: 'csv' | 'json', filters?: {
  lenderName?: string
  startDate?: string
  endDate?: string
}) {
  const logs = await getClickLogs(filters)

  if (!logs || logs.length === 0) {
    return { error: 'No logs found for export' }
  }

  if (format === 'json') {
    return JSON.stringify(logs, null, 2)
  }

  if (format === 'csv') {
    // Simple CSV conversion
    const headers = Object.keys(logs[0])
    const csvRows = [
      headers.join(','), // header row
      ...logs.map(log => headers.map(h => `"${(log as any)[h]}"`).join(',')),
    ]
    return csvRows.join('\n')
  }

  return { error: 'Invalid export format' }
}
