'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { CatalogCard } from './catalog-card'
import { CatalogSidebar } from './catalog-sidebar'
import { getOrderedInventory } from '../data/inventory'
import { DEFAULT_FILTERS } from '../types/filters'
import type { CatalogFilters, SortOption } from '../types/filters'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/features/shared/components/ui/dialog'

export function CatalogGrid() {
  const [filters, setFilters]             = useState<CatalogFilters>(DEFAULT_FILTERS)
  const [sort, setSort]                   = useState<SortOption>('reciente')
  const [mobileFilters, setMobileFilters] = useState(false)
  const [search, setSearch]               = useState('')

  /* ── Apply filters ─────────────────────────────────────────────────── */
  const inventory = getOrderedInventory()
  let cars = inventory.filter((car) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      if (!`${car.brand} ${car.model}`.toLowerCase().includes(q)) return false
    }
    if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) return false
    return true
  })

  /* ── Apply sort ────────────────────────────────────────────────────── */
  if (sort === 'a-z') {
    cars = [...cars].sort((a, b) =>
      `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`, 'es'),
    )
  }

  const hasFilters = search.trim() !== '' || filters.brands.length > 0

  function clearAll() {
    setFilters(DEFAULT_FILTERS)
    setSearch('')
  }

  const sidebarProps = {
    filters,
    onChange: setFilters,
    search,
    onSearchChange: setSearch,
    sort,
    onSortChange: setSort,
    resultsCount: cars.length,
  }

  return (
    <section
      aria-label="Catálogo de vehículos"
      className="mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      <div className="flex gap-8">

        {/* ── Desktop sidebar ──────────────────────────────────────────── */}
        <aside className="hidden w-60 shrink-0 lg:block xl:w-80 sticky top-18 self-start max-h-[calc(100vh)] overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          <CatalogSidebar {...sidebarProps} />
        </aside>

        {/* ── Main ─────────────────────────────────────────────────────── */}
        <div className="min-w-0 flex-1">

          {/* Mobile-only top bar */}
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              <span className="font-semibold text-foreground">{cars.length}</span>{' '}
              resultado{cars.length !== 1 ? 's' : ''}
            </p>
            <button
              type="button"
              onClick={() => setMobileFilters(true)}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                hasFilters
                  ? 'border-lizzu-blue-glow/50 bg-lizzu-blue/10 text-lizzu-blue-glow'
                  : 'border-border text-muted-foreground hover:border-lizzu-blue/40 hover:text-foreground',
              )}
              aria-label="Abrir filtros"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filtros
              {hasFilters && (
                <span className="flex size-4 items-center justify-center rounded-full bg-lizzu-blue-glow text-[9px] font-bold text-white">
                  ●
                </span>
              )}
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 xl:grid-cols-4">
            {cars.map((car, i) => (
              <CatalogCard key={car.id} car={car} priority={i < 2} />
            ))}
          </div>

          {/* Empty state */}
          {cars.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-semibold text-foreground">Sin resultados</p>
              <p className="mt-1 text-sm text-muted-foreground">
                No hay vehículos que coincidan con los filtros seleccionados.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 rounded-full border border-lizzu-blue/30 bg-lizzu-blue/8 px-5 py-2 text-sm font-semibold text-lizzu-blue-glow transition-colors hover:bg-lizzu-blue/15"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter modal ───────────────────────────────────────── */}
      <Dialog open={mobileFilters} onOpenChange={setMobileFilters}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[88dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-md"
        >
          <DialogHeader className="shrink-0 border-b border-border px-5 py-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base font-bold">Filtros</DialogTitle>
              <DialogClose
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Cerrar filtros"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <CatalogSidebar
              {...sidebarProps}
              onClose={() => setMobileFilters(false)}
            />
          </div>

          <div className="shrink-0 border-t border-border bg-muted/30 px-5 py-4">
            <DialogClose asChild>
              <button
                type="button"
                className="w-full rounded-xl bg-lizzu-blue py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-lizzu-blue-glow active:scale-[0.98]"
              >
                Ver {cars.length} resultado{cars.length !== 1 ? 's' : ''}
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
