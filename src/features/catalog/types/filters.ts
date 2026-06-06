export type BadgeFilter = 'todos' | '0km' | 'usado'
export type SortOption  = 'reciente' | 'precio-asc' | 'precio-desc'

export interface CatalogFilters {
  badge:    BadgeFilter
  priceMin: number | null
  priceMax: number | null
  brands:   string[]
}

export const DEFAULT_FILTERS: CatalogFilters = {
  badge:    'todos',
  priceMin: null,
  priceMax: null,
  brands:   [],
}
