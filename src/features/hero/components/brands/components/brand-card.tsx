import Image from "next/image"
import { Brand } from "../data/brands"

export function BrandCard({ slug, name }: Brand) {
  return (
    <div className="flex h-12 w-16 sm:h-24 sm:w-44 md:h-20 md:w-40 shrink-0 items-center justify-center rounded-2xl border border-border/50 dark:border-white/[0.07] bg-card dark:bg-white px-5 shadow-sm dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-lizzu-blue-glow/30 ">
      <Image
        src={`/logo-autos/${slug}.svg`}
        alt={`Logo ${name} — disponible en Lizzu Jujuy`}
        width={110}
        height={44}
        unoptimized
        className="max-h-8 w-auto object-contain sm:max-h-12"
      />
    </div>
  )
}