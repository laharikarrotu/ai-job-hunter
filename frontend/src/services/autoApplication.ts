import type { 
  Job, 
  JobRequirements, 
  JobApplication, 
  ApplicationStatus 
} from '../types/job'
import type { UserProfile } from '../types/profile'

interface MatchScore {
  total: number
  breakdown: {
    skills: number
    experience: number
    education: number
  }
}

interface AutoApplicator {
  analyzeJobPost: (job: Job) => Promise<JobRequirements>
  matchRequirements: (requirements: JobRequirements, profile: UserProfile) => Promise<MatchScore>
  generateApplication: (job: Job, profile: UserProfile) => Promise<JobApplication>
  submitApplication: (application: JobApplication, job: Job) => Promise<ApplicationStatus>
} 