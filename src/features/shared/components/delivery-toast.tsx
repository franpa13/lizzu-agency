'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { DELIVERIES, type Delivery } from '@/features/shared/data/deliveries'

const VISIBLE_MS = 5500
const PAUSE_MS = 20000
const INITIAL_DELAY_MS = 1500

function DeliveryContent({ name, car, photo, ago }: Delivery) {
  return (
    <div className="flex w-2/3 md:w-72 items-start gap-3 rounded-xl border border-lizzu-blue/30 bg-white dark:bg-lizzu-deep px-2 py-3 shadow-lg shadow-lizzu-navy/60">
      {/* Foto */}
      <div className="relative shrink-0">
        <div className="relative h-16 w-16 overflow-hidden rounded-xl ring-1 ring-lizzu-blue/40">
          <Image
            src={photo}
            alt={`Entrega a ${name}`}
            fill
            className="object-cover object-center"
            quality={90}
            sizes="256px"
          />
        </div>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-lizzu-black ring-1 ring-gray-200 dark:ring-lizzu-navy"
          aria-hidden="true"
        >
          <span className="relative flex h-2.5 w-2.5 rounded-full bg-emerald-500">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
          </span>
        </span>
      </div>

      {/* Texto */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Entrega reciente
        </p>
        <p className="mt-0.5 truncate text-sm font-bold leading-tight text-gray-900 dark:text-white">
          {name}
        </p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{car}</p>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
          <MapPin className="size-3 shrink-0" aria-hidden="true" />
          <span>Jujuy &middot; {ago}</span>
        </div>
      </div>
    </div>
  )
}

export function DeliveryToast() {
  const nextTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    function show(idx: number) {
      const d = DELIVERIES[idx]
      const next = (idx + 1) % DELIVERIES.length

      toast.custom(() => <DeliveryContent {...d} />, {
        id: 'delivery',
        duration: VISIBLE_MS,
        onAutoClose: () => {
          nextTimeout.current = setTimeout(() => show(next), PAUSE_MS)
        },
      })
    }

    const initial = setTimeout(() => show(0), INITIAL_DELAY_MS)

    return () => {
      clearTimeout(initial)
      clearTimeout(nextTimeout.current)
      toast.dismiss('delivery')
    }
  }, [])

  return null
}
