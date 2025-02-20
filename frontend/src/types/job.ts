export interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
  salary: string
  type: string
  posted: string
  skills: string[]
}

export interface JobFilters {
  searchTerm: string
  location?: string
  type?: string
  salaryRange?: [number, number]
}

export interface JobMatch {
  job: Job
  score: number
  matchedSkills: string[]
}

export interface JobRequirements {
  skills: string[]
  experience: number
  education: string
  other: string[]
}

export type ApplicationStatus = 'pending' | 'submitted' | 'reviewed' | 'rejected' | 'accepted'

export interface JobApplication {
  id: string
  jobId: number
  userId: string
  coverLetter: string
  resume: string
  status: ApplicationStatus
  appliedAt: Date
}

export interface ApplicationForm {
  fields: {
    id: string
    label: string
    type: string
    required: boolean
    value: string
  }[]
} 