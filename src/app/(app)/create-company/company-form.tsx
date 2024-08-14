'use client'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import {
  createCompanyAction,
  updateCompanyAction,
  type CompanySchema,
} from './actions'
import { toast } from 'sonner'

interface CompanyFormProps {
  isUpdating?: boolean
  initialData?: CompanySchema
}

export function CompanyForm({
  isUpdating = false,
  initialData,
}: CompanyFormProps) {
  const formAction = isUpdating ? updateCompanyAction : createCompanyAction

  const [{ errors }, handleSubmit, isPending] = useFormState(
    formAction,
    () => {
      toast.success('Empresa cadastrada com sucesso.')
    },
    (errMessage) => {
      toast.error(errMessage)
    },
  )
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input
          name="name"
          type="text"
          id="name"
          defaultValue={initialData?.name}
        />
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
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
        {errors?.cpfCnpj && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.cpfCnpj[0]}
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
