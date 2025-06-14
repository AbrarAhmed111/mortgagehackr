'use client'
import React, { useState } from 'react'
import { FiMail, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'
import { forgotPassword } from '@/lib/actions/auth'
import toast from 'react-hot-toast'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const response = await forgotPassword(email)
      if (response.error) {
        toast.error(response.error)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <FiMail className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">Forgot Password</h2>
          <p className="text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        {success ? (
          <p className="text-green-600 text-center">
            Reset email sent successfully!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
            >
              {isLoading ? 'Sending...' : 'Send Reset Email'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/signin"
            className="text-sm text-primary flex items-center justify-center"
          >
            <FiArrowLeft className="mr-1" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
