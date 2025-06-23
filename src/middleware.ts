// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
import { createClient } from './lib/supabase/server'

export async function middleware(request: NextRequest) {
  // 🛑 Skip session check for sensitive POST routes
  const skipOnPostPaths = ['/reset-password']
  if (
    request.method === 'POST' &&
    skipOnPostPaths.some(path => request.nextUrl.pathname.startsWith(path))
  ) {
    console.log(`Skipping session check for POST ${request.nextUrl.pathname}`)
    return NextResponse.next()
  }

  const publicPaths = ['/signin', '/forget-password', '/reset-password']
  if (
    publicPaths.some(path => request.nextUrl.pathname.startsWith(path)) ||
    request.nextUrl.pathname === '/'
  ) {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Redirect logged-in users away from auth pages
    if (
      user &&
      publicPaths.includes(request.nextUrl.pathname)
    ) {
      const defaultRedirect = '/admin-panel'
      return NextResponse.redirect(new URL(defaultRedirect, request.url))
    }

    return NextResponse.next()
  }

  console.log('Middleware executing for path:', request.nextUrl.pathname)

  try {
    const prodAuthCookie = request.cookies.get(
      'sb-ozkhmrwkclvvvcorrsxe-auth-token'
    )

    const protectedRoutes = ['/admin-panel']
    const isProtected = protectedRoutes.some(path =>
      request.nextUrl.pathname.startsWith(path)
    )

    if (isProtected && !prodAuthCookie?.value) {
      const redirectUrl = new URL('/signin', request.url)
      const fullPath = request.nextUrl.pathname + request.nextUrl.search
      redirectUrl.searchParams.set('returnUrl', fullPath)
      return NextResponse.redirect(redirectUrl)
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: useError,
    } = await supabase.auth.getUser()

    if (useError || !user) {
      console.log('No session found, redirecting to /signin')
      const redirectUrl = new URL('/signin', request.url)
      redirectUrl.searchParams.set(
        'returnUrl',
        request.nextUrl.pathname + request.nextUrl.search
      )
      return NextResponse.redirect(redirectUrl)
    }

    // ✅ Always update session
    const response = await updateSession(request)
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: [
    '/admin-panel/:path*',
    // '/(api|trpc)/:path*',
    '/',
    '/signin',
    '/reset-password',
    '/forget-password',
  ],
}
