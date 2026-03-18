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
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Paper,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  Grade as GradeIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Assignments = () => {
  const navigate = useNavigate();
  const { isEducator, isCoordinator } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);

  // Mock data - replace with API call
  const assignments = [
    {
      id: 1,
      title: 'React Component Project',
      course: 'Full Stack Web Development',
      description: 'Build a reusable component library using React and Material-UI',
      dueDate: '2024-02-15T23:59:59',
      totalPoints: 100,
      submissions: 32,
      totalStudents: 45,
      type: 'assignment',
      status: 'active',
      priority: 'high',
      color: '#1976d2',
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals Quiz',
      course: 'Computer Science 101',
      description: 'Quiz covering closures, promises, and async/await',
      dueDate: '2024-02-10T23:59:59',
      totalPoints: 50,
      submissions: 38,
      totalStudents: 40,
      type: 'quiz',
      status: 'active',
      priority: 'urgent',
      color: '#dc004e',
    },
    {
      id: 3,
      title: 'Database Design Task',
      course: 'MongoDB Mastery',
      description: 'Design a schema for an e-commerce platform',
      dueDate: '2024-02-20T23:59:59',
      totalPoints: 75,
      submissions: 15,
      totalStudents: 35,
      type: 'task',
      status: 'upcoming',
      priority: 'medium',
      color: '#2e7d32',
    },
    {
      id: 4,
      title: 'API Integration Exercise',
      course: 'Backend Development',
      description: 'Create RESTful API endpoints with Express',
      dueDate: '2024-02-25T23:59:59',
      totalPoints: 100,
      submissions: 0,
      totalStudents: 30,
      type: 'assignment',
      status: 'draft',
      priority: 'low',
      color: '#ed6c02',
    },
  ];

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.course.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(assignment => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return assignment.status === 'active';
    if (tabValue === 2) return assignment.status === 'upcoming';
    if (tabValue === 3) return assignment.status === 'draft';
    return true;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'quiz':
        return <GradeIcon />;
      case 'task':
        return <AssignmentIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'upcoming': return 'info';
      case 'draft': return 'default';
      default: return 'default';
    }
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Assignments
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage and track all assignments, quizzes, and tasks
          </Typography>
        </Box>
        {(isEducator || isCoordinator) && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/assignments/new')}
          >
            Create Assignment
          </Button>
        )}
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="All" />
          <Tab label="Active" />
          <Tab label="Upcoming" />
          <Tab label="Drafts" />
        </Tabs>
      </Paper>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search assignments..."
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
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            >
              Filter
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SortIcon />}
              onClick={(e) => setSortAnchorEl(e.currentTarget)}
            >
              Sort
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Assignments Grid */}
      <Grid container spacing={3}>
        {filteredAssignments.map((assignment) => {
          const daysRemaining = getDaysRemaining(assignment.dueDate);
          return (
            <Grid item xs={12} md={6} key={assignment.id}>
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
                  position: 'relative',
                }}
                onClick={() => navigate(`/assignments/${assignment.id}`)}
              >
                {daysRemaining <= 2 && daysRemaining > 0 && assignment.status === 'active' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      zIndex: 1,
                    }}
                  >
                    <Tooltip title={`${daysRemaining} days remaining`}>
                      <WarningIcon color="warning" />
                    </Tooltip>
                  </Box>
                )}
                
                <Box sx={{ height: 8, bgcolor: assignment.color }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box>
                      <Typography variant="caption" color="primary" gutterBottom>
                        {assignment.course}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {assignment.title}
                      </Typography>
                    </Box>
                    <Chip 
                      icon={getTypeIcon(assignment.type)}
                      label={assignment.type}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {assignment.description}
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={4}>
                      <Box textAlign="center">
                        <Typography variant="body2">{assignment.totalPoints}</Typography>
                        <Typography variant="caption">Points</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box textAlign="center">
                        <Typography variant="body2">
                          {assignment.submissions}/{assignment.totalStudents}
                        </Typography>
                        <Typography variant="caption">Submissions</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box textAlign="center">
                        <Typography variant="body2">
                          {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                        </Typography>
                        <Typography variant="caption">Rate</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <ScheduleIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Chip 
                        label={assignment.priority}
                        size="small"
                        color={getPriorityColor(assignment.priority)}
                      />
                      <Chip 
                        label={assignment.status}
                        size="small"
                        color={getStatusColor(assignment.status)}
                      />
                    </Box>
                  </Box>

                  {assignment.status === 'active' && (
                    <Box sx={{ mt: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption">Submission Progress</Typography>
                        <Typography variant="caption">
                          {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(assignment.submissions / assignment.totalStudents) * 100}
                      />
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={(e) => { e.stopPropagation(); navigate(`/assignments/${assignment.id}`); }}>
                    View Details
                  </Button>
                  {(isEducator || isCoordinator) && (
                    <Button size="small" color="primary">
                      Grade
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Assignments;