// day index: 0 = domingo, 1 = lunes, ..., 6 = sábado  |  null = cerrado
export const businessHours: Record<number, { open: string; close: string } | null> = {
  0: null,
  1: { open: '09:00', close: '21:00' },
  2: { open: '09:00', close: '21:00' },
  3: { open: '09:00', close: '21:00' },
  4: { open: '09:00', close: '21:00' },
  5: { open: '09:00', close: '21:00' },
  6: { open: '09:00', close: '21:00' },
}

export const siteConfig = {
  name: "Lizzu",
  fullName: "Lizzu Multimarcas",
  url: "https://lizzu.vercel.app", // TODO: cambiar a https://lizzu.com.ar cuando el dominio esté activo
  locale: "es_AR",
  phone: "+5493884344543",
  whatsapp: "5493884344543",
  email: "",
  address: {
    street: "Almirante Brown N°10",
    city: "San Salvador de Jujuy",
    province: "Jujuy",
    postalCode: "4600",
    country: "Argentina",
    countryCode: "AR",
  },
  social: {
    instagram: "https://www.instagram.com/lizzu_multimarcas/",
    facebook: "https://www.facebook.com/profile.php?id=61577826077479",
    tiktok: "https://www.tiktok.com/@lizzujujuy",
  },
} as const;
