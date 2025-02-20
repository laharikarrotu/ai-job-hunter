import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material'
import { Upload as UploadIcon } from '@mui/icons-material'
import { Job } from '../../data/mockJobs'

interface JobApplicationDialogProps {
  job: Job
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
}

const steps = ['Resume', 'Cover Letter', 'Additional Info']

const JobApplicationDialog = ({ job, open, onClose, onSubmit }: JobApplicationDialogProps) => {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    resume: '',
    coverLetter: '',
    notes: ''
  })

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Application submission failed:', error)
    }
    setLoading(false)
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className="p-4">
            <Typography variant="subtitle1" gutterBottom>
              Upload your resume or select from saved resumes
            </Typography>
            <Box className="text-center p-6 border-2 border-dashed rounded-lg hover:border-primary-main transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button
                  component="span"
                  variant="outlined"
                  startIcon={<UploadIcon />}
                  className="mb-3"
                >
                  Upload Resume
                </Button>
              </label>
            </Box>
          </Box>
        )
      case 1:
        return (
          <Box className="p-4">
            <TextField
              fullWidth
              multiline
              rows={8}
              label="Cover Letter"
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Write your cover letter here..."
            />
          </Box>
        )
      case 2:
        return (
          <Box className="p-4">
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Additional Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional information you'd like to share..."
            />
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Apply to {job.title} at {job.company}
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} className="mb-6">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
      </DialogContent>
      <DialogActions className="p-4">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Application'}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default JobApplicationDialog 