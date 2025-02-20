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
  Speed as SpeedIcon
} from '@mui/icons-material'

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box className="gradient-bg py-20 text-white">
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" className="text-center fade-in" gutterBottom>
            Find Your Dream Job with AI
          </Typography>
          <Typography variant="h5" className="text-center mb-8 fade-in" paragraph>
            Let our AI-powered platform match you with the perfect job opportunities
          </Typography>
          <Box className="flex justify-center space-x-4">
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="secondary"
              size="large"
              className="card-hover"
            >
              Get Started
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              className="text-white border-white hover:bg-white/10 card-hover"
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" className="py-16">
        <Grid container spacing={4}>
          {[
            {
              title: "Smart Job Matching",
              icon: <SearchIcon color="primary" />,
              description: "Our AI analyzes your skills and experience to find the best job matches"
            },
            {
              title: "AI-Powered Applications",
              icon: <AIIcon color="primary" />,
              description: "Automated application process with smart resume tailoring"
            },
            {
              title: "Real-time Updates",
              icon: <SpeedIcon color="primary" />,
              description: "Get instant notifications about application status and interviews"
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="h-full card-hover">
                <CardHeader
                  title={feature.title}
                  avatar={feature.icon}
                  className="text-primary-main"
                />
                <CardContent>
                  <Typography>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Home 