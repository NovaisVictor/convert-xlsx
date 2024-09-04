'use client'
import { QueryClientProvider } from '@tanstack/react-query'

import type { ReactNode } from 'react'

import { queryClient } from '@/lib/react-query'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { CompetenceProvider } from '@/components/context/competence-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CompetenceProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </CompetenceProvider>
    </QueryClientProvider>
  )
}
