// pages/admin/forgot-password.tsx
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiMail, FiLock, FiArrowLeft, FiCheck } from 'react-icons/fi'

const AdminForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'email' | 'reset'>('email')
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Add your email verification logic here
      console.log('Email verification for:', formData.email)

      // Move to next step
      setStep('reset')
    } catch (err) {
      setError('Email not found. Please check your email address.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.')
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long.')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Add your password reset logic here
      console.log('Password reset for:', formData.email)

      setSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err) {
      setError('Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FiCheck className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Password Reset Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your password has been updated. You will be redirected to the
              login page shortly.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FiLock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {step === 'email' ? 'Forgot Password' : 'Reset Password'}
            </h2>
            <p className="mt-2 text-gray-600">
              {step === 'email'
                ? 'Enter your email address to reset your password'
                : 'Enter your new password below'}
            </p>
          </div>

          {/* Back to Login Link */}
          <div className="mb-6">
            <Link
              href="/admin/login"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <FiArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Email Step */}
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Continue'
                )}
              </button>
            </form>
          )}

          {/* Password Reset Step */}
          {step === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              {/* Email Display */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  Resetting password for:{' '}
                  <span className="font-medium text-gray-900">
                    {formData.email}
                  </span>
                </p>
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Enter new password"
                    minLength={8}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Confirm new password"
                    minLength={8}
                  />
                </div>
              </div>

              {/* Password Requirements */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>Password requirements:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>At least 8 characters long</li>
                  <li>Must match the confirmation password</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Resetting Password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact your system administrator
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminForgotPassword
