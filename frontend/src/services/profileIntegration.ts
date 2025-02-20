import { 
  Repository, 
  ContributionStats, 
  LeetCodeProfile, 
  HackerRankProfile,
  Certificate
} from '@/types/profile'

export interface ProfileIntegrator {
  github: {
    fetchRepositories: () => Promise<Repository[]>
    analyzeContributions: () => Promise<ContributionStats>
  }
  
  codingPlatforms: {
    leetcode: LeetCodeProfile
    hackerrank: HackerRankProfile
    // Add more platforms
  }
  
  certificates: {
    fetch: () => Promise<Certificate[]>
    validate: (cert: Certificate) => Promise<boolean>
  }
} 