'use server'

import { createClient } from '../supabase/server'

export async function createLead(
  name: string,
  email: string,
  message: string,
  ip_address?: string, // optional
  is_spam: boolean = false
) {
  const supabase = await createClient();

  // Step 1: Optional rate limit check if IP is provided
  if (ip_address) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count, error: rateLimitError } = await supabase
      .from('contact_leads')
      .select('id', { count: 'exact', head: true })
      .gte('submitted_at', oneHourAgo)
      .eq('ip_address', ip_address);

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
      return { error: "Failed to check rate limit." };
    }

    const RATE_LIMIT = 3;
    if ((count || 0) >= RATE_LIMIT) {
      return {
        error: `Rate limit exceeded. Please try again later.`,
      };
    }
  }

  // Step 2: Insert lead
  const { error } = await supabase.from('contact_leads').insert([
    {
      name,
      email,
      message,
      ip_address: ip_address || null, // nullable
      is_spam,
    },
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
