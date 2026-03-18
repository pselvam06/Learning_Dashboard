// src/components/Layout/Sidebar.jsx
import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  MenuBook as CourseIcon,
  Assignment as StudyPlanIcon,
  Quiz as AssignmentIcon,
  Upload as SubmissionIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const drawerWidth = 240

const Sidebar = ({ mobileOpen, onClose }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isCoordinator, isEducator } = useAuth()

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['coordinator', 'educator', 'learner'] },
    { text: 'Courses', icon: <CourseIcon />, path: '/courses', roles: ['coordinator', 'educator', 'learner'] },
    { text: 'Study Plans', icon: <StudyPlanIcon />, path: '/study-plans', roles: ['coordinator', 'educator', 'learner'] },
    { text: 'Assignments', icon: <AssignmentIcon />, path: '/assignments', roles: ['coordinator', 'educator', 'learner'] },
    { text: 'Submissions', icon: <SubmissionIcon />, path: '/submissions', roles: ['coordinator', 'educator', 'learner'] },
    { text: 'Users', icon: <UsersIcon />, path: '/users', roles: ['coordinator'] },
  ]

  const filteredMenu = menuItems.filter(item => 
    item.roles.includes(user?.role)
  )

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          LearnHub
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Portal
        </Typography>
      </Box>
      <Divider />
      <List>
        {filteredMenu.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path)
                if (mobileOpen) onClose()
              }}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main + '20',
                  borderRight: `3px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '30',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path 
                  ? theme.palette.primary.main 
                  : 'inherit'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Sidebar