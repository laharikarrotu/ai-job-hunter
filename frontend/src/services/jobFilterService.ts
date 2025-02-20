import { Job } from '../data/mockJobs'
import { JobFilters } from '../utils/jobFilters'

export interface AdvancedFilters extends JobFilters {
  experienceYears: number[]
  remotePreference: 'remote' | 'hybrid' | 'onsite' | 'all'
  companySize: 'startup' | 'midsize' | 'enterprise' | 'all'
  industryType: string[]
  postedWithin: 'day' | 'week' | 'month' | 'all'
  benefits: string[]
}

export const filterJobsAdvanced = (jobs: Job[], filters: AdvancedFilters): Job[] => {
  return jobs.filter(job => {
    // Basic filters
    const matchesSearch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.searchTerm.toLowerCase())
    
    const matchesLocation = !filters.location || 
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    
    const matchesType = filters.jobType === 'all' || 
      job.type.toLowerCase() === filters.jobType.toLowerCase()
    
    // Salary filter
    const salary = parseInt(job.salary.replace(/[^0-9]/g, ''))
    const matchesSalary = salary >= filters.salaryRange[0] * 1000 && 
      salary <= filters.salaryRange[1] * 1000

    // Experience years
    const matchesExperience = job.experienceYears >= filters.experienceYears[0] &&
      job.experienceYears <= filters.experienceYears[1]

    // Remote preference
    const matchesRemote = filters.remotePreference === 'all' ||
      job.workType === filters.remotePreference

    // Company size
    const matchesCompanySize = filters.companySize === 'all' ||
      job.companySize === filters.companySize

    // Industry type
    const matchesIndustry = filters.industryType.length === 0 ||
      filters.industryType.includes(job.industry)

    // Posted date
    const postedDate = new Date(job.posted)
    const now = new Date()
    const daysDiff = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24))
    
    const matchesPostedDate = filters.postedWithin === 'all' ||
      (filters.postedWithin === 'day' && daysDiff <= 1) ||
      (filters.postedWithin === 'week' && daysDiff <= 7) ||
      (filters.postedWithin === 'month' && daysDiff <= 30)

    // Benefits
    const matchesBenefits = filters.benefits.length === 0 ||
      filters.benefits.every(benefit => job.benefits.includes(benefit))

    return matchesSearch && matchesLocation && matchesType && 
      matchesSalary && matchesExperience && matchesRemote && 
      matchesCompanySize && matchesIndustry && matchesPostedDate && 
      matchesBenefits
  })
}

export const sortJobsByRelevance = (jobs: Job[], userSkills: string[]): Job[] => {
  return [...jobs].sort((a, b) => {
    const scoreA = calculateRelevanceScore(a, userSkills)
    const scoreB = calculateRelevanceScore(b, userSkills)
    return scoreB - scoreA
  })
}

const calculateRelevanceScore = (job: Job, userSkills: string[]): number => {
  let score = 0
  
  // Skills match
  const matchingSkills = job.skills.filter(skill => 
    userSkills.includes(skill)
  ).length
  score += (matchingSkills / job.skills.length) * 50

  // Recent posting bonus
  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(job.posted).getTime()) / (1000 * 60 * 60 * 24)
  )
  score += Math.max(0, 30 - daysAgo)

  // Salary range bonus
  const salary = parseInt(job.salary.replace(/[^0-9]/g, ''))
  score += Math.min(20, salary / 5000)

  return score
} 