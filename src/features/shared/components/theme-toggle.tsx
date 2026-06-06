'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { flushSync } from 'react-dom'
import { cn } from '@/lib/utils'

type TransitionVariant =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'diamond'
  | 'hexagon'
  | 'rectangle'
  | 'star'

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number
  variant?: TransitionVariant
  fromCenter?: boolean
}

function polygonCollapsed(cx: number, cy: number, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => `${cx}px ${cy}px`).join(', ')
  return `polygon(${pairs})`
}

function getClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  vw: number,
  vh: number,
): [string, string] {
  switch (variant) {
    case 'circle':
      return [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRadius}px at ${cx}px ${cy}px)`]
    case 'square': {
      const halfSide = Math.max(Math.max(cx, vw - cx), Math.max(cy, vh - cy)) * 1.05
      const end = [
        `${cx - halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy + halfSide}px`,
        `${cx - halfSide}px ${cy + halfSide}px`,
      ].join(', ')
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`]
    }
    case 'triangle': {
      const scale = maxRadius * 2.2
      const dx = (Math.sqrt(3) / 2) * scale
      const verts = [
        `${cx}px ${cy - scale}px`,
        `${cx + dx}px ${cy + 0.5 * scale}px`,
        `${cx - dx}px ${cy + 0.5 * scale}px`,
      ].join(', ')
      return [polygonCollapsed(cx, cy, 3), `polygon(${verts})`]
    }
    case 'diamond': {
      const R = maxRadius * Math.SQRT2
      const end = [
        `${cx}px ${cy - R}px`,
        `${cx + R}px ${cy}px`,
        `${cx}px ${cy + R}px`,
        `${cx - R}px ${cy}px`,
      ].join(', ')
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`]
    }
    case 'hexagon': {
      const R = maxRadius * Math.SQRT2
      const verts = Array.from({ length: 6 }, (_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 3
        return `${cx + R * Math.cos(a)}px ${cy + R * Math.sin(a)}px`
      })
      return [polygonCollapsed(cx, cy, 6), `polygon(${verts.join(', ')})`]
    }
    case 'rectangle': {
      const halfW = Math.max(cx, vw - cx)
      const halfH = Math.max(cy, vh - cy)
      const end = [
        `${cx - halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy + halfH}px`,
        `${cx - halfW}px ${cy + halfH}px`,
      ].join(', ')
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`]
    }
    case 'star': {
      const R = maxRadius * Math.SQRT2 * 1.03
      const innerRatio = 0.42
      const starPolygon = (r: number) => {
        const verts: string[] = []
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5
          verts.push(`${cx + r * Math.cos(outerA)}px ${cy + r * Math.sin(outerA)}px`)
          const innerA = outerA + Math.PI / 5
          verts.push(`${cx + r * innerRatio * Math.cos(innerA)}px ${cy + r * innerRatio * Math.sin(innerA)}px`)
        }
        return `polygon(${verts.join(', ')})`
      }
      return [starPolygon(Math.max(2, R * 0.025)), starPolygon(R)]
    }
    default:
      return [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRadius}px at ${cx}px ${cy}px)`]
  }
}

export function ThemeToggle({
  className,
  duration = 400,
  variant = 'circle',
  fromCenter = false,
  ...props
}: AnimatedThemeTogglerProps) {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains('dark'))
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (!button) return

    const vw = window.visualViewport?.width ?? window.innerWidth
    const vh = window.visualViewport?.height ?? window.innerHeight

    let cx: number, cy: number
    if (fromCenter) {
      cx = vw / 2
      cy = vh / 2
    } else {
      const { top, left, width, height } = button.getBoundingClientRect()
      cx = left + width / 2
      cy = top + height / 2
    }

    const maxRadius = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy))

    const applyTheme = () => {
      const next = !isDark
      setIsDark(next)
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', next ? 'dark' : 'light')
    }

    if (typeof document.startViewTransition !== 'function') {
      applyTheme()
      return
    }

    const clipPath = getClipPaths(variant, cx, cy, maxRadius, vw, vh)
    const root = document.documentElement
    root.dataset.magicuiThemeVt = 'active'
    root.style.setProperty('--magicui-theme-toggle-vt-duration', `${duration}ms`)
    root.style.setProperty('--magicui-theme-vt-clip-from', clipPath[0])

    const cleanup = () => {
      delete root.dataset.magicuiThemeVt
      root.style.removeProperty('--magicui-theme-toggle-vt-duration')
      root.style.removeProperty('--magicui-theme-vt-clip-from')
    }

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    transition?.finished?.finally?.(cleanup)
    transition?.ready?.then?.(() => {
      document.documentElement.animate({ clipPath }, {
        duration,
        easing: variant === 'star' ? 'linear' : 'ease-in-out',
        fill: 'forwards',
        pseudoElement: '::view-transition-new(root)',
      })
    })
  }, [variant, fromCenter, duration, isDark])

  return (
    <button
      ref={buttonRef}
      type='button'
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-md border transition-colors duration-200',
        isDark
          ? 'border-white/10 text-lizzu-silver hover:border-lizzu-blue hover:text-lizzu-blue-glow'
          : 'border-border text-muted-foreground hover:border-lizzu-blue hover:text-lizzu-blue',
        className,
      )}
      {...props}
    >
      {isDark ? <Sun className='size-4' /> : <Moon className='size-4' />}
      <span className='sr-only'>{isDark ? 'Activar modo claro' : 'Activar modo oscuro'}</span>
    </button>
  )
}
