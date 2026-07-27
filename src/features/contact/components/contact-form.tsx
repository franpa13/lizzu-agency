'use client'

import { useState } from 'react'
import { Send, CheckCircle, Car, Banknote, Gauge, MessageCircleQuestion } from 'lucide-react'
import { BorderBeam } from '@/features/shared/components/ui/border-beam'
import { getWhatsAppUrl } from '@/features/shared/utils/whatsapp'
import { ShimmerButton } from '../../shared/components/ui/shimmer-button'

const SUBJECTS = [
  { id: 'comprar', label: 'Comprar un auto', message: 'Quiero comprar un auto', icon: Car },
  { id: 'financiacion', label: 'Financiación', message: 'Quiero consultar sobre financiación', icon: Banknote },
  { id: 'tasar', label: 'Tasar mi auto', message: 'Quiero tasar mi vehículo', icon: Gauge },
  { id: 'general', label: 'Otra consulta', message: 'Tengo una consulta general', icon: MessageCircleQuestion },
] as const

const inputClass =
  'w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 transition-colors focus:border-lizzu-blue-glow focus:bg-background dark:bg-lizzu-navy/30 dark:text-lizzu-white dark:placeholder:text-lizzu-silver/30 dark:focus:bg-lizzu-navy/50'

export function ContactForm() {
  const [name, setName] = useState('')
  const [subjectId, setSubjectId] = useState<string>(SUBJECTS[0].id)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const canSend = name.trim().length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSend) return
    const subject = SUBJECTS.find(s => s.id === subjectId) ?? SUBJECTS[0]
    const text = `Hola Lizzu! Soy ${name.trim()}. ${subject.message}.${message.trim() ? ` ${message.trim()}` : ''}`
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 dark:border-white/8 dark:bg-lizzu-deep sm:p-8">
      <BorderBeam
        colorFrom="var(--lizzu-blue)"
        colorTo="var(--lizzu-blue-glow)"
        size={100}
        duration={9}
        borderWidth={1}
      />

      {sent ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <CheckCircle className="size-12 text-emerald-500" aria-hidden="true" />
          <p className="text-lg font-bold text-foreground dark:text-lizzu-white">
            ¡Mensaje enviado!
          </p>
          <p className="text-sm text-muted-foreground dark:text-lizzu-silver">
            Abrimos WhatsApp con tu consulta. Respondemos a la brevedad.
          </p>
          <button
            type="button"
            onClick={() => { setSent(false); setName(''); setMessage('') }}
            className="mt-2 text-xs font-medium text-lizzu-blue-glow underline-offset-2 hover:underline"
          >
            Enviar otra consulta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-xs font-semibold text-foreground dark:text-lizzu-silver-light">
              Tu nombre *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              autoComplete="name"
              placeholder="Juan García"
              value={name}
              onChange={e => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Subject — segmented pill selector */}
          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-foreground dark:text-lizzu-silver-light">
              Motivo de consulta
            </span>
            <div role="radiogroup" aria-label="Motivo de consulta" className="grid grid-cols-2 gap-2">
              {SUBJECTS.map(({ id, label, icon: Icon }) => {
                const active = subjectId === id
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSubjectId(id)}
                    className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs font-medium leading-tight transition-colors ${
                      active
                        ? 'border-lizzu-blue-glow bg-lizzu-blue/10 text-foreground dark:bg-lizzu-blue/20 dark:text-lizzu-white'
                        : 'border-border bg-muted/40 text-muted-foreground hover:border-lizzu-blue-glow/40 dark:bg-lizzu-navy/30 dark:text-lizzu-silver'
                    }`}
                  >
                    <Icon
                      className={`size-4 shrink-0 ${active ? 'text-lizzu-blue-glow' : 'text-muted-foreground dark:text-lizzu-silver/60'}`}
                      aria-hidden="true"
                    />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="text-xs font-semibold text-foreground dark:text-lizzu-silver-light">
              Mensaje <span className="font-normal text-muted-foreground">(opcional)</span>
            </label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="¿Buscás algo en particular? Contanos..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>

          <ShimmerButton type="submit" disabled={!canSend} className="h-9 w-full gap-2 px-6 text-sm sm:w-auto disabled:cursor-not-allowed disabled:opacity-50">
            Consultar <Send className="size-4" aria-hidden="true" />
          </ShimmerButton>

        </form>
      )}
    </div>
  )
}
