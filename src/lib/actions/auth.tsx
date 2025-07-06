'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../supabase/server'

// Utility function to validate and refresh session
async function validateSession(supabase: any) {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Session validation error:', error)
      return { valid: false, error }
    }
    
    if (!session) {
      return { valid: false, error: 'No session found' }
    }
    
    // Check if session is expired or about to expire
    const expiresAt = session.expires_at
    const now = Math.floor(Date.now() / 1000)
    const timeUntilExpiry = expiresAt - now
    
    // If session expires in less than 5 minutes, refresh it
    if (timeUntilExpiry < 300) {
      const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession()
      
      if (refreshError) {
        console.error('Session refresh error:', refreshError)
        return { valid: false, error: refreshError }
      }
      
      if (!refreshedSession) {
        return { valid: false, error: 'Failed to refresh session' }
      }
      
      return { valid: true, session: refreshedSession }
    }
    
    return { valid: true, session }
  } catch (error) {
    console.error('Session validation unexpected error:', error)
    return { valid: false, error }
  }
}

export async function adminSignin(formData: FormData) {
  try {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      return {
        ok: false,
        status: 400, // Bad Request
        error: 'Email and password are required',
      }
    }

    // Sign in user with retry logic
    let signInResult
    let retryCount = 0
    const maxRetries = 3

    while (retryCount < maxRetries) {
      try {
        signInResult = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (!signInResult.error) {
          break // Success, exit retry loop
        }
        
        // If it's an auth error (wrong credentials), don't retry
        if (signInResult.error.message.includes('Invalid login credentials')) {
          break
        }
        
        retryCount++
        if (retryCount < maxRetries) {
          console.log(`Sign in attempt ${retryCount} failed, retrying...`)
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)) // Exponential backoff
        }
      } catch (error) {
        retryCount++
        console.error(`Sign in attempt ${retryCount} error:`, error)
        if (retryCount >= maxRetries) {
          throw error
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
      }
    }

    if (signInResult?.error) {
      return {
        ok: false,
        status: 401, // Unauthorized
        error: signInResult.error.message,
      }
    }

    // Verify session with retry logic
    let sessionResult
    retryCount = 0

    while (retryCount < maxRetries) {
      try {
        // Wait a bit for session to be properly set
        await new Promise(resolve => setTimeout(resolve, 200))
        
        sessionResult = await supabase.auth.getSession()
        
        if (sessionResult.data.session && !sessionResult.error) {
          break // Success, exit retry loop
        }
        
        retryCount++
        if (retryCount < maxRetries) {
          console.log(`Session verification attempt ${retryCount} failed, retrying...`)
          await new Promise(resolve => setTimeout(resolve, 500 * retryCount))
        }
      } catch (error) {
        retryCount++
        console.error(`Session verification attempt ${retryCount} error:`, error)
        if (retryCount >= maxRetries) {
          throw error
        }
        await new Promise(resolve => setTimeout(resolve, 500 * retryCount))
      }
    }

    if (sessionResult?.error || !sessionResult?.data.session) {
      console.error('Session creation failed after retries:', sessionResult?.error)
      return {
        ok: false,
        status: 500, // Server Error
        error: 'Session creation failed. Please try again.',
      }
    }

    return {
      ok: true,
      status: 200, // OK
      success: 'Signed in successfully',
    }
  } catch (error) {
    console.error('Unexpected error during sign in:', error)
    return {
      ok: false,
      status: 500, // Server Error
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function signout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
    redirect('/error')
  }
  //
  redirect('/')
}

export async function forgotPassword(email: string) {
  const supabase = await createClient()

  if (!email) {
    return { error: 'Email is required' }
  }

  // Dynamically use the base URL based on environment (development or production)
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' // Default to localhost for development

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${baseURL}/reset-password`, // Ensure this is whitelisted in Supabase
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Password reset email sent successfully' }
}

export async function updatePasswordAction(newPassword: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }
  await supabase.auth.signOut()
  await new Promise(resolve => setTimeout(resolve, 200))
  // redirect to signin here
  redirect('/signin')
}
