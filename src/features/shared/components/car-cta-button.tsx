'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { WhatsAppIcon } from '@/features/shared/icons/wpp'
import { CarContactModal } from './car-contact-modal'
import { Button } from '@/features/shared/components/ui/button'
import { cn } from '@/lib/utils'

interface CarCTAButtonProps {
  brand: string
  model: string
  year: number
  className?: string
}

export function CarCTAButton({ brand, model, year, className }: CarCTAButtonProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Consultar por WhatsApp sobre ${brand} ${model} ${year}`}
        className={cn(
          'relative w-full overflow-hidden',
          'bg-lizzu-blue text-white',
          'hover:bg-lizzu-blue-glow hover:shadow-lg hover:shadow-lizzu-blue/25',
          'h-9 text-xs font-bold',
          className,
        )}
      >
        {/* Shimmer sweep */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/button:translate-x-full"
        />
        <WhatsAppIcon className="relative z-10 size-4 shrink-0" />
        <span className="relative z-10">Consultar ahora</span>
      </Button>

      {mounted && open &&
        createPortal(
          <CarContactModal
            brand={brand}
            model={model}
            year={year}
            onClose={() => setOpen(false)}
          />,
          document.body,
        )
      }
    </>
  )
}
