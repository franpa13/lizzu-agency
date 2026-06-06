// day index: 0 = domingo, 1 = lunes, ..., 6 = sábado  |  null = cerrado
export const businessHours: Record<number, { open: string; close: string } | null> = {
  0: null,
  1: { open: '09:00', close: '18:00' },
  2: { open: '09:00', close: '18:00' },
  3: { open: '09:00', close: '18:00' },
  4: { open: '09:00', close: '18:00' },
  5: { open: '09:00', close: '18:00' },
  6: { open: '09:00', close: '13:00' },
}

export const siteConfig = {
  name: "Lizzu",
  fullName: "Lizzu Agencia de Autos",
  url: "https://lizzu.com.ar",
  locale: "es_AR",
  phone: "",
  whatsapp: "",
  email: "",
  address: {
    street: "",
    city: "San Salvador de Jujuy",
    province: "Jujuy",
    country: "Argentina",
    countryCode: "AR",
  },
  social: {
    instagram: "https://www.instagram.com/lizzu_multimarcas/",
    facebook: "https://www.facebook.com/profile.php?id=61577826077479",
    tiktok: "https://www.tiktok.com/@lizzujujuy",
  },
} as const;
