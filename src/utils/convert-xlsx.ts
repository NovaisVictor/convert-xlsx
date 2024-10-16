import * as XLSX from 'xlsx'

export type Sittax = {
  // cnpj: string
  emission: string
  productCode: string
  productDecription: string
  nmcCode: string
  cfop: string
  icmsBase: string
  pisCofinsBase: string
}

export async function convertXlsx(fileBuffer: Buffer) {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  if (!worksheet) {
    throw new Error(`A aba '${sheetName}' não foi encontrada.`)
  }

  const jsonData = XLSX.utils
    .sheet_to_json(worksheet, {
      header: 1,
      range: 0,
    })
    .slice(1)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedData: Sittax[] = jsonData.map((row: any) => {
    const dateValue = row[8]
    const emissionDate = dateValue ? XLSX.SSF.parse_date_code(dateValue) : null
    // Cria o objeto mapeado
    return {
      // cnpj: (row[0] as string) ?? 'Sem dados',
      emission: emissionDate
        ? new Date(emissionDate.y, emissionDate.m - 1, emissionDate.d)
            .toISOString()
            .split('T')[0]
        : 'Sem dados', // Formato YYYY-MM-DD
      productCode: row[9] ?? 'Sem dados',
      productDecription: (row[10] as string) ?? 'Sem dados',
      nmcCode: (row[11] as string) ?? 'Sem dados',
      cfop: (row[13] as string) ?? 'Sem dados',
      icmsBase: (row[19] as string) ?? 'Sem dados',
      pisCofinsBase: (row[24] as string) ?? 'Sem dados',
    }
  })

  const filterArray: Sittax[] = []
  for (const row of mappedData) {
    const product = filterArray.find(
      (filtered) => filtered.productCode === row.productCode,
    )

    if (!product) {
      filterArray.push(row)
    }

    const productIndex = filterArray.findIndex(
      (filtered) => filtered.productCode === row.productCode,
    )

    const productEmissionDate = new Date(filterArray[productIndex].emission)
    const rowEmissionDate = new Date(row.emission)

    if (rowEmissionDate > productEmissionDate) {
      filterArray[productIndex] = row
    }
  }
  return filterArray
}
