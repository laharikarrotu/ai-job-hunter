import { createContext, useContext, useState, ReactNode } from 'react'
import type { User } from '@/types/user'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  savedJobs: number[]
  removeSavedJob: (jobId: number) => void
  addSavedJob: (jobId: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const isAuthenticated = !!user

  const login = async (email: string, password: string) => {
    // Login logic
    const userData: User = {
      id: '1',
      email,
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://example.com/avatar.jpg',
    }
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
    setSavedJobs([])
  }

  const removeSavedJob = (jobId: number) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId))
  }

  const addSavedJob = (jobId: number) => {
    setSavedJobs(prev => [...prev, jobId])
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      savedJobs,
      removeSavedJob,
      addSavedJob
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 