import { siteConfig } from '@/config/site'

export const WA_MESSAGE = 'Hola Lizzu, quiero consultar por un vehículo.'

export function getWhatsAppUrl(message?: string) {
  if (!siteConfig.whatsapp) return '#contacto'
  return `https://wa.me/549${siteConfig.whatsapp}?text=${encodeURIComponent(message ?? WA_MESSAGE)}`
}
