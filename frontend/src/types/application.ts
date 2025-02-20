export interface JobApplication {
  id: string
  jobId: number
  userId: string
  status: 'pending' | 'submitted' | 'reviewing' | 'interviewed' | 'offered' | 'rejected'
  appliedDate: string
  resume: string
  coverLetter: string
  notes?: string
} 