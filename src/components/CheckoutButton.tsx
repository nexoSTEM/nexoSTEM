import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { buildCheckoutUrl, getStripePaymentLink } from '@/lib/checkout'

interface CheckoutButtonProps {
  className: string
  children: React.ReactNode
}

export default function CheckoutButton({ className, children }: CheckoutButtonProps) {
  const { user, startTrial } = useAuth()
  const navigate = useNavigate()

  async function handleClick() {
    if (!user) {
      navigate('/registro', { state: { checkout: true } })
      return
    }

    const checkoutUrl = buildCheckoutUrl(user)
    if (checkoutUrl) {
      window.location.href = checkoutUrl
      return
    }

    // Fallback while the Stripe Payment Link isn't configured yet
    // (VITE_STRIPE_PAYMENT_LINK missing): start the trial locally so the
    // user isn't blocked, and send them to the dashboard.
    await startTrial()
    navigate('/dashboard')
  }

  const paymentLinkMissing = !getStripePaymentLink()

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
      {paymentLinkMissing && user && (
        <span className="sr-only"> (modo de prueba local, checkout de Stripe no configurado)</span>
      )}
    </button>
  )
}
