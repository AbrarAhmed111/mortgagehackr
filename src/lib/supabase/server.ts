import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'
import { Database } from '../database.types'

export const createFetch =
  (options: Pick<RequestInit, 'next' | 'cache'>) =>
  (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      ...options,
    })
  }

export async function createClient() {
  const rawCookies = await cookies()
  const cookieStore = rawCookies as UnsafeUnwrappedCookies
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isVercelPreview =
    process.env.VERCEL_ENV === 'preview' ||
    (typeof window !== 'undefined' &&
      window.location.hostname.includes('vercel.app'))

  return createServerClient<Database>(
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
              // Don't set domain for preview or development environments
              const cookieOptions: CookieOptions = {
                ...options,
                domain:
                  isDevelopment || isVercelPreview ? undefined : '.nizam.co',
              }
              cookieStore.set(name, value, cookieOptions)
            })
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}
