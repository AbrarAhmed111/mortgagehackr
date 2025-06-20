'use server'

import { createClient } from '../supabase/server'

export async function createLead(
  name: string,
  email: string,
  message: string,
  ip_address?: string, // optional, for logging/spam detection
  is_spam: boolean = false
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('contact_leads')
    .insert([
      {
        name,
        email,
        message,
        ip_address: ip_address || null,
        is_spam
        // no need to pass submitted_at explicitly
      }
    ]);

  if (error) {
    console.error("Error creating contact lead:", error);
    return { error: error.message };
  }

  return { success: "Lead created successfully" };
}

export async function getLeads(
  page = 1,
  limit = 10,
  filterSpam: boolean | null = null
) {
  const supabase = await createClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase.from('leads').select('*').order('createdAt', { ascending: false })

  if (filterSpam !== null) {
    query = query.eq('isSpam', filterSpam)
  }

  const { data, error } = await query.range(from, to)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function markLeadSpam(leadId: string, spamStatus = true) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('leads')
    .update({ isSpam: spamStatus })
    .eq('id', leadId)

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return { success: `Lead marked as ${spamStatus ? 'spam' : 'not spam'}` }
}

export async function exportLeads(
  format: 'csv' | 'json',
  filterSpam: boolean | null = null
) {
  const supabase = await createClient()

  let query = supabase.from('leads').select('*').order('createdAt', { ascending: false })

  if (filterSpam !== null) {
    query = query.eq('isSpam', filterSpam)
  }

  const { data, error } = await query

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  if (!data || data.length === 0) {
    return { error: 'No leads found for export' }
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
