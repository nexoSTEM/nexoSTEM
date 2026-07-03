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
    name: 'Física',
    slug: 'fisica',
    color: '#58A6FF',
    description: 'Mecánica, electromagnetismo, termodinámica, ondas y óptica.',
    subBranches: [
      { id: 'eso', name: 'ESO', slug: 'eso', lessonCount: 8 },
      { id: 'bachillerato', name: 'Bachillerato', slug: 'bachillerato', lessonCount: 9 },
      { id: 'cursos-universitarios', name: 'Cursos Universitarios', slug: 'cursos-universitarios', lessonCount: 10 },
    ],
  },
  {
    id: 'matematicas',
    name: 'Matemáticas',
    slug: 'matematicas',
    color: '#3FB950',
    description: 'ESO, Bachillerato y Cursos Universitarios.',
    subBranches: [
      { id: 'eso', name: 'ESO', slug: 'eso', lessonCount: 8 },
      { id: 'bachillerato', name: 'Bachillerato', slug: 'bachillerato', lessonCount: 9 },
      { id: 'cursos-universitarios', name: 'Cursos Universitarios', slug: 'cursos-universitarios', lessonCount: 16 },
    ],
  },
  {
    id: 'ingenieria',
    name: 'Ingeniería',
    slug: 'ingenieria',
    color: '#F78166',
    description: 'Motores, sensores, sistemas de potencia y componentes electrónicos.',
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
