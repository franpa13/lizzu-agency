'use client'

import { useState } from 'react'
import { Send, ChevronDown, CheckCircle } from 'lucide-react'
import { BlurFade } from '@/features/shared/components/ui/blur-fade'
import { BorderBeam } from '@/features/shared/components/ui/border-beam'
import { TextAnimate } from '@/features/shared/components/ui/text-animate'
import { WhatsAppButton } from '@/features/shared/components/whatsapp-button'
import { WhatsAppIcon } from '@/features/shared/icons/wpp'
import { getWhatsAppUrl } from '@/features/shared/utils/whatsapp'
import { ShimmerButton } from '../../shared/components/ui/shimmer-button';

const SUBJECTS = [
  'Quiero comprar un auto',
  'Consulta sobre financiación',
  'Quiero tasar mi vehículo',
  'Consulta general',
] as const

const inputClass =
  'w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 transition-colors focus:border-lizzu-blue-glow focus:bg-background dark:bg-lizzu-navy/30 dark:text-lizzu-white dark:placeholder:text-lizzu-silver/30 dark:focus:bg-lizzu-navy/50'

export function ContactForm() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState<string>(SUBJECTS[0])
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const canSend = name.trim().length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSend) return
    const text = `Hola Lizzu! Soy ${name.trim()}. ${subject}.${message.trim() ? ` ${message.trim()}` : ''}`
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section
      id="contacto"
      aria-label="Formulario de contacto"
      className="bg-background px-4 py-16 dark:bg-lizzu-dark sm:px-6 sm:py-20 lg:px-8"
    >
      <div className=" ">

        {/* Header */}
        <BlurFade direction="up" inView>
          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-lizzu-blue-glow">
              Contacto
            </p>
            <TextAnimate
              as="h2"
              animation="blurInUp"
              by="word"
              startOnView
              once
              className="text-2xl font-extrabold tracking-tight text-foreground dark:text-lizzu-white sm:text-3xl"
            >
              Envianos tu consulta
            </TextAnimate>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground dark:text-lizzu-silver sm:text-base">
              Completá el formulario y te respondemos por WhatsApp a la brevedad.
            </p>
          </div>
        </BlurFade>


        {/* ── Form card ────────────────────────────────────────────────────── */}
        <BlurFade delay={0.05} direction="up" inView>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 dark:border-white/8 dark:bg-lizzu-deep sm:p-8">
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

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-foreground dark:text-lizzu-silver-light">
                    Motivo de consulta
                  </label>
                  <div className="relative">
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className={`${inputClass} cursor-pointer appearance-none pr-9`}
                    >
                      {SUBJECTS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
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

                <ShimmerButton        className='h-8 px-3 text-xs w-full'>Enviar a Whatsapp <Send className='size-4'></Send></ShimmerButton>

              </form>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
