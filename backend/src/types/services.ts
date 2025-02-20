import { Job, ApplicationStatus } from '@shared/types/job'

export interface JobScraperService {
  platforms: {
    linkedin: LinkedInScraper
    indeed: IndeedScraper
    glassdoor: GlassdoorScraper
  }
  scrapeJobs(filters: JobFilters): Promise<Job[]>
}

export interface AIService {
  analyzeProfile(profile: UserProfile): Promise<SkillAnalysis>
  generateCoverLetter(job: Job, profile: UserProfile): Promise<string>
} 