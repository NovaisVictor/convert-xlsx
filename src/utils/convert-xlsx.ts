import * as XLSX from 'xlsx'

export type Sheet3594 = {
  ALIQ_ICMS: string
  ALIQ_ICMS_PADRAO: string
  COD_NCM: string
  COD_ITEM: string
  OBS: string
  FUNDAMENTO: string
}

export function convertXlsx(buffer: Buffer): Sheet3594[] {
  // Lê o arquivo XLSX a partir do Buffer
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const sheetName = '3594' // Nome da aba que você deseja ler
  const worksheet = workbook.Sheets[sheetName]

  if (!worksheet) {
    throw new Error(`A aba '${sheetName}' não foi encontrada.`)
  }

  const jsonData: Sheet3594[] = XLSX.utils
    .sheet_to_json<Sheet3594>(worksheet, {
      header: 1, // Para obter um array de arrays
      range: 12, // Começa a leitura após as 12 primeiras linhas
    })
    .slice(1) // Remove o cabeçalho

  // Mapeia os dados para o tipo Sheet3594
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedData: Sheet3594[] = jsonData.map((row: any) => ({
    ALIQ_ICMS: row[8] as string,
    ALIQ_ICMS_PADRAO: row[9] as string,
    COD_NCM: row[12] as string,
    COD_ITEM: row[13] as string,
    OBS: row[14] as string,
    FUNDAMENTO: row[15] as string,
  }))

  // Filtra duplicatas
  const seenItems = new Set<string>()
  const filterArr: Sheet3594[] = []

  for (const row of mappedData) {
    if (!seenItems.has(row.COD_ITEM)) {
      seenItems.add(row.COD_ITEM)
      filterArr.push(row)
    }
  }

  return filterArr
}
