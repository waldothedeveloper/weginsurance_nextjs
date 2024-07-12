// These styles apply to every route in the application
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Weg Insurance',
  description: 'Tu bienestar, nuestra misión. Descubre tu cobertura de seguro médico ideal con Weg Insurance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}