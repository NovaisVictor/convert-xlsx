import excelToJson from 'convert-excel-to-json'

export type Sheet3594 = {
  ALIQ_ICMS: string
  ALIQ_ICMS_PADRAO: string
  COD_NCM: string
  COD_ITEM: string
  OBS: string
  FUNDAMENTO: string
}

export function convertXlsx(file: string) {
  const result = excelToJson({
    source: file,
    sheets: [
      {
        name: '3594',
        header: {
          rows: 12,
        },
        columnToKey: {
          I: '{{I12}}',
          J: '{{J12}}',
          M: '{{M12}}',
          O: '{{O12}}',
          P: '{{P12}}',
          N: '{{N12}}',
        },
      },
    ],
  })

  const sheet = result['3594']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterArr: Sheet3594[] = []

  for (let index = 0; index < sheet.length; index++) {
    const row = sheet[index]
    if (!filterArr.some((item) => item.COD_ITEM === row.COD_ITEM)) {
      filterArr.push(row)
    }
  }

  // console.log(filterArr)
  return filterArr
  // console.log(sheet.length)
}
