import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/app/auth/auth'
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default async function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/sign-in')
  }

  dayjs.locale('pt-BR')

  return (
    <>
      {children}
      {sheet}
    </>
  )
}
