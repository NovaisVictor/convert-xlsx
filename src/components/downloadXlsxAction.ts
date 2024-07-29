import { convertXlsx } from '@/utils/convert-xlsx'
import axios from 'axios'

export async function DownloadXlsxAction(fileUrl: string) {
  const downloadFileFromUrl = async (url: string) => {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' })
      return response.data
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error)
      return null
    }
  }

  // Realize o download do arquivo e passe para a função convertXlsx
  const fileData = await downloadFileFromUrl(fileUrl)

  if (fileData) {
    // Chame a função convertXlsx com os dados do arquivo
    try {
      const jsonData = convertXlsx(fileData)

      return jsonData
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error)
      return null
    }
  } else {
    console.error('Falha ao baixar o arquivo.')
    return null
  }
}
