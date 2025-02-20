import { Job } from '@/types'
import { Card, Typography, Box, Chip, IconButton } from '@mui/material'
import { Work, LocationOn, AttachMoney, Delete } from '@mui/icons-material'

interface JobCardProps {
  job: Job
  onClick?: () => void
  onRemove?: () => void
}

export const JobCard = ({ job, onClick, onRemove }: JobCardProps) => {
  return (
    <Card onClick={onClick} className="card-hover p-4">
      <Box className="flex justify-between items-start">
        <Box>
          <Typography variant="h6" className="font-semibold">
            {job.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {job.company}
          </Typography>
          
          <Box className="flex gap-4 mt-2">
            <Box className="flex items-center text-gray-600">
              <LocationOn className="mr-1" fontSize="small" />
              {job.location}
            </Box>
            <Box className="flex items-center text-gray-600">
              <Work className="mr-1" fontSize="small" />
              {job.type}
            </Box>
            <Box className="flex items-center text-gray-600">
              <AttachMoney className="mr-1" fontSize="small" />
              {job.salary}
            </Box>
          </Box>
        </Box>
        
        <Box className="flex flex-col gap-2">
          {onRemove && (
            <IconButton 
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
              size="small"
              color="error"
            >
              <Delete fontSize="small" />
            </IconButton>
          )}
          <Box className="flex flex-wrap gap-1">
            {job.skills.slice(0, 3).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                className="bg-primary-light text-white"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  )
} 