import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from '@mui/material'
import {
  Dashboard,
  Work,
  BookmarkBorder,
  Description,
  Event,
  Person,
} from '@mui/icons-material'

interface SidebarProps {
  onClose: () => void
}

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Job Search', icon: <Work />, path: '/jobs' },
  { text: 'Saved Jobs', icon: <BookmarkBorder />, path: '/saved-jobs' },
  { text: 'Applications', icon: <Description />, path: '/applications' },
  { text: 'Resume Builder', icon: <Description />, path: '/resume-builder' },
  { text: 'Interviews', icon: <Event />, path: '/interviews' },
  { text: 'Profile', icon: <Person />, path: '/profile' },
]

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation()

  return (
    <Box>
      <Box className="p-4">
        <Typography variant="h6" className="font-bold text-primary">
          Job Portal
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={onClose}
            className={`mx-2 rounded-lg mb-1 ${
              location.pathname === item.path
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: location.pathname === item.path ? 'white' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar 