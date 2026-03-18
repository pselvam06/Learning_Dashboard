import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
  Tooltip,
  LinearProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Grade as GradeIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Download as DownloadIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Submissions = () => {
  const navigate = useNavigate();
  const { isEducator, isCoordinator } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [openGradeDialog, setOpenGradeDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  // Mock data - replace with API call
  const submissions = [
    {
      id: 1,
      student: {
        name: 'Alice Brown',
        email: 'alice@example.com',
        avatar: 'AB',
      },
      assignment: {
        id: 101,
        title: 'React Component Project',
        course: 'Full Stack Web Development',
      },
      submittedAt: '2024-02-10T14:30:00',
      status: 'pending',
      files: ['project.zip', 'screenshots.pdf'],
      grade: null,
      feedback: null,
      late: false,
    },
    {
      id: 2,
      student: {
        name: 'Bob Smith',
        email: 'bob@example.com',
        avatar: 'BS',
      },
      assignment: {
        id: 101,
        title: 'React Component Project',
        course: 'Full Stack Web Development',
      },
      submittedAt: '2024-02-09T16:45:00',
      status: 'graded',
      files: ['react-components.zip'],
      grade: 85,
      feedback: 'Good work! Consider adding more comments.',
      late: false,
    },
    {
      id: 3,
      student: {
        name: 'Carol White',
        email: 'carol@example.com',
        avatar: 'CW',
      },
      assignment: {
        id: 102,
        title: 'JavaScript Quiz',
        course: 'JavaScript Fundamentals',
      },
      submittedAt: '2024-02-08T11:20:00',
      status: 'graded',
      files: [],
      grade: 92,
      feedback: 'Excellent! Perfect score.',
      late: false,
    },
    {
      id: 4,
      student: {
        name: 'David Lee',
        email: 'david@example.com',
        avatar: 'DL',
      },
      assignment: {
        id: 103,
        title: 'Database Design',
        course: 'MongoDB Mastery',
      },
      submittedAt: '2024-02-11T23:45:00',
      status: 'pending',
      files: ['schema-design.pdf'],
      grade: null,
      feedback: null,
      late: true,
    },
  ];

  const filteredSubmissions = submissions.filter(sub => 
    sub.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(sub => {
    if (statusFilter === 'all') return true;
    return sub.status === statusFilter;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGradeClick = (submission) => {
    setSelectedSubmission(submission);
    setGrade(submission.grade || '');
    setFeedback(submission.feedback || '');
    setOpenGradeDialog(true);
  };

  const handleSaveGrade = () => {
    // Save grade logic here
    setOpenGradeDialog(false);
  };

  const getStatusChip = (status, late) => {
    if (late) {
      return <Chip icon={<ScheduleIcon />} label="Late" color="warning" size="small" />;
    }
    switch(status) {
      case 'graded':
        return <Chip icon={<CheckCircleIcon />} label="Graded" color="success" size="small" />;
      case 'pending':
        return <Chip icon={<ScheduleIcon />} label="Pending" color="info" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Submissions
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Review and grade student submissions
          </Typography>
        </Box>
        {(isEducator || isCoordinator) && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
          >
            Export Report
          </Button>
        )}
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Total Submissions
              </Typography>
              <Typography variant="h4">156</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Pending Review
              </Typography>
              <Typography variant="h4" color="warning.main">42</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Graded
              </Typography>
              <Typography variant="h4" color="success.main">98</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Average Score
              </Typography>
              <Typography variant="h4">82%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by student or assignment..."
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
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="graded">Graded</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Assignment</InputLabel>
              <Select label="Assignment">
                <MenuItem value="all">All Assignments</MenuItem>
                <MenuItem value="101">React Component Project</MenuItem>
                <MenuItem value="102">JavaScript Quiz</MenuItem>
                <MenuItem value="103">Database Design</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Submissions Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Assignment</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Files</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubmissions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((submission) => (
                  <TableRow key={submission.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {submission.student.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{submission.student.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {submission.student.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{submission.assignment.title}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {submission.assignment.course}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(submission.submittedAt).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {getStatusChip(submission.status, submission.late)}
                    </TableCell>
                    <TableCell>
                      {submission.files.length > 0 ? (
                        <Tooltip title={submission.files.join(', ')}>
                          <Chip 
                            label={`${submission.files.length} file(s)`} 
                            size="small" 
                            variant="outlined"
                          />
                        </Tooltip>
                      ) : (
                        <Typography variant="caption" color="textSecondary">
                          No files
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {submission.grade ? (
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {submission.grade}%
                          </Typography>
                          <Rating value={submission.grade / 20} readOnly size="small" />
                        </Box>
                      ) : (
                        <Typography variant="caption" color="textSecondary">
                          Not graded
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Submission">
                        <IconButton size="small" onClick={() => navigate(`/submissions/${submission.id}`)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      {(isEducator || isCoordinator) && submission.status === 'pending' && (
                        <Tooltip title="Grade">
                          <IconButton size="small" color="primary" onClick={() => handleGradeClick(submission)}>
                            <GradeIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSubmissions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Grade Dialog */}
      <Dialog open={openGradeDialog} onClose={() => setOpenGradeDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Grade Submission
          {selectedSubmission && (
            <Typography variant="subtitle2" color="textSecondary">
              {selectedSubmission.student.name} - {selectedSubmission.assignment.title}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Grade (%)"
                type="number"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                InputProps={{
                  inputProps: { min: 0, max: 100 },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status" defaultValue="graded">
                  <MenuItem value="graded">Mark as Graded</MenuItem>
                  <MenuItem value="pending">Mark as Pending</MenuItem>
                  <MenuItem value="rejected">Request Revision</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Feedback"
                multiline
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide feedback to the student..."
              />
            </Grid>
            {selectedSubmission?.files.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Submitted Files:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedSubmission.files.map((file, index) => (
                    <Chip
                      key={index}
                      label={file}
                      onDelete={() => {}}
                      deleteIcon={<DownloadIcon />}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGradeDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveGrade}>
            Save Grade
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Submissions;