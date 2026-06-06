'use client'

import { WhatsAppIcon } from '@/features/shared/icons/wpp'
import { getWhatsAppUrl } from '@/features/shared/utils/whatsapp'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/shared/components/ui/tooltip'
import { useSidebar } from '@/features/shared/context/sidebar'
import { cn } from '@/lib/utils'

export function WhatsAppFab() {
  const { isOpen } = useSidebar()
  const href = getWhatsAppUrl()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Consultar por WhatsApp'
          className={cn(
            'fixed  right-4 bottom-6 md:right-6 z-50 flex size-9 md:size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 active:scale-95',
            isOpen && 'pointer-events-none translate-y-4 opacity-0',
          )}
        >
          <span className='absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping' aria-hidden='true' />
          <WhatsAppIcon className='relative size-4 md:size-5' />
        </a>
      </TooltipTrigger>
      <TooltipContent side='left'>
        Consultar por WhatsApp
      </TooltipContent>
    </Tooltip>
  )
}
