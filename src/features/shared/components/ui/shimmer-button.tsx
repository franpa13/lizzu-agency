'use client'

import { cn } from '@/lib/utils'

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  shimmerDuration?: string
  borderRadius?: string
  background?: string
}

export function ShimmerButton({
  shimmerColor = 'rgba(45, 101, 216, 0.7)',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '8px',
  background = 'rgba(20, 58, 168, 1)',
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          '--spread': '90deg',
          '--shimmer-color': shimmerColor,
          '--radius': borderRadius,
          '--speed': shimmerDuration,
          '--cut': shimmerSize,
          '--bg': background,
        } as React.CSSProperties
      }
      className={cn(
        'group relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap',
        'border border-white/10 font-medium text-white',
        '[background:var(--bg)] [border-radius:var(--radius)]',
        'transform-gpu transition-all duration-300 ease-in-out',
        'hover:scale-[1.02] active:translate-y-px',
        className,
      )}
      {...props}
    >
      {/* shimmer beam layer */}
      <div className='-z-30 absolute inset-0 overflow-visible blur-[2px] [container-type:size]'>
        <div className='absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]'>
          <div className='animate-spin-around absolute -inset-full rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]' />
        </div>
      </div>

      {children}

      {/* inner glow */}
      <div className='absolute inset-0 rounded-[inherit] shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]' />
    </button>
  )
}
