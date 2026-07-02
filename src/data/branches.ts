export interface SubBranch {
  id: string
  name: string
  slug: string
  lessonCount: number
}

export interface Branch {
  id: string
  name: string
  slug: string
  color: string
  description: string
  subBranches: SubBranch[]
}

export const branches: Branch[] = [
  {
    id: 'fisica',
    name: 'Fisica',
    slug: 'fisica',
    color: '#58A6FF',
    description: 'Gravitacion, electromagnetismo, termodinamica y mas.',
    subBranches: [
      { id: 'gravitacion', name: 'Gravitacion', slug: 'gravitacion', lessonCount: 8 },
      { id: 'campo-electrico', name: 'Campo electrico', slug: 'campo-electrico', lessonCount: 7 },
      { id: 'campo-magnetico', name: 'Campo magnetico', slug: 'campo-magnetico', lessonCount: 6 },
      { id: 'ondas-electromagneticas', name: 'Ondas electromagneticas', slug: 'ondas-electromagneticas', lessonCount: 9 },
      { id: 'termodinamica', name: 'Termodinamica', slug: 'termodinamica', lessonCount: 8 },
    ],
  },
  {
    id: 'matematicas',
    name: 'Matematicas',
    slug: 'matematicas',
    color: '#3FB950',
    description: 'Algebra, calculo, estadistica y ecuaciones diferenciales.',
    subBranches: [
      { id: 'algebra-lineal', name: 'Algebra lineal', slug: 'algebra-lineal', lessonCount: 10 },
      { id: 'calculo-diferencial', name: 'Calculo diferencial', slug: 'calculo-diferencial', lessonCount: 9 },
      { id: 'calculo-integral', name: 'Calculo integral', slug: 'calculo-integral', lessonCount: 8 },
      { id: 'estadistica', name: 'Estadistica', slug: 'estadistica', lessonCount: 7 },
      { id: 'ecuaciones-diferenciales', name: 'Ecuaciones diferenciales', slug: 'ecuaciones-diferenciales', lessonCount: 6 },
    ],
  },
  {
    id: 'ingenieria',
    name: 'Ingenieria',
    slug: 'ingenieria',
    color: '#F78166',
    description: 'Motores, sensores, sistemas de potencia y componentes electronicos.',
    subBranches: [
      { id: 'motores', name: 'Motores', slug: 'motores', lessonCount: 8 },
      { id: 'sensores', name: 'Sensores', slug: 'sensores', lessonCount: 7 },
      { id: 'sistemas-de-potencia', name: 'Sistemas de potencia', slug: 'sistemas-de-potencia', lessonCount: 9 },
      { id: 'transistores', name: 'Transistores', slug: 'transistores', lessonCount: 6 },
      { id: 'condensadores', name: 'Condensadores', slug: 'condensadores', lessonCount: 7 },
    ],
  },
]

export function getBranch(slug: string): Branch | undefined {
  return branches.find(b => b.slug === slug)
}

export function getSubBranch(branchSlug: string, subSlug: string): SubBranch | undefined {
  const branch = getBranch(branchSlug)
  return branch?.subBranches.find(sb => sb.slug === subSlug)
}
