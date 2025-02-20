import { Job, UserProfile, SkillAnalysis } from '@shared/types'

export class AIAgentService {
  async analyzeProfile(profile: UserProfile): Promise<SkillAnalysis> {
    // AI logic here
  }

  async generateCoverLetter(job: Job, profile: UserProfile): Promise<string> {
    // AI logic here
  }
} 