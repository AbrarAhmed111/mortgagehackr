'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../supabase/server'

export async function adminSignin(formData: FormData) {
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

  // Sign in user
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    return {
      ok: false,
      status: 401, // Unauthorized
      error: signInError.message,
    }
  }

  // Delay to ensure session cookie is set
  await new Promise(resolve => setTimeout(resolve, 100))

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError || !session) {
    return {
      ok: false,
      status: 500, // Server Error
      error: 'Failed to create session',
    }
  }

  return {
    ok: true,
    status: 200, // OK
    success: 'Signed in successfully',
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
