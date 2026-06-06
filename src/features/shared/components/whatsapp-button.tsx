'use client'

import { ShimmerButton } from '@/features/shared/components/ui/shimmer-button'
import { WhatsAppIcon } from '@/features/shared/icons/wpp'
import { getWhatsAppUrl } from '@/features/shared/utils/whatsapp'

interface WhatsAppButtonProps {
  className?: string
  label?: string
  onAfterClick?: () => void
}

export function WhatsAppButton({
  className,
  label = 'Consultar por WhatsApp',
  onAfterClick,
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl()

  return (
    <ShimmerButton
      aria-label="Consultar por WhatsApp"
      className={className}
      onClick={() => {
        window.open(url, '_blank', 'noopener,noreferrer')
        onAfterClick?.()
      }}
    >
      <WhatsAppIcon />
      {label}
    </ShimmerButton>
  )
}
