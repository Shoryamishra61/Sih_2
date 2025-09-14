import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar
} from '@mui/material';
import {
  Assessment,
  Download,
  Print,
  Share,
  TrendingUp,
  TrendingDown,
  People,
  Restaurant,
  Psychology,
  Schedule,
  CheckCircle,
  Warning,
  Info,
  FilterList,
  Refresh,
  BarChart
} from '@mui/icons-material';
import { mockPatients, mockDashboardStats } from '../../data/mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Reports: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState('month');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleGenerateReport = (reportType: string) => {
    setSelectedReport(reportType);
    setOpenDialog(true);
    // Simulate report generation
    setReportData(generateMockReportData(reportType));
  };

  const generateMockReportData = (reportType: string) => {
    switch (reportType) {
      case 'patient-compliance':
        return {
          title: 'Patient Compliance Report',
          period: 'January 2024',
          data: [
            { patient: 'Rajesh Kumar', compliance: 92, trend: 'up', status: 'excellent' },
            { patient: 'Priya Sharma', compliance: 85, trend: 'up', status: 'good' },
            { patient: 'Anita Patel', compliance: 95, trend: 'up', status: 'excellent' },
            { patient: 'Vikram Singh', compliance: 78, trend: 'down', status: 'needs_attention' },
            { patient: 'Sushma Reddy', compliance: 88, trend: 'up', status: 'good' }
          ]
        };
      case 'diet-effectiveness':
        return {
          title: 'Diet Plan Effectiveness Report',
          period: 'January 2024',
          data: [
            { plan: 'Diabetes Management', effectiveness: 88, patients: 12, avgCompliance: 89 },
            { plan: 'PCOS Weight Management', effectiveness: 85, patients: 8, avgCompliance: 87 },
            { plan: 'Vata Pacifying Plan', effectiveness: 92, patients: 15, avgCompliance: 94 },
            { plan: 'Heart Health Plan', effectiveness: 90, patients: 10, avgCompliance: 91 },
            { plan: 'Anti-Inflammatory Plan', effectiveness: 87, patients: 6, avgCompliance: 88 }
          ]
        };
      case 'nutritional-analysis':
        return {
          title: 'Nutritional Analysis Report',
          period: 'January 2024',
          data: [
            { nutrient: 'Calories', avgIntake: 1750, recommended: 1800, status: 'good' },
            { nutrient: 'Protein', avgIntake: 65, recommended: 70, status: 'needs_improvement' },
            { nutrient: 'Carbs', avgIntake: 220, recommended: 225, status: 'good' },
            { nutrient: 'Fats', avgIntake: 58, recommended: 60, status: 'good' },
            { nutrient: 'Fiber', avgIntake: 28, recommended: 30, status: 'needs_improvement' }
          ]
        };
      case 'ayurvedic-compliance':
        return {
          title: 'Ayurvedic Compliance Report',
          period: 'January 2024',
          data: [
            { dosha: 'Vata', compliance: 89, patients: 25, avgImprovement: 15 },
            { dosha: 'Pitta', compliance: 92, patients: 30, avgImprovement: 18 },
            { dosha: 'Kapha', compliance: 85, patients: 20, avgImprovement: 12 },
            { dosha: 'Mixed', compliance: 87, patients: 15, avgImprovement: 14 }
          ]
        };
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'needs_attention': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle color="success" />;
      case 'good': return <CheckCircle color="info" />;
      case 'needs_attention': return <Warning color="warning" />;
      case 'poor': return <Warning color="error" />;
      default: return <Info />;
    }
  };

  const ReportCard = ({ title, description, icon, color, reportType }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    reportType: string;
  }) => (
    <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: color, mr: 2 }}>
            {icon}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleGenerateReport(reportType)}
          sx={{ mt: 2 }}
        >
          Generate Report
        </Button>
      </CardContent>
    </Card>
  );

  const ComplianceTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Compliance %</TableCell>
            <TableCell>Trend</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData?.data.map((row: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="subtitle2">{row.patient}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress
                    variant="determinate"
                    value={row.compliance}
                    sx={{ width: 100, mr: 2, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2">{row.compliance}%</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {row.trend === 'up' ? (
                    <TrendingUp color="success" />
                  ) : (
                    <TrendingDown color="error" />
                  )}
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {row.trend === 'up' ? 'Improving' : 'Declining'}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  icon={getStatusIcon(row.status)}
                  label={row.status.replace('_', ' ').toUpperCase()}
                  color={getStatusColor(row.status) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2">2 days ago</Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="View Details">
                    <IconButton size="small">
                      <Assessment />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small">
                      <Download />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const DietEffectivenessTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Diet Plan</TableCell>
            <TableCell>Effectiveness %</TableCell>
            <TableCell>Patients</TableCell>
            <TableCell>Avg Compliance</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData?.data.map((row: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="subtitle2">{row.plan}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress
                    variant="determinate"
                    value={row.effectiveness}
                    sx={{ width: 100, mr: 2, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2">{row.effectiveness}%</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.patients}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.avgCompliance}%</Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="View Details">
                    <IconButton size="small">
                      <Assessment />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small">
                      <Download />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const NutritionalAnalysisTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nutrient</TableCell>
            <TableCell>Average Intake</TableCell>
            <TableCell>Recommended</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData?.data.map((row: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="subtitle2">{row.nutrient}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.avgIntake}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.recommended}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={row.status.replace('_', ' ').toUpperCase()}
                  color={getStatusColor(row.status) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="View Details">
                    <IconButton size="small">
                      <Assessment />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small">
                      <Download />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const AyurvedicComplianceTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dosha</TableCell>
            <TableCell>Compliance %</TableCell>
            <TableCell>Patients</TableCell>
            <TableCell>Avg Improvement</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData?.data.map((row: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Chip label={row.dosha} color="primary" variant="outlined" />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress
                    variant="determinate"
                    value={row.compliance}
                    sx={{ width: 100, mr: 2, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2">{row.compliance}%</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.patients}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">+{row.avgImprovement}%</Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="View Details">
                    <IconButton size="small">
                      <Assessment />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small">
                      <Download />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reports & Analytics
        </Typography>
        <Box>
          <Button variant="outlined" startIcon={<Refresh />} sx={{ mr: 2 }}>
            Refresh Data
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Export All
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Date Range</InputLabel>
          <Select
            value={dateRange}
            label="Date Range"
            onChange={(e) => setDateRange(e.target.value)}
          >
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="quarter">Last Quarter</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
            <MenuItem value="custom">Custom Range</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Patient</InputLabel>
          <Select
            value={selectedPatient}
            label="Patient"
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <MenuItem value="all">All Patients</MenuItem>
            {mockPatients.map(patient => (
              <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" startIcon={<FilterList />}>
          More Filters
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Report Templates" />
          <Tab label="Generated Reports" />
          <Tab label="Analytics Dashboard" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <ReportCard
              title="Patient Compliance"
              description="Track patient adherence to diet plans and identify areas for improvement"
              icon={<People />}
              color="primary.main"
              reportType="patient-compliance"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReportCard
              title="Diet Effectiveness"
              description="Analyze the effectiveness of different diet plans and their outcomes"
              icon={<Restaurant />}
              color="success.main"
              reportType="diet-effectiveness"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReportCard
              title="Nutritional Analysis"
              description="Comprehensive nutritional analysis across all patients and diet plans"
              icon={<Assessment />}
              color="info.main"
              reportType="nutritional-analysis"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReportCard
              title="Ayurvedic Compliance"
              description="Monitor adherence to Ayurvedic principles and dosha-specific recommendations"
              icon={<Psychology />}
              color="warning.main"
              reportType="ayurvedic-compliance"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReportCard
              title="Custom Report"
              description="Create custom reports with specific parameters and data points"
              icon={<BarChart />}
              color="error.main"
              reportType="custom"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReportCard
              title="Export Data"
              description="Export patient data, diet plans, and analytics in various formats"
              icon={<Download />}
              color="secondary.main"
              reportType="export"
            />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        {reportData ? (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">{reportData.title}</Typography>
              <Box>
                <Button variant="outlined" startIcon={<Print />} sx={{ mr: 2 }}>
                  Print
                </Button>
                <Button variant="outlined" startIcon={<Share />} sx={{ mr: 2 }}>
                  Share
                </Button>
                <Button variant="contained" startIcon={<Download />}>
                  Download PDF
                </Button>
              </Box>
            </Box>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Report Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2" color="text.secondary">Period</Typography>
                    <Typography variant="h6">{reportData.period}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2" color="text.secondary">Total Records</Typography>
                    <Typography variant="h6">{reportData.data.length}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2" color="text.secondary">Generated</Typography>
                    <Typography variant="h6">{new Date().toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip label="Complete" color="success" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {selectedReport === 'patient-compliance' && <ComplianceTable />}
            {selectedReport === 'diet-effectiveness' && <DietEffectivenessTable />}
            {selectedReport === 'nutritional-analysis' && <NutritionalAnalysisTable />}
            {selectedReport === 'ayurvedic-compliance' && <AyurvedicComplianceTable />}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Assessment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Reports Generated Yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select a report template from the "Report Templates" tab to generate your first report.
            </Typography>
          </Box>
        )}
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Key Performance Indicators
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <People color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Total Patients"
                      secondary={mockDashboardStats.totalPatients}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Restaurant color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Active Diet Plans"
                      secondary={mockDashboardStats.activeDietPlans}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Schedule color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Completed Consultations"
                      secondary={mockDashboardStats.completedConsultations}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUp color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Average Compliance"
                      secondary={`${mockDashboardStats.averageCompliance}%`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <List>
                  {mockDashboardStats.recentActivity.map((activity) => (
                    <ListItem key={activity.id}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.description}
                        secondary={activity.timestamp.toLocaleDateString()}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Report</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Select the parameters for your report:
          </Typography>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Date Range</InputLabel>
              <Select value={dateRange} label="Date Range">
                <MenuItem value="week">Last Week</MenuItem>
                <MenuItem value="month">Last Month</MenuItem>
                <MenuItem value="quarter">Last Quarter</MenuItem>
                <MenuItem value="year">Last Year</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Patient</InputLabel>
              <Select value={selectedPatient} label="Patient">
                <MenuItem value="all">All Patients</MenuItem>
                {mockPatients.map(patient => (
                  <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Report Title"
              defaultValue={reportData?.title || ''}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports;
