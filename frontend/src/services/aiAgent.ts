import { Job, UserProfile, ApplicationForm } from '@/types'
import type { Resume, Certificate, CodingProfile, SkillAnalysis } from '../types/profile'
import type { JobMatch } from '../types/job'

export interface AIAgent {
  // Profile Analysis
  analyzeProfile: (profile: UserProfile) => Promise<SkillAnalysis>

  // Job Matching
  matchJobs: (jobPosts: Job[], userProfile: UserProfile) => Promise<JobMatch[]>

  // Auto Application
  generateCoverLetter: (job: Job, profile: UserProfile) => Promise<string>
  fillApplicationForm: (form: ApplicationForm, userProfile: UserProfile) => Promise<FormData>
} 