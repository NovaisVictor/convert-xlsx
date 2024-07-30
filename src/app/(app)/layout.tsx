import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/sign-in')
  }
  return (
    <>
      <div className="container flex flex-col justify-center min-h-screen items-center space-y-4 p-4">
        <Header />
        <div className="justify-end flex w-full space-x-4">{children}</div>
      </div>
    </>
  )
}
