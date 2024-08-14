import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { getCurrentCo } from '@/app/auth/auth'
import { CompanyForm } from '@/app/(app)/create-company/company-form'
import { getCompany } from '@/http/get-company'

export default async function Settings() {
  const currentCo = getCurrentCo()

  const { company } = await getCompany(currentCo!)

  return (
    <div className="space-y-4">
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
                name: company.name,
                cpfCnpj: company.cnpj,
              }}
              isUpdating
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
