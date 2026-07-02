import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Explorar', href: '#explorar' },
    { label: 'Rutas de aprendizaje', href: '#rutas' },
    { label: 'Simulaciones', href: '#simulaciones' },
    { label: 'Precios', href: '#precios' },
    { label: 'Sobre nosotros', href: '#nosotros' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0D1117]/95 backdrop-blur-md border-b border-[#30363D]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="6" fill="#0D1117" stroke="#30363D" strokeWidth="1"/>
              <path d="M7 22V10h2.8l4.2 7.2V10H17v12h-2.8L10 14.8V22H7Z" fill="#F0F6FC"/>
              <path d="M19 22V10h6v2.4h-3.2v2.4h3v2.3h-3v2.5H25V22h-6Z" fill="#3FB950"/>
            </svg>
            <span className="text-[#F0F6FC] font-bold text-lg tracking-tight">
              Nexo<span className="text-[#3FB950]">STEM</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-[#8B949E] hover:text-[#F0F6FC] text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#login"
              className="text-[#8B949E] hover:text-[#F0F6FC] text-sm font-medium transition-colors duration-200 px-3 py-2"
            >
              Iniciar sesión
            </a>
            <a
              href="#registro"
              className="bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 hover:shadow-[0_0_16px_rgba(63,185,80,0.4)]"
            >
              Regístrate
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-[#8B949E] hover:text-[#F0F6FC] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <>
                  <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden bg-[#161B22] border-b border-[#30363D] px-4 pb-4"
          >
            <nav className="flex flex-col gap-1 pt-2">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#8B949E] hover:text-[#F0F6FC] text-sm font-medium py-2.5 px-2 rounded-md hover:bg-[#1C2128] transition-all duration-150"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#30363D]">
                <a href="#login" className="text-[#8B949E] text-sm font-medium py-2.5 px-2 text-center">
                  Iniciar sesión
                </a>
                <a
                  href="#registro"
                  className="bg-[#3FB950] text-[#0D1117] text-sm font-semibold py-2.5 px-4 rounded-md text-center"
                >
                  Regístrate gratis
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
