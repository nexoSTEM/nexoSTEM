import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.4 7.6H18L13.3 11.2L15.1 17L10 13.4L4.9 17L6.7 11.2L2 7.6H7.6L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Simulaciones en tiempo real',
    desc: 'Manipula variables y observa los resultados al instante. Aprende con la intuición, no con la memoria.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5h14M3 10h14M3 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Teoría estructurada',
    desc: 'Cada lección empieza con la explicación teórica clara antes de pasar a la práctica interactiva.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Aprende a tu ritmo',
    desc: 'Sin fechas límite. Accede a todas las lecciones cuando quieras, desde cualquier dispositivo.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Contenido en constante crecimiento',
    desc: 'Nuevas lecciones cada semana en matemáticas, física e ingeniería de todas las ramas.',
  },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 lg:py-28 border-t border-[#30363D]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#3FB950] text-xs font-semibold uppercase tracking-widest mb-3">
              Por qué NexoSTEM
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F6FC] leading-tight mb-4">
              Diseñado para que entiendas de verdad
            </h2>
            <p className="text-[#8B949E] text-base leading-relaxed">
              No memorices fórmulas. Entiende por qué funcionan. Nuestras simulaciones interactivas
              te permiten experimentar con los conceptos hasta que los domines.
            </p>
          </motion.div>

          {/* Right: feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 hover:border-[#3FB950]/30 transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-[#3FB950]/10 text-[#3FB950] flex items-center justify-center mb-3">
                  {f.icon}
                </div>
                <h3 className="text-[#F0F6FC] font-semibold text-sm mb-1.5">{f.title}</h3>
                <p className="text-[#8B949E] text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
