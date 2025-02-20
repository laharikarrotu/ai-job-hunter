import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon
} from '@mui/icons-material'
import { JobApplication } from '../types/application'
import { applicationService } from '../services/applicationService'
import { mockJobs } from '../data/mockJobs'
import { useNotification } from '../context/NotificationContext'
import { createEnhancedApplicationService } from '../services/enhancedApplicationService'

const applicationSteps = [
  'Submitted',
  'Reviewing',
  'Interviewed',
  'Offered',
  'Rejected'
]

interface StatusUpdateDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (status: JobApplication['status'], notes: string) => void
  currentStatus: JobApplication['status']
}

const StatusUpdateDialog = ({ open, onClose, onSubmit, currentStatus }: StatusUpdateDialogProps) => {
  const [status, setStatus] = useState<JobApplication['status']>(currentStatus)
  const [notes, setNotes] = useState('')

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Application Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as JobApplication['status'])}
          >
            {applicationSteps.map((step) => (
              <MenuItem key={step} value={step.toLowerCase()}>
                {step}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSubmit(status, notes)} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const ApplicationTracking = () => {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const { showNotification } = useNotification()
  const enhancedService = createEnhancedApplicationService(showNotification)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationService.getApplications('current-user-id')
        setApplications(data)
      } catch (error) {
        console.error('Failed to fetch applications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const getStepIndex = (status: JobApplication['status']) => {
    return applicationSteps.findIndex(step => 
      step.toLowerCase() === status.toLowerCase()
    )
  }

  const getJobDetails = (jobId: number) => {
    return mockJobs.find(job => job.id === jobId)
  }

  const handleStatusUpdate = async (status: JobApplication['status'], notes: string) => {
    if (!selectedApplication) return

    try {
      await enhancedService.updateApplicationStatus(selectedApplication.id, status)
      setApplications(prev => 
        prev.map(app => 
          app.id === selectedApplication.id 
            ? { ...app, status, notes } 
            : app
        )
      )
    } catch (error) {
      console.error('Failed to update status:', error)
    }
    setIsStatusDialogOpen(false)
  }

  const handleWithdraw = async (applicationId: string) => {
    try {
      await enhancedService.withdrawApplication(applicationId)
      setApplications(prev => prev.filter(app => app.id !== applicationId))
    } catch (error) {
      console.error('Failed to withdraw application:', error)
    }
  }

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" className="py-8 fade-in">
      <Typography variant="h4" component="h1" className="mb-6">
        Application Tracking
      </Typography>

      <Grid container spacing={3}>
        {applications.map(application => {
          const job = getJobDetails(application.jobId)
          if (!job) return null

          return (
            <Grid item xs={12} key={application.id}>
              <Card className="card-hover">
                <CardContent>
                  <Box className="mb-4">
                    <Typography variant="h6" className="mb-1">
                      {job.title}
                    </Typography>
                    <Typography color="textSecondary">
                      {job.company} • Applied on {new Date(application.appliedDate).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Stepper activeStep={getStepIndex(application.status)} alternativeLabel>
                    {applicationSteps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <Box className="mt-4 flex justify-between items-center">
                    <Box className="flex gap-2">
                      <Button
                        startIcon={<EditIcon />}
                        onClick={() => {
                          setSelectedApplication(application)
                          setIsStatusDialogOpen(true)
                        }}
                      >
                        Update Status
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleWithdraw(application.id)}
                      >
                        Withdraw
                      </Button>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {job.salary}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <StatusUpdateDialog
        open={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        onSubmit={handleStatusUpdate}
        currentStatus={selectedApplication?.status || 'submitted'}
      />
    </Container>
  )
}

export default ApplicationTracking 