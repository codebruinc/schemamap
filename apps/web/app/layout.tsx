import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SchemaMap — Map messy CSVs to Shopify/Stripe in 30 seconds',
  description: 'Drop your file, pick a template, download a clean, validated CSV. No login. Runs in your browser.',
  keywords: ['CSV', 'Shopify', 'Stripe', 'data mapping', 'data transformation', 'no-code'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'SchemaMap — CSV Mapping Tool for Shopify & Stripe',
    description: 'Map messy CSVs to Shopify/Stripe in 30 seconds. No login. Runs in your browser.',
    url: 'https://schemamap.app',
    siteName: 'SchemaMap',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'SchemaMap — CSV Mapping Tool for Shopify & Stripe',
    description: 'Map messy CSVs to Shopify/Stripe in 30 seconds. No login. Runs in your browser.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}