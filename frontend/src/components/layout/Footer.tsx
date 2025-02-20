import React from 'react'
import { Box, Container, Typography, Link, Grid } from '@mui/material'
import {
  GitHub,
  LinkedIn,
  Twitter
} from '@mui/icons-material'

const Footer = () => {
  return (
    <Box component="footer" className="bg-gray-100 py-8 mt-auto">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4">
              AI Job Hunter
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Revolutionizing job hunting with AI-powered matching and automation.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4">
              Quick Links
            </Typography>
            <Box className="flex flex-col space-y-2">
              <Link href="/about" className="nav-link">About Us</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <Link href="/privacy" className="nav-link">Privacy Policy</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4">
              Connect With Us
            </Typography>
            <Box className="flex space-x-4">
              <Link href="https://github.com" className="text-gray-600 hover:text-primary-main">
                <GitHub />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-600 hover:text-primary-main">
                <LinkedIn />
              </Link>
              <Link href="https://twitter.com" className="text-gray-600 hover:text-primary-main">
                <Twitter />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box className="mt-8 pt-4 border-t border-gray-200 text-center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} AI Job Hunter. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer 