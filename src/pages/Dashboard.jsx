import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  AvatarGroup,
  Tooltip,
} from '@mui/material';
import {
  Book as BookIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon, color, trend }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
          {trend && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: trend > 0 ? 'success.main' : 'error.main',
                mt: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <TrendingUpIcon fontSize="small" />
              {trend > 0 ? '+' : ''}{trend}% from last month
            </Typography>
          )}
        </Box>
        <Box 
          sx={{ 
            backgroundColor: color, 
            borderRadius: '50%', 
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(icon, { sx: { color: 'white', fontSize: 30 } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - replace with actual API data
  const stats = {
    totalCourses: 12,
    activeAssignments: 8,
    totalStudents: 156,
    overallProgress: 75,
  };

  const progressData = [
    { name: 'Week 1', progress: 65, assignments: 5 },
    { name: 'Week 2', progress: 75, assignments: 7 },
    { name: 'Week 3', progress: 85, assignments: 6 },
    { name: 'Week 4', progress: 70, assignments: 8 },
    { name: 'Week 5', progress: 90, assignments: 5 },
    { name: 'Week 6', progress: 82, assignments: 7 },
  ];

  const courseDistribution = [
    { name: 'Completed', value: 45, color: '#4caf50' },
    { name: 'In Progress', value: 35, color: '#2196f3' },
    { name: 'Not Started', value: 20, color: '#ff9800' },
  ];

  const recentActivities = [
    { id: 1, activity: 'Submitted assignment', course: 'React Basics', time: '2 hours ago', user: 'John Doe', avatar: 'JD' },
    { id: 2, activity: 'Completed quiz', course: 'JavaScript Fundamentals', time: '5 hours ago', user: 'Jane Smith', avatar: 'JS' },
    { id: 3, activity: 'Started new module', course: 'Node.js', time: '1 day ago', user: 'Bob Johnson', avatar: 'BJ' },
    { id: 4, activity: 'Received feedback', course: 'MongoDB', time: '2 days ago', user: 'Alice Brown', avatar: 'AB' },
  ];

  const upcomingDeadlines = [
    { id: 1, title: 'React Project', course: 'React Development', dueDate: '2024-12-20', priority: 'High', status: 'urgent' },
    { id: 2, title: 'Node.js API', course: 'Backend Development', dueDate: '2024-12-22', priority: 'Medium', status: 'upcoming' },
    { id: 3, title: 'Database Design', course: 'MongoDB', dueDate: '2024-12-25', priority: 'Low', status: 'upcoming' },
  ];

  const topPerformers = [
    { name: 'Sarah Wilson', score: 98, avatar: 'SW' },
    { name: 'Mike Chen', score: 95, avatar: 'MC' },
    { name: 'Emma Davis', score: 92, avatar: 'ED' },
    { name: 'James Lee', score: 89, avatar: 'JL' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'urgent': return 'error';
      case 'upcoming': return 'warning';
      default: return 'success';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user?.name}!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Here's what's happening with your learning journey today.
          </Typography>
        </Box>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<AssignmentIcon />}
            onClick={() => navigate('/assignments')}
          >
            View Assignments
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={<BookIcon />}
            color="#1976d2"
            trend={5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Assignments"
            value={stats.activeAssignments}
            icon={<AssignmentIcon />}
            color="#2e7d32"
            trend={-2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<PeopleIcon />}
            color="#ed6c02"
            trend={12}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Overall Progress"
            value={`${stats.overallProgress}%`}
            icon={<TrendingUpIcon />}
            color="#9c27b0"
            trend={8}
          />
        </Grid>

        {/* Progress Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Learning Progress Overview
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#1976d2" 
                  fill="#1976d2" 
                  fillOpacity={0.3} 
                  name="Progress %"
                />
                <Bar 
                  yAxisId="right"
                  dataKey="assignments" 
                  fill="#dc004e" 
                  name="Assignments"
                  barSize={20}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Course Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Course Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
              {courseDistribution.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" gap={0.5}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%' }} />
                  <Typography variant="caption">{item.name}: {item.value}%</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Top Performers
              </Typography>
              <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
                {topPerformers.map((performer, index) => (
                  <Tooltip key={index} title={`${performer.name} - ${performer.score}%`}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{performer.avatar}</Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Recent Activities
              </Typography>
              <Button size="small" onClick={() => navigate('/activities')}>
                View All
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableBody>
                  {recentActivities.map((activity) => (
                    <TableRow key={activity.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                            {activity.avatar}
                          </Avatar>
                          <Box>
                            <Typography variant="body2">{activity.activity}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {activity.course} • {activity.user}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          icon={<ScheduleIcon />} 
                          label={activity.time} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Upcoming Deadlines */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Upcoming Deadlines
              </Typography>
              <Button size="small" onClick={() => navigate('/deadlines')}>
                View All
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Assignment</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingDeadlines.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Typography variant="body2">{item.title}</Typography>
                      </TableCell>
                      <TableCell>{item.course}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <ScheduleIcon fontSize="small" color="action" />
                          {new Date(item.dueDate).toLocaleDateString()}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={item.priority} 
                          color={getStatusColor(item.status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<BookIcon />}
                  onClick={() => navigate('/courses')}
                  sx={{ py: 1.5 }}
                >
                  Browse Courses
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<AssignmentIcon />}
                  onClick={() => navigate('/assignments/new')}
                  sx={{ py: 1.5 }}
                >
                  Create Assignment
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<PeopleIcon />}
                  onClick={() => navigate('/users')}
                  sx={{ py: 1.5 }}
                >
                  Manage Users
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<TrendingUpIcon />}
                  onClick={() => navigate('/reports')}
                  sx={{ py: 1.5 }}
                >
                  View Reports
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;