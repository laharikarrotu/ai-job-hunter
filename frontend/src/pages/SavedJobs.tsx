import { useEffect, useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { JobCard } from '@/components/jobs/JobCard'
import { useAuth } from '@/context/AuthContext'
import { Job } from '@/types'
import { jobsApi } from '@/services/api/jobs'

export const SavedJobs = () => {
  const { savedJobs, removeSavedJob } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const savedJobsData = await Promise.all(
          savedJobs.map(id => jobsApi.getJob(id))
        )
        setJobs(savedJobsData)
      } catch (error) {
        console.error('Failed to fetch saved jobs:', error)
      }
    }

    fetchSavedJobs()
  }, [savedJobs])

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6">
        Saved Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map(job => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <JobCard
              job={job}
              onRemove={() => removeSavedJob(job.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SavedJobs 