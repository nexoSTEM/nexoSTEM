import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { Session, User, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export type SubscriptionStatus = 'trialing' | 'active' | 'expired' | 'none'

export interface SubscriptionMeta {
  status: SubscriptionStatus
  trialEndsAt: string | null
  stripeCustomerId: string | null
}

interface AuthResult {
  error: AuthError | Error | null
}

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  subscription: SubscriptionMeta
  signUp: (email: string, password: string, name?: string) => Promise<AuthResult>
  signIn: (email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<AuthResult>
  startTrial: () => Promise<AuthResult>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TRIAL_DAYS = 7

function readSubscription(user: User | null): SubscriptionMeta {
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>
  const trialEndsAt = (meta.trial_ends_at as string) || null
  const stripeCustomerId = (meta.stripe_customer_id as string) || null
  let status = (meta.subscription_status as SubscriptionStatus) || 'none'

  if (status === 'trialing' && trialEndsAt) {
    if (new Date(trialEndsAt).getTime() < Date.now()) {
      status = 'expired'
    }
  }

  return { status, trialEndsAt, stripeCustomerId }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: name ? { full_name: name } : undefined,
        emailRedirectTo: `${window.location.origin}/login`,
      },
    })
    return { error }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    return { error }
  }, [])

  const startTrial = useCallback(async () => {
    const trialEndsAt = new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000).toISOString()
    const { data, error } = await supabase.auth.updateUser({
      data: {
        subscription_status: 'trialing',
        trial_ends_at: trialEndsAt,
      },
    })
    if (data.user) setUser(data.user)
    return { error }
  }, [])

  const value: AuthContextValue = {
    user,
    session,
    loading,
    subscription: readSubscription(user),
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    startTrial,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
