import React, { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  CalendarMonth,
  AccessTime,
  LocationOn,
  VideoCall,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers'

interface Interview {
  id: string
  jobId: number
  companyName: string
  position: string
  date: Date
  time: Date
  type: 'onsite' | 'virtual'
  location: string
  notes: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

interface FormData {
  companyName: string
  position: string
  type: 'onsite' | 'virtual'
  location: string
  notes: string
}

const InterviewScheduler = () => {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    position: '',
    type: 'virtual',
    location: '',
    notes: ''
  })

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) return

    const newInterview: Interview = {
      id: Math.random().toString(36).substr(2, 9),
      jobId: 1, // Replace with actual job ID
      ...formData,
      date: selectedDate,
      time: selectedTime,
      status: 'scheduled'
    }

    setInterviews(prev => [...prev, newInterview])
    setShowScheduleDialog(false)
    resetForm()
  }

  const resetForm = () => {
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({
      companyName: '',
      position: '',
      type: 'virtual',
      location: '',
      notes: ''
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" className="py-8">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4">Interview Schedule</Typography>
          <Button
            variant="contained"
            onClick={() => setShowScheduleDialog(true)}
            className="bg-gradient-to-r from-primary-main to-primary-dark"
          >
            Schedule Interview
          </Button>
        </Box>

        <Grid container spacing={3}>
          {interviews.map(interview => (
            <Grid item xs={12} key={interview.id}>
              <Card className="card-hover">
                <CardContent>
                  <Box className="flex justify-between">
                    <Box>
                      <Typography variant="h6">{interview.companyName}</Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {interview.position}
                      </Typography>
                    </Box>
                    <Box>
                      <Chip
                        label={interview.status}
                        color={
                          interview.status === 'scheduled'
                            ? 'primary'
                            : interview.status === 'completed'
                            ? 'success'
                            : 'error'
                        }
                      />
                    </Box>
                  </Box>

                  <Grid container spacing={2} className="mt-2">
                    <Grid item xs={12} sm={6}>
                      <Box className="flex items-center">
                        <CalendarMonth className="mr-2" color="action" />
                        <Typography>
                          {interview.date.toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box className="flex items-center">
                        <AccessTime className="mr-2" color="action" />
                        <Typography>
                          {interview.time.toLocaleTimeString()}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="flex items-center">
                        {interview.type === 'virtual' ? (
                          <VideoCall className="mr-2" color="action" />
                        ) : (
                          <LocationOn className="mr-2" color="action" />
                        )}
                        <Typography>{interview.location}</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {interview.notes && (
                    <Typography className="mt-3" color="textSecondary">
                      {interview.notes}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={showScheduleDialog}
          onClose={() => setShowScheduleDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} className="mt-1">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Position"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Time"
                  value={selectedTime}
                  onChange={(newValue) => setSelectedTime(newValue)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location/Link"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowScheduleDialog(false)}>Cancel</Button>
            <Button onClick={handleSchedule} variant="contained">
              Schedule
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  )
}

export default InterviewScheduler 