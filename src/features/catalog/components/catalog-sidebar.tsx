'use client'

import { useState } from 'react'
import { SlidersHorizontal, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/features/shared/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/features/shared/components/ui/accordion'
import { Checkbox } from '@/features/shared/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/features/shared/components/ui/radio-group'
import { Label } from '@/features/shared/components/ui/label'
import type { CatalogFilters, BadgeFilter, SortOption } from '../types/filters'
import { CATALOG_CARS } from '../data/cars'

const ALL_BRANDS = [...new Set(CATALOG_CARS.map((c) => c.brand))].sort()

const BADGE_OPTIONS: { value: BadgeFilter; label: string; description: string }[] = [
  { value: 'todos', label: 'Todos',   description: '0km y usados' },
  { value: '0km',   label: '0 km',   description: 'Vehículos nuevos' },
  { value: 'usado', label: 'Usados', description: 'Con kilómetros' },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'reciente',    label: 'Más reciente' },
  { value: 'precio-asc',  label: 'Menor precio' },
  { value: 'precio-desc', label: 'Mayor precio' },
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
  onClose,
}: CatalogSidebarProps) {
  const [localMin, setLocalMin] = useState(filters.priceMin?.toString() ?? '')
  const [localMax, setLocalMax] = useState(filters.priceMax?.toString() ?? '')

  function applyPrice() {
    onChange({
      ...filters,
      priceMin: localMin ? Number(localMin) : null,
      priceMax: localMax ? Number(localMax) : null,
    })
    onClose?.()
  }

  function clearAll() {
    setLocalMin('')
    setLocalMax('')
    onSearchChange('')
    onChange({ badge: 'todos', priceMin: null, priceMax: null, brands: [] })
  }

  function toggleBrand(brand: string) {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    onChange({ ...filters, brands: next })
  }

  const hasFilters =
    search.trim() !== '' ||
    filters.badge !== 'todos' ||
    filters.priceMin !== null ||
    filters.priceMax !== null ||
    filters.brands.length > 0

  const activeCount =
    (search.trim() !== '' ? 1 : 0) +
    (filters.badge !== 'todos' ? 1 : 0) +
    (filters.priceMin !== null || filters.priceMax !== null ? 1 : 0) +
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
        defaultValue={['precio', 'condicion', 'marca']}
        className="w-full"
      >

        {/* Precio */}
        <AccordionItem value="precio" className="border-none py-0.5">
          <AccordionTrigger className="py-3 text-sm font-semibold text-foreground hover:no-underline">
            Precio
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-medium text-muted-foreground">
                    Desde
                  </Label>
                  <input
                    type="number"
                    placeholder="$0"
                    value={localMin}
                    min={0}
                    step={1_000_000}
                    onChange={(e) => setLocalMin(e.target.value)}
                    className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/40 transition-colors focus:border-lizzu-blue-glow focus:bg-background"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-medium text-muted-foreground">
                    Hasta
                  </Label>
                  <input
                    type="number"
                    placeholder="Sin límite"
                    value={localMax}
                    min={0}
                    step={1_000_000}
                    onChange={(e) => setLocalMax(e.target.value)}
                    className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/40 transition-colors focus:border-lizzu-blue-glow focus:bg-background"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={applyPrice}
                className="w-full rounded-lg border border-lizzu-blue/30 bg-lizzu-blue/8 py-2 text-sm font-semibold text-lizzu-blue-glow transition-colors hover:bg-lizzu-blue/15 active:scale-[0.98]"
              >
                Aplicar filtro
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Condición */}
        <AccordionItem value="condicion" className="border-none py-0.5">
          <AccordionTrigger className="py-3 text-sm font-semibold text-foreground hover:no-underline">
            Condición
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <RadioGroup
              value={filters.badge}
              onValueChange={(v) => onChange({ ...filters, badge: v as BadgeFilter })}
              className="gap-2"
            >
              {BADGE_OPTIONS.map(({ value, label, description }) => {
                const active = filters.badge === value
                return (
                  <Label
                    key={value}
                    htmlFor={`badge-${value}`}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition-all',
                      active
                        ? 'border-lizzu-blue-glow/60 bg-lizzu-blue/8 shadow-[0_0_0_1px_oklch(0.54_0.18_263/0.25)]'
                        : 'border-border bg-muted/20 hover:border-lizzu-blue/30 hover:bg-muted/40',
                    )}
                  >
                    <RadioGroupItem value={value} id={`badge-${value}`} className="shrink-0" />
                    <div className="min-w-0">
                      <p className={cn(
                        'text-sm font-semibold leading-none',
                        active ? 'text-lizzu-blue-glow' : 'text-foreground',
                      )}>
                        {label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
                    </div>
                  </Label>
                )
              })}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <Separator />

        {/* Marca */}
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
