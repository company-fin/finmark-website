import {
  FileSearch,
  Brain,
  CheckSquare,
  Receipt,
  Database,
  FolderTree,
  Building2,
} from 'lucide-react'

export const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// Product catalogue. Drives the navbar dropdown, the footer column, the
// /demo product picker, the sitemap and llms.txt — adding or removing an
// entry here propagates to all of them.
//
// A removed product needs a 301 in public/_redirects as well, or its old
// URL starts 404ing for anyone holding a link.
export const PRODUCTS = [
  {
    label: 'Accounts Payable',
    slug: 'accounts-payable-automation',
    to: '/accounts-payable-automation',
    description: 'AI-powered AP automation. Live in production.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'Accounts Payable (AP) Automation Software | FinMark.ai',
      metaDescription: 'AI-powered accounts payable automation. Full invoice-to-ERP workflow — capture, match, validate, approve, post. Live in production with enterprise customers.',
      h1: 'Accounts Payable',
      // TODO: set uploadDate (ISO 8601). videoSchema stays silent until it is —
      // Google requires uploadDate for VideoObject and rejects the node
      // without it, so the video plays but is not yet eligible for a rich
      // result. Vendor identifiers, bank details and addresses in this
      // recording are fictional and redacted, per the video's own note.
      video: {
        youtubeId: 'tOG6hrj_-PE',
        title: 'A handwritten bill, posted to the ERP — AP automation demo',
        description:
          'Sixty-five invoices — goods, services, marketing, and one handwritten bill — from upload to ERP posting with nothing typed by hand. Three-way matching against PO and GRN, withholding tax by section, VAT verification, duplicate detection, and a full audit trail, with anything that fails held back rather than pushed through.',
        uploadDate: null,
        poster: '/stills/accounts-payable.jpg',
      },
      body: [
        'FinMark.ai runs the full invoice-to-ERP workflow end to end. AI captures invoices in any format. Matching happens against live ERP data. Withholding tax is computed automatically against current regulations. Sanity checks catch what AI alone would miss. Approved invoices post back into the ERP, audit-ready.',
        'What used to take finance teams days now takes minutes. The platform is live in production with enterprise customers today.',
        'Built for finance teams that process hundreds of vendor invoices a month, operate inside an established ERP, and spend more time keying data than analysing it.',
      ],
    },
  },
  {
    label: 'FP&A',
    slug: 'fpa',
    to: '/fpa',
    description: 'Runway, hiring impact, and a month you can actually read.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'FP&A — Runway, Hiring Impact and a Month You Can Read | FinMark.ai',
      metaDescription: 'Connect QuickBooks or a spreadsheet and see where the business stands today: real runway that accounts for revenue growth, what moved last month in plain English, and what a hire does to runway before you make the offer.',
      h1: 'FP&A',
      // TODO: set uploadDate (ISO 8601, e.g. '2026-08-14'). videoSchema stays
      // silent until it is, because Google requires uploadDate for
      // VideoObject and rejects the node without it — so the video plays but
      // is not yet eligible for a video rich result.
      video: {
        youtubeId: 'jcNLfqfxJoE',
        title: 'Adding one engineer costs you 2.4 months of runway. See it before you offer.',
        description:
          'A walkthrough of FinMark.ai FP&A: seeing the runway impact of a hiring decision before the offer goes out.',
        uploadDate: null,
        poster: '/stills/fpa.jpg',
      },
      // Copy follows the product walkthrough above — every claim here is one
      // the video demonstrates on screen. Nothing has been extrapolated.
      body: [
        'Month-end takes a week, and by the time the numbers arrive the decisions that shaped them have already been made. FinMark.ai\'s FP&A connects to QuickBooks, or to a spreadsheet, and keeps your position current without waiting for a close.',
        'You get the handful of numbers that actually matter, and a plain-English account of what moved last month and why. Every figure traces back to your books, so anything that looks wrong can be followed to the entry behind it.',
        'Runway, done properly. Not cash divided by burn — that quietly ignores the fact that revenue is growing, which is usually the difference between the runway you think you have and the runway you actually have.',
        'And you can plan a hire before you commit to it. Put in a role, a salary and a start date, and see the fully loaded monthly cost and exactly what it does to your runway — while the offer is still a question rather than a liability.',
      ],
    },
  },
  {
    label: 'P&L Auto Track',
    slug: 'pnl-auto-track',
    to: '/pnl-auto-track',
    description: 'A live P&L that updates as transactions post.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'P&L Auto Track — Live Profit & Loss Tracking | FinMark.ai',
      metaDescription: 'A live P&L that updates as transactions post. See margin movement the day it happens instead of waiting for month-end close.',
      h1: 'P&L Auto Track',
      body: [
        'Most finance teams see their P&L once a month, weeks after the decisions that shaped it were made. By the time margin slippage shows up in the month-end pack, it has been quietly compounding for thirty days.',
        'P&L Auto Track keeps a live P&L that updates as transactions post. Margin movement shows up the day it happens — a price change, a cost spike, a product mix shift — so finance can flag it while there is still time to act, not explain it after the fact.',
        'Built on the same data layer that powers our financial reporting product: your transactions flow in, classification happens automatically, and the P&L stays current without anyone rebuilding a spreadsheet.',
      ],
    },
  },
  {
    label: 'RevRecog AI',
    slug: 'revenue-recognition-automation',
    to: '/revenue-recognition-automation',
    description: 'Recognition live from your contracts — and the revenue you never billed.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'RevRecog AI — Revenue Recognition Automation | FinMark.ai',
      metaDescription: 'Recognition schedules built live from your contracts under ASC 606 and Ind AS 115 — across time and materials, milestone, outcome, retainer and hybrid — with revenue leakage and client margins surfaced while you can still act on them.',
      h1: 'RevRecog AI',
      // TODO: set uploadDate (ISO 8601). No VideoObject is emitted until it is.
      // Client names and figures in this recording are fictional, per the
      // video's own note.
      video: {
        youtubeId: 'drizlegXhrU',
        title: 'Delivered work that was never billed — revenue recognition demo',
        description:
          'A walkthrough of RevRecog: contracts in, recognition schedules out under ASC 606 and Ind AS 115, with revenue leakage and client margins visible while there is still time to act on them.',
        uploadDate: null,
        poster: '/stills/revrecog.jpg',
      },
      // Copy follows the walkthrough above — every capability named here is one
      // the video demonstrates. No figures are quoted; the ones on screen are
      // fictional and belong in the demo, not on the page.
      body: [
        'Revenue recognition is where finance teams spend the most careful hours for the least visible output — building schedules contract by contract, adjusting them when billing changes, and defending every number when the auditors arrive.',
        'RevRecog AI runs recognition live from the contracts themselves rather than from a month-end spreadsheet. Paste in an MSA and it builds the contract; schedules follow under ASC 606 and Ind AS 115, across time and materials, milestone, outcome-based, retainer and hybrid arrangements.',
        'It also surfaces what the schedules alone would not. Revenue leakage — work already delivered that was never billed — shows up while there is still time to invoice it, and margin by client is visible without anyone rebuilding the analysis by hand.',
        'Every recognised entry carries a defensible audit trail showing why it was recognised, when, and under which rule — revenue numbers your auditors can trace end to end, without your finance team maintaining the machinery behind them.',
      ],
    },
  },
]

