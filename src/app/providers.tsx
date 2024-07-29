'use client'
import { QueryClientProvider } from '@tanstack/react-query'

import type { ReactNode } from 'react'

import { queryClient } from '@/lib/react-query'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      > */}
      {children}
      <Toaster richColors />

      {/* </ThemeProvider> */}
    </QueryClientProvider>
  )
}
