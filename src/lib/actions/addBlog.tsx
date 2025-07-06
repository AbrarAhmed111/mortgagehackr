'use server'

import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import { cacheUtils } from '../utils/performance'

type BlogContentBlock = {
  image?: string
  description?: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Converts base64 data URL to buffer and extracts content type and extension
 */
function parseBase64Image(dataUrl: string): { buffer: Buffer, contentType: string, extension: string } | null {
  const matches = dataUrl.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/)

  if (!matches || matches.length !== 3) return null

  const contentType = matches[1]
  const base64Data = matches[2]
  const extension = contentType.split('/')[1]

  const buffer = Buffer.from(base64Data, 'base64')
  return { buffer, contentType, extension }
}

export async function addBlog({
  title,
  slug,
  profileImage,
  content,
}: {
  title: string
  slug: string
  profileImage?: string
  content: BlogContentBlock[]
}) {
  const processedContent: { image?: string; description?: string }[] = []

  for (const block of content) {
    let uploadedImageUrl: string | undefined = undefined

    if (block.image) {
      const parsed = parseBase64Image(block.image)
      if (!parsed) {
        console.error('Invalid base64 image')
        return { error: 'Invalid base64 image format' }
      }

      const { buffer, contentType, extension } = parsed
      const path = `blog/${uuidv4()}.${extension}`

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(path, buffer, {
          contentType,
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) {
        console.error(uploadError)
        return { error: 'Image upload failed: ' + uploadError.message }
      }

      const { data } = supabase.storage.from('blog-images').getPublicUrl(path)
      uploadedImageUrl = data.publicUrl
    }

    processedContent.push({
      image: uploadedImageUrl,
      description: block.description,
    })
  }

  const { error } = await supabase.from('blogs').insert([
    {
      title,
      slug,
      profile_image: profileImage || null,
      content: processedContent,
    },
  ])

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  // Invalidate blogs cache
  cacheUtils.invalidate('blogs')
  return { success: 'Blog added successfully' }
}