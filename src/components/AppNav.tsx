import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n, type Locale } from '@/i18n'
import { useAuth } from '@/contexts/AuthContext'

export default function AppNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, locale, setLocale } = useI18n()
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const links = [
    { label: t('nav.explore'), to: '/explorar' },
    { label: t('nav.dashboard'), to: '/dashboard' },
  ]

  const isActive = (to: string) => location.pathname.startsWith(to)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0D1117]/95 backdrop-blur-md border-b border-[#30363D]' : 'bg-[#0D1117] border-b border-[#30363D]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group no-underline">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="#0D1117" stroke="#30363D" strokeWidth="1"/>
              <path d="M7 22V10h2.8l4.2 7.2V10H17v12h-2.8L10 14.8V22H7Z" fill="#F0F6FC"/>
              <path d="M19 22V10h6v2.4h-3.2v2.4h3v2.3h-3v2.5H25V22h-6Z" fill="#3FB950"/>
            </svg>
            <span className="text-[#F0F6FC] font-bold text-lg tracking-tight">
              Nexo<span className="text-[#3FB950]">STEM</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors duration-200 no-underline ${
                  isActive(l.to) ? 'text-[#F0F6FC]' : 'text-[#8B949E] hover:text-[#F0F6FC]'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center border border-[#30363D] rounded-md overflow-hidden">
              {(['es', 'en'] as Locale[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    locale === l
                      ? 'bg-[#1C2128] text-[#F0F6FC]'
                      : 'text-[#8B949E] hover:text-[#F0F6FC]'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {user ? (
              <button
                onClick={handleLogout}
                className="text-[#8B949E] hover:text-[#F0F6FC] text-sm font-medium transition-colors duration-200 px-3 py-2"
              >
                {t('nav.logout')}
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#8B949E] hover:text-[#F0F6FC] text-sm font-medium transition-colors duration-200 px-3 py-2 no-underline"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/registro"
                  className="bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 hover:shadow-[0_0_16px_rgba(63,185,80,0.4)] no-underline"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-[#8B949E] hover:text-[#F0F6FC] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm font-medium py-2.5 px-2 rounded-md transition-all duration-150 no-underline ${
                    isActive(l.to)
                      ? 'text-[#F0F6FC] bg-[#1C2128]'
                      : 'text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#1C2128]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              {/* Mobile language switcher */}
              <div className="flex items-center gap-2 px-2 py-2">
                {(['es', 'en'] as Locale[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-200 ${
                      locale === l
                        ? 'bg-[#1C2128] text-[#F0F6FC] border-[#30363D]'
                        : 'text-[#8B949E] border-transparent hover:text-[#F0F6FC]'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#30363D]">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="text-[#8B949E] text-sm font-medium py-2.5 px-2 text-center"
                  >
                    {t('nav.logout')}
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="text-[#8B949E] text-sm font-medium py-2.5 px-2 text-center no-underline">
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/registro"
                      className="bg-[#3FB950] text-[#0D1117] text-sm font-semibold py-2.5 px-4 rounded-md text-center no-underline"
                    >
                      {t('nav.register')}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
