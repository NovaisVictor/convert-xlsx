'use server'

import { auth } from '@/auth/auth'
import { prisma } from '@/lib/prisma'
import { convertXlsx } from '@/utils/convert-xlsx'
import axios from 'axios'
import { revalidateTag } from 'next/cache'

export async function downloadAndSetFile(url: string) {
  try {
    const { user } = await auth()
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const fileData = response.data

    if (fileData) {
      // Chame a função convertXlsx com os dados do arquivo
      try {
        const jsonData = convertXlsx(fileData)
        // const fileJson = '{asafsfasfasfasf: asdas}'
        const fileJson = JSON.stringify(jsonData)

        await prisma.tables.create({
          data: {
            name: `Auditoria-${new Date()}`,
            fileUrl: url,
            fileJson,
            userId: user.id,
          },
        })
        revalidateTag('tables')
      } catch (error) {
        console.error('Erro ao baixar o arquivo:', error)
        return null
      }
    } else {
      console.error('Falha ao baixar o arquivo.')
      return null
    }
  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error)
    return null
  }
}
