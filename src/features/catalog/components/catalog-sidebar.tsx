'use client'

import { SlidersHorizontal, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/features/shared/components/ui/accordion'
import { Checkbox } from '@/features/shared/components/ui/checkbox'
import { Label } from '@/features/shared/components/ui/label'
import type { CatalogFilters, SortOption } from '../types/filters'
import { INVENTORY } from '../data/inventory'

const ALL_BRANDS = [...new Set(INVENTORY.map((c) => c.brand))].filter((b) => b !== 'Abarth').sort()

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'reciente', label: 'Más reciente' },
  { value: 'a-z',      label: 'A → Z' },
]

interface CatalogSidebarProps {
  filters: CatalogFilters
  onChange: (filters: CatalogFilters) => void
  search: string
  onSearchChange: (v: string) => void
  sort: SortOption
  onSortChange: (v: SortOption) => void
  resultsCount: number
  onClose?: () => void
}

export function CatalogSidebar({
  filters,
  onChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
  resultsCount,
}: CatalogSidebarProps) {

  function clearAll() {
    onSearchChange('')
    onChange({ brands: [] })
  }

  function toggleBrand(brand: string) {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    onChange({ ...filters, brands: next })
  }

  const hasFilters = search.trim() !== '' || filters.brands.length > 0

  const activeCount =
    (search.trim() !== '' ? 1 : 0) +
    filters.brands.length

  return (
    <div className="w-full space-y-4">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-lizzu-blue-glow" aria-hidden="true" />
          <span className="text-sm font-bold text-foreground">Filtros</span>
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lizzu-blue-glow px-1.5 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-lizzu-blue-glow underline-offset-2 hover:underline"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* ── Search ──────────────────────────────────────────────────── */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Buscar marca o modelo..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Buscar vehículos"
          className="w-full rounded-lg border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 transition-colors focus:border-lizzu-blue-glow focus:bg-background"
        />
      </div>

      {/* ── Results + Sort ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          <span className="font-semibold text-foreground">{resultsCount}</span>{' '}
          resultado{resultsCount !== 1 ? 's' : ''}
        </p>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Ordenar resultados"
          className="cursor-pointer rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground outline-none transition-colors hover:border-lizzu-blue/40 focus:border-lizzu-blue-glow"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="border-t border-border/60" />

      {/* ── Accordion ───────────────────────────────────────────────── */}
      <Accordion
        type="multiple"
        defaultValue={['marca']}
        className="w-full"
      >
        <AccordionItem value="marca" className="border-none py-0.5">
          <AccordionTrigger className="py-3 text-sm font-semibold text-foreground hover:no-underline">
            <span className="flex items-center gap-2">
              Marca
              {filters.brands.length > 0 && (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-lizzu-blue-glow/20 px-1 text-[10px] font-bold text-lizzu-blue-glow">
                  {filters.brands.length}
                </span>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <div className="grid grid-cols-1 gap-1.5">
              {ALL_BRANDS.map((brand) => {
                const checked = filters.brands.includes(brand)
                return (
                  <Label
                    key={brand}
                    htmlFor={`brand-${brand}`}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-all',
                      checked
                        ? 'border-lizzu-blue-glow/60 bg-lizzu-blue/8 shadow-[0_0_0_1px_oklch(0.54_0.18_263/0.25)]'
                        : 'border-border bg-muted/20 hover:border-lizzu-blue/30 hover:bg-muted/40',
                    )}
                  >
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={checked}
                      onCheckedChange={() => toggleBrand(brand)}
                      className="shrink-0"
                    />
                    <span className={cn(
                      'text-sm font-medium',
                      checked ? 'text-lizzu-blue-glow' : 'text-foreground',
                    )}>
                      {brand}
                    </span>
                  </Label>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
