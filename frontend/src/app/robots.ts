import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'

const SITE_URL = config.frontend.url

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/private/',
                    '/profile/',
                    '/dashboard/',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: '/api/',
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
} 