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
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Book as BookIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Courses = () => {
  const navigate = useNavigate();
  const { isCoordinator, isEducator } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock data - replace with API call
  const courses = [
    {
      id: 1,
      code: 'CS101',
      title: 'Introduction to Computer Science',
      description: 'Learn the fundamentals of computer science including algorithms, data structures, and programming basics.',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      students: 45,
      assignments: 8,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      color: '#1976d2',
      instructors: ['SJ', 'JD'],
    },
    {
      id: 2,
      code: 'MATH201',
      title: 'Advanced Mathematics',
      description: 'Calculus, linear algebra, and differential equations for advanced students.',
      instructor: 'Prof. Michael Chen',
      progress: 45,
      students: 32,
      assignments: 6,
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-06-01',
      color: '#2e7d32',
      instructors: ['MC', 'RW'],
    },
    {
      id: 3,
      code: 'WEBDEV301',
      title: 'Full Stack Web Development',
      description: 'Master MERN stack development with hands-on projects and real-world applications.',
      instructor: 'Ms. Emily Brown',
      progress: 30,
      students: 28,
      assignments: 10,
      status: 'upcoming',
      startDate: '2024-03-01',
      endDate: '2024-07-01',
      color: '#ed6c02',
      instructors: ['EB', 'TK'],
    },
    {
      id: 4,
      code: 'DATA401',
      title: 'Data Science Fundamentals',
      description: 'Introduction to data analysis, machine learning, and statistical modeling.',
      instructor: 'Dr. James Wilson',
      progress: 90,
      students: 38,
      assignments: 12,
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-04-10',
      color: '#9c27b0',
      instructors: ['JW', 'AL'],
    },
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleMenuOpen = (event, course) => {
    setSelectedCourse(course);
    setFilterAnchorEl(event.currentTarget);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'success';
      case 'upcoming': return 'warning';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Courses
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage and track all your courses in one place
          </Typography>
        </Box>
        {(isCoordinator || isEducator) && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Create Course
          </Button>
        )}
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search courses by title, code, or instructor..."
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

      {/* Courses Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => handleCourseClick(course.id)}
            >
              <Box sx={{ height: 8, bgcolor: course.color }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="caption" color="primary" gutterBottom>
                      {course.code}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {course.title}
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, course);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={course.status.toUpperCase()} 
                    color={getStatusColor(course.status)}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={4}>
                    <Tooltip title="Students">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <PeopleIcon fontSize="small" color="action" />
                        <Typography variant="body2">{course.students}</Typography>
                      </Box>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <Tooltip title="Assignments">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <AssignmentIcon fontSize="small" color="action" />
                        <Typography variant="body2">{course.assignments}</Typography>
                      </Box>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <Tooltip title="Progress">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <ScheduleIcon fontSize="small" color="action" />
                        <Typography variant="body2">{course.progress}%</Typography>
                      </Box>
                    </Tooltip>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Instructors
                    </Typography>
                    <AvatarGroup max={3} sx={{ justifyContent: 'flex-start' }}>
                      {course.instructors.map((initials, index) => (
                        <Avatar key={index} sx={{ width: 24, height: 24, fontSize: 12 }}>
                          {initials}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Due Date
                    </Typography>
                    <Typography variant="body2">
                      {new Date(course.endDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={(e) => { e.stopPropagation(); handleCourseClick(course.id); }}>
                  View Details
                </Button>
                {(isCoordinator || isEducator) && (
                  <Button size="small" onClick={(e) => { e.stopPropagation(); }}>
                    Manage
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Course Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Course Code" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Course Title" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={4} required />
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status">
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Course
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Courses;