
import React, { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Fab,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Person,
  Phone,
  Email,
  LocationOn,
  MedicalServices,
  Psychology,
  TrendingUp
} from '@mui/icons-material';
import { mockPatients } from '../../data/mockData';
import { Patient } from '../../types';

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
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Patients: React.FC = () => {
  const [patients] = useState<Patient[]>(mockPatients);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDosha, setFilterDosha] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (patient?: Patient) => {
    setSelectedPatient(patient || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDosha = filterDosha === 'all' || patient.constitutionalAnalysis.prakriti === filterDosha;
    return matchesSearch && matchesDosha;
  });

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'Vata': return 'error';
      case 'Pitta': return 'warning';
      case 'Kapha': return 'info';
      case 'Mixed': return 'success';
      default: return 'default';
    }
  };

  const getGenderIcon = (gender: string) => {
    return gender === 'male' ? '♂' : gender === 'female' ? '♀' : '⚧';
  };

  const PatientCard = ({ patient }: { patient: Patient }) => (
    <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 56, height: 56 }}>
            {patient.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {patient.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {patient.age} years • {getGenderIcon(patient.gender)} {patient.gender}
            </Typography>
          </Box>
          <Chip 
            label={patient.constitutionalAnalysis.prakriti} 
            color={getDoshaColor(patient.constitutionalAnalysis.prakriti) as any}
            size="small"
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {patient.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {patient.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {patient.address}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Health Conditions:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {patient.medicalHistory.slice(0, 2).map((condition, index) => (
              <Chip key={index} label={condition} size="small" variant="outlined" />
            ))}
            {patient.medicalHistory.length > 2 && (
              <Chip label={`+${patient.medicalHistory.length - 2} more`} size="small" variant="outlined" />
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Added: {patient.createdAt.toLocaleDateString()}
          </Typography>
          <Box>
            <Tooltip title="View Details">
              <IconButton size="small" onClick={() => handleOpenDialog(patient)}>
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => handleOpenDialog(patient)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" color="error">
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const PatientTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Age/Gender</TableCell>
            <TableCell>Prakriti</TableCell>
            <TableCell>Health Conditions</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow key={patient.id} hover>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, width: 40, height: 40 }}>
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">{patient.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {patient.id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{patient.age} years</Typography>
                <Typography variant="body2" color="text.secondary">
                  {getGenderIcon(patient.gender)} {patient.gender}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip 
                  label={patient.constitutionalAnalysis.prakriti} 
                  color={getDoshaColor(patient.constitutionalAnalysis.prakriti) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {patient.medicalHistory.slice(0, 2).map((condition, index) => (
                    <Chip key={index} label={condition} size="small" variant="outlined" />
                  ))}
                  {patient.medicalHistory.length > 2 && (
                    <Chip label={`+${patient.medicalHistory.length - 2}`} size="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{patient.phone}</Typography>
                <Typography variant="body2" color="text.secondary">{patient.email}</Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="View Details">
                    <IconButton size="small" onClick={() => handleOpenDialog(patient)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => handleOpenDialog(patient)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error">
                      <Delete />
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
          Patient Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2 }}
        >
          Add New Patient
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Dosha</InputLabel>
          <Select
            value={filterDosha}
            label="Filter by Dosha"
            onChange={(e) => setFilterDosha(e.target.value)}
          >
            <MenuItem value="all">All Doshas</MenuItem>
            <MenuItem value="Vata">Vata</MenuItem>
            <MenuItem value="Pitta">Pitta</MenuItem>
            <MenuItem value="Kapha">Kapha</MenuItem>
            <MenuItem value="Mixed">Mixed</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" startIcon={<FilterList />}>
          More Filters
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label={`Card View (${filteredPatients.length})`} />
          <Tab label={`Table View (${filteredPatients.length})`} />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {filteredPatients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={patient.id}>
              <PatientCard patient={patient} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <PatientTable />
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h4">{patients.length}</Typography>
                    <Typography color="text.secondary">Total Patients</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Psychology sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h4">
                      {patients.filter(p => p.constitutionalAnalysis.prakriti === 'Pitta').length}
                    </Typography>
                    <Typography color="text.secondary">Pitta Patients</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MedicalServices sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h4">
                      {patients.reduce((sum, p) => sum + p.medicalHistory.length, 0)}
                    </Typography>
                    <Typography color="text.secondary">Total Conditions</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h4">87%</Typography>
                    <Typography color="text.secondary">Avg. Compliance</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedPatient ? 'Edit Patient' : 'Add New Patient'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue={selectedPatient?.name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                defaultValue={selectedPatient?.age || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  defaultValue={selectedPatient?.gender || ''}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Prakriti</InputLabel>
                <Select
                  defaultValue={selectedPatient?.constitutionalAnalysis.prakriti || ''}
                  label="Prakriti"
                >
                  <MenuItem value="Vata">Vata</MenuItem>
                  <MenuItem value="Pitta">Pitta</MenuItem>
                  <MenuItem value="Kapha">Kapha</MenuItem>
                  <MenuItem value="Mixed">Mixed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={selectedPatient?.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                defaultValue={selectedPatient?.phone || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                defaultValue={selectedPatient?.address || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medical History"
                multiline
                rows={3}
                defaultValue={selectedPatient?.medicalHistory.join(', ') || ''}
                variant="outlined"
                placeholder="Enter medical conditions separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Allergies"
                multiline
                rows={2}
                defaultValue={selectedPatient?.allergies.join(', ') || ''}
                variant="outlined"
                placeholder="Enter allergies separated by commas"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedPatient ? 'Update' : 'Add'} Patient
          </Button>
        </DialogActions>
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => handleOpenDialog()}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default Patients;