// Flat list of all feature links — derived from PRODUCTS.
// Kept for backward compat with Footer's Product column.
export const PLATFORM_LINKS = PRODUCTS.flatMap((p) => p.features)

// FEATURES — outcome-focused. AI claims are honest about scope:
// - Extraction is genuinely AI (two-model verification approach).
// - Matching, approval, WHT, ERP integration are deterministic rules + sync.
// We don't claim "AI everywhere" because that would be a lie. We claim AI
// where AI actually delivers and rules-based automation where rules deliver.
export const FEATURES = [
  {
    icon: Brain,
    title: 'AI Invoice Extraction',
    description:
      'Two AI models read every invoice and verify each other\'s extraction before the data flows downstream. High accuracy on any vendor format, no per-vendor templates required.',
  },
  {
    icon: Database,
    title: 'Direct ERP Integration',
    description:
      'Connect via SOAP and REST APIs. POs and goods receipts sync into FinMark.ai; approved invoices push back into your ERP with all the fields populated, ready to post.',
  },
  {
    icon: Receipt,
    title: 'Withholding Tax, Built In',
    description:
      'Withholding Tax computed automatically and pushed back to your ERP alongside the invoice. Currently optimized for the Nigerian 2024 regulations; other regions on the roadmap.',
  },
  {
    icon: CheckSquare,
    title: 'Smart Matching',
    description:
      'Auto-match invoices against POs and goods receipts from your ERP using configurable tolerances. Handles the messy real-world cases — telecom invoices, marketing line items, partial receipts — without manual workarounds.',
  },
  {
    icon: FolderTree,
    title: 'SharePoint as Your Repository',
    description:
      'Pick up new invoices from your SharePoint folders automatically. Portal uploads write back to SharePoint. One source of truth, no migration.',
  },
  {
    icon: Building2,
    title: 'Built for Group Companies',
    description:
      'Run multiple subsidiaries on one platform with full data isolation between them and a cross-company admin view for the parent group. Each subsidiary stays independent.',
  },
]

