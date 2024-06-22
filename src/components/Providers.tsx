"use client"

import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

export const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider 
        attribute='class' 
        defaultTheme='system' 
        enableSystem {...props}
      >
        <ClerkProvider>
            {children}
        </ClerkProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  )
}