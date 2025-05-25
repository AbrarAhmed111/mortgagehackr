'use server'

import { createClient } from '../supabase/server'

export async function createHelocLead(email: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('heloc_leads')
    .insert([{
      email,
      created_at: new Date().toISOString()
    }])

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return { success: 'HELOC lead created successfully' }
}

export async function getHelocLeads(page = 1, limit = 10) {
  const supabase = await createClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error } = await supabase
    .from('heloc_leads')
    .select('*')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function exportHelocLeads(format: 'csv' | 'json') {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('heloc_leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  if (!data || data.length === 0) {
    return { error: 'No HELOC leads found for export' }
  }

  if (format === 'json') {
    return JSON.stringify(data, null, 2)
  }

  if (format === 'csv') {
    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(','), // header row
      ...data.map(lead => headers.map(h => `"${(lead as any)[h]}"`).join(',')),
    ]
    return csvRows.join('\n')
  }

  return { error: 'Invalid export format' }
}
