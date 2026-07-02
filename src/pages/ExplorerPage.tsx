import { useMemo, type ReactElement } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { branches, type Branch, type SubBranch } from '@/data/branches'
import { getLessonsBySubBranch, getFirstLessonOfSubBranch } from '@/data/lessons'
import { useI18n } from '@/i18n'
import AppNav from '@/components/AppNav'

const branchIcons: Record<string, ReactElement> = {
  fisica: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 16c4-6 8-6 12 0s8 6 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
    </svg>
  ),
  matematicas: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M4 16h24M16 4v24M8 8l16 16M24 8L8 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  ingenieria: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="12" width="24" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 12V8M16 12V6M22 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 20v4M16 20v6M22 20v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
}

export default function ExplorerPage() {
  const { t } = useI18n()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedBranchSlug = searchParams.get('rama') || null
  const selectedSubSlug = searchParams.get('sub') || null

  const selectedBranch = useMemo(
    () => branches.find(b => b.slug === selectedBranchSlug) || null,
    [selectedBranchSlug]
  )

  const selectedSub = useMemo(
    () => selectedBranch?.subBranches.find(sb => sb.slug === selectedSubSlug) || null,
    [selectedBranch, selectedSubSlug]
  )

  const subLessons = useMemo(
    () => selectedBranch && selectedSub
      ? getLessonsBySubBranch(selectedBranch.id, selectedSub.id)
      : [],
    [selectedBranch, selectedSub]
  )

  function selectBranch(b: Branch) {
    setSearchParams({ rama: b.slug })
  }

  function selectSub(sb: SubBranch) {
    if (selectedBranch) {
      setSearchParams({ rama: selectedBranch.slug, sub: sb.slug })
    }
  }

  function goBack() {
    if (selectedSub) {
      setSearchParams(selectedBranch ? { rama: selectedBranch.slug } : {})
    } else if (selectedBranch) {
      setSearchParams({})
    }
  }

  // Breadcrumb
  const crumbs: { label: string; onClick?: () => void }[] = [
    { label: t('explorer.allBranches'), onClick: () => setSearchParams({}) },
  ]
  if (selectedBranch) {
    crumbs.push({
      label: selectedBranch.name,
      onClick: selectedSub ? () => setSearchParams({ rama: selectedBranch.slug }) : undefined,
    })
  }
  if (selectedSub) {
    crumbs.push({ label: selectedSub.name })
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC]">
      <AppNav />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 flex-wrap">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#30363D]">
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {c.onClick ? (
                  <button
                    onClick={c.onClick}
                    className="text-[#8B949E] hover:text-[#F0F6FC] transition-colors"
                  >
                    {c.label}
                  </button>
                ) : (
                  <span className="text-[#F0F6FC] font-medium">{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          {/* Back button when drilled in */}
          {selectedBranch && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-[#8B949E] hover:text-[#F0F6FC] text-sm mb-6 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7H2M2 7l4-4M2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('explorer.back')}
            </button>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              {selectedSub
                ? selectedSub.name
                : selectedBranch
                  ? selectedBranch.name
                  : t('explorer.title')}
            </h1>
            <p className="text-[#8B949E] text-base max-w-xl">
              {selectedSub
                ? `${subLessons.length} ${t('explorer.lessons')}`
                : selectedBranch
                  ? selectedBranch.description
                  : t('explorer.subtitle')}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Level 1: All branches */}
            {!selectedBranch && (
              <motion.div
                key="branches"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {branches.map((branch, i) => (
                  <motion.button
                    key={branch.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    onClick={() => selectBranch(branch)}
                    className="group relative bg-[#161B22] border border-[#30363D] rounded-xl p-6 hover:bg-[#1C2128] transition-all duration-300 text-left"
                    style={{ '--bc': branch.color } as React.CSSProperties}
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                      style={{ background: `${branch.color}18`, color: branch.color }}
                    >
                      {branchIcons[branch.id]}
                    </div>
                    <h3 className="text-[#F0F6FC] font-bold text-xl mb-2">{branch.name}</h3>
                    <p className="text-[#8B949E] text-sm leading-relaxed mb-4">{branch.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {branch.subBranches.slice(0, 3).map(sb => (
                        <span
                          key={sb.id}
                          className="text-xs px-2 py-0.5 rounded-full border"
                          style={{ color: branch.color, borderColor: `${branch.color}30`, background: `${branch.color}10` }}
                        >
                          {sb.name}
                        </span>
                      ))}
                      {branch.subBranches.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full border border-[#30363D] text-[#8B949E]">
                          +{branch.subBranches.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8B949E] text-xs">
                        {branch.subBranches.reduce((s, sb) => s + sb.lessonCount, 0)} {t('explorer.lessons')}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs font-medium transition-all duration-200 group-hover:gap-2"
                        style={{ color: branch.color }}
                      >
                        {t('explorer.explore')}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${branch.color}, transparent)` }}
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Level 2: Sub-branches */}
            {selectedBranch && !selectedSub && (
              <motion.div
                key="subbranches"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {selectedBranch.subBranches.map((sb, i) => {
                  const firstLesson = getFirstLessonOfSubBranch(selectedBranch.id, sb.id)
                  return (
                    <motion.button
                      key={sb.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      onClick={() => selectSub(sb)}
                      className="group bg-[#161B22] border border-[#30363D] rounded-xl p-5 hover:bg-[#1C2128] transition-all duration-200 text-left"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                          style={{ background: `${selectedBranch.color}18`, color: selectedBranch.color }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="text-[#F0F6FC] font-semibold">{sb.name}</h3>
                          <span className="text-[#8B949E] text-xs">{sb.lessonCount} {t('explorer.lessons')}</span>
                        </div>
                      </div>
                      {firstLesson && (
                        <p className="text-[#8B949E] text-xs mb-3 line-clamp-2">
                          {firstLesson.title}
                        </p>
                      )}
                      <span
                        className="flex items-center gap-1 text-xs font-medium transition-all duration-200 group-hover:gap-2"
                        style={{ color: selectedBranch.color }}
                      >
                        {t('explorer.explore')}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </motion.button>
                  )
                })}
              </motion.div>
            )}

            {/* Level 3: Lessons list */}
            {selectedBranch && selectedSub && (
              <motion.div
                key="lessons"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3 max-w-2xl"
              >
                {subLessons.length === 0 && (
                  <p className="text-[#8B949E] text-sm">{t('explorer.selectSubBranchDesc')}</p>
                )}
                {subLessons.map((lesson, i) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link
                      to={`/leccion/${lesson.id}`}
                      className="group flex items-center gap-4 bg-[#161B22] border border-[#30363D] rounded-xl p-4 hover:bg-[#1C2128] hover:border-[#30363D]/80 transition-all duration-200 no-underline"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                        style={{ background: `${selectedBranch.color}18`, color: selectedBranch.color }}
                      >
                        {lesson.order}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#F0F6FC] font-semibold text-sm mb-1">{lesson.title}</h4>
                        <div className="flex items-center gap-3 text-[#8B949E] text-xs">
                          <span>{lesson.duration}</span>
                          <span className="text-[#30363D]">|</span>
                          <span className="capitalize">{lesson.difficulty}</span>
                          {lesson.widgetFile && (
                            <>
                              <span className="text-[#30363D]">|</span>
                              <span style={{ color: selectedBranch.color }}>{t('lesson.simulation')}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-[#30363D] group-hover:text-[#8B949E] transition-colors">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
