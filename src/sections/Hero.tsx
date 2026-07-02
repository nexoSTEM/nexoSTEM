import { motion, type Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[78vh] flex items-center overflow-hidden dot-grid"
      style={{ paddingTop: '64px' }}
    >
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-background.png"
          alt=""
          className="w-full h-full object-cover opacity-60"
          fetchPriority="high"
        />
        {/* Gradient overlay — left side readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 bg-[#161B22] border border-[#30363D] rounded-full px-3 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
            <span className="text-[#8B949E] text-xs font-medium tracking-wide uppercase">
              7 días gratis — sin tarjeta
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#F0F6FC] leading-[1.05] tracking-tight mb-6"
          >
            Aprende STEM.{' '}
            <span className="text-[#3FB950]">Entiende</span>{' '}
            el mundo.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[#8B949E] text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
          >
            Lecciones interactivas de matemáticas, física e ingeniería
            con simulaciones que te hacen pensar y construir.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#registro"
              className="group inline-flex items-center gap-2 bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] font-bold text-base px-6 py-3.5 rounded-md transition-all duration-200 hover:shadow-[0_0_24px_rgba(63,185,80,0.45)] active:scale-[0.98]"
            >
              Empieza gratis
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <div className="flex items-center gap-2 text-[#8B949E] text-sm">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="#8B949E" strokeWidth="1.5"/>
                <path d="M4 7h6M7 4v6" stroke="#8B949E" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              7 días gratis
              <span className="text-[#30363D]">•</span>
              Luego €7.99/mes
              <span className="text-[#30363D]">•</span>
              Cancela cuando quieras
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0D1117] to-transparent z-10" />
    </section>
  )
}
