import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

interface Notification {
  id: string
  message: string
  type: AlertColor
}

interface NotificationContextType {
  showNotification: (message: string, type: AlertColor) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = (message: string, type: AlertColor = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { id, message, type }])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity={notification.type} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
} 