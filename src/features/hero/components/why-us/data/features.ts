import type { LucideIcon } from 'lucide-react'
import { ShieldCheck, HandCoins, Handshake, Wrench } from 'lucide-react'

export interface WhyUsFeature {
  icon: LucideIcon
  title: string
  description: string
}

export const WHY_US_FEATURES: WhyUsFeature[] = [
  {
    icon: ShieldCheck,
    title: 'Garantía incluida',
    description: 'Todos nuestros vehículos incluyen garantía mínima de 6 meses para tu tranquilidad.',
  },
  {
    icon: HandCoins,
    title: 'Financiación flexible',
    description: 'Planes a medida con las mejores tasas del mercado. Aprobación en minutos.',
  },
  {
    icon: Handshake,
    title: 'Atención personalizada',
    description: 'Asesoramiento sin presión. Nuestro equipo te ayuda a encontrar el auto ideal.',
  },

]
