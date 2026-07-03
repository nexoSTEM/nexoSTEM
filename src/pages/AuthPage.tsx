import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n'
import { useAuth } from '@/contexts/AuthContext'
import { buildCheckoutUrl } from '@/lib/checkout'
import AppNav from '@/components/AppNav'

export default function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === '/login'
  const { t } = useI18n()
  const { signIn, signUp, signInWithGoogle, startTrial, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)

  const wantsCheckout = Boolean((location.state as { checkout?: boolean } | null)?.checkout)

  useEffect(() => {
    setError(null)
    setInfoMessage(null)
  }, [isLogin])

  useEffect(() => {
    if (user) {
      if (wantsCheckout) {
        const checkoutUrl = buildCheckoutUrl(user)
        if (checkoutUrl) {
          window.location.href = checkoutUrl
          return
        }
        startTrial().finally(() => navigate('/dashboard', { replace: true }))
        return
      }
      const from = (location.state as { from?: string } | null)?.from
      navigate(from || '/dashboard', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  function mapAuthError(message: string): string {
    if (message.includes('Invalid login credentials')) {
      return isLogin ? 'Correo o contraseña incorrectos.' : message
    }
    if (message.includes('already registered') || message.includes('already been registered')) {
      return 'Ya existe una cuenta con este correo. Inicia sesión.'
    }
    if (message.includes('Password should be at least')) {
      return 'La contraseña debe tener al menos 6 caracteres.'
    }
    if (message.includes('Unable to validate email address') || message.includes('invalid')) {
      return 'El correo electrónico no es válido.'
    }
    return message
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setInfoMessage(null)

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.')
        return
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.')
        return
      }
    }

    setLoading(true)
    try {
      if (isLogin) {
        const { error: signInError } = await signIn(email, password)
        if (signInError) {
          setError(mapAuthError(signInError.message))
        }
      } else {
        const { error: signUpError } = await signUp(email, password, name)
        if (signUpError) {
          setError(mapAuthError(signUpError.message))
        } else {
          setInfoMessage('Cuenta creada. Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError(null)
    setGoogleLoading(true)
    const { error: googleError } = await signInWithGoogle()
    if (googleError) {
      setError(mapAuthError(googleError.message))
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC]">
      <AppNav />
      <main className="pt-24 pb-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 no-underline">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="6" fill="#0D1117" stroke="#30363D" strokeWidth="1"/>
                <path d="M7 22V10h2.8l4.2 7.2V10H17v12h-2.8L10 14.8V22H7Z" fill="#F0F6FC"/>
                <path d="M19 22V10h6v2.4h-3.2v2.4h3v2.3h-3v2.5H25V22h-6Z" fill="#3FB950"/>
              </svg>
              <span className="text-[#F0F6FC] font-bold text-lg">
                Nexo<span className="text-[#3FB950]">STEM</span>
              </span>
            </Link>
          </div>

          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8">
            <h1 className="text-xl font-bold text-center mb-6">
              {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
            </h1>

            {error && (
              <div className="mb-4 rounded-lg border border-[#F85149]/40 bg-[#F85149]/10 px-4 py-3 text-sm text-[#F85149]">
                {error}
              </div>
            )}
            {infoMessage && (
              <div className="mb-4 rounded-lg border border-[#3FB950]/40 bg-[#3FB950]/10 px-4 py-3 text-sm text-[#3FB950]">
                {infoMessage}
              </div>
            )}

            {/* Google OAuth */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-3 text-sm font-medium text-[#F0F6FC] hover:bg-[#1C2128] hover:border-[#8B949E] transition-all duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              {googleLoading ? t('common.loading') : t('auth.googleBtn')}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#30363D]" />
              <span className="text-[#8B949E] text-xs uppercase">{t('auth.or')}</span>
              <div className="flex-1 h-px bg-[#30363D]" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div>
                  <label className="block text-[#C9D1D9] text-sm font-medium mb-1.5">
                    {t('auth.name')}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-2.5 text-sm text-[#F0F6FC] placeholder-[#484F58] focus:outline-none focus:border-[#3FB950] focus:ring-1 focus:ring-[#3FB950]/30 transition-all duration-200"
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-[#C9D1D9] text-sm font-medium mb-1.5">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-2.5 text-sm text-[#F0F6FC] placeholder-[#484F58] focus:outline-none focus:border-[#3FB950] focus:ring-1 focus:ring-[#3FB950]/30 transition-all duration-200"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[#C9D1D9] text-sm font-medium">
                    {t('auth.password')}
                  </label>
                  {isLogin && (
                    <a href="#" className="text-[#3FB950] text-xs hover:underline">
                      {t('auth.forgotPassword')}
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-2.5 text-sm text-[#F0F6FC] placeholder-[#484F58] focus:outline-none focus:border-[#3FB950] focus:ring-1 focus:ring-[#3FB950]/30 transition-all duration-200"
                  placeholder="********"
                  minLength={6}
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-[#C9D1D9] text-sm font-medium mb-1.5">
                    {t('auth.confirmPassword')}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-2.5 text-sm text-[#F0F6FC] placeholder-[#484F58] focus:outline-none focus:border-[#3FB950] focus:ring-1 focus:ring-[#3FB950]/30 transition-all duration-200"
                    placeholder="********"
                    minLength={6}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] font-bold py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(63,185,80,0.4)] active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {loading ? t('common.loading') : (isLogin ? t('auth.loginBtn') : t('auth.registerBtn'))}
              </button>
            </form>

            {!isLogin && (
              <p className="text-[#8B949E] text-xs text-center mt-4 leading-relaxed">
                {t('auth.terms')}
              </p>
            )}
          </div>

          {/* Toggle */}
          <p className="text-center text-sm text-[#8B949E] mt-6">
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
            <Link
              to={isLogin ? '/registro' : '/login'}
              className="text-[#3FB950] font-medium hover:underline no-underline"
            >
              {isLogin ? t('auth.goRegister') : t('auth.goLogin')}
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  )
}
