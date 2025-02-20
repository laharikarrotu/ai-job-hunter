import { Job, JobFilters } from '@/types'
import { api } from './index'

export const jobsApi = {
  search: async (filters: JobFilters): Promise<Job[]> => {
    const { data } = await api.get('/jobs', { params: filters })
    return data
  },

  getJob: async (id: number): Promise<Job> => {
    const { data } = await api.get(`/jobs/${id}`)
    return data
  },

  apply: async (jobId: number, data: FormData): Promise<void> => {
    await api.post(`/jobs/${jobId}/apply`, data)
  }
} 