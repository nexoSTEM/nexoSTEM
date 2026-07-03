import { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getLesson, getLessonsBySubBranch } from '@/data/lessons'
import { getBranch } from '@/data/branches'
import { useI18n } from '@/i18n'
import AppNav from '@/components/AppNav'

export default function LessonPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useI18n()

  const lesson = useMemo(() => (id ? getLesson(id) : undefined), [id])
  const branch = useMemo(() => (lesson ? getBranch(lesson.branchId) : undefined), [lesson])
  const siblingLessons = useMemo(
    () => lesson ? getLessonsBySubBranch(lesson.branchId, lesson.subBranchId) : [],
    [lesson]
  )

  const currentIndex = siblingLessons.findIndex(l => l.id === id)
  const prevLesson = currentIndex > 0 ? siblingLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < siblingLessons.length - 1 ? siblingLessons[currentIndex + 1] : null

  if (!lesson || !branch) {
    return (
      <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC]">
        <AppNav />
        <div className="pt-24 text-center">
          <p className="text-[#8B949E]">{t('common.error')}</p>
          <Link to="/explorar" className="text-[#3FB950] text-sm mt-4 inline-block hover:underline">
            {t('lesson.backToExplorer')}
          </Link>
        </div>
      </div>
    )
  }

  const subBranch = branch.subBranches.find(sb => sb.id === lesson.subBranchId)

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC]">
      <AppNav />
      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-[#30363D] h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
          <div className="p-4">
            <button
              onClick={() => navigate(`/explorar?rama=${branch.slug}&sub=${subBranch?.slug || ''}`)}
              className="flex items-center gap-2 text-[#8B949E] hover:text-[#F0F6FC] text-xs mb-4 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 6H2M2 6l3-3M2 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('lesson.backToExplorer')}
            </button>
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: branch.color }}>
                {branch.name}
              </span>
              {subBranch && (
                <h3 className="text-[#F0F6FC] font-semibold text-sm mt-1">{subBranch.name}</h3>
              )}
            </div>
            <nav className="flex flex-col gap-1">
              {siblingLessons.map(sl => (
                <Link
                  key={sl.id}
                  to={`/leccion/${sl.id}`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 no-underline ${
                    sl.id === id
                      ? 'bg-[#1C2128] text-[#F0F6FC] font-medium'
                      : 'text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#161B22]'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={sl.id === id
                      ? { background: `${branch.color}25`, color: branch.color }
                      : { background: '#161B22', color: '#8B949E' }
                    }
                  >
                    {sl.order}
                  </span>
                  <span className="truncate">{sl.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-[#8B949E] mb-6 flex-wrap">
              <Link to="/explorar" className="hover:text-[#F0F6FC] transition-colors no-underline text-[#8B949E]">
                {t('explorer.allBranches')}
              </Link>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#30363D]">
                <path d="M3 1.5l3.5 3.5L3 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Link
                to={`/explorar?rama=${branch.slug}`}
                className="hover:text-[#F0F6FC] transition-colors no-underline text-[#8B949E]"
              >
                {branch.name}
              </Link>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#30363D]">
                <path d="M3 1.5l3.5 3.5L3 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {subBranch && (
                <>
                  <Link
                    to={`/explorar?rama=${branch.slug}&sub=${subBranch.slug}`}
                    className="hover:text-[#F0F6FC] transition-colors no-underline text-[#8B949E]"
                  >
                    {subBranch.name}
                  </Link>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#30363D]">
                    <path d="M3 1.5l3.5 3.5L3 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
              <span className="text-[#F0F6FC]">{lesson.title}</span>
            </nav>

            {/* Title */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
                  style={{ color: branch.color, background: `${branch.color}15` }}
                >
                  {branch.name}
                </span>
                <span className="text-[#8B949E] text-xs">{lesson.duration}</span>
                <span className="text-[#30363D]">|</span>
                <span className="text-[#8B949E] text-xs capitalize">{lesson.difficulty}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">{lesson.title}</h1>
            </div>

            {/* SubLessons */}
            {lesson.subLessons.length > 0 && (
              <section className="mb-10">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 4h12M3 9h12M3 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {t('lesson.contents')}
                </h2>
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl divide-y divide-[#30363D]">
                  {lesson.subLessons
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map(sub => (
                      <div key={sub.id} className="flex items-center gap-3 p-4">
                        <span
                          className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: `${branch.color}18`, color: branch.color }}
                        >
                          {sub.order}
                        </span>
                        <span className="text-[#C9D1D9] text-sm">{sub.title}</span>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Theory */}
            {lesson.theory && (
              <section className="mb-10">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 4h12M3 9h12M3 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {t('lesson.theory')}
                </h2>
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
                  {lesson.theory.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-[#C9D1D9] text-sm leading-relaxed mb-4 last:mb-0 whitespace-pre-wrap font-[family-name:var(--font-body)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            )}

          </div>

            {/* Interactive widget */}
            {lesson.widgetFile ? (
              <section className="mb-10">
                <iframe
                  src={lesson.widgetFile}
                  title={lesson.title}
                  className="w-full h-[70vh] sm:h-[calc(100vh-120px)] border-0"
                  sandbox="allow-scripts allow-same-origin"
                />
              </section>
            ) : (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="mb-10">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 6l4 3-4 3V6Z" fill="currentColor"/>
                    </svg>
                    {t('lesson.simulation')}
                  </h2>
                  <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 text-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto mb-3 text-[#30363D]">
                      <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M15 13l10 7-10 7V13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[#8B949E] text-sm">{t('lesson.noWidget')}</p>
                  </div>
                </section>
              </div>
            )}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Prev / Next */}
            <div className="flex items-center justify-between pt-6 border-t border-[#30363D]">
              {prevLesson ? (
                <Link
                  to={`/leccion/${prevLesson.id}`}
                  className="flex items-center gap-2 text-[#8B949E] hover:text-[#F0F6FC] text-sm transition-colors no-underline"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12 7H2M2 7l4-4M2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {prevLesson.title}
                </Link>
              ) : <div />}
              {nextLesson ? (
                <Link
                  to={`/leccion/${nextLesson.id}`}
                  className="flex items-center gap-2 text-sm font-medium transition-colors no-underline"
                  style={{ color: branch.color }}
                >
                  {nextLesson.title}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ) : <div />}
            </div>

            {/* Mobile sidebar toggle */}
            <div className="lg:hidden mt-8 border-t border-[#30363D] pt-6">
              <h3 className="text-sm font-semibold mb-3">{subBranch?.name}</h3>
              <div className="flex flex-col gap-1">
                {siblingLessons.map(sl => (
                  <Link
                    key={sl.id}
                    to={`/leccion/${sl.id}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm no-underline ${
                      sl.id === id
                        ? 'bg-[#1C2128] text-[#F0F6FC] font-medium'
                        : 'text-[#8B949E] hover:text-[#F0F6FC]'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={sl.id === id
                        ? { background: `${branch.color}25`, color: branch.color }
                        : { background: '#161B22', color: '#8B949E' }
                      }
                    >
                      {sl.order}
                    </span>
                    {sl.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
