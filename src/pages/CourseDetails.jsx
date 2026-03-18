import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isCoordinator, isEducator } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API call
  const course = {
    id: 1,
    code: 'CS101',
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of computer science including algorithms, data structures, and programming basics.',
    instructor: 'Dr. Sarah Johnson',
    progress: 75,
    totalStudents: 45,
    assignments: 8,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    color: '#1976d2',
    syllabus: [
      { week: 1, topic: 'Introduction to Programming', status: 'completed' },
      { week: 2, topic: 'Variables and Data Types', status: 'completed' },
      { week: 3, topic: 'Control Structures', status: 'in-progress' },
      { week: 4, topic: 'Functions', status: 'pending' },
      { week: 5, topic: 'Arrays and Lists', status: 'pending' },
    ],
    instructors: [
      { name: 'Dr. Sarah Johnson', role: 'Lead Instructor', avatar: 'SJ' },
      { name: 'Prof. John Doe', role: 'Teaching Assistant', avatar: 'JD' },
    ],
    students: [
      { id: 1, name: 'Alice Brown', email: 'alice@example.com', progress: 85, status: 'active' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', progress: 92, status: 'active' },
      { id: 3, name: 'Carol White', email: 'carol@example.com', progress: 67, status: 'active' },
      { id: 4, name: 'David Lee', email: 'david@example.com', progress: 78, status: 'inactive' },
    ],
    assignments: [
      { id: 1, title: 'Programming Basics Quiz', dueDate: '2024-02-15', submissions: 32, total: 45, status: 'active' },
      { id: 2, title: 'Data Structures Assignment', dueDate: '2024-02-28', submissions: 28, total: 45, status: 'upcoming' },
      { id: 3, title: 'Algorithm Analysis', dueDate: '2024-03-10', submissions: 0, total: 45, status: 'draft' },
    ],
    resources: [
      { id: 1, title: 'Course Syllabus', type: 'PDF', size: '2.5 MB', uploadedBy: 'Dr. Sarah Johnson' },
      { id: 2, title: 'Lecture 1 Slides', type: 'PPT', size: '5.1 MB', uploadedBy: 'Dr. Sarah Johnson' },
      { id: 3, title: 'Python Setup Guide', type: 'PDF', size: '1.2 MB', uploadedBy: 'Prof. John Doe' },
    ],
  };

  const filteredStudents = course.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'upcoming': return 'warning';
      case 'draft': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/courses')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {course.code} • {course.instructor}
          </Typography>
        </Box>
        {(isCoordinator || isEducator) && (
          <Box>
            <Button variant="outlined" startIcon={<EditIcon />} sx={{ mr: 1 }}>
              Edit
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Box>
        )}
      </Box>

      {/* Course Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Status
              </Typography>
              <Chip 
                label={course.status.toUpperCase()} 
                color={getStatusColor(course.status)}
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Duration
              </Typography>
              <Typography variant="h6">
                {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Students
              </Typography>
              <Typography variant="h6">{course.totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Overall Progress
              </Typography>
              <Box display="flex" alignItems="center">
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <LinearProgress variant="determinate" value={course.progress} />
                </Box>
                <Typography variant="body2">{course.progress}%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="Overview" />
          <Tab label="Students" />
          <Tab label="Assignments" />
          <Tab label="Resources" />
          <Tab label="Grades" />
        </Tabs>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Course Description
              </Typography>
              <Typography paragraph>{course.description}</Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Syllabus
              </Typography>
              <List>
                {course.syllabus.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: item.status === 'completed' ? 'success.main' : 'primary.main' }}>
                          {item.week}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.topic}
                        secondary={`Week ${item.week}`}
                      />
                      <Chip 
                        label={item.status.replace('-', ' ')} 
                        size="small"
                        color={getStatusColor(item.status)}
                      />
                    </ListItem>
                    {index < course.syllabus.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Instructors
                  </Typography>
                  <List>
                    {course.instructors.map((instructor, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar>{instructor.avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={instructor.name}
                          secondary={instructor.role}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Stats
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 2 }}>
                    <Box textAlign="center">
                      <PeopleIcon color="primary" />
                      <Typography variant="h6">{course.totalStudents}</Typography>
                      <Typography variant="caption">Students</Typography>
                    </Box>
                    <Box textAlign="center">
                      <AssignmentIcon color="primary" />
                      <Typography variant="h6">{course.assignments}</Typography>
                      <Typography variant="caption">Assignments</Typography>
                    </Box>
                    <Box textAlign="center">
                      <ScheduleIcon color="primary" />
                      <Typography variant="h6">{course.syllabus.length}</Typography>
                      <Typography variant="caption">Weeks</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Students Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search students..."
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
              <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                {(isCoordinator || isEducator) && (
                  <Button variant="contained" startIcon={<AddIcon />}>
                    Add Students
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar>{student.name[0]}</Avatar>
                        {student.name}
                      </Box>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={student.progress} 
                          sx={{ width: 100 }}
                        />
                        <Typography variant="body2">{student.progress}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={student.status} 
                        color={getStatusColor(student.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton size="small">
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                      {(isCoordinator || isEducator) && (
                        <Tooltip title="Remove">
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Assignments Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 3, textAlign: 'right' }}>
            {(isCoordinator || isEducator) && (
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => navigate('/assignments/new')}
              >
                Create Assignment
              </Button>
            )}
          </Box>

          <Grid container spacing={3}>
            {course.assignments.map((assignment) => (
              <Grid item xs={12} md={6} key={assignment.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Typography variant="h6" gutterBottom>
                        {assignment.title}
                      </Typography>
                      <Chip 
                        label={assignment.status} 
                        color={getStatusColor(assignment.status)}
                        size="small"
                      />
                    </Box>
                    <Typography color="textSecondary" gutterBottom>
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Submissions</Typography>
                        <Typography variant="body2">
                          {assignment.submissions}/{assignment.total}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(assignment.submissions / assignment.total) * 100}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button size="small" onClick={() => navigate(`/assignments/${assignment.id}`)}>
                        View Details
                      </Button>
                      {(isCoordinator || isEducator) && (
                        <Button size="small">Grade</Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Resources Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 3, textAlign: 'right' }}>
            {(isCoordinator || isEducator) && (
              <Button variant="contained" startIcon={<AddIcon />}>
                Upload Resource
              </Button>
            )}
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Resource Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Uploaded By</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {course.resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.title}</TableCell>
                    <TableCell>
                      <Chip label={resource.type} size="small" />
                    </TableCell>
                    <TableCell>{resource.size}</TableCell>
                    <TableCell>{resource.uploadedBy}</TableCell>
                    <TableCell>
                      <Tooltip title="Download">
                        <IconButton size="small">
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                      {(isCoordinator || isEducator) && (
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Grades Tab */}
        <TabPanel value={tabValue} index={4}>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ py: 4 }}>
            Grade book coming soon...
          </Typography>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default CourseDetails;