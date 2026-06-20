export type CarStatus = '0km' | 'usado' | 'destacado' | 'reservado'

export interface CarImage {
  src: string
  alt: string
}

export interface CarSpecs {
  engine: string
  displacement: string
  power: string
  torque: string
  transmission: string
  traction: string
  fuel: string
  doors: number
  seats: number
  topSpeed?: string
  trunk?: string
  tires?: string
  warranty?: string
  consumption?: string
  acceleration?: string
}

export interface CarFeatureGroup {
  category: string
  items: string[]
}

export interface Car {
  id: string
  slug: string
  brand: string
  model: string
  version: string
  year: number
  km: number
  status: CarStatus
  price?: number
  flipCardImage?: boolean
  cardImage: CarImage
  gallery: CarImage[]
  specs: CarSpecs
  features: CarFeatureGroup[]
  colors: string[]
  description: string
  metaTitle: string
  metaDescription: string
}
