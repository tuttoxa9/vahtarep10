import type { MetadataRoute } from 'next'
import { getAllVacancies } from '@/lib/firestore'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vahta1.ru'

  // Основные статические страницы
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/vacancies`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/employers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Получаем все вакансии из базы данных
  let vacancyPages: MetadataRoute.Sitemap = []

  try {
    const vacancies = await getAllVacancies()

    vacancyPages = vacancies.map((vacancy) => ({
      url: `${baseUrl}/vacancies/${vacancy.id}`,
      lastModified: vacancy.updatedAt ? new Date(vacancy.updatedAt) : new Date(vacancy.createdAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error generating sitemap for vacancies:', error)
    // Если не удается получить вакансии, продолжаем с основными страницами
  }

  return [...staticPages, ...vacancyPages]
}
