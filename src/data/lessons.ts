export interface Lesson {
  id: string
  title: string
  branchId: string
  subBranchId: string
  order: number
  duration: string
  difficulty: 'basico' | 'intermedio' | 'avanzado'
  theory: string
  widgetFile: string | null
}

export const lessons: Lesson[] = [
  // Fisica > Gravitacion
  {
    id: 'grav-01',
    title: 'Ley de gravitacion universal',
    branchId: 'fisica',
    subBranchId: 'gravitacion',
    order: 1,
    duration: '15 min',
    difficulty: 'basico',
    theory: `La ley de gravitacion universal de Newton establece que dos cuerpos se atraen con una fuerza proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia que los separa.\n\nF = G * (m1 * m2) / r^2\n\nDonde G = 6.674 x 10^-11 N m^2 / kg^2 es la constante de gravitacion universal.\n\nEsta ley explica desde la caida de una manzana hasta las orbitas planetarias. La fuerza gravitatoria es siempre atractiva y actua a lo largo de la linea que une los centros de masa de ambos cuerpos.`,
    widgetFile: '/lessons/fisica/gravitacion/gravitacion-sim.html',
  },
  {
    id: 'grav-02',
    title: 'Orbitas y velocidad orbital',
    branchId: 'fisica',
    subBranchId: 'gravitacion',
    order: 2,
    duration: '20 min',
    difficulty: 'intermedio',
    theory: `Un objeto en orbita esta en caida libre constante alrededor de otro cuerpo. La velocidad orbital se calcula igualando la fuerza gravitatoria con la fuerza centripeta.\n\nv = sqrt(G * M / r)\n\nDonde M es la masa del cuerpo central y r es el radio de la orbita. A mayor altitud, menor velocidad orbital necesaria.\n\nLas orbitas pueden ser circulares, elipticas, parabolicas o hiperbolicas dependiendo de la energia total del sistema.`,
    widgetFile: null,
  },
  {
    id: 'grav-03',
    title: 'Energia potencial gravitatoria',
    branchId: 'fisica',
    subBranchId: 'gravitacion',
    order: 3,
    duration: '18 min',
    difficulty: 'intermedio',
    theory: `La energia potencial gravitatoria entre dos masas es:\n\nU = -G * m1 * m2 / r\n\nEl signo negativo indica que la energia es menor (mas negativa) cuando los cuerpos estan mas cerca. Para escapar del campo gravitatorio, un objeto necesita energia cinetica suficiente para que la energia total sea positiva.\n\nLa velocidad de escape se obtiene igualando la energia cinetica con el valor absoluto de la energia potencial:\n\nv_escape = sqrt(2 * G * M / r)`,
    widgetFile: null,
  },

  // Fisica > Campo electrico
  {
    id: 'ce-01',
    title: 'Ley de Coulomb',
    branchId: 'fisica',
    subBranchId: 'campo-electrico',
    order: 1,
    duration: '15 min',
    difficulty: 'basico',
    theory: `La ley de Coulomb describe la fuerza entre dos cargas puntuales:\n\nF = k * |q1 * q2| / r^2\n\nDonde k = 8.99 x 10^9 N m^2 / C^2. La fuerza es repulsiva si las cargas tienen el mismo signo y atractiva si tienen signos opuestos.\n\nEl campo electrico E en un punto es la fuerza por unidad de carga:\n\nE = F / q = k * Q / r^2`,
    widgetFile: '/lessons/fisica/campo-electrico/campo-electrico-sim.html',
  },
  {
    id: 'ce-02',
    title: 'Lineas de campo electrico',
    branchId: 'fisica',
    subBranchId: 'campo-electrico',
    order: 2,
    duration: '12 min',
    difficulty: 'basico',
    theory: `Las lineas de campo electrico son una representacion visual del campo. Salen de las cargas positivas y entran en las negativas. La densidad de lineas indica la intensidad del campo.\n\nPropiedades:\n- Nunca se cruzan\n- Son perpendiculares a las superficies equipotenciales\n- La tangente en cada punto indica la direccion del campo`,
    widgetFile: null,
  },

  // Matematicas > Calculo diferencial
  {
    id: 'cd-01',
    title: 'Concepto de derivada',
    branchId: 'matematicas',
    subBranchId: 'calculo-diferencial',
    order: 1,
    duration: '20 min',
    difficulty: 'basico',
    theory: `La derivada de una funcion f(x) en un punto mide la tasa de cambio instantanea. Se define como el limite:\n\nf'(x) = lim(h->0) [f(x+h) - f(x)] / h\n\nGeometricamente, la derivada es la pendiente de la recta tangente a la curva en ese punto.\n\nReglas basicas:\n- d/dx [x^n] = n * x^(n-1)\n- d/dx [sin(x)] = cos(x)\n- d/dx [e^x] = e^x`,
    widgetFile: '/lessons/matematicas/calculo-diferencial/derivada-sim.html',
  },
  {
    id: 'cd-02',
    title: 'Regla de la cadena',
    branchId: 'matematicas',
    subBranchId: 'calculo-diferencial',
    order: 2,
    duration: '18 min',
    difficulty: 'intermedio',
    theory: `La regla de la cadena permite derivar funciones compuestas:\n\nd/dx [f(g(x))] = f'(g(x)) * g'(x)\n\nEjemplo: d/dx [sin(x^2)] = cos(x^2) * 2x\n\nEsta regla es fundamental en el calculo y se usa constantemente en fisica e ingenieria para derivar expresiones complejas.`,
    widgetFile: null,
  },

  // Matematicas > Algebra lineal
  {
    id: 'al-01',
    title: 'Vectores y espacios vectoriales',
    branchId: 'matematicas',
    subBranchId: 'algebra-lineal',
    order: 1,
    duration: '22 min',
    difficulty: 'basico',
    theory: `Un vector es un objeto matematico con magnitud y direccion. Un espacio vectorial es un conjunto de vectores que cumple ciertas propiedades bajo la suma y la multiplicacion por escalar.\n\nOperaciones basicas:\n- Suma: (a1, a2) + (b1, b2) = (a1+b1, a2+b2)\n- Escalar: c * (a1, a2) = (c*a1, c*a2)\n- Producto punto: a . b = a1*b1 + a2*b2`,
    widgetFile: null,
  },

  // Ingenieria > Condensadores
  {
    id: 'cond-01',
    title: 'Circuito RC: carga y descarga',
    branchId: 'ingenieria',
    subBranchId: 'condensadores',
    order: 1,
    duration: '18 min',
    difficulty: 'intermedio',
    theory: `Un circuito RC consiste en una resistencia R y un condensador C en serie. Durante la carga, el voltaje en el condensador sigue:\n\nV(t) = V0 * (1 - e^(-t/RC))\n\nDurante la descarga:\n\nV(t) = V0 * e^(-t/RC)\n\nLa constante de tiempo tau = RC determina la velocidad del proceso. Despues de 5*tau, el condensador esta practicamente cargado o descargado por completo.`,
    widgetFile: null,
  },
  {
    id: 'cond-02',
    title: 'Condensadores en serie y paralelo',
    branchId: 'ingenieria',
    subBranchId: 'condensadores',
    order: 2,
    duration: '15 min',
    difficulty: 'basico',
    theory: `Condensadores en paralelo: la capacitancia total es la suma.\n\nC_total = C1 + C2 + C3 + ...\n\nCondensadores en serie: el inverso de la capacitancia total es la suma de los inversos.\n\n1/C_total = 1/C1 + 1/C2 + 1/C3 + ...\n\nEn paralelo, todos comparten el mismo voltaje. En serie, todos tienen la misma carga.`,
    widgetFile: null,
  },

  // Ingenieria > Transistores
  {
    id: 'trans-01',
    title: 'Transistor BJT: fundamentos',
    branchId: 'ingenieria',
    subBranchId: 'transistores',
    order: 1,
    duration: '20 min',
    difficulty: 'intermedio',
    theory: `El transistor de union bipolar (BJT) tiene tres terminales: base, colector y emisor. Funciona como un amplificador de corriente.\n\nIc = beta * Ib\n\nDonde beta (hFE) es la ganancia de corriente, tipicamente entre 50 y 300.\n\nModos de operacion:\n- Corte: no conduce (Vbe < 0.7V)\n- Activa: amplifica (Vbe ~ 0.7V, Vce > Vce_sat)\n- Saturacion: conduce al maximo (interruptor cerrado)`,
    widgetFile: null,
  },
]

export function getLesson(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id)
}

export function getLessonsBySubBranch(branchId: string, subBranchId: string): Lesson[] {
  return lessons
    .filter(l => l.branchId === branchId && l.subBranchId === subBranchId)
    .sort((a, b) => a.order - b.order)
}

export function getFirstLessonOfSubBranch(branchId: string, subBranchId: string): Lesson | undefined {
  return getLessonsBySubBranch(branchId, subBranchId)[0]
}
