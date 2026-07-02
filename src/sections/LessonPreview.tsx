import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const lessons = [
  {
    id: 'pendulo',
    branch: 'Física',
    branchColor: '#58A6FF',
    title: 'Péndulo simple',
    description: 'Explora cómo la longitud y la masa afectan el período de oscilación.',
    difficulty: 'Básico',
    duration: '15 min',
    preview: (
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-xs border border-[#30363D]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#8B949E]">Física › Mecánica › Péndulo simple</span>
          <span className="text-[#3FB950] text-[10px] border border-[#3FB950]/30 px-1.5 py-0.5 rounded">EN VIVO</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="text-[#8B949E] mb-1">LONGITUD (L)</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#30363D] rounded-full">
                <div className="w-1/2 h-full bg-[#58A6FF] rounded-full" />
              </div>
              <span className="text-[#58A6FF]">1.00 m</span>
            </div>
          </div>
          <div>
            <div className="text-[#8B949E] mb-1">MASA (m)</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#30363D] rounded-full">
                <div className="w-1/2 h-full bg-[#58A6FF] rounded-full" />
              </div>
              <span className="text-[#58A6FF]">1.00 kg</span>
            </div>
          </div>
        </div>
        <div className="border border-[#30363D] rounded p-2">
          <div className="text-[#8B949E] text-[10px] mb-1">ÁNGULO (°) vs TIEMPO (s)</div>
          <svg viewBox="0 0 200 50" className="w-full">
            <path
              d="M0 25 C10 5, 20 5, 30 25 C40 45, 50 45, 60 25 C70 5, 80 5, 90 25 C100 45, 110 45, 120 25 C130 5, 140 5, 150 25 C160 45, 170 45, 180 25 C190 5, 200 5, 200 25"
              fill="none"
              stroke="#3FB950"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 'derivadas',
    branch: 'Matemáticas',
    branchColor: '#3FB950',
    title: 'Derivadas e integrales',
    description: 'Visualiza cómo cambia una función y el área bajo la curva.',
    difficulty: 'Intermedio',
    duration: '20 min',
    preview: (
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-xs border border-[#30363D]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#8B949E]">Matemáticas › Cálculo › Derivadas</span>
          <span className="text-[#3FB950] text-[10px] border border-[#3FB950]/30 px-1.5 py-0.5 rounded">EN VIVO</span>
        </div>
        <div className="mb-3 p-2 bg-[#161B22] rounded border border-[#30363D]">
          <span className="text-[#F0F6FC]">f(x) = </span>
          <span className="text-[#3FB950]">x²</span>
          <span className="text-[#F0F6FC]"> → f'(x) = </span>
          <span className="text-[#58A6FF]">2x</span>
        </div>
        <div className="border border-[#30363D] rounded p-2">
          <div className="text-[#8B949E] text-[10px] mb-1">GRÁFICA INTERACTIVA</div>
          <svg viewBox="0 0 200 60" className="w-full">
            <line x1="0" y1="30" x2="200" y2="30" stroke="#30363D" strokeWidth="0.5"/>
            <line x1="100" y1="0" x2="100" y2="60" stroke="#30363D" strokeWidth="0.5"/>
            <path d="M20 58 Q100 2 180 58" fill="none" stroke="#3FB950" strokeWidth="1.5"/>
            <path d="M20 50 L180 10" fill="none" stroke="#58A6FF" strokeWidth="1" strokeDasharray="3,2"/>
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 'circuitos',
    branch: 'Ingeniería',
    branchColor: '#F78166',
    title: 'Circuitos RC',
    description: 'Simula la carga y descarga de un condensador en tiempo real.',
    difficulty: 'Intermedio',
    duration: '18 min',
    preview: (
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-xs border border-[#30363D]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#8B949E]">Ingeniería › Eléctrica › Circuitos RC</span>
          <span className="text-[#3FB950] text-[10px] border border-[#3FB950]/30 px-1.5 py-0.5 rounded">EN VIVO</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="p-2 bg-[#161B22] rounded border border-[#30363D]">
            <div className="text-[#8B949E] text-[10px]">RESISTENCIA</div>
            <div className="text-[#F78166] font-bold">1000 Ω</div>
          </div>
          <div className="p-2 bg-[#161B22] rounded border border-[#30363D]">
            <div className="text-[#8B949E] text-[10px]">CAPACITANCIA</div>
            <div className="text-[#F78166] font-bold">100 μF</div>
          </div>
        </div>
        <div className="border border-[#30363D] rounded p-2">
          <div className="text-[#8B949E] text-[10px] mb-1">VOLTAJE vs TIEMPO</div>
          <svg viewBox="0 0 200 50" className="w-full">
            <path
              d="M0 45 C20 45, 30 10, 50 8 C70 6, 90 5, 200 4"
              fill="none"
              stroke="#F78166"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    ),
  },
]

export default function LessonPreview() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="simulaciones" className="py-20 lg:py-28 bg-[#0D1117]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#3FB950] text-xs font-semibold uppercase tracking-widest mb-3">
            Lecciones interactivas
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F6FC] leading-tight">
            Aprende haciendo, no memorizando
          </h2>
          <p className="text-[#8B949E] mt-3 text-base max-w-xl">
            Cada lección incluye teoría clara y una simulación interactiva que puedes manipular en tiempo real.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Lesson list */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {lessons.map((lesson, i) => (
              <button
                key={lesson.id}
                onClick={() => setActive(i)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                  active === i
                    ? 'bg-[#161B22] border-[#3FB950]/40 shadow-[0_0_16px_rgba(63,185,80,0.1)]'
                    : 'bg-[#161B22]/50 border-[#30363D] hover:border-[#30363D]/80 hover:bg-[#161B22]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                    style={{ background: `${lesson.branchColor}18`, color: lesson.branchColor }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wide"
                        style={{ color: lesson.branchColor }}
                      >
                        {lesson.branch}
                      </span>
                      <span className="text-[#30363D]">·</span>
                      <span className="text-[#8B949E] text-[10px]">{lesson.difficulty}</span>
                      <span className="text-[#30363D]">·</span>
                      <span className="text-[#8B949E] text-[10px]">{lesson.duration}</span>
                    </div>
                    <div className="text-[#F0F6FC] font-semibold text-sm mb-1">{lesson.title}</div>
                    <div className="text-[#8B949E] text-xs leading-relaxed">{lesson.description}</div>
                  </div>
                  {active === i && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-1">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="#3FB950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>
            ))}

            <a
              href="#explorar"
              className="text-center text-[#3FB950] text-sm font-medium py-3 border border-[#30363D] rounded-xl hover:border-[#3FB950]/40 hover:bg-[#161B22] transition-all duration-200"
            >
              Ver todas las lecciones →
            </a>
          </motion.div>

          {/* Preview panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            key={active}
            className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 glow-accent"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div
                  className="text-[10px] font-semibold uppercase tracking-wide mb-1"
                  style={{ color: lessons[active].branchColor }}
                >
                  {lessons[active].branch}
                </div>
                <h3 className="text-[#F0F6FC] font-bold text-lg">{lessons[active].title}</h3>
              </div>
              <span className="text-[#8B949E] text-xs border border-[#30363D] px-2 py-1 rounded-md">
                Vista previa
              </span>
            </div>

            {lessons[active].preview}

            <div className="mt-4 pt-4 border-t border-[#30363D] flex items-center justify-between">
              <p className="text-[#8B949E] text-xs">{lessons[active].description}</p>
              <a
                href="#registro"
                className="flex-shrink-0 ml-4 bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] text-xs font-bold px-3 py-2 rounded-md transition-all duration-200"
              >
                Empezar
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
