import { Job } from '../data/mockJobs'

export type SortOption = 'relevance' | 'date' | 'salary' | 'company'
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'all'
export type WorkType = 'remote' | 'hybrid' | 'onsite' | 'all'

export interface JobFilters {
  searchTerm: string
  location: string
  jobType: string
  salaryRange: number[]
  experienceLevel: ExperienceLevel
  workType: WorkType
  skills: string[]
  sortBy: SortOption
}

export const sortJobs = (jobs: Job[], sortBy: SortOption): Job[] => {
  const sortedJobs = [...jobs]
  
  switch (sortBy) {
    case 'date':
      return sortedJobs.sort((a, b) => 
        new Date(b.posted).getTime() - new Date(a.posted).getTime()
      )
    case 'salary':
      return sortedJobs.sort((a, b) => {
        const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''))
        const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''))
        return salaryB - salaryA
      })
    case 'company':
      return sortedJobs.sort((a, b) => 
        a.company.localeCompare(b.company)
      )
    default:
      return sortedJobs
  }
}

export const filterJobs = (jobs: Job[], filters: JobFilters): Job[] => {
  return jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.searchTerm.toLowerCase())
    
    const matchesLocation = !filters.location || 
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    
    const matchesType = filters.jobType === 'all' || 
      job.type.toLowerCase() === filters.jobType.toLowerCase()
    
    const salary = parseInt(job.salary.replace(/[^0-9]/g, ''))
    const matchesSalary = salary >= filters.salaryRange[0] * 1000 && 
      salary <= filters.salaryRange[1] * 1000
    
    const matchesExperience = filters.experienceLevel === 'all' || 
      job.experienceLevel === filters.experienceLevel
    
    const matchesWorkType = filters.workType === 'all' || 
      job.workType === filters.workType
    
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.every(skill => job.skills.includes(skill))

    return matchesSearch && matchesLocation && matchesType && 
      matchesSalary && matchesExperience && matchesWorkType && matchesSkills
  })
} 