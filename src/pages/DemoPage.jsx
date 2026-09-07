import { useState, useEffect, useId } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, Check } from 'lucide-react'
import SEO from '../components/seo/SEO'
import Breadcrumb from '../components/seo/Breadcrumb'
import GlowBadge from '../components/ui/GlowBadge'
import GradientButton from '../components/ui/GradientButton'
import ReifyCard from '../components/ui/ReifyCard'
import BookingEmbed from '../components/BookingEmbed'
import { BOOKING } from '../lib/site'
import {
  organizationSchema,
  webPageSchema,
  breadcrumbSchema,
} from '../lib/schema'

const PRODUCT_OPTIONS = [
  { id: 'ap', label: 'Accounts Payable' },
  { id: 'fpa', label: 'FP&A' },
  { id: 'pnl-auto-track', label: 'P&L Auto Track' },
  { id: 'revrecog', label: 'RevRecog AI' },
  { id: 'custom', label: 'Something else — tell us what you need' },
]

// Map URL ?product= param to product label
const PRODUCT_PARAM_MAP = {
  'accounts-payable-automation': 'Accounts Payable',
  'accounts-payable': 'Accounts Payable',
  'ap': 'Accounts Payable',
  'fpa': 'FP&A',
  'pnl-auto-track': 'P&L Auto Track',
  'revenue-recognition-automation': 'RevRecog AI',
  'revrecog': 'RevRecog AI',
  'custom': null, // show checkboxes
}