// HOW_IT_WORKS — brand-level homepage content. Original pre-AP copy.
export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Connect Your Systems',
    description:
      'Integrate your existing tools across finance, operations, marketing, and more. FinMark.ai brings all your data into one unified platform—no silos, no friction.',
  },
  {
    step: '02',
    title: 'Automate Your Workflows',
    description:
      'Design and deploy intelligent workflows tailored to your business. From financial processes to operational tasks and marketing activities, automate everything with precision.',
  },
  {
    step: '03',
    title: 'Gain Insights & Scale',
    description:
      'Unlock real-time insights, monitor performance, and make data-driven decisions. As your business grows, FinMark.ai scales with you—ensuring efficiency at every stage.',
  },
]

// SERVICES — same honest framing as FEATURES.
export const SERVICES = [
  {
    icon: FileSearch,
    title: 'AI Invoice Capture',
    description:
      'Two AI models read each invoice and verify the extraction before it flows downstream. High accuracy on any vendor format with no template setup.',
  },
  {
    icon: CheckSquare,
    title: 'PO & GRN Matching',
    description:
      'Auto-match invoices against purchase orders and goods receipts from your ERP. Configurable tolerances. Handles lump-sum and ratio-based matching for telecom and marketing categories.',
  },
  {
    icon: Receipt,
    title: 'Withholding Tax',
    description:
      'WHT computed automatically and pushed to your ERP alongside the invoice. Currently optimized for the Nigerian 2024 regulations; other regions on the roadmap.',
  },
  {
    icon: Database,
    title: 'ERP Integration',
    description:
      'Direct integration via SOAP and REST APIs. Bidirectional sync of POs, goods receipts, vendor master, and approved invoices. Built for on-premise and cloud ERPs.',
  },
  {
    icon: FolderTree,
    title: 'SharePoint Repository',
    description:
      'Use SharePoint as your AP document repository. We read invoices in and write portal uploads back. Your existing IT governance stays intact.',
  },
  {
    icon: Building2,
    title: 'Multi-Subsidiary Platform',
    description:
      'Run multiple subsidiaries on one platform with full data isolation and a cross-company admin view. Designed for group company structures with multiple legal entities.',
  },
]

export const TRUSTED_LOGOS = []

// TESTIMONIALS — kept for backward compatibility but the Testimonials
// component is no longer rendered on the homepage. Add real customer
// quotes here when you have them; do NOT keep fake quotes.
export const TESTIMONIALS = []

export const FOOTER_LINKS = {
  Product: ['Features', 'How It Works'],
}
