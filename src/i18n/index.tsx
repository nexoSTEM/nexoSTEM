import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import es from './es.json'
import en from './en.json'

export type Locale = 'es' | 'en'

type Translations = typeof es

const translationMap: Record<Locale, Translations> = { es, en }

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (path: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem('nexostem-locale')
    return (stored === 'en' || stored === 'es') ? stored : 'es'
  })

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('nexostem-locale', l)
  }, [])

  const t = useCallback((path: string): string => {
    const keys = path.split('.')
    let current: unknown = translationMap[locale]
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key]
      } else {
        return path
      }
    }
    return typeof current === 'string' ? current : path
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
