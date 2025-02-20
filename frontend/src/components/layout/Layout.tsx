import { useState } from 'react'
import { Box, useMediaQuery, useTheme, IconButton, Drawer } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const sidebarWidth = 280

  return (
    <Box className="min-h-screen bg-gray-50">
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={isMobile && sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: sidebarWidth, boxSizing: 'border-box' },
        }}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            width: sidebarWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'grey.200',
          },
        }}
        open
      >
        <Sidebar onClose={() => {}} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${sidebarWidth}px)` },
          ml: { md: `${sidebarWidth}px` },
        }}
      >
        <Navbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Navbar>
        <Box component="main" className="p-4">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout 