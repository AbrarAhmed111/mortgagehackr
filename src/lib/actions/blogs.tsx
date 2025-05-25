'use server'

import { createClient } from '../supabase/server'

export async function getAllBlogs(page = 1, limit = 10) {
  const supabase = await createClient()
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error(error)
    return []
  }

  return data
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

