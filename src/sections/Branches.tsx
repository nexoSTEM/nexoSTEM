import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const branches = [
  {
    id: 'matematicas',
    label: 'Matemáticas',
    description: 'Álgebra, cálculo, estadística y más. De lo básico a lo avanzado.',
    color: '#3FB950',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 16h24M16 4v24M8 8l16 16M24 8L8 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    topics: ['Álgebra lineal', 'Cálculo diferencial', 'Estadística', 'Geometría', 'Ecuaciones diferenciales'],
    lessons: 48,
  },
  {
    id: 'fisica',
    label: 'Física',
    description: 'Mecánica, electromagnetismo, termodinámica y más.',
    color: '#58A6FF',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 16c4-6 8-6 12 0s8 6 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
    topics: ['Mecánica clásica', 'Electromagnetismo', 'Termodinámica', 'Óptica', 'Física cuántica'],
    lessons: 42,
  },
  {
    id: 'ingenieria',
    label: 'Ingeniería',
    description: 'Circuitos, estructuras, programación y diseño de sistemas.',
    color: '#F78166',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="12" width="24" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 12V8M16 12V6M22 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 20v4M16 20v6M22 20v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    topics: ['Ingeniería eléctrica', 'Ingeniería civil', 'Mecánica de fluidos', 'Materiales', 'Control y sistemas'],
    lessons: 56,
  },
]

export default function Branches() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="explorar" className="py-20 lg:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#3FB950] text-xs font-semibold uppercase tracking-widest mb-3">
            Explora por rama
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F6FC] leading-tight">
            Elige tu área de conocimiento
          </h2>
          <p className="text-[#8B949E] mt-3 text-base max-w-xl">
            Cada rama contiene lecciones estructuradas desde los fundamentos hasta conceptos avanzados.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {branches.map((branch, i) => (
            <motion.a
              key={branch.id}
              href={`#${branch.id}`}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-[#161B22] border border-[#30363D] rounded-xl p-6 hover:border-[#3FB950]/40 hover:bg-[#1C2128] transition-all duration-300 cursor-pointer no-underline"
              style={{ '--branch-color': branch.color } as React.CSSProperties}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
                style={{ background: `${branch.color}18`, color: branch.color }}
              >
                {branch.icon}
              </div>

              {/* Content */}
              <h3 className="text-[#F0F6FC] font-bold text-xl mb-2">{branch.label}</h3>
              <p className="text-[#8B949E] text-sm leading-relaxed mb-5">{branch.description}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {branch.topics.slice(0, 3).map(t => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full border"
                    style={{ color: branch.color, borderColor: `${branch.color}30`, background: `${branch.color}10` }}
                  >
                    {t}
                  </span>
                ))}
                <span className="text-xs px-2 py-0.5 rounded-full border border-[#30363D] text-[#8B949E]">
                  +{branch.topics.length - 3} más
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-[#8B949E] text-xs">{branch.lessons} lecciones</span>
                <span
                  className="flex items-center gap-1 text-xs font-medium transition-all duration-200 group-hover:gap-2"
                  style={{ color: branch.color }}
                >
                  Explorar
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>

              {/* Hover glow line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${branch.color}, transparent)` }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
