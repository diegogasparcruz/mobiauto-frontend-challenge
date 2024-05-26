import { CarProvider } from '@/contexts/car-context'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Favicon from '/public/favicon.png'

export const metadata: Metadata = {
  title: 'Tabela Fipe',
  description: 'Consulte o valor de um veículo de forma gratuita',
  icons: [{ rel: 'icon', url: Favicon.src }],
}

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <CarProvider>{children}</CarProvider>
      </body>
    </html>
  )
}
