/**
 * Fondo compartido para banners oscuros (Catálogo, Nosotros, Contacto):
 * un tono casi sólido con variación vertical mínima y grano sutil,
 * sin brillos ni acentos de color — simple a propósito.
 *
 * Render dentro de un contenedor con `relative overflow-hidden`.
 */
export function ShowroomBackdrop() {
  return (
    <>
      {/* Base: casi sólida, con una variación vertical muy leve */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, oklch(0.135 0.03 260) 0%, oklch(0.155 0.045 261) 50%, oklch(0.12 0.035 260) 100%)',
        }}
      />

      {/* Grano sutil — rompe la planitud del gradiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  )
}
