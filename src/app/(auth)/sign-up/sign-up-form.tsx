'use client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { useServerAction } from 'zsa-react'
import { toast } from 'sonner'
import { signUpAction } from '@/actions/auth/sign-up-action'

export function SignUpForm() {
  const router = useRouter()

  const { isPending, executeFormAction, error } = useServerAction(
    signUpAction,
    {
      onSuccess() {
        toast.success('Cadastro realizado com sucesso')
        router.push('/sign-in')
      },
      onError() {
        toast.error(
          'Houve um problema ao realizar seu cadastro, tente novamente mais tarde',
        )
      },
    },
  )

  return (
    <div className="space-y-4">
      <form action={executeFormAction} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" />
          {error?.fieldErrors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {error?.fieldErrors?.name}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="email" id="email" />
          {error?.fieldErrors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {error?.fieldErrors?.email}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {error?.fieldErrors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {error?.fieldErrors?.password}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your passowrd</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />
          {error?.fieldErrors?.password_confirmation && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {error?.fieldErrors?.password_confirmation}
            </p>
          )}
        </div>
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>
        <Button variant={'link'} className="w-full" asChild>
          <Link href="/sign-in">Altready registred? Sign in</Link>
        </Button>
      </form>
      <Separator />
    </div>
  )
}
