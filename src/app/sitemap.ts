import { MetadataRoute } from 'next'

const BASE = 'https://www.wakation.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: BASE,                         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/select`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/programs`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/programs/domestic`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/programs/global`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/programs/market`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/visa-ai`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/apply`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/partnership`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
