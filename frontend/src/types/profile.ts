import { User } from './user'

export interface UserProfile {
  user: User
  resume: Resume
  skills: string[]
  experience: WorkExperience[]
  education: Education[]
  certifications: Certificate[]
  codingProfiles: CodingProfile[]
}

export interface Resume {
  id: string
  userId: string
  content: string
  lastUpdated: Date
}

export interface WorkExperience {
  company: string
  position: string
  startDate: Date
  endDate?: Date
  description: string[]
}

export interface Education {
  school: string
  degree: string
  field: string
  graduationDate: Date
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: Date
  expiryDate?: Date
  credentialUrl?: string
}

export interface CodingProfile {
  platform: 'leetcode' | 'hackerrank' | 'github'
  username: string
  profileUrl: string
  stats: any
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

export interface SkillAnalysis {
  skills: {
    name: string
    level: 'beginner' | 'intermediate' | 'expert'
    lastUsed: Date
  }[]
  recommendations: string[]
}

export interface LeetCodeProfile {
  username: string
  ranking: number
  problemsSolved: {
    easy: number
    medium: number
    hard: number
    total: number
  }
  submissions: {
    total: number
    accepted: number
    rate: number
  }
}

export interface HackerRankProfile {
  username: string
  badges: number
  certificates: string[]
  skills: {
    name: string
    score: number
  }[]
  ranking: number
}

export interface CodingPlatforms {
  leetcode: LeetCodeProfile
  hackerrank: HackerRankProfile
} 