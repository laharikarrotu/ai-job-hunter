import React from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton
} from '@mui/material'
import {
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  BusinessCenter as JobIcon,
  Check as CheckIcon,
  Schedule as PendingIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

const recentApplications = [
  {
    company: 'Tech Corp',
    position: 'Senior Developer',
    status: 'Applied',
    date: '2024-02-20'
  },
  {
    company: 'Innovation Labs',
    position: 'Full Stack Engineer',
    status: 'Interview',
    date: '2024-02-19'
  },
  {
    company: 'Future Systems',
    position: 'AI Engineer',
    status: 'Pending',
    date: '2024-02-18'
  }
]

const StatCard = ({ title, value, icon, color }: {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
}) => (
  <Card className="card-hover">
    <CardContent>
      <Box className="flex justify-between items-start">
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h3" component="div" className="font-bold">
            {value}
          </Typography>
        </Box>
        <Box
          className="p-2 rounded-lg"
          sx={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <Container maxWidth="lg" className="py-8 fade-in">
      <Typography variant="h4" component="h1" className="mb-6">
        Dashboard
      </Typography>
      
      <Box className="mb-8 flex justify-between items-center">
        <Typography variant="h4" className="font-bold">
          Welcome back, {user?.firstName}!
        </Typography>
      </Box>

      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} md={4}>
          <StatCard
            title="Jobs Applied"
            value={25}
            icon={<WorkIcon sx={{ color: '#2563eb' }} />}
            color="#2563eb"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Interviews"
            value={5}
            icon={<AssignmentIcon sx={{ color: '#7c3aed' }} />}
            color="#7c3aed"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Success Rate"
            value="20%"
            icon={<TrendingUpIcon sx={{ color: '#059669' }} />}
            color="#059669"
          />
        </Grid>
      </Grid>

      <Box className="mb-8">
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h5" className="font-semibold">
            Recent Applications
          </Typography>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Card>
          <CardContent>
            <List>
              {recentApplications.map((app, index) => (
                <ListItem 
                  key={index}
                  className="hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <ListItemIcon>
                    <JobIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box className="flex items-center">
                        <Typography variant="subtitle1" className="font-medium">
                          {app.position}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className="ml-2">
                          at {app.company}
                        </Typography>
                      </Box>
                    }
                    secondary={app.date}
                  />
                  <Chip
                    icon={app.status === 'Applied' ? <CheckIcon /> : <PendingIcon />}
                    label={app.status}
                    color={app.status === 'Interview' ? 'success' : 'default'}
                    className="ml-2"
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Dashboard 