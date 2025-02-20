export interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  skills: string[]
  posted: string
  experienceYears: number
  workType: 'remote' | 'hybrid' | 'onsite'
  companySize: 'startup' | 'midsize' | 'enterprise'
  industry: string
  benefits: string[]
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead'
  description?: string
  requirements?: string[]
}

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    salary: '120000',
    type: 'Full-time',
    skills: ['React', 'TypeScript', 'Node.js'],
    posted: '2024-02-20',
    experienceYears: 5,
    workType: 'remote',
    companySize: 'enterprise',
    industry: 'Technology',
    benefits: ['Health Insurance', '401k', 'Remote Work'],
    experienceLevel: 'senior'
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    company: 'Innovation Labs',
    location: 'San Francisco, CA',
    salary: '$130k - $160k',
    type: 'Full-time',
    skills: ['React', 'Python', 'PostgreSQL'],
    posted: '1 day ago',
    experienceYears: 3,
    workType: 'hybrid',
    companySize: 'midsize',
    industry: 'Technology',
    benefits: [
      'Stock options',
      'Unlimited PTO',
      'Health and dental',
      'Learning budget'
    ],
    experienceLevel: 'mid'
  },
  {
    id: 3,
    title: 'AI Engineer',
    company: 'Future Systems',
    location: 'Remote',
    salary: '$140k - $180k',
    type: 'Full-time',
    skills: ['Python', 'TensorFlow', 'PyTorch'],
    posted: '3 days ago',
    experienceYears: 2,
    workType: 'remote',
    companySize: 'startup',
    industry: 'Technology',
    benefits: [
      'Competitive compensation',
      'Remote-first culture',
      'Conference budget',
      'Latest hardware'
    ],
    experienceLevel: 'entry'
  }
] 