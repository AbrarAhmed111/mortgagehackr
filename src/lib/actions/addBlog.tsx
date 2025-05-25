'use server'

import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

type BlogContentBlock = {
  image?: File
  description?: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

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
      const file = block.image
      const ext = file.name.split('.').pop()
      const path = `blog/${uuidv4()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
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

  return { success: 'Blog added successfully' }
}
