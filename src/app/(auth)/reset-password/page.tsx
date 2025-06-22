import ResetPasswordForm from '@/NamePages/AdminSite/AdminResetPassword'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}

export default page
