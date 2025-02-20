import { Job, JobFilters } from '@shared/types'

export class JobScraperService {
  async scrapeJobs(filters: JobFilters): Promise<Job[]> {
    // Scraping logic here
  }
} 