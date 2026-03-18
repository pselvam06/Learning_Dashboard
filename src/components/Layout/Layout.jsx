// src/components/Layout/Layout.jsx
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      <Sidebar 
        mobileOpen={mobileOpen} 
        onClose={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
          mt: '64px',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout