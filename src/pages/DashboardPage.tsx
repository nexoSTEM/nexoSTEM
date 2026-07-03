import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { branches } from '@/data/branches'
import { useI18n } from '@/i18n'
import { useAuth } from '@/contexts/AuthContext'
import AppNav from '@/components/AppNav'
import CheckoutButton from '@/components/CheckoutButton'

const mockProgress: Record<string, number> = {
  fisica: 35,
  matematicas: 52,
  ingenieria: 18,
}

const mockRecentLessons = [
  { id: 'grav-01', title: 'Ley de gravitacion universal', branchId: 'fisica', branchColor: '#58A6FF' },
  { id: 'cd-01', title: 'Concepto de derivada', branchId: 'matematicas', branchColor: '#3FB950' },
  { id: 'ce-01', title: 'Ley de Coulomb', branchId: 'fisica', branchColor: '#58A6FF' },
]

function getSubscriptionCopy(
  status: 'trialing' | 'active' | 'expired' | 'none',
  trialEndsAt: string | null,
  t: (path: string) => string
) {
  if (status === 'trialing' && trialEndsAt) {
    const daysLeft = Math.max(
      0,
      Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    )
    return {
      dotColor: '#3FB950',
      label: t('dashboard.activePlan'),
      title: t('dashboard.freeTrial'),
      detail: `${daysLeft} ${t('dashboard.daysLeft')}`,
      progressPct: Math.min(100, Math.round(((7 - daysLeft) / 7) * 100)),
    }
  }
  if (status === 'active') {
    return {
      dotColor: '#3FB950',
      label: t('dashboard.activePlan'),
      title: t('dashboard.premium'),
      detail: 'NexoSTEM Completo · €7.99/mes',
      progressPct: 100,
    }
  }
  if (status === 'expired') {
    return {
      dotColor: '#F85149',
      label: 'Suscripcion',
      title: 'Prueba finalizada',
      detail: 'Tu periodo de prueba ha terminado.',
      progressPct: 100,
    }
  }
  return {
    dotColor: '#8B949E',
    label: 'Sin suscripcion',
    title: 'Plan gratuito',
    detail: 'Empieza tu prueba gratis de 7 dias.',
    progressPct: 0,
  }
}

export default function DashboardPage() {
  const { t } = useI18n()
  const { user, subscription } = useAuth()

  const overallProgress = Math.round(
    Object.values(mockProgress).reduce((a, b) => a + b, 0) / Object.keys(mockProgress).length
  )

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'Usuario'

  const subCopy = getSubscriptionCopy(subscription.status, subscription.trialEndsAt, t)
  const showUpgradeCta = subscription.status !== 'active'

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC]">
      <AppNav />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              {t('dashboard.welcome')}, <span className="text-[#3FB950]">{displayName}</span>
            </h1>
            <p className="text-[#8B949E] text-base">
              {t('dashboard.overallProgress')}: {overallProgress}%
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress per branch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <h2 className="text-lg font-semibold mb-4">{t('dashboard.progress')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {branches.map(branch => {
                  const progress = mockProgress[branch.id] || 0
                  return (
                    <Link
                      key={branch.id}
                      to={`/explorar?rama=${branch.slug}`}
                      className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 hover:bg-[#1C2128] transition-all duration-200 no-underline group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold" style={{ color: branch.color }}>
                          {branch.name}
                        </span>
                        <span className="text-[#8B949E] text-xs">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#0D1117] rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: branch.color }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8B949E] text-xs">
                          {Math.round(branch.subBranches.reduce((s, sb) => s + sb.lessonCount, 0) * progress / 100)} / {branch.subBranches.reduce((s, sb) => s + sb.lessonCount, 0)} {t('dashboard.lessonsCompleted')}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#30363D] group-hover:text-[#8B949E] transition-colors">
                          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            {/* Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-4">{t('dashboard.subscription')}</h2>
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: subCopy.dotColor }} />
                  <span className="text-sm font-medium">{subCopy.label}</span>
                </div>
                <h3 className="text-[#F0F6FC] font-bold text-lg mb-1">{subCopy.title}</h3>
                <p className="text-[#8B949E] text-sm mb-4">{subCopy.detail}</p>
                <div className="w-full h-1.5 bg-[#0D1117] rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${subCopy.progressPct}%`, background: subCopy.dotColor }}
                  />
                </div>
                {showUpgradeCta && (
                  <CheckoutButton className="block w-full text-center bg-[#3FB950] hover:bg-[#46c95a] text-[#0D1117] font-bold text-sm py-2.5 rounded-lg transition-all duration-200 no-underline">
                    {t('dashboard.premium')}
                  </CheckoutButton>
                )}
              </div>
            </motion.div>
          </div>

          {/* Recent lessons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8"
          >
            <h2 className="text-lg font-semibold mb-4">{t('dashboard.recentLessons')}</h2>
            {mockRecentLessons.length > 0 ? (
              <div className="flex flex-col gap-3">
                {mockRecentLessons.map(lesson => (
                  <Link
                    key={lesson.id}
                    to={`/leccion/${lesson.id}`}
                    className="group flex items-center gap-4 bg-[#161B22] border border-[#30363D] rounded-xl p-4 hover:bg-[#1C2128] transition-all duration-200 no-underline"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${lesson.branchColor}18`, color: lesson.branchColor }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 6l4 3-4 3V6Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#F0F6FC] font-medium text-sm">{lesson.title}</h4>
                      <span className="text-xs" style={{ color: lesson.branchColor }}>
                        {branches.find(b => b.id === lesson.branchId)?.name}
                      </span>
                    </div>
                    <span
                      className="text-xs font-medium flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                      style={{ color: lesson.branchColor }}
                    >
                      {t('dashboard.continueLesson')}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 text-center">
                <p className="text-[#8B949E] text-sm mb-3">{t('dashboard.noRecent')}</p>
                <Link
                  to="/explorar"
                  className="text-[#3FB950] text-sm font-medium hover:underline no-underline"
                >
                  {t('dashboard.startExploring')}
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
