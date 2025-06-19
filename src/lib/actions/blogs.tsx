'use server'

import { createClient } from '../supabase/server'

export async function getAllBlogs(page = 1, limit = 10, searchQuery = '') {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('blogs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (searchQuery.trim()) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error(error);
    return { data: [], total: 0 };
  }

  return {
    data,
    total: count ?? 0,
  };
}


export async function getBlogBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function deleteBlogById(blogId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', blogId)

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  return { success: 'Blog deleted successfully' }
}

