import { TableSwitcher } from '@/components/table-switcher'
import { TestXlsx } from '@/components/uploader/test-xlsx'

export default async function Table() {
  return (
    <div>
      <TableSwitcher />
      <TestXlsx />
    </div>
  )
}
