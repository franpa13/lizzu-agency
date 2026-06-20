export type SortOption = 'reciente' | 'a-z'

export interface CatalogFilters {
  brands: string[]
}

export const DEFAULT_FILTERS: CatalogFilters = {
  brands: [],
}
