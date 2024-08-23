'use client'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { createCompanyAction } from '@/actions/companies/create-company-action'
import { updateCompanyAction } from '@/actions/companies/update-company-aciont'
import { useServerAction } from 'zsa-react'
import { toast } from 'sonner'
import type { CompanySchema } from '@/actions/companies/company-schema'

interface CompanyFormProps {
  isUpdating?: boolean
  initialData?: CompanySchema
}

export function CompanyForm({
  isUpdating = false,
  initialData,
}: CompanyFormProps) {
  const formAction = isUpdating ? updateCompanyAction : createCompanyAction

  const { isPending, executeFormAction, error } = useServerAction(formAction, {
    onSuccess() {
      toast.success(
        isUpdating
          ? 'Empresa atualizada com sucesso'
          : 'Empresa criada com sucesso',
      )
    },
  })

  return (
    <form action={executeFormAction} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input
          name="name"
          type="text"
          id="name"
          defaultValue={initialData?.name}
        />
        {error?.fieldErrors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {error.fieldErrors.name}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
        <Input
          name="cpfCnpj"
          type="text"
          id="cpfCnpj"
          defaultValue={initialData?.cpfCnpj}
        />
        {error?.fieldErrors?.cpfCnpj && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {error.fieldErrors.cpfCnpj}
          </p>
        )}
      </div>
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Salvar empresa'
        )}
      </Button>
    </form>
  )
}
