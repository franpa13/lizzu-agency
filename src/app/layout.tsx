import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'
import { ThemeProvider } from '@/features/shared/components/theme-provider'
import { Header } from '@/features/shared/components/header'
import { Footer } from '@/features/shared/components/footer'
import { siteConfig } from '@/config/site'
import './globals.css'

const exo2 = Exo_2({
  variable: '--font-exo2',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `Autos en Jujuy | ${siteConfig.fullName}`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description:
    'Encontrá autos usados y vehículos seleccionados en Jujuy. Consultá por WhatsApp con Lizzu Multimarcas.',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.fullName,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' className={`${exo2.variable} h-full antialiased`} suppressHydrationWarning>
      <body className='flex min-h-full flex-col'>
        <ThemeProvider>
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
