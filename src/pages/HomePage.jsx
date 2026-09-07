import SEO from '../components/seo/SEO'
import Hero from '../components/Hero'
import FeatureTicker from '../components/FeatureTicker'
import HomeVideo from '../components/HomeVideo'
import HowItWorks from '../components/HowItWorks'
import CTA from '../components/CTA'
import About from '../components/About'
import { organizationSchema, websiteSchema } from '../lib/schema'

// Homepage is intentionally brand-level only.
// The Features / Services / full AP story live on the
// /accounts-payable-automation pillar page. The homepage tells the
// FinMark.ai story; the pillar tells the AP product story.
// HowItWorks is kept here as a brand-level "how automation works"
// tracker, not AP-specific.
export default function HomePage() {
  return (
    <>
      <SEO
        title="FinMark.ai — AI Automation for Enterprise Finance Teams"
        description="FinMark.ai is an AI financial automation platform for enterprise finance teams. Automate invoice capture, accounts payable, withholding tax, and ERP posting — live in production at a major enterprise group."
        path="/"
        schema={[organizationSchema(), websiteSchema()]}
      />
      <Hero />
      <FeatureTicker />
      <HomeVideo />
      <HowItWorks />
      <About />
      <CTA />
    </>
  )
}
