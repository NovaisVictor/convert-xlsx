import { isAdmin } from '@/app/auth/auth'
import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const admin = await isAdmin()
  if (!admin) {
    redirect('/')
  }
  return (
    <div className="px-4">
      <div className="pt-6">
        <Header />
        <Tabs />
      </div>
      <main className="mx-auto w-full max-w-[1200px] py-6">{children}</main>
    </div>
  )
}
