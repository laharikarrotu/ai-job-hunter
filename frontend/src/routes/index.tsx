import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import Loading from '@/components/common/Loading'

// Lazy load pages
const Home = React.lazy(() => import('../pages/Home'))
const Login = React.lazy(() => import('../pages/auth/Login'))
const Register = React.lazy(() => import('../pages/auth/Register'))
const Dashboard = React.lazy(() => import('@/pages/Dashboard'))
const Profile = React.lazy(() => import('@/pages/Profile'))
const JobSearch = React.lazy(() => import('@/pages/JobSearch'))
const SavedJobs = React.lazy(() => import('@/pages/SavedJobs'))
const ApplicationTracking = React.lazy(() => import('@/pages/ApplicationTracking'))
const ResumeBuilder = React.lazy(() => import('../pages/resume/ResumeBuilder'))
const InterviewScheduler = React.lazy(() => import('../pages/interview/InterviewScheduler'))
const NotFound = React.lazy(() => import('../pages/NotFound'))

// Loading component
const PageLoader = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loading />}>
    {children}
  </Suspense>
)

const ProtectedPage = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <Layout>
      <PageLoader>
        {children}
      </PageLoader>
    </Layout>
  </ProtectedRoute>
)

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PageLoader><Home /></PageLoader>} />
      <Route path="/login" element={<PageLoader><Login /></PageLoader>} />
      <Route path="/register" element={<PageLoader><Register /></PageLoader>} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedPage><Dashboard /></ProtectedPage>} />
      <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
      <Route path="/jobs" element={<ProtectedPage><JobSearch /></ProtectedPage>} />
      <Route path="/saved-jobs" element={<ProtectedPage><SavedJobs /></ProtectedPage>} />
      <Route path="/applications" element={<ProtectedPage><ApplicationTracking /></ProtectedPage>} />
      <Route path="/resume-builder" element={<ProtectedPage><ResumeBuilder /></ProtectedPage>} />
      <Route path="/interviews" element={<ProtectedPage><InterviewScheduler /></ProtectedPage>} />
      
      {/* 404 Route */}
      <Route path="*" element={<PageLoader><NotFound /></PageLoader>} />
    </Routes>
  )
}

export default AppRoutes 