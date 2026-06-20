'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Crumb {
  label: string
  href: string
}

interface SideImage {
  src: string
  alt: string
}

export interface PageHeaderProps {
  breadcrumb: Crumb[]
  title: string
  description?: string
  leftImage?: SideImage
  rightImage?: SideImage
  className?: string
}

export function PageHeader({
  breadcrumb,
  title,
  description,
  leftImage,
  rightImage,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden shadow-lg',
        'bg-lizzu-navy',
        className,
      )}
    >
      {/* Dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Left car ────────────────────────────────────────────────────── */}
      {leftImage && (
        <motion.div
          className="pointer-events-none absolute bottom-0  h-full w-24 opacity-50 left-4 sm:w-44 sm:opacity-80 md:left-8 lg:w-64 lg:opacity-100 xl:w-80"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          <Image
            src={leftImage.src}
            alt={leftImage.alt}
            fill
            className="object-contain object-bottom-left drop-shadow-2xl"
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 176px, 320px"
          />
        </motion.div>
      )}

      {/* ── Right car ───────────────────────────────────────────────────── */}
      {rightImage && (
        <motion.div
          className="pointer-events-none absolute bottom-0  h-full w-20 opacity-50 right-4 sm:w-44 sm:opacity-80 md:right-8 lg:w-64 lg:opacity-100"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
        >
          <Image
            src={rightImage.src}
            alt={rightImage.alt}
            fill
            className="object-contain object-bottom-right drop-shadow-2xl"
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 176px, 256px"
          />
        </motion.div>
      )}

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto  px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Ubicación de página">
          <ol className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/55">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="size-3 shrink-0 text-white/35" aria-hidden="true" />
                )}
                {i < breadcrumb.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="underline-offset-2 transition-colors hover:text-white/90 hover:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-white/80">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Centered text */}
        <div className="my-5 text-center ">
          <h1 className="text-sm font-bold leading-tight tracking-tight text-white sm:text-2xl ">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/70 text-xs sm:text-base">
              {description}
            </p>
          )}
        </div>

      </div>
    </section>
  )
}
