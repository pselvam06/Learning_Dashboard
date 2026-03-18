import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Card,
  CardContent,
  IconButton,
  Alert,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Badge as BadgeIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    bio: 'Passionate educator with 5+ years of experience in web development. Love teaching and helping students achieve their goals.',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    timezone: 'EST (UTC-5)',
    language: 'English',
  });

  // Mock data - replace with API call
  const stats = {
    coursesCompleted: 12,
    coursesInProgress: 3,
    totalStudents: user?.role === 'learner' ? 0 : 156,
    averageGrade: 85,
    certificates: 5,
    hoursSpent: 240,
  };

  const recentActivity = [
    { action: 'Completed course', item: 'React Fundamentals', date: '2 days ago' },
    { action: 'Submitted assignment', item: 'JavaScript Quiz', date: '5 days ago' },
    { action: 'Started new course', item: 'Node.js Mastery', date: '1 week ago' },
  ];

  const achievements = [
    { title: 'Fast Learner', description: 'Completed 5 courses in 3 months', icon: '🚀' },
    { title: 'Helpful Mentor', description: 'Received 50+ thanks from students', icon: '🌟' },
    { title: 'Perfect Score', description: 'Scored 100% on 3 assignments', icon: '🏆' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save to API
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">My Profile</Typography>
        {!isEditing ? (
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <Box>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ mr: 1 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box position="relative" display="inline-block">
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  mx: 'auto',
                  bgcolor: 'primary.main',
                  fontSize: 48,
                }}
              >
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              {isEditing && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    bgcolor: 'background.paper',
                  }}
                  size="small"
                >
                  <PhotoCameraIcon />
                </IconButton>
              )}
            </Box>

            {isEditing ? (
              <TextField
                fullWidth
                label="Full Name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                size="small"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="h5" gutterBottom>
                {profileData.name}
              </Typography>
            )}

            <Chip
              icon={<SchoolIcon />}
              label={user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              color="primary"
              sx={{ mb: 2 }}
            />

            {isEditing ? (
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={3}
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                size="small"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary" paragraph>
                {profileData.bio}
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                {isEditing ? (
                  <TextField
                    fullWidth
                    label="Email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    size="small"
                  />
                ) : (
                  <ListItemText primary="Email" secondary={profileData.email} />
                )}
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BadgeIcon />
                </ListItemIcon>
                {isEditing ? (
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    size="small"
                  />
                ) : (
                  <ListItemText primary="Phone" secondary={profileData.phone} />
                )}
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarIcon />
                </ListItemIcon>
                {isEditing ? (
                  <TextField
                    fullWidth
                    label="Location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    size="small"
                  />
                ) : (
                  <ListItemText primary="Location" secondary={profileData.location} />
                )}
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Right Column - Tabs */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="Overview" />
              <Tab label="Activity" />
              <Tab label="Achievements" />
              <Tab label="Settings" />
            </Tabs>

            {/* Overview Tab */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Courses Completed
                      </Typography>
                      <Typography variant="h4">{stats.coursesCompleted}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        In Progress
                      </Typography>
                      <Typography variant="h4">{stats.coursesInProgress}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        {user?.role === 'learner' ? 'Average Grade' : 'Total Students'}
                      </Typography>
                      <Typography variant="h4">
                        {user?.role === 'learner' ? `${stats.averageGrade}%` : stats.totalStudents}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Certificates
                      </Typography>
                      <Typography variant="h4">{stats.certificates}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Hours Spent
                      </Typography>
                      <Typography variant="h4">{stats.hoursSpent}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Activity Tab */}
            <TabPanel value={tabValue} index={1}>
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={activity.action}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="primary">
                              {activity.item}
                            </Typography>
                            {` • ${activity.date}`}
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            {/* Achievements Tab */}
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={2}>
                {achievements.map((achievement, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h2" sx={{ mb: 2 }}>
                          {achievement.icon}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {achievement.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {achievement.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Settings Tab */}
            <TabPanel value={tabValue} index={3}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive updates about your courses"
                  />
                  <Chip label="Enabled" color="success" size="small" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Language"
                    secondary={profileData.language}
                  />
                  <Button size="small">Change</Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Two-Factor Authentication"
                    secondary="Add extra security to your account"
                  />
                  <Button size="small">Enable</Button>
                </ListItem>
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;