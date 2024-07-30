'use client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithEmailAndPassword } from './actions'
import { toast } from 'sonner'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [{ errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      toast.success('Login realizado com sucesso')
      router.push('/')
    },
    (errMessage) => {
      toast.error(errMessage)
    },
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* {success === false && message && (
          <Alert variant={'destructive'}>
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p> {message} </p>
            </AlertDescription>
          </Alert>
        )} */}
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            type="email"
            id="email"
            defaultValue={searchParams.get('email') ?? ''}
          />
          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}

          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-foreground hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>
        <Button variant={'link'} className="w-full" asChild>
          <Link href="/sign-up">Create new account</Link>
        </Button>
      </form>
    </div>
  )
}
