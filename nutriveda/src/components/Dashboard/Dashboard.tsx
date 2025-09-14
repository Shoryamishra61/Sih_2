import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Paper,
  Grid
} from '@mui/material';
import {
  People,
  Restaurant,
  Assessment,
  TrendingUp,
  Psychology,
  Upload,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import { mockDashboardStats } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = mockDashboardStats;

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    color, 
    subtitle, 
    trend 
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
    trend?: number;
  }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: color, mr: 2 }}>
            {icon}
          </Avatar>
          <Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        {trend !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
            <Typography variant="body2" color="success.main">
              +{trend}% this month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const ActivityItem = ({ activity }: { activity: any }) => {
    const getIcon = (type: string) => {
      switch (type) {
        case 'patient_added':
          return <People color="primary" />;
        case 'diet_created':
          return <Restaurant color="success" />;
        case 'consultation_completed':
          return <CheckCircle color="success" />;
        case 'prescription_processed':
          return <Upload color="info" />;
        default:
          return <Schedule color="action" />;
      }
    };

    const getTimeAgo = (timestamp: Date) => {
      const now = new Date();
      const diff = now.getTime() - timestamp.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      
      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      return 'Just now';
    };

    return (
      <ListItem sx={{ px: 0 }}>
        <ListItemIcon>
          {getIcon(activity.type)}
        </ListItemIcon>
        <ListItemText
          primary={activity.description}
          secondary={`${getTimeAgo(activity.timestamp)} • ${activity.patientName || 'System'}`}
        />
      </ListItem>
    );
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={<People />}
            color="primary.main"
            subtitle="Active patients"
            trend={12}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Diet Plans"
            value={stats.activeDietPlans}
            icon={<Restaurant />}
            color="success.main"
            subtitle="Currently active"
            trend={8}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Consultations"
            value={stats.completedConsultations}
            icon={<Assessment />}
            color="info.main"
            subtitle="This month"
            trend={15}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Compliance Rate"
            value={`${stats.averageCompliance}%`}
            icon={<TrendingUp />}
            color="warning.main"
            subtitle="Average across all plans"
            trend={5}
          />
        </Grid>

        {/* AI Diet Engine Status */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Psychology sx={{ mr: 1, color: 'primary.main' }} />
                AI Diet Engine Status
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Ayurvedic Compliance
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={92} 
                      sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    />
                    <Typography variant="body2" color="success.main">
                      92% Average
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Modern Nutrition Compliance
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={88} 
                      sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    />
                    <Typography variant="body2" color="info.main">
                      88% Average
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Recent AI Activities
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    icon={<CheckCircle />} 
                    label="3 Diet Plans Generated" 
                    color="success" 
                    size="small" 
                  />
                  <Chip 
                    icon={<Upload />} 
                    label="2 Prescriptions Processed" 
                    color="info" 
                    size="small" 
                  />
                  <Chip 
                    icon={<Psychology />} 
                    label="5 Dual Analysis Completed" 
                    color="primary" 
                    size="small" 
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {stats.recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper 
                    onClick={() => navigate('/ai-diet-engine')}
                    sx={{ 
                      p: 2, 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <Psychology sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight="bold">
                      Generate Diet Plan
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      AI-powered meal planning
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Paper 
                    onClick={() => navigate('/ai-diet-engine/upload')}
                    sx={{ 
                      p: 2, 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <Upload sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight="bold">
                      Upload Prescription
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      OCR processing
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Paper 
                    onClick={() => navigate('/patients')}
                    sx={{ 
                      p: 2, 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <People sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight="bold">
                      Add Patient
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      New patient profile
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Paper 
                    onClick={() => navigate('/reports')}
                    sx={{ 
                      p: 2, 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <Assessment sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight="bold">
                      View Reports
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Analytics & insights
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
