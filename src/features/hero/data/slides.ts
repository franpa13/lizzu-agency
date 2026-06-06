export type ImageSlide = {
  type: 'image'
  src: string
  mobileSrc?: string
  alt: string
  label?: string
}

export type FeatureSlide = {
  type: 'feature'
  carSrc: string
  carAlt: string
  label?: string
  brand: string
  model: string
  tagline: string
}

export type HeroSlide = ImageSlide | FeatureSlide

export const HERO_SLIDES: HeroSlide[] = [
  {
    type: 'image',
    src: '/images/banner_lixxu.png',
    mobileSrc: '/images/bannermobilehero.png',
    alt: 'Showroom Lizzu agencia de autos usados en San Salvador de Jujuy',
  },
  {
    type: 'image',
    src: '/images/cronos-banner2.png',
    mobileSrc: '/images/bannercronosmmobile.png',
    alt: 'Fiat Cronos disponible en Lizzu agencia multimarcas San Salvador de Jujuy',
  },
  {
    type: 'image',
    src: '/images/financiacion_banner.png',
    mobileSrc: '/images/bannermobileentrega.png',
    alt: 'Financiación de autos disponible en Lizzu agencia multimarcas San Salvador de Jujuy',
  }
]
