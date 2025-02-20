import { Job } from './job'

export interface JobCardProps {
  job: Job
  onSave: (jobId: number) => void
  onApply: (jobId: number) => void
}

export interface ApplicationFormProps {
  job: Job
  onSubmit: (data: FormData) => void
} 