import React, { useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Divider
} from '@mui/material'
import {
  Search as SearchIcon,
  LocationOn,
  Work as WorkIcon,
  BookmarkBorder,
  Bookmark,
  FilterList
} from '@mui/icons-material'
import { mockJobs, Job } from '../data/mockJobs'
import JobDetailDialog from '../components/jobs/JobDetailDialog'

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [salaryRange, setSalaryRange] = useState<number[]>([50, 150])
  const [jobType, setJobType] = useState('all')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setIsDetailOpen(true)
  }

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase())
    const matchesType = jobType === 'all' || job.type.toLowerCase() === jobType.toLowerCase()
    
    const salary = parseInt(job.salary.replace(/[^0-9]/g, ''))
    const matchesSalary = salary >= salaryRange[0] * 1000 && salary <= salaryRange[1] * 1000

    return matchesSearch && matchesLocation && matchesType && matchesSalary
  })

  return (
    <Container maxWidth="lg" className="py-8 fade-in">
      <Typography variant="h4" component="h1" className="mb-6">
        Find Your Next Job
      </Typography>

      {/* Search Section */}
      <Paper elevation={3} className="p-6 mb-8">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              className="card-hover"
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn color="action" />
                  </InputAdornment>
                ),
              }}
              className="card-hover"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              className="h-full bg-gradient-to-r from-primary-main to-primary-dark hover:from-primary-dark hover:to-primary-main"
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {/* Filters */}
        <Box className="mt-4">
          <Button
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
            className="mb-3"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          {showFilters && (
            <Grid container spacing={3} className="fade-in">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="card-hover"
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="full-time">Full-time</MenuItem>
                    <MenuItem value="part-time">Part-time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography gutterBottom>Salary Range (K)</Typography>
                <Slider
                  value={salaryRange}
                  onChange={(_, newValue) => setSalaryRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={300}
                  className="mt-2"
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>

      {/* Results Summary */}
      <Typography variant="subtitle1" className="mb-4">
        Found {filteredJobs.length} matching jobs
      </Typography>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {filteredJobs.map(job => (
          <Grid item xs={12} key={job.id}>
            <Card 
              className="card-hover cursor-pointer"
              onClick={() => handleJobClick(job)}
            >
              <CardContent>
                <Box className="flex justify-between items-start">
                  <Box>
                    <Typography variant="h6" className="mb-1 text-primary-main">
                      {job.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {job.company} • {job.location}
                    </Typography>
                    <Box className="flex gap-2 mb-3">
                      {job.skills.map(skill => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          className="bg-gray-100"
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {job.type} • {job.salary} • {job.posted}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSaveJob(job.id)
                    }}
                    className="text-primary-main"
                  >
                    {savedJobs.includes(job.id) ? <Bookmark /> : <BookmarkBorder />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Job Detail Dialog */}
      <JobDetailDialog
        job={selectedJob}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onSave={toggleSaveJob}
        isSaved={selectedJob ? savedJobs.includes(selectedJob.id) : false}
      />
    </Container>
  )
}

export default JobSearch 