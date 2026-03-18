import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardContent,
  IconButton,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Alert,
  AlertTitle,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Avatar,
  AvatarGroup,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  Grade as GradeIcon,
  AttachFile as AttachFileIcon,
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Description as DescriptionIcon,
  Quiz as QuizIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AssignmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isEducator, isCoordinator, isLearner } = useAuth();
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [submissionText, setSubmissionText] = useState('');

  // Mock data - replace with API call
  const assignment = {
    id: 1,
    title: 'React Component Project',
    course: 'Full Stack Web Development',
    description: 'Build a reusable component library using React and Material-UI. Your submission should include at least 5 different components with proper documentation and examples.',
    instructions: `
      1. Create a GitHub repository for your component library
      2. Implement at least 5 reusable components (Button, Card, Modal, Input, Select)
      3. Each component should have proper PropTypes or TypeScript types
      4. Include example usage for each component
      5. Write a README with installation and usage instructions
      6. Deploy the component showcase to Netlify or Vercel
    `,
    dueDate: '2024-02-15T23:59:59',
    totalPoints: 100,
    type: 'assignment',
    status: 'active',
    submissions: 32,
    totalStudents: 45,
    passingScore: 70,
    timeEstimate: '3-4 hours',
    attachments: [
      { name: 'project-template.zip', size: '2.5 MB' },
      { name: 'grading-rubric.pdf', size: '500 KB' },
    ],
    questions: [
      {
        id: 1,
        text: 'What is the output of console.log(typeof [])?',
        type: 'multiple-choice',
        options: ['array', 'object', 'undefined', 'null'],
        points: 5,
      },
      {
        id: 2,
        text: 'Explain the difference between let and const in JavaScript',
        type: 'text',
        points: 10,
      },
      {
        id: 3,
        text: 'Which of the following are React hooks?',
        type: 'checkbox',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        points: 10,
      },
    ],
    rubric: [
      { criterion: 'Code Quality', weight: 30, description: 'Clean, readable, and well-organized code' },
      { criterion: 'Functionality', weight: 40, description: 'Components work as expected' },
      { criterion: 'Documentation', weight: 20, description: 'Clear documentation and examples' },
      { criterion: 'Design', weight: 10, description: 'UI/UX considerations' },
    ],
    recentSubmissions: [
      { student: 'Alice Brown', submittedAt: '2024-02-10T14:30:00', status: 'pending' },
      { student: 'Bob Smith', submittedAt: '2024-02-09T16:45:00', status: 'graded', score: 85 },
      { student: 'Carol White', submittedAt: '2024-02-08T11:20:00', status: 'graded', score: 92 },
    ],
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const due = new Date(assignment.dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();
  const isUrgent = daysRemaining <= 2 && daysRemaining > 0;

  const handleSubmitAssignment = () => {
    // Handle submission logic
    setOpenSubmitDialog(false);
    // Show success message
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/assignments')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {assignment.title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {assignment.course} • {assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}
          </Typography>
        </Box>
        {(isEducator || isCoordinator) && (
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

      {/* Alert for urgent deadlines */}
      {isUrgent && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <AlertTitle>Urgent: Assignment Due Soon</AlertTitle>
          Only {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining to submit this assignment.
        </Alert>
      )}

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Assignment Details */}
        <Grid item xs={12} md={8}>
          {/* Description */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography paragraph>{assignment.description}</Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Instructions
            </Typography>
            <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
              {assignment.instructions}
            </Typography>
          </Paper>

          {/* Questions (for quizzes) */}
          {assignment.type === 'quiz' && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Questions
              </Typography>
              <List>
                {assignment.questions.map((question, index) => (
                  <React.Fragment key={question.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">
                              {index + 1}. {question.text}
                            </Typography>
                            <Chip label={`${question.points} points`} size="small" />
                          </Box>
                        }
                        secondary={
                          question.type === 'multiple-choice' && (
                            <Box sx={{ mt: 1 }}>
                              {question.options.map((option, i) => (
                                <FormControlLabel
                                  key={i}
                                  control={<Radio />}
                                  label={option}
                                  disabled
                                />
                              ))}
                            </Box>
                          )
                        }
                      />
                    </ListItem>
                    {index < assignment.questions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )}

          {/* Rubric (for assignments) */}
          {assignment.type === 'assignment' && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Grading Rubric
              </Typography>
              <List>
                {assignment.rubric.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle1">{item.criterion}</Typography>
                          <Chip label={`${item.weight}%`} color="primary" size="small" />
                        </Box>
                      }
                      secondary={item.description}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* Attachments */}
          {assignment.attachments.length > 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Attachments
              </Typography>
              <List>
                {assignment.attachments.map((file, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={file.size}
                    />
                    <Button size="small" startIcon={<CloudUploadIcon />}>
                      Download
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* Recent Submissions (for educators) */}
          {(isEducator || isCoordinator) && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Submissions
              </Typography>
              <List>
                {assignment.recentSubmissions.map((submission, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Avatar>{submission.student[0]}</Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={submission.student}
                      secondary={`Submitted: ${new Date(submission.submittedAt).toLocaleString()}`}
                    />
                    {submission.status === 'graded' ? (
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label={`${submission.score}%`} 
                        color="success" 
                        size="small" 
                      />
                    ) : (
                      <Chip 
                        icon={<WarningIcon />} 
                        label="Pending" 
                        color="warning" 
                        size="small" 
                      />
                    )}
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="outlined" onClick={() => navigate('/submissions')}>
                  View All Submissions
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>

        {/* Right Column - Info and Actions */}
        <Grid item xs={12} md={4}>
          {/* Info Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assignment Info
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Due Date"
                    secondary={new Date(assignment.dueDate).toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GradeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Total Points"
                    secondary={assignment.totalPoints}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Submissions"
                    secondary={`${assignment.submissions}/${assignment.totalStudents} (${Math.round(assignment.submissions/assignment.totalStudents*100)}%)`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Time Estimate"
                    secondary={assignment.timeEstimate}
                  />
                </ListItem>
              </List>

              {assignment.type === 'assignment' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Passing Score: {assignment.passingScore}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={assignment.passingScore} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>

              {isLearner && (
                <Box>
                  {assignment.submissions.some(s => s.student === user?.name) ? (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      You have already submitted this assignment
                    </Alert>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => setOpenSubmitDialog(true)}
                      sx={{ mb: 2 }}
                    >
                      Submit Assignment
                    </Button>
                  )}
                </Box>
              )}

              {(isEducator || isCoordinator) && (
                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GradeIcon />}
                    sx={{ mb: 1 }}
                    onClick={() => navigate(`/submissions?assignment=${id}`)}
                  >
                    Grade Submissions
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{ mb: 1 }}
                  >
                    Edit Assignment
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Delete Assignment
                  </Button>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Quick Stats
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h6">78%</Typography>
                    <Typography variant="caption">Avg. Score</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h6">12</Typography>
                    <Typography variant="caption">Pending</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    <Typography variant="h6">20</Typography>
                    <Typography variant="caption">Graded</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Submit Assignment Dialog */}
      <Dialog open={openSubmitDialog} onClose={() => setOpenSubmitDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Submit Assignment</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Submission Text (Optional)"
                multiline
                rows={4}
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Add any notes or comments about your submission..."
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFileIcon />}
                fullWidth
              >
                Upload Files
                <input type="file" multiple hidden />
              </Button>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                Allowed files: .pdf, .doc, .docx, .zip, .jpg, .png (Max: 10MB)
              </Typography>
            </Grid>
            {assignment.type === 'quiz' && (
              <Grid item xs={12}>
                <Alert severity="info">
                  You have {assignment.questions.length} questions to answer
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubmitDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitAssignment}>
            Submit Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssignmentDetails;