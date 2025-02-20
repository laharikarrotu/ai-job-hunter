import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  Close as CloseIcon,
  LocationOn,
  Work as WorkIcon,
  AttachMoney,
  Schedule,
  BookmarkBorder,
  Bookmark,
  CheckCircle
} from '@mui/icons-material'
import { Job } from '../../data/mockJobs'

interface JobDetailDialogProps {
  job: Job | null
  open: boolean
  onClose: () => void
  onSave: (jobId: number) => void
  isSaved: boolean
}

const JobDetailDialog = ({ job, open, onClose, onSave, isSaved }: JobDetailDialogProps) => {
  if (!job) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="fade-in"
    >
      <DialogTitle className="flex justify-between items-center">
        <Typography variant="h6">{job.title}</Typography>
        <Box>
          <IconButton
            onClick={() => onSave(job.id)}
            className="mr-2"
            color={isSaved ? 'primary' : 'default'}
          >
            {isSaved ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className="mb-6">
          <Typography variant="h5" className="mb-2">{job.company}</Typography>
          <Box className="flex flex-wrap gap-4 text-gray-600">
            <Box className="flex items-center">
              <LocationOn className="mr-1" />
              {job.location}
            </Box>
            <Box className="flex items-center">
              <WorkIcon className="mr-1" />
              {job.type}
            </Box>
            <Box className="flex items-center">
              <AttachMoney className="mr-1" />
              {job.salary}
            </Box>
            <Box className="flex items-center">
              <Schedule className="mr-1" />
              {job.posted}
            </Box>
          </Box>
        </Box>

        <Divider className="my-4" />

        <Box className="mb-6">
          <Typography variant="h6" gutterBottom>Required Skills</Typography>
          <Box className="flex flex-wrap gap-2">
            {job.skills.map(skill => (
              <Chip
                key={skill}
                label={skill}
                className="bg-primary-light text-white"
              />
            ))}
          </Box>
        </Box>

        <Box className="mb-6">
          <Typography variant="h6" gutterBottom>Description</Typography>
          {job.description && (
            <Typography>{job.description}</Typography>
          )}
        </Box>

        <Box className="mb-6">
          <Typography variant="h6" gutterBottom>Requirements</Typography>
          {job.requirements && (
            <List>
              {job.requirements.map((req, index: number) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle />
                  </ListItemIcon>
                  <ListItemText primary={req} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Box className="mb-6">
          <Typography variant="h6" gutterBottom>Benefits</Typography>
          <ul className="list-disc pl-6">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="mb-2">{benefit}</li>
            ))}
          </ul>
        </Box>

        <Box className="mt-6 flex justify-end gap-3">
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" color="primary">
            Apply Now
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default JobDetailDialog 