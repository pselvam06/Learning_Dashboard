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
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
  CardContent,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  PlayArrow as PlayArrowIcon,
  Schedule as ScheduleIcon,
  Description as DescriptionIcon,
  VideoLibrary as VideoIcon,
  Article as ArticleIcon,
  Link as LinkIcon,
  Download as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StudyPlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isEducator } = useAuth();
  const [activeStep, setActiveStep] = useState(2);

  // Mock data - replace with API call
  const plan = {
    id: 1,
    title: 'React Mastery Path',
    course: 'Full Stack Web Development',
    description: 'Comprehensive study plan to master React from basics to advanced concepts',
    progress: 45,
    duration: '8 weeks',
    status: 'in-progress',
    startDate: '2024-01-15',
    endDate: '2024-03-10',
    color: '#1976d2',
    objectives: [
      'Understand React core concepts and JSX',
      'Master React Hooks and state management',
      'Build complex applications with React Router',
      'Implement state management with Redux',
      'Learn testing React applications',
    ],
    prerequisites: [
      'Basic JavaScript knowledge',
      'Understanding of HTML/CSS',
      'Familiarity with ES6+ features',
    ],
    weeks: [
      {
        week: 1,
        title: 'React Fundamentals',
        description: 'Introduction to React, components, and JSX',
        duration: '5 hours',
        status: 'completed',
        topics: [
          { name: 'What is React?', completed: true, type: 'video', duration: '45 min' },
          { name: 'Setting up Development Environment', completed: true, type: 'article', duration: '30 min' },
          { name: 'Components and Props', completed: true, type: 'video', duration: '60 min' },
          { name: 'JSX Deep Dive', completed: true, type: 'reading', duration: '45 min' },
        ],
        resources: [
          { title: 'React Official Docs', type: 'link', url: '#' },
          { title: 'Components Props Exercise', type: 'exercise', url: '#' },
        ],
      },
      {
        week: 2,
        title: 'State and Lifecycle',
        description: 'Understanding state, hooks, and component lifecycle',
        duration: '6 hours',
        status: 'completed',
        topics: [
          { name: 'useState Hook', completed: true, type: 'video', duration: '50 min' },
          { name: 'useEffect Hook', completed: true, type: 'video', duration: '55 min' },
          { name: 'Conditional Rendering', completed: true, type: 'article', duration: '40 min' },
          { name: 'Lists and Keys', completed: true, type: 'reading', duration: '35 min' },
        ],
        resources: [
          { title: 'Hooks API Reference', type: 'link', url: '#' },
          { title: 'State Management Quiz', type: 'quiz', url: '#' },
        ],
      },
      {
        week: 3,
        title: 'React Router',
        description: 'Navigation and routing in React applications',
        duration: '4 hours',
        status: 'in-progress',
        topics: [
          { name: 'Setting up React Router', completed: true, type: 'video', duration: '40 min' },
          { name: 'Route Parameters', completed: true, type: 'video', duration: '45 min' },
          { name: 'Nested Routes', completed: false, type: 'article', duration: '35 min' },
          { name: 'Navigation Links', completed: false, type: 'reading', duration: '30 min' },
        ],
        resources: [
          { title: 'React Router Documentation', type: 'link', url: '#' },
          { title: 'Router Exercise', type: 'exercise', url: '#' },
        ],
      },
      {
        week: 4,
        title: 'Advanced Hooks',
        description: 'Custom hooks and advanced patterns',
        duration: '5 hours',
        status: 'pending',
        topics: [
          { name: 'Custom Hooks', completed: false, type: 'video', duration: '50 min' },
          { name: 'useReducer Hook', completed: false, type: 'video', duration: '45 min' },
          { name: 'useContext Hook', completed: false, type: 'article', duration: '40 min' },
          { name: 'useRef Hook', completed: false, type: 'reading', duration: '35 min' },
        ],
        resources: [
          { title: 'Advanced Hooks Guide', type: 'link', url: '#' },
        ],
      },
    ],
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'in-progress':
        return <PlayArrowIcon color="primary" />;
      default:
        return <UncheckedIcon color="disabled" />;
    }
  };

  const getResourceIcon = (type) => {
    switch(type) {
      case 'video':
        return <VideoIcon />;
      case 'article':
        return <ArticleIcon />;
      case 'link':
        return <LinkIcon />;
      case 'exercise':
      case 'quiz':
        return <DescriptionIcon />;
      default:
        return <DescriptionIcon />;
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, plan.weeks.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/study-plans')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {plan.title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {plan.course} • {plan.duration} • Started {new Date(plan.startDate).toLocaleDateString()}
          </Typography>
        </Box>
        {isEducator && (
          <Box>
            <Button variant="outlined" startIcon={<EditIcon />} sx={{ mr: 1 }}>
              Edit Plan
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Box>
        )}
      </Box>

      {/* Progress Overview */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Overall Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={plan.progress} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Typography variant="h6">{plan.progress}%</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Completed Weeks
                </Typography>
                <Typography variant="body1">
                  {plan.weeks.filter(w => w.status === 'completed').length}/{plan.weeks.length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Time Remaining
                </Typography>
                <Typography variant="body1">3 weeks</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Target End Date
                </Typography>
                <Typography variant="body1">
                  {new Date(plan.endDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Quick Stats
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Box textAlign="center">
                    <Typography variant="h6">{plan.weeks.length}</Typography>
                    <Typography variant="caption">Total Weeks</Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h6">
                      {plan.weeks.reduce((acc, w) => acc + w.topics.length, 0)}
                    </Typography>
                    <Typography variant="caption">Topics</Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="h6">
                      {plan.weeks.reduce((acc, w) => acc + w.resources.length, 0)}
                    </Typography>
                    <Typography variant="caption">Resources</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Study Plan Timeline */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Study Timeline
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {plan.weeks.map((week, index) => (
                <Step key={index} completed={week.status === 'completed'}>
                  <StepLabel
                    StepIconComponent={() => getStatusIcon(week.status)}
                    optional={
                      <Typography variant="caption" color="textSecondary">
                        {week.duration} • {week.topics.length} topics
                      </Typography>
                    }
                  >
                    <Typography variant="subtitle1">
                      Week {week.week}: {week.title}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {week.description}
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      Topics:
                    </Typography>
                    <List dense>
                      {week.topics.map((topic, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            {topic.completed ? (
                              <CheckCircleIcon color="success" fontSize="small" />
                            ) : (
                              <UncheckedIcon color="disabled" fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={topic.name}
                            secondary={`${topic.type} • ${topic.duration}`}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Typography variant="subtitle2" gutterBottom>
                      Resources:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {week.resources.map((resource, idx) => (
                        <Chip
                          key={idx}
                          icon={getResourceIcon(resource.type)}
                          label={resource.title}
                          clickable
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={week.status === 'pending'}
                      >
                        {week.status === 'completed' ? 'Review' : 'Continue'}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleBack}
                        sx={{ mt: 1 }}
                        disabled={index === 0}
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Objectives */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Learning Objectives
            </Typography>
            <List>
              {plan.objectives.map((objective, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={objective} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Prerequisites */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Prerequisites
            </Typography>
            <List>
              {plan.prerequisites.map((prereq, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <UncheckedIcon color="action" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={prereq} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Quick Actions */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Button fullWidth variant="outlined" sx={{ mb: 1 }} startIcon={<ScheduleIcon />}>
              Set Study Reminder
            </Button>
            <Button fullWidth variant="outlined" sx={{ mb: 1 }} startIcon={<DownloadIcon />}>
              Download Plan
            </Button>
            <Button fullWidth variant="outlined" color="primary" startIcon={<PlayArrowIcon />}>
              Start Today's Lesson
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudyPlanDetails;