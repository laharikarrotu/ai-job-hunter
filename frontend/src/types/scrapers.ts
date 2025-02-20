import { Job } from './job'

export interface BaseScraper {
  scrape: (query: string) => Promise<Job[]>
  parseJob: (html: string) => Job
}

export interface LinkedInScraper extends BaseScraper {
  login: () => Promise<void>
  searchUrl: string
}

export interface IndeedScraper extends BaseScraper {
  searchUrl: string
}

export interface GlassdoorScraper extends BaseScraper {
  login: () => Promise<void>
  searchUrl: string
}

export interface Repository {
  name: string
  description: string
  url: string
  stars: number
  forks: number
  languages: string[]
}

export interface ContributionStats {
  totalContributions: number
  lastYear: {
    [date: string]: number
  }
  languages: {
    [language: string]: number
  }
} 