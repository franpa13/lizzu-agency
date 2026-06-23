import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'
import { ThemeProvider } from '@/features/shared/components/theme-provider'
import { Header } from '@/features/shared/components/header'
import { Footer } from '@/features/shared/components/footer'
import { WhatsAppFab } from '@/features/shared/components/whatsapp-fab'
import { Toaster } from '@/features/shared/components/ui/sonner'
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
  applicationName: siteConfig.fullName,
  verification: {
    google: 'VITFVhcIrEfIXMCxQZV8iX_1ahadp-qn93eNm6Dk_0Q',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.fullName,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' data-scroll-behavior="smooth" className={`${exo2.variable} h-full antialiased`} suppressHydrationWarning>
      <body className='flex min-h-full flex-col'>
        <ThemeProvider>
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer />
          <WhatsAppFab />
          <Toaster position="bottom-left" richColors={false} toastOptions={{ classNames: { toast: 'bg-transparent! border-none! shadow-none! p-0!' } }} />
        </ThemeProvider>
      </body>
    </html>
  )
}
