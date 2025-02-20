import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  Chip
} from '@mui/material'
import {
  Email,
  Phone,
  LocationOn,
  Work,
  School
} from '@mui/icons-material'
import type { ResumeData } from './types' // We'll create this file

interface ResumePreviewProps {
  data: ResumeData
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  return (
    <Paper className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <Box className="text-center mb-6">
        <Typography variant="h4" className="mb-2">
          {data.personalInfo.name}
        </Typography>
        <Box className="flex justify-center gap-4 text-gray-600">
          <Box className="flex items-center">
            <Email fontSize="small" className="mr-1" />
            {data.personalInfo.email}
          </Box>
          <Box className="flex items-center">
            <Phone fontSize="small" className="mr-1" />
            {data.personalInfo.phone}
          </Box>
          <Box className="flex items-center">
            <LocationOn fontSize="small" className="mr-1" />
            {data.personalInfo.location}
          </Box>
        </Box>
      </Box>

      {/* Summary */}
      <Box className="mb-6">
        <Typography variant="h6" gutterBottom>
          Professional Summary
        </Typography>
        <Typography>{data.personalInfo.summary}</Typography>
      </Box>

      <Divider className="my-4" />

      {/* Experience */}
      <Box className="mb-6">
        <Typography variant="h6" gutterBottom className="flex items-center">
          <Work className="mr-2" />
          Professional Experience
        </Typography>
        {data.experience.map((exp: {
          id: string
          company: string
          position: string
          startDate: string
          endDate: string
          description: string[]
        }) => (
          <Box key={exp.id} className="mb-4">
            <Typography variant="subtitle1" className="font-bold">
              {exp.position}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {exp.company} | {exp.startDate} - {exp.endDate}
            </Typography>
            <List>
              {exp.description.map((desc: string, index: number) => (
                <ListItem key={index} className="py-0">
                  • {desc}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      <Divider className="my-4" />

      {/* Education */}
      <Box className="mb-6">
        <Typography variant="h6" gutterBottom className="flex items-center">
          <School className="mr-2" />
          Education
        </Typography>
        {data.education.map((edu: {
          id: string
          school: string
          degree: string
          field: string
          graduationDate: string
        }) => (
          <Box key={edu.id} className="mb-4">
            <Typography variant="subtitle1" className="font-bold">
              {edu.degree} in {edu.field}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {edu.school} | Graduated: {edu.graduationDate}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider className="my-4" />

      {/* Skills */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <Box className="flex flex-wrap gap-2">
          {data.skills.map((skill: string) => (
            <Chip
              key={skill}
              label={skill}
              className="bg-primary-light text-white"
            />
          ))}
        </Box>
      </Box>
    </Paper>
  )
}

export default ResumePreview 