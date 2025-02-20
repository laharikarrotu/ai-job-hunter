import React, { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  IconButton,
  Grid,
  Divider,
  Dialog
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Download as DownloadIcon
} from '@mui/icons-material'

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string[]
  }[]
  education: {
    id: string
    school: string
    degree: string
    field: string
    graduationDate: string
  }[]
  skills: string[]
}

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: []
}

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [newSkill, setNewSkill] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo']) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: e.target.value
      }
    }))
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Math.random().toString(36).substr(2, 9),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: []
        }
      ]
    }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Math.random().toString(36).substr(2, 9),
          school: '',
          degree: '',
          field: '',
          graduationDate: ''
        }
      ]
    }))
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSave = () => {
    // Save to localStorage or API
    localStorage.setItem('resume', JSON.stringify(resumeData))
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" gutterBottom>
        Resume Builder
      </Typography>

      <Paper elevation={3} className="p-6">
        {/* Personal Information */}
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              value={resumeData.personalInfo.name}
              onChange={handlePersonalInfoChange('name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={resumeData.personalInfo.email}
              onChange={handlePersonalInfoChange('email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={resumeData.personalInfo.phone}
              onChange={handlePersonalInfoChange('phone')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              value={resumeData.personalInfo.location}
              onChange={handlePersonalInfoChange('location')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Professional Summary"
              value={resumeData.personalInfo.summary}
              onChange={handlePersonalInfoChange('summary')}
            />
          </Grid>
        </Grid>

        <Divider className="my-6" />

        {/* Skills */}
        <Box className="mb-6">
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          <Box className="flex gap-2 mb-3">
            <TextField
              label="Add Skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button
              variant="contained"
              onClick={addSkill}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Box>
          <Box className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => removeSkill(skill)}
                className="bg-primary-light text-white"
              />
            ))}
          </Box>
        </Box>

        <Box className="mt-6 flex justify-end gap-3">
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => setShowPreview(true)}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Resume
          </Button>
        </Box>
      </Paper>

      {/* Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="md"
        fullWidth
      >
        {/* Add resume preview content */}
      </Dialog>
    </Container>
  )
}

export default ResumeBuilder 