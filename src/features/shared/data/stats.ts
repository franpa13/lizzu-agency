import type { SVGProps, ReactElement } from 'react'
import {
  CarProfileIcon,
  UsersThreeIcon,
  CalendarCheckIcon,
} from '../icons/stats'

export interface StatItem {
  value: number
  suffix: string
  label: string
  description: string
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement
  decimalPlaces?: number
}

export const LIZZU_STATS: StatItem[] = [
  {
    value: 200,
    suffix: '+',
    label: 'Vehículos vendidos',
    description: 'De todas las marcas y modelos',
    icon: CarProfileIcon,
  },
  {
    value: 400,
    suffix: '+',
    label: 'Clientes satisfechos',
    description: 'Que confiaron en Lizzu',
    icon: UsersThreeIcon,
  },
  {
    value: 5,
    suffix: ' años',
    label: 'En el mercado',
    description: 'Trayectoria en Jujuy',
    icon: CalendarCheckIcon,
  },
]
