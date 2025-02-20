import { JobApplication } from '../types/application'

const MOCK_DELAY = 1000 // Simulate API delay

export const applicationService = {
  submitApplication: async (application: Partial<JobApplication>): Promise<JobApplication> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    
    const newApplication: JobApplication = {
      id: Math.random().toString(36).substr(2, 9),
      jobId: application.jobId!,
      userId: 'current-user-id', // Replace with actual user ID
      status: 'submitted',
      appliedDate: new Date().toISOString(),
      resume: application.resume!,
      coverLetter: application.coverLetter!,
      notes: application.notes
    }
    
    // Store in localStorage for demo
    const applications = JSON.parse(localStorage.getItem('applications') || '[]')
    applications.push(newApplication)
    localStorage.setItem('applications', JSON.stringify(applications))
    
    return newApplication
  },

  getApplications: async (userId: string): Promise<JobApplication[]> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    const applications = JSON.parse(localStorage.getItem('applications') || '[]')
    return applications.filter((app: JobApplication) => app.userId === userId)
  },

  updateApplicationStatus: async (
    applicationId: string, 
    status: JobApplication['status']
  ): Promise<JobApplication> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY))
    
    const applications = JSON.parse(localStorage.getItem('applications') || '[]')
    const updatedApplications = applications.map((app: JobApplication) => {
      if (app.id === applicationId) {
        return { ...app, status }
      }
      return app
    })
    
    localStorage.setItem('applications', JSON.stringify(updatedApplications))
    return updatedApplications.find((app: JobApplication) => app.id === applicationId)
  }
} 