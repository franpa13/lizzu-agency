@AGENTS.md
# CLAUDE.md

# Proyecto

Landing page para **Lizzu**, agencia de autos ubicada en Jujuy.

El objetivo principal del proyecto es:

- generar consultas de clientes
- posicionar en Google
- mejorar presencia digital
- optimizar SEO local
- convertir visitas en mensajes de WhatsApp

Keywords principales:

- autos en Jujuy
- autos usados Jujuy
- agencia de autos Jujuy
- concesionaria Jujuy
- compra y venta de autos Jujuy
- vehículos usados Jujuy

---

# Stack Tecnológico

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vercel
- React Server Components
- Framer Motion (solo si realmente aporta valor)

---

# Prioridad Principal

La prioridad absoluta del proyecto es:

1. SEO
2. Performance
3. Conversión
4. Mobile Experience

La landing debe estar optimizada para:

- búsquedas locales
- indexación en Google
- carga rápida
- Core Web Vitals
- accesibilidad
- responsive design
- conversión mediante WhatsApp

---

# Arquitectura

La arquitectura debe seguir una estructura basada en features.

Separar funcionalidades por dominio y responsabilidad.

Evitar estructuras basadas únicamente en tipo de archivo.

Usar una arquitectura escalable y mantenible.

---

# Estructura recomendada

```txt
src/
|
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css
|
├── features/
│   |
│   ├── hero/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   |
│   ├── catalog/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   |
│   ├── about/
│   │   ├── components/
│   │   ├── data/
│   │   └── types/
│   |
│   ├── contact/
│   │   ├── components/
│   │   ├── utils/
│   │   └── types/
│   |
│   └── shared/
│       ├── components/
│       ├── constants/
│       ├── hooks/
│       ├── utils/
│       └── types/
|
├── components/
│   └── ui/
|
├── lib/
│   ├── seo.ts
│   ├── metadata.ts
│   └── utils.ts
|
├── config/
│   ├── site.ts
│   └── seo.ts
|
├── public/
│   ├── images/
│   └── icons/
|
└── types/
```

---

# Reglas de Arquitectura

Cada feature debe contener:

- componentes propios
- tipos propios
- utilidades propias
- lógica encapsulada

Evitar imports cruzados innecesarios.

No colocar toda la lógica dentro de `app/`.

`app/` debe mantenerse minimalista.

Las features deben ser reutilizables y desacopladas.

---

# Componentes

Usar componentes pequeños y reutilizables.

Separar:

- UI
- lógica
- datos

Evitar componentes gigantes.

---

# Server Components

Priorizar Server Components siempre que sea posible.

Usar `"use client"` solo cuando:

- haya estado
- eventos
- animaciones
- hooks del cliente

Evitar convertir páginas completas en client components.

---

# SEO Técnico

La landing debe estar altamente optimizada para SEO.

---

# Metadata

Usar metadata de Next.js correctamente.

Ejemplo:

```ts
export const metadata = {
  title: "Autos en Jujuy | Lizzu Agencia de Autos",
  description:
    "Encontrá autos usados y vehículos seleccionados en Jujuy. Consultá por WhatsApp con Lizzu.",
};
```

---

# Semántica HTML

Usar etiquetas correctas:

- main
- section
- article
- nav
- header
- footer
- address

Debe existir un único `h1`.

El `h1` debe contener la keyword principal.

Ejemplo:

```html
<h1>Autos en Jujuy</h1>
```

Usar `h2` para las secciones principales.

No usar headings únicamente por tamaño visual.

---

# SEO Local

Mencionar naturalmente:

- Jujuy
- San Salvador de Jujuy
- autos usados
- concesionaria
- agencia de autos

Agregar:

- WhatsApp
- ubicación
- Google Maps
- redes sociales
- dirección

---

# Schema.org

Implementar JSON-LD.

Usar:

- AutoDealer
- LocalBusiness

Ejemplo:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Lizzu",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Salvador de Jujuy",
    addressRegion: "Jujuy",
    addressCountry: "AR",
  },
};
```

---

# Performance

Optimizar Core Web Vitals.

Usar:

- next/image
- lazy loading
- imágenes optimizadas
- tamaños correctos

Evitar:

- imágenes gigantes
- JS innecesario
- librerías pesadas
- animaciones excesivas

---

# Imágenes

Todas las imágenes deben usar:

```tsx
<Image />
```

Todos los `alt` deben ser descriptivos.

Ejemplo correcto:

```tsx
alt="Toyota Corolla usado disponible en Lizzu Jujuy"
```

Ejemplo incorrecto:

```tsx
alt="auto"
```

---

# Conversión

El objetivo principal es generar consultas.

Agregar CTAs estratégicamente:

- Hero
- Catálogo
- Footer
- Botón flotante mobile

WhatsApp debe tener mensaje prearmado.

Ejemplo:

```ts
const message = encodeURIComponent(
  "Hola Lizzu, quiero consultar por un vehículo."
);
```

---

# Accesibilidad

Usar:

- botones reales
- labels correctos
- aria-label cuando corresponda
- buen contraste
- navegación clara

---

# Diseño

Diseño:

- moderno
- limpio
- automotor
- profesional
- premium
- enfocado en conversión

Priorizar mobile first.

Evitar saturación visual.

Usar buena jerarquía visual.

---

# Secciones obligatorias

## Hero

Debe incluir:

- título fuerte
- keyword local
- CTA principal
- CTA secundario
- imagen destacada

---

## Catálogo

Cada vehículo debe mostrar:

- marca
- modelo
- año
- precio
- kilometraje
- imagen
- CTA WhatsApp

---

## Quiénes Somos

Transmitir:

- confianza
- experiencia
- profesionalismo
- atención personalizada

---

## Contacto

Debe incluir:

- WhatsApp
- Instagram
- Facebook
- dirección
- Google Maps

---

# Sitemap

Crear:

```txt
app/sitemap.ts
```

---

# Robots

Crear:

```txt
app/robots.ts
```

Permitir indexación.

---

# Cosas a evitar

No usar SPA pesada.

No depender completamente del cliente para renderizar contenido.

No usar exceso de `"use client"`.

No usar lorem ipsum.

No ocultar contenido importante detrás de JS.

No usar headings incorrectos.

No usar textos genéricos.

---

# Objetivo Final

Construir una landing page moderna, rápida y altamente optimizada para SEO local, enfocada en posicionar en Google para búsquedas relacionadas con autos en Jujuy y convertir visitantes en clientes potenciales mediante WhatsApp.