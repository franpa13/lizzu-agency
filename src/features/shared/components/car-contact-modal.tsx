'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { WhatsAppIcon } from '@/features/shared/icons/wpp'
import { getWhatsAppUrl } from '@/features/shared/utils/whatsapp'
import { cn } from '@/lib/utils'

interface CarContactModalProps {
  brand: string
  model: string
  year: number
  onClose: () => void
}

export function CarContactModal({ brand, model, year, onClose }: CarContactModalProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState(
    `Me interesa el ${brand} ${model} ${year}. ¿Está disponible?`
  )
  const nameRef = useRef<HTMLInputElement>(null)

  // Auto-focus name + lock scroll
  useEffect(() => {
    nameRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSend = () => {
    if (!name.trim()) return
    const fullMessage = `Hola Lizzu! Soy ${name.trim()}. ${message.trim()}`
    window.open(getWhatsAppUrl(fullMessage), '_blank', 'noopener,noreferrer')
    onClose()
  }

  const canSend = name.trim().length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="car-modal-title"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
      />

      {/* Panel */}
      <div
        className={cn(
          'relative z-10 w-full sm:max-w-md',
          'rounded-t-2xl sm:rounded-2xl',
          'border border-border bg-background shadow-2xl',
          'animate-in fade-in-0 duration-200',
          'slide-in-from-bottom-4 sm:zoom-in-95 sm:slide-in-from-bottom-0',
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-5 py-4">
          <div>
            <h2
              id="car-modal-title"
              className="text-base font-bold text-foreground"
            >
              Consultar vehículo
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {brand} {model} · {year}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 px-5 py-5">

          {/* Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="car-modal-name"
              className="block text-sm font-medium text-foreground"
            >
              Tu nombre
              <span className="ml-0.5 text-destructive" aria-hidden>*</span>
            </label>
            <input
              ref={nameRef}
              id="car-modal-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ej: María García"
              required
              aria-required="true"
              className={cn(
                'w-full rounded-lg border bg-background px-3 py-2.5',
                'text-sm text-foreground placeholder:text-muted-foreground',
                'border-input transition-all',
                'focus:outline-none focus:ring-2 focus:ring-lizzu-blue-glow/60 focus:border-lizzu-blue-glow',
              )}
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label
              htmlFor="car-modal-message"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground"
            >
              Mensaje
              <span className="text-xs font-normal text-muted-foreground">
                (opcional)
              </span>
            </label>
            <textarea
              id="car-modal-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className={cn(
                'w-full resize-none rounded-lg border bg-background px-3 py-2.5',
                'text-sm text-foreground placeholder:text-muted-foreground',
                'border-input transition-all',
                'focus:outline-none focus:ring-2 focus:ring-lizzu-blue-glow/60 focus:border-lizzu-blue-glow',
              )}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-border px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-lg border border-border text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className={cn(
              'h-11 flex-1 flex items-center justify-center gap-2 rounded-lg',
              'bg-emerald-500 text-white text-sm font-bold',
              'transition-all hover:bg-emerald-600 active:scale-[0.98]',
              'disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            <WhatsAppIcon className="size-4" />
            Enviar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
