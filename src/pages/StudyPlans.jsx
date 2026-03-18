import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayArrowIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StudyPlans = () => {
  const navigate = useNavigate();
  const { isEducator } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data - replace with API call
  const studyPlans = [
    {
      id: 1,
      title: 'React Mastery Path',
      course: 'Full Stack Web Development',
      description: 'Comprehensive study plan to master React from basics to advanced concepts',
      progress: 45,
      duration: '8 weeks',
      weeks: 8,
      status: 'in-progress',
      startDate: '2024-01-15',
      endDate: '2024-03-10',
      color: '#1976d2',
      modules: [
        { name: 'React Basics', completed: true },
        { name: 'Hooks & State', completed: true },
        { name: 'Routing', completed: false },
        { name: 'Redux', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      course: 'Computer Science Fundamentals',
      description: 'Systematic approach to mastering DSA for technical interviews',
      progress: 70,
      duration: '12 weeks',
      weeks: 12,
      status: 'in-progress',
      startDate: '2024-01-10',
      endDate: '2024-04-05',
      color: '#2e7d32',
      modules: [
        { name: 'Arrays & Strings', completed: true },
        { name: 'Linked Lists', completed: true },
        { name: 'Trees & Graphs', completed: true },
        { name: 'Dynamic Programming', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Python for Data Science',
      course: 'Data Science Fundamentals',
      description: 'Learn Python programming with focus on data analysis and visualization',
      progress: 25,
      duration: '6 weeks',
      weeks: 6,
      status: 'not-started',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      color: '#ed6c02',
      modules: [
        { name: 'Python Basics', completed: false },
        { name: 'NumPy', completed: false },
        { name: 'Pandas', completed: false },
        { name: 'Matplotlib', completed: false },
      ],
    },
    {
      id: 4,
      title: 'System Design Fundamentals',
      course: 'Advanced Software Engineering',
      description: 'Learn how to design scalable systems for tech interviews',
      progress: 100,
      duration: '4 weeks',
      weeks: 4,
      status: 'completed',
      startDate: '2023-12-01',
      endDate: '2024-01-01',
      color: '#9c27b0',
      modules: [
        { name: 'Load Balancing', completed: true },
        { name: 'Caching', completed: true },
        { name: 'Database Design', completed: true },
        { name: 'Microservices', completed: true },
      ],
    },
  ];

  const filteredPlans = studyPlans.filter(plan =>
    plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'in-progress': return 'primary';
      case 'completed': return 'success';
      case 'not-started': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'in-progress': return <PlayArrowIcon />;
      case 'completed': return <CheckCircleIcon />;
      case 'not-started': return <LockIcon />;
      default: return <ScheduleIcon />;
    }
  };

  const handlePlanClick = (planId) => {
    navigate(`/study-plans/${planId}`);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Study Plans
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Structured learning paths to guide your progress
          </Typography>
        </Box>
        {isEducator && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Create Study Plan
          </Button>
        )}
      </Box>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search study plans by title or course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Paper>

      {/* Study Plans Grid */}
      <Grid container spacing={3}>
        {filteredPlans.map((plan) => (
          <Grid item xs={12} md={6} key={plan.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => handlePlanClick(plan.id)}
            >
              <Box sx={{ height: 8, bgcolor: plan.color }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="caption" color="primary" gutterBottom>
                      {plan.course}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {plan.title}
                    </Typography>
                  </Box>
                  <Chip 
                    icon={getStatusIcon(plan.status)}
                    label={plan.status.replace('-', ' ')} 
                    color={getStatusColor(plan.status)}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {plan.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2">Overall Progress</Typography>
                    <Typography variant="body2">{plan.progress}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={plan.progress} />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Typography variant="h6">{plan.duration}</Typography>
                      <Typography variant="caption">Duration</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Typography variant="h6">{plan.weeks}</Typography>
                      <Typography variant="caption">Weeks</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Typography variant="h6">
                        {plan.modules.filter(m => m.completed).length}/{plan.modules.length}
                      </Typography>
                      <Typography variant="caption">Modules</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Key Modules
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {plan.modules.slice(0, 3).map((module, index) => (
                      <Chip
                        key={index}
                        label={module.name}
                        size="small"
                        color={module.completed ? 'success' : 'default'}
                        variant={module.completed ? 'filled' : 'outlined'}
                      />
                    ))}
                    {plan.modules.length > 3 && (
                      <Chip label={`+${plan.modules.length - 3} more`} size="small" variant="outlined" />
                    )}
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={(e) => { e.stopPropagation(); handlePlanClick(plan.id); }}>
                  View Details
                </Button>
                {plan.status === 'in-progress' && (
                  <Button size="small" color="primary">
                    Continue Learning
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Study Plan Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Study Plan</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Course</InputLabel>
                <Select label="Course">
                  <MenuItem value="1">Full Stack Web Development</MenuItem>
                  <MenuItem value="2">Computer Science Fundamentals</MenuItem>
                  <MenuItem value="3">Data Science Fundamentals</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Plan Title" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Weeks"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status">
                  <MenuItem value="not-started">Not Started</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Plan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudyPlans;