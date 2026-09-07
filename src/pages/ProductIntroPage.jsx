import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import SEO from '../components/seo/SEO'
import Breadcrumb from '../components/seo/Breadcrumb'
import PillarFAQ from '../components/seo/PillarFAQ'
import VideoEmbed from '../components/VideoEmbed'
import GlowBadge from '../components/ui/GlowBadge'
import GradientButton from '../components/ui/GradientButton'
import { PRODUCTS } from '../lib/constants'
import { getClustersForPillar } from '../content/clusters'
import { getPillarBySlug } from '../content/pillars'
import {
  organizationSchema,
  webPageSchema,
  breadcrumbSchema,
  faqSchema,
  videoSchema,
} from '../lib/schema'

/**
 * Simple product intro page — consistent template for products that
 * don't yet have a full pillar page.
 *
 * Layout: badge + H1 + brief intro paragraphs + "Get a Demo" CTA.
 * Same visual pattern for every product.
 *
 * Reads from the PRODUCTS array in constants.js — each product's
 * `intro` field provides the page content.
 */
export default function ProductIntroPage({ slug }) {
  const product = PRODUCTS.find((p) => p.slug === slug)

  if (!product || !product.intro) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-400">No product matches "{slug}".</p>
        </div>
      </div>
    )
  }

  const { intro } = product
  const path = product.to
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: product.label, path },
  ]

  // In-depth guides for this product (the SEO cluster pages). When present,
  // this page acts as the hub that links down to each guide.
  const guides = getClustersForPillar(product.slug)

  // A product slug can double as a pillar slug (accounts-payable-automation
  // does). Where it does, the pillar's FAQs belong on this page — they answer
  // buying objections and earn the FAQ rich result.
  const faqs = getPillarBySlug(product.slug)?.faqs ?? []

  // Product walkthrough, when there is one. Renders nothing otherwise, so the
  // seven products without a video are untouched.
  const video = intro.video

  return (
    <>
      <SEO
        title={intro.metaTitle}
        description={intro.metaDescription}
        path={path}
        schema={[
          organizationSchema(),
          webPageSchema({
            title: intro.metaTitle,
            description: intro.metaDescription,
            path,
          }),
          breadcrumbSchema(breadcrumbItems),
          faqSchema(faqs),
          videoSchema(video),
        ]}
      />

      <Breadcrumb items={breadcrumbItems} />

      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Background ambience */}
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(0,102,255,0.08)_0%,transparent_70%)]" />
        <div className="glow-orb w-[700px] h-[700px] bg-electric/8 -top-40 -right-40" />
        <div className="glow-orb w-[500px] h-[500px] bg-purple/8 -bottom-32 -left-32" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div
            className="text-center mb-8"
          >
            <GlowBadge>
              <span className="inline-flex items-center gap-2">
                <Sparkles size={12} />
                {product.label}
              </span>
            </GlowBadge>
          </div>

          {/* H1 */}
          <h1
            className="text-center font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.02em] leading-[1.05]"
          >
            {intro.h1}
          </h1>

          {/* Intro paragraphs */}
          <div
            className="mt-10 space-y-6 text-base sm:text-lg text-gray-400 leading-relaxed"
          >
            {intro.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-12 text-center"
          >
            <GradientButton
              to={`/demo?product=${product.slug}`}
              className="text-sm sm:text-base px-9 py-4 flex items-center gap-2 mx-auto"
            >
              Get a demo <ArrowRight size={16} />
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Product walkthrough */}
      {video?.youtubeId && (
        <section className="relative pb-4 sm:pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <VideoEmbed
              youtubeId={video.youtubeId}
              title={video.title}
              poster={video.poster}
            />
          </div>
        </section>
      )}

      {/* FAQs — objection handling next to the CTA, and the FAQPage rich result */}
      {faqs.length > 0 && (
        <div className="border-t border-white/5">
          <PillarFAQ faqs={faqs} />
        </div>
      )}

      {/* In-depth guides — internal link hub down to the cluster pages */}
      {guides.length > 0 && (
        <section className="relative py-16 sm:py-20 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 font-medium">
              Go deeper
            </p>
            <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-12">
              In-depth guides
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {guides.map((g) => (
                <div
                  key={g.slug}
                  >
                  <Link
                    to={`/${g.pillar}/${g.slug}`}
                    className="group block h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-electric/40 hover:bg-electric/[0.04]"
                  >
                    <h3 className="font-display text-base font-semibold text-white mb-2">
                      {g.hero.badge || g.primaryKeyword}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {g.meta.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-electric-light text-xs font-medium">
                      Read the guide{' '}
                      <ArrowRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
