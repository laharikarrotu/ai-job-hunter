import React from 'react'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import AppRoutes from './routes'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'

function App() {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ThemeProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </MUIThemeProvider>
  )
}

export default App 