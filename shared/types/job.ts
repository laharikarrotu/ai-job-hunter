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

export type ApplicationStatus = 'pending' | 'submitted' | 'reviewed' | 'rejected' | 'accepted' 