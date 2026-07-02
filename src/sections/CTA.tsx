import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CheckoutButton from '@/components/CheckoutButton'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 lg:py-28 border-t border-[#30363D]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-[#161B22] border border-[#30363D] rounded-2xl p-10 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(63,185,80,0.06)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10">
            <p className="text-[#3FB950] text-xs font-semibold uppercase tracking-widest mb-4">
              Empieza hoy
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight mb-4">
              Tu primera semana es gratis.
              <br />
              <span className="text-[#3FB950]">Sin excusas.</span>
            </h2>
            <p className="text-[#8B949E] text-base max-w-lg mx-auto mb-8">
              Accede a todas las lecciones, simulaciones y ramas de conocimiento.
              Sin tarjeta de crédito. Cancela cuando quieras.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CheckoutButton className="group inline-flex items-center gap-2 bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_32px_rgba(63,185,80,0.45)] active:scale-[0.98]">
                Empieza gratis — 7 días
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </CheckoutButton>
              <span className="text-[#8B949E] text-sm">
                Luego €7.99/mes · Cancela cuando quieras
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
