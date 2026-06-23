export type Delivery = {
  photo: string
  name: string
  car: string
  ago: string
}

// Actualizá los nombres y modelos con los datos reales de cada entrega
export const DELIVERIES: Delivery[] = [
  {
    photo: '/images/foto1entrega.jpg',
    name: 'Daniel Tintilay',
    car: 'Fiat Cronos',
    ago: 'hace 2 días',
  },
  {
    photo: '/images/foto2entrega.jpg',
    name: 'Anibal Paredes',
    car: 'Peugeot 208',
    ago: 'hace 4 días',
  },
  {
    photo: '/images/foto3entrega.jpg',
    name: 'Familia Mamani',
    car: 'Renault Kwid',
    ago: 'hace 1 semana',
  },
  {
    photo: '/images/foto4entrega.jpg',
    name: 'Carlos Fernández',
    car: 'Chevrolet Onix',
    ago: 'hace 1 semana',
  },
  {
    photo: '/images/foto5entrega.jpg',
    name: 'María González',
    car: 'Toyota Etios',
    ago: 'hace 2 semanas',
  },
  {
    photo: '/images/foto6entrega.jpg',
    name: 'Roberto Zárate',
    car: 'Fiat Cronos',
    ago: 'hace 2 semanas',
  },
]
