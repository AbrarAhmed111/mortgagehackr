'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { updatePasswordAction } from '@/lib/actions/auth'
import { FiLock } from 'react-icons/fi'

const ResetPasswordForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [code, setCode] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [codeVerified, setCodeVerified] = useState(false)

  useEffect(() => {
    const paramCode = searchParams?.get('code')
    if (paramCode && !code) {
      setCode(paramCode)
    }
  }, [searchParams, code])

  useEffect(() => {
    const exchangeCode = async () => {
      if (!code) return

      const supabase = createClient()
      const { data: sessionData } = await supabase.auth.getSession()

      if (!sessionData.session) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.error('Exchange error:', error)
          setError('Invalid or expired reset link.')
        } else {
          setCodeVerified(true)
        }
      } else {
        // already signed in
        setCodeVerified(true)
      }
    }

    exchangeCode()
  }, [code])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setIsLoading(true)
    try {
      await updatePasswordAction(newPassword)
      router.push('/signin')
    } catch (err: any) {
      setError(err.message || 'Failed to reset password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <FiLock className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">Reset Password</h2>
          <p className="text-gray-600">Enter your new password</p>
        </div>

        {!codeVerified ? (
          <p className="text-center text-gray-500">Verifying reset link...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPasswordForm
