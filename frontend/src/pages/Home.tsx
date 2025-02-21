import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  CardHeader
} from '@mui/material'
import {
  Search as SearchIcon,
  AutoAwesome as AIIcon,
  Speed as SpeedIcon,
  Notifications
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
      py: 8 
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700,
              color: '#1e293b',
              mb: 2 
            }}
          >
            Find Your Dream Job with AI
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#64748b',
              mb: 4 
            }}
          >
            Let AI help you discover and apply to the perfect opportunities
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: '#2563eb',
              '&:hover': {
                bgcolor: '#1d4ed8',
              },
              px: 6,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Get Started
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: 'white',
              p: 4,
              borderRadius: 4,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              height: '100%',
            }}>
              <SearchIcon sx={{ fontSize: 40, color: '#2563eb', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Smart Job Matching
              </Typography>
              <Typography color="text.secondary">
                Our AI analyzes your skills and experience to find the best job matches
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: 'white',
              p: 4,
              borderRadius: 4,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              height: '100%',
            }}>
              <AIIcon sx={{ fontSize: 40, color: '#2563eb', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                AI-Powered Applications
              </Typography>
              <Typography color="text.secondary">
                Automated application process with smart resume tailoring
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{
              bgcolor: 'white',
              p: 4,
              borderRadius: 4,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              height: '100%',
            }}>
              <Notifications sx={{ fontSize: 40, color: '#2563eb', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Real-time Updates
              </Typography>
              <Typography color="text.secondary">
                Get instant notifications about application status and interviews
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Home 