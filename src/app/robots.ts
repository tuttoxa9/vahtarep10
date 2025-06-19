import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/output/',
        '/netlify/',
      ],
    },
    sitemap: 'https://vahta1.ru/sitemap.xml',
  }
}
