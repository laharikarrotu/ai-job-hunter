import React, { useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  IconButton,
  Alert
} from '@mui/material'
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Upload as UploadIcon,
  Save as SaveIcon
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // TODO: Implement profile update
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <Container maxWidth="lg" className="py-8 fade-in">
      <Typography variant="h4" component="h1" className="mb-6">
        Profile Settings
      </Typography>

      {saveSuccess && (
        <Alert severity="success" className="mb-4">
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Profile Info */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="p-6 card-hover">
            <Box className="flex items-center mb-6">
              <Avatar sx={{ width: 64, height: 64 }} className="mr-4">
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography color="textSecondary">
                  {user?.email}
                </Typography>
              </Box>
              <IconButton className="ml-auto">
                <EditIcon />
              </IconButton>
            </Box>
            <Divider className="mb-6" />
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    defaultValue={user?.firstName}
                    className="card-hover"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    defaultValue={user?.lastName}
                    className="card-hover"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    defaultValue={user?.email}
                    className="card-hover"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="card-hover"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    className="mr-3"
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Resume Upload */}
        <Grid item xs={12} md={4}>
          <Card elevation={3} className="card-hover">
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Resume
              </Typography>
              <Box className="text-center p-6 border-2 border-dashed rounded-lg hover:border-primary-main transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    className="mb-3"
                  >
                    Upload Resume
                  </Button>
                </label>
                <Typography variant="body2" color="textSecondary">
                  {file ? file.name : 'PDF, DOC up to 5MB'}
                </Typography>
              </Box>
              {file && (
                <Box className="mt-4">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Save Resume
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile 