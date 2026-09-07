// JSON-LD schema generators. Each helper returns a plain object that
// you can stringify and drop inside a <script type="application/ld+json"> tag.
// Use the SEO component to render — it does the JSON.stringify for you.

import { SITE_URL, SITE_NAME, SOCIAL } from './site'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-full.png`,
    sameAs: [SOCIAL.twitter, SOCIAL.linkedin],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

/**
 * VideoObject — makes a product video eligible for Google's video rich
 * results. Returns null unless there is both an id AND an uploadDate: Google
 * requires uploadDate and rejects the node without it, so emitting
 * `uploadDate: null` is worse than emitting no VideoObject at all.
 */
export function videoSchema(video) {
  if (!video || !video.youtubeId || !video.uploadDate) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl:
      video.poster
        ? `${SITE_URL}${video.poster}`
        : `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
    ...(video.duration ? { duration: video.duration } : {}),
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function faqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function articleSchema({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  author = 'FinMark.ai',
  image = '/og/default.png',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: { '@type': 'Person', name: author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: `${SITE_URL}/logo-full.png`,
    },
    mainEntityOfPage: `${SITE_URL}${path}`,
  }
}

export function webPageSchema({ title, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
}
