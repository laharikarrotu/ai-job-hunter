import { JobApplication } from '../types/application'
import { applicationService } from './applicationService'

export const createEnhancedApplicationService = (showNotification: (message: string, type: 'success' | 'error') => void) => ({
  ...applicationService,

  submitApplication: async (application: Partial<JobApplication>): Promise<JobApplication> => {
    try {
      const result = await applicationService.submitApplication(application)
      showNotification('Application submitted successfully!', 'success')
      return result
    } catch (error) {
      showNotification('Failed to submit application. Please try again.', 'error')
      throw error
    }
  },

  updateApplicationStatus: async (
    applicationId: string,
    status: JobApplication['status']
  ): Promise<JobApplication> => {
    try {
      const result = await applicationService.updateApplicationStatus(applicationId, status)
      showNotification(`Application status updated to ${status}`, 'success')
      return result
    } catch (error) {
      showNotification('Failed to update application status', 'error')
      throw error
    }
  },

  withdrawApplication: async (applicationId: string): Promise<void> => {
    try {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]')
      const updatedApplications = applications.filter((app: JobApplication) => app.id !== applicationId)
      localStorage.setItem('applications', JSON.stringify(updatedApplications))
      showNotification('Application withdrawn successfully', 'success')
    } catch (error) {
      showNotification('Failed to withdraw application', 'error')
      throw error
    }
  },

  // Add more enhanced methods here
}) 