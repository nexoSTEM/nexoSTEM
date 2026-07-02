import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CheckoutButton from '@/components/CheckoutButton'

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const included = [
    'Acceso a todas las ramas (Matemáticas, Física, Ingeniería)',
    'Más de 140 lecciones interactivas',
    'Simulaciones en tiempo real',
    'Nuevas lecciones cada semana',
    'Acceso desde cualquier dispositivo',
    'Sin anuncios',
  ]

  return (
    <section id="precios" className="py-20 lg:py-28 border-t border-[#30363D]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[#3FB950] text-xs font-semibold uppercase tracking-widest mb-3">
            Precios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F6FC] leading-tight">
            Simple y sin sorpresas
          </h2>
          <p className="text-[#8B949E] mt-3 text-base">
            Empieza gratis. Cancela cuando quieras.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#161B22] border border-[#3FB950]/40 rounded-2xl p-8 glow-accent relative overflow-hidden"
          >
            {/* Popular badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-[#3FB950] text-[#0D1117] text-xs font-bold px-3 py-1 rounded-bl-xl">
                MÁS POPULAR
              </div>
            </div>

            {/* Plan name */}
            <div className="mb-6">
              <h3 className="text-[#F0F6FC] font-bold text-xl mb-1">NexoSTEM Completo</h3>
              <p className="text-[#8B949E] text-sm">Acceso total a toda la plataforma</p>
            </div>

            {/* Trial */}
            <div className="bg-[#3FB950]/10 border border-[#3FB950]/20 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5Z" stroke="#3FB950" strokeWidth="1.5"/>
                  <path d="M8 4.5v3.5l2.5 2.5" stroke="#3FB950" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-[#3FB950] font-semibold text-sm">7 días gratis</span>
              </div>
              <p className="text-[#8B949E] text-xs">Sin tarjeta de crédito. Acceso completo desde el primer día.</p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-2 mb-6">
              <span className="text-5xl font-black text-[#F0F6FC]">€7.99</span>
              <span className="text-[#8B949E] text-sm mb-2">/mes</span>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {included.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="#3FB950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#8B949E] text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <CheckoutButton className="block w-full text-center bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(63,185,80,0.4)] active:scale-[0.98]">
              Empieza gratis 7 días
            </CheckoutButton>

            <p className="text-center text-[#8B949E] text-xs mt-3">
              Cancela en cualquier momento. Sin permanencia.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
