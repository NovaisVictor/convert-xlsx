import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'

export default async function CoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
