'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'
import { createFetch } from '../database.types'

export async function createClient() {
  const rawCookies = await cookies()
  const cookieStore = rawCookies as UnsafeUnwrappedCookies

  return createServerClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: createFetch({
          next: {
            revalidate: 300,
            tags: ['supabase'],
          },
        }),
      },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              const cookieOptions: CookieOptions = {
                ...options,
                secure: true, // ensures cookies are only sent over HTTPS
              }
              cookieStore.set(name, value, cookieOptions)
            })
          } catch {
            // This can be ignored if setAll is called from a Server Component
          }
        },
      },
    },
  )
}
