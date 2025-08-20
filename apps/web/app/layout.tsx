import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SchemaMap - Map messy CSVs to Shopify/Stripe in 30 seconds',
  description: 'Drop your file, pick a template, download a clean, validated CSV. No login. Runs in your browser.',
  keywords: ['CSV', 'Shopify', 'Stripe', 'data mapping', 'data transformation', 'no-code'],
  openGraph: {
    title: 'SchemaMap - CSV Mapping Tool',
    description: 'Map messy CSVs to Shopify/Stripe in 30 seconds',
    type: 'website',
  }
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