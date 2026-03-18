import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Button,
  TextField,
  Divider,
  Alert,
  Snackbar,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  Backup as BackupIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { mode, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    darkMode: mode === 'dark',
    emailNotifications: true,
    pushNotifications: true,
    digestEmails: 'daily',
    language: 'en',
    timezone: 'America/New_York',
    autoSave: true,
    autoBackup: false,
    twoFactor: false,
    profileVisibility: 'public',
  });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (key) => (event) => {
    setSettings({
      ...settings,
      [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    // Save settings to API
    setShowSnackbar(true);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setSettings({
      ...settings,
      darkMode: !settings.darkMode,
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Manage your account settings and preferences
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Appearance */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaletteIcon color="primary" />
              Appearance
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DarkModeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dark Mode"
                  secondary="Switch between light and dark theme"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.darkMode}
                    onChange={handleToggleTheme}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Theme Color"
                  secondary="Choose your preferred accent color"
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value="blue">
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Paper>

          {/* Notifications */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NotificationsIcon color="primary" />
              Notifications
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive email updates about your courses"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.emailNotifications}
                    onChange={handleChange('emailNotifications')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Push Notifications"
                  secondary="Receive browser notifications"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.pushNotifications}
                    onChange={handleChange('pushNotifications')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Digest Email Frequency"
                  secondary="How often you want to receive digest emails"
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={settings.digestEmails}
                    onChange={handleChange('digestEmails')}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="never">Never</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Paper>

          {/* Language & Region */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LanguageIcon color="primary" />
              Language & Region
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={settings.language}
                    onChange={handleChange('language')}
                    label="Language"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="zh">Chinese</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={settings.timezone}
                    onChange={handleChange('timezone')}
                    label="Timezone"
                  >
                    <MenuItem value="America/New_York">Eastern Time</MenuItem>
                    <MenuItem value="America/Chicago">Central Time</MenuItem>
                    <MenuItem value="America/Denver">Mountain Time</MenuItem>
                    <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                    <MenuItem value="Europe/London">GMT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Privacy & Security */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SecurityIcon color="primary" />
              Privacy & Security
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Add an extra layer of security to your account"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.twoFactor}
                    onChange={handleChange('twoFactor')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Profile Visibility"
                  secondary="Control who can see your profile"
                />
                <RadioGroup
                  row
                  value={settings.profileVisibility}
                  onChange={handleChange('profileVisibility')}
                >
                  <FormControlLabel value="public" control={<Radio />} label="Public" />
                  <FormControlLabel value="private" control={<Radio />} label="Private" />
                  <FormControlLabel value="courses" control={<Radio />} label="Courses Only" />
                </RadioGroup>
              </ListItem>
            </List>
          </Paper>

          {/* Data & Backup */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StorageIcon color="primary" />
              Data & Backup
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Auto-Save"
                  secondary="Automatically save your work while typing"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.autoSave}
                    onChange={handleChange('autoSave')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Auto-Backup"
                  secondary="Automatically backup your data weekly"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.autoBackup}
                    onChange={handleChange('autoBackup')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" startIcon={<BackupIcon />} sx={{ mr: 1 }}>
                Backup Now
              </Button>
              <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                Clear Data
              </Button>
            </Box>
          </Paper>

          {/* Save Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>

        {/* Right Column - Info Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Member Since" secondary="January 2024" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Last Login" secondary="2 hours ago" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Account Type" secondary="Premium" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Need Help?
              </Typography>
              <Typography variant="body2" paragraph>
                Check our documentation or contact support for assistance.
              </Typography>
              <Button variant="outlined" fullWidth sx={{ mb: 1 }}>
                View Documentation
              </Button>
              <Button variant="outlined" fullWidth>
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowSnackbar(false)}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;