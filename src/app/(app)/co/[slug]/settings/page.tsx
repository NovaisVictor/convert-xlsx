import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { CompanyForm } from '@/app/(app)/create-company/company-form'
import { getCompanyAction } from '@/actions/companies/get-company-action'

export default async function Settings() {
  const [data, err] = await getCompanyAction()

  if (err) {
    console.error(err.data)
    return
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Configurações da empresa</CardTitle>
            <CardDescription>Atualize os detalhes da empresa</CardDescription>
          </CardHeader>
          <CardContent>
            <CompanyForm
              initialData={{
                name: data.company.name,
                cpfCnpj: data.company.cnpj,
              }}
              isUpdating
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
