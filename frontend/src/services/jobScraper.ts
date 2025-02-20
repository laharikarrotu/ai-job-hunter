import type { 
  LinkedInScraper, 
  IndeedScraper, 
  GlassdoorScraper 
} from '../types/scrapers'
import type { Job } from '../types/job'

interface JobScraperService {
  platforms: {
    linkedin: LinkedInScraper
    indeed: IndeedScraper
    glassdoor: GlassdoorScraper
    // Add more platforms
  }
  
  scrapeJobs: (filters: {
    roles: string[]
    locations: string[]
    experience: string
    type: string[]
  }) => Promise<Job[]>
} 