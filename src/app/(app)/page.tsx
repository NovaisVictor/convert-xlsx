import { TestXlsx } from '@/components/test-xlsx'
import { XlsxImporter } from '@/components/xlsx-importer'
import { cookies } from 'next/headers'

export default function Home() {
  const fileUrl = cookies().get('file-url')?.value ?? null

  return (
    <div className="container flex flex-col justify-center h-screen items-center space-y-4">
      <div className="justify-end flex w-full">
        <XlsxImporter />
      </div>
      {!fileUrl ? <p>Importe uma tabela</p> : <TestXlsx />}
    </div>
  )
}
