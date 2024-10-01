import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'
import { isAdmin } from '../auth/auth'

export default async function Home() {
  const admin = await isAdmin()

  return (
    <div className="space-y-4 py-4">
      <div className="pt-6">
        <Header />
        {admin && <Tabs />}
      </div>
      <main className="mx-auto w-full max-w-[1200px] space-y-4"></main>
    </div>
  )
}