export default function DemoPage() {
  const [searchParams] = useSearchParams()
  const fieldId = useId()
  // idle → sending → sent | error. We only ever show the thank-you card on
  // 'sent', i.e. after Netlify has actually accepted the submission.
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [selected, setSelected] = useState({})
  const [botField, setBotField] = useState('')

  const productParam = searchParams.get('product')

  // Reset form when URL changes (e.g., navigating from AP demo → "& many more")
  useEffect(() => {
    setStatus('idle')
    setForm({ name: '', email: '', message: '' })
    setSelected({})
    setBotField('')
  }, [productParam])

  // Three modes:
  // 1. /demo (no param) → show checkboxes
  // 2. /demo?product=ap (specific product) → no checkboxes, locked to that product
  // 3. /demo?product=custom ("& many more") → no checkboxes, just simple form
  const isCustom = productParam === 'custom'
  const lockedProduct = productParam && !isCustom && PRODUCT_PARAM_MAP[productParam]
    ? PRODUCT_PARAM_MAP[productParam]
    : null
  const showCheckboxes = !lockedProduct && !isCustom

  const path = '/demo'
  const items = [
    { name: 'Home', path: '/' },
    { name: 'Book a Call', path },
  ]

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const toggleProduct = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const selectedProducts = lockedProduct
      ? lockedProduct
      : isCustom
        ? 'Custom request'
        : PRODUCT_OPTIONS.filter((p) => selected[p.id]).map((p) => p.label).join(', ')

    const subject = selectedProducts
      ? `New inquiry — ${selectedProducts}`
      : 'New inquiry from finmark.ai'

    const formData = new URLSearchParams({
      'form-name': 'demo',
      'bot-field': botField,
      subject,
      name: form.name,
      email: form.email,
      products: selectedProducts || 'None selected',
      message: form.message,
    })

    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })
      // fetch only rejects on a network failure — a 404 or 500 still resolves.
      // Without this check a dropped lead would look identical to a delivered one.
      if (!res.ok) throw new Error(`Netlify form POST returned ${res.status}`)
      setStatus('sent')
    } catch (err) {
      console.error('Demo form submission failed:', err)
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Book a Call — FinMark.ai"
        description="Tell us your problem. We'll figure out how to solve it. Book a call with the FinMark.ai team."
        path={path}
        schema={[
          organizationSchema(),
          webPageSchema({
            title: 'Book a Call — FinMark.ai',
            description: 'Tell us your problem. Book a call with the FinMark.ai team.',
            path,
          }),
          breadcrumbSchema(items),
        ]}
      />
      <Breadcrumb items={items} />

      <section className="relative overflow-hidden pt-12 pb-20 sm:pb-28">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="glow-orb w-[700px] h-[700px] bg-electric/8 -top-40 -right-40" />
        <div className="glow-orb w-[500px] h-[500px] bg-purple/8 -bottom-32 -left-32" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="mb-6 inline-flex"
            >
              <GlowBadge>
                <span className="inline-flex items-center gap-2">
                  <Sparkles size={12} />
                  Let's talk
                </span>
              </GlowBadge>
            </div>
            <h1
              className="font-display text-[2.25rem] sm:text-5xl md:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.05]"
            >
              Book a <span className="gradient-text">call</span>
            </h1>
            <p
              className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto"
            >
              {BOOKING.url
                ? 'Grab a slot, or send us a message and we\'ll come back to you.'
                : "Tell us your problem and let's figure out how to solve it."}
            </p>
          </div>

          {/* Two columns so both routes are visible at once. Stacked, the form
              sat below a 900px calendar and nobody scrolled to it. The calendar
              gets the wider column because Google's UI cramps below ~600px.
              Falls back to a single centred form when no scheduler is set. */}
          <div
            className={
              BOOKING.url
                ? 'grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start'
                : ''
            }
          >
            {BOOKING.url && (
              <div>
                <div className="mb-5">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {BOOKING.heading}
                  </h2>
                  {BOOKING.subhead && (
                    <p className="mt-2 text-sm text-gray-400">{BOOKING.subhead}</p>
                  )}
                </div>
                <BookingEmbed />
              </div>
            )}

            <div>
              {BOOKING.url && (
                <div className="mb-5">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    Rather send a message?
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    Tell us what you need and we&apos;ll come back to you.
                  </p>
                </div>
              )}

          <ReifyCard className={BOOKING.url ? 'rounded-2xl' : 'rounded-2xl max-w-lg mx-auto'}>
            <div className="p-8">
              {status === 'sent' ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-electric to-purple flex items-center justify-center mb-5">
                    <Check size={28} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-3">
                    We'll be in touch shortly.
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Someone from the FinMark.ai team will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Netlify honeypot — invisible to people, bots fill it in and
                      Netlify silently discards those submissions. */}
                  <p className="hidden">
                    <label>
                      Leave this field empty
                      <input
                        name="bot-field"
                        tabIndex={-1}
                        autoComplete="off"
                        value={botField}
                        onChange={(e) => setBotField(e.target.value)}
                      />
                    </label>
                  </p>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-500/30 bg-red-500/[0.08] px-4 py-3 text-sm text-red-200"
                    >
                      That didn't send. Please try again, or email us directly at{' '}
                      <a
                        href="mailto:admin@finmark.ai"
                        className="underline hover:text-white"
                      >
                        admin@finmark.ai
                      </a>
                      .
                    </div>
                  )}

                  <div>
                    <label htmlFor={`${fieldId}-name`} className="block text-xs font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id={`${fieldId}-name`}
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 focus:border-electric/50 focus:bg-white/[0.05] focus:outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${fieldId}-email`} className="block text-xs font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id={`${fieldId}-email`}
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 focus:border-electric/50 focus:bg-white/[0.05] focus:outline-none transition-all"
                      placeholder="you@company.com"
                    />
                  </div>

                  {/* Product selection — only shown on /demo (no product param) or /demo?product=custom */}
                  {showCheckboxes && (
                    <div>
                      <span id={`${fieldId}-products`} className="block text-xs font-medium text-gray-400 mb-3">
                        What are you interested in?
                      </span>
                      <div role="group" aria-labelledby={`${fieldId}-products`} className="space-y-2">
                        {PRODUCT_OPTIONS.map((product) => (
                          <button
                            key={product.id}
                            type="button"
                            role="checkbox"
                            aria-checked={!!selected[product.id]}
                            onClick={() => toggleProduct(product.id)}
                            className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                              selected[product.id]
                                ? 'border-electric/50 bg-electric/[0.08] text-white'
                                : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-all ${
                                selected[product.id]
                                  ? 'border-electric bg-electric'
                                  : 'border-white/20'
                              }`}
                            >
                              {selected[product.id] && <Check size={10} className="text-white" />}
                            </div>
                            {product.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor={`${fieldId}-message`} className="block text-xs font-medium text-gray-400 mb-2">
                      Anything else? (optional)
                    </label>
                    <textarea
                      id={`${fieldId}-message`}
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 focus:border-electric/50 focus:bg-white/[0.05] focus:outline-none transition-all resize-none"
                      placeholder="Tell us more about what you need..."
                    />
                  </div>
                  <GradientButton
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full text-sm py-3 mt-2"
                  >
                    {status === 'sending' ? 'Sending…' : 'Book a call'}
                  </GradientButton>
                </form>
              )}
            </div>
          </ReifyCard>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
