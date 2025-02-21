import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import AppRoutes from './routes'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App 