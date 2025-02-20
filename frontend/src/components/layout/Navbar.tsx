import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
  InputBase,
  Badge
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Person,
  Login,
  AppRegistration,
  Notifications,
  Search as SearchIcon,
  NotificationsNone
} from '@mui/icons-material'
import { useAuth } from '@/context/AuthContext'
import type { User } from '@/types/user'

interface NavbarProps {
  children?: React.ReactNode
}

const Navbar = ({ children }: NavbarProps) => {
  const { user } = useAuth() as { user: User | null }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'grey.200',
        color: 'text.primary',
      }}
    >
      <Toolbar>
        {children}
        <Box 
          className="flex-1 flex items-center gap-6"
          sx={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}
        >
          {/* Single Professional Search Bar */}
          <Box 
            className="flex items-center rounded-md"
            sx={{
              maxWidth: '400px',
              width: '100%',
              backgroundColor: '#f4f4f5',
              transition: 'all 0.2s ease',
              '&:focus-within': {
                backgroundColor: '#ffffff',
                boxShadow: '0 0 0 2px #e2e8f0',
              },
            }}
          >
            <SearchIcon 
              sx={{ 
                color: '#94a3b8',
                margin: '8px',
                width: '20px',
                height: '20px'
              }} 
            />
            <InputBase
              placeholder="Search jobs..."
              fullWidth
              sx={{
                fontSize: '0.95rem',
                padding: '8px 8px 8px 0',
                '& input': {
                  padding: 0,
                  '&::placeholder': {
                    color: '#94a3b8',
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>

          <Box className="flex items-center gap-4 ml-auto">
            <IconButton 
              size="medium"
              sx={{ 
                color: '#64748b',
                '&:hover': {
                  backgroundColor: '#f8fafc',
                },
              }}
            >
              <Badge 
                badgeContent={3} 
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.75rem',
                    height: '18px',
                    minWidth: '18px',
                  }
                }}
              >
                <NotificationsNone />
              </Badge>
            </IconButton>
            <Avatar
              src={user?.avatar}
              alt={user?.firstName || 'User'}
              sx={{
                width: 36,
                height: 36,
                cursor: 'pointer',
                bgcolor: 'primary.main',
                border: '2px solid #e2e8f0',
                '&:hover': {
                  borderColor: '#cbd5e1',
                },
              }}
            >
              {!user?.avatar && user?.firstName?.[0]?.toUpperCase()}
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar 