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
            revalidate: 60, // Reduced from 300 to 60 seconds for faster updates
            tags: ['supabase'],
          },
        }),
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
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
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 7 days
              }
              cookieStore.set(name, value, cookieOptions)
            })
          } catch (error) {
            console.error('Error setting cookies:', error)
          }
        },
      },
    },
  )
}
