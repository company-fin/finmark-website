import VideoEmbed from './VideoEmbed'
import GradientButton from './ui/GradientButton'
import { PRODUCTS } from '../lib/constants'
import { ArrowRight } from 'lucide-react'

/**
 * The product, on the homepage.
 *
 * Every comparable site — Vic.ai, Tipalti, Numeric, Puzzle, Digits, Mercury,
 * Modern Treasury — puts a video or product imagery on the homepage. This one
 * had three images total and no video, so a visitor could read the whole page
 * without ever seeing the software.
 *
 * Shows the flagship product's walkthrough: Accounts Payable is what is live
 * in production and what the rest of the site is built around. Renders nothing
 * if that product has no video configured, so it cannot leave an empty frame.
 */
export default function HomeVideo() {
  const flagship = PRODUCTS.find((p) => p.slug === 'accounts-payable-automation')
  const video = flagship?.intro?.video
  if (!video?.youtubeId) return null

  return (
    <section className="relative border-t border-white/5 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 font-medium">
            See it run
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Sixty-five invoices, posted to the ERP
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-gray-400 leading-relaxed">
            Goods, services, marketing — and one handwritten bill. Matched
            against purchase orders and goods-received notes, tax computed,
            duplicates caught, and anything that fails held back rather than
            pushed through. Nothing typed by hand.
          </p>
        </div>

        <VideoEmbed
          youtubeId={video.youtubeId}
          title={video.title}
          poster={video.poster}
        />

        <div className="mt-8 text-center">
          <GradientButton
            to={flagship.to}
            variant="outline"
            className="text-sm px-6 py-3 flex items-center gap-2 mx-auto"
          >
            More on {flagship.label} <ArrowRight size={14} />
          </GradientButton>
        </div>
      </div>
    </section>
  )
}
