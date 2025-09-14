import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper
} from '@mui/material';
import {
  Download,
  PictureAsPdf,
  TableChart,
  CheckCircle,
} from '@mui/icons-material';
import { DietPlan, ExportOptions } from '../../types';

const ExportTools: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeNutritionFacts: true,
    includeAyurvedicProperties: true,
    includeInstructions: true,
    clinicBranding: true
  });
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedFiles, setExportedFiles] = useState<string[]>([]);

  // Mock diet plans for export
  const mockDietPlans: DietPlan[] = [
    {
      id: '1',
      patientId: '1',
      name: 'Diabetes Management Plan',
      duration: 'monthly',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      totalCalories: 1800,
      ayurvedicCompliance: 92,
      modernNutritionCompliance: 88,
      meals: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      patientId: '2',
      name: 'PCOS Weight Management',
      duration: 'quarterly',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      totalCalories: 1600,
      ayurvedicCompliance: 85,
      modernNutritionCompliance: 90,
      meals: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const handleExport = async () => {
    setExporting(true);
    setExportProgress(0);
    
    // Simulate export process
    for (let i = 0; i <= 100; i += 10) {
      setExportProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    const fileName = `diet-plan-${Date.now()}.${selectedFormat}`;
    setExportedFiles(prev => [...prev, fileName]);
    setExporting(false);
    setExportProgress(0);
  };

  const handleBulkExport = async () => {
    setExporting(true);
    setExportProgress(0);
    
    // Simulate bulk export
    for (let i = 0; i <= 100; i += 5) {
      setExportProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const files = mockDietPlans.map(plan => 
      `${plan.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${selectedFormat}`
    );
    setExportedFiles(prev => [...prev, ...files]);
    setExporting(false);
    setExportProgress(0);
  };

  const getFormatIcon = (format: string) => {
    return format === 'pdf' ? <PictureAsPdf /> : <TableChart />;
  };


  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Export Tools
      </Typography>
      
      <Grid container spacing={3}>
        {/* Export Configuration */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Download sx={{ mr: 1, color: 'primary.main' }} />
                Export Configuration
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Export Format</InputLabel>
                <Select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as 'pdf' | 'excel')}
                >
                  <MenuItem value="pdf">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PictureAsPdf sx={{ mr: 1, color: 'error.main' }} />
                      PDF Document
                    </Box>
                  </MenuItem>
                  <MenuItem value="excel">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TableChart sx={{ mr: 1, color: 'success.main' }} />
                      Excel Spreadsheet
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
              
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Include in Export:
              </Typography>
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeNutritionFacts}
                    onChange={(e) => setExportOptions(prev => ({
                      ...prev,
                      includeNutritionFacts: e.target.checked
                    }))}
                  />
                }
                label="Nutrition Facts"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeAyurvedicProperties}
                    onChange={(e) => setExportOptions(prev => ({
                      ...prev,
                      includeAyurvedicProperties: e.target.checked
                    }))}
                  />
                }
                label="Ayurvedic Properties"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.includeInstructions}
                    onChange={(e) => setExportOptions(prev => ({
                      ...prev,
                      includeInstructions: e.target.checked
                    }))}
                  />
                }
                label="Cooking Instructions"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportOptions.clinicBranding}
                    onChange={(e) => setExportOptions(prev => ({
                      ...prev,
                      clinicBranding: e.target.checked
                    }))}
                  />
                }
                label="Clinic Branding"
              />
              
              <TextField
                fullWidth
                label="Custom Notes"
                multiline
                rows={3}
                placeholder="Add any additional notes for the export..."
                sx={{ mt: 2 }}
              />
              
              <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleExport}
                  disabled={exporting}
                  startIcon={getFormatIcon(selectedFormat)}
                >
                  Export Single Plan
                </Button>
              </Box>
              
              <Button
                variant="outlined"
                fullWidth
                onClick={handleBulkExport}
                disabled={exporting}
                sx={{ mt: 1 }}
                startIcon={<Download />}
              >
                Bulk Export All Plans
              </Button>
              
              {exporting && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Exporting {selectedFormat.toUpperCase()}...
                  </Typography>
                  <LinearProgress variant="determinate" value={exportProgress} />
                  <Typography variant="caption" color="text.secondary">
                    {exportProgress}% complete
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Available Diet Plans */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Diet Plans for Export
              </Typography>
              
              <List>
                {mockDietPlans.map((plan, index) => (
                  <React.Fragment key={plan.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        {getFormatIcon(selectedFormat)}
                      </ListItemIcon>
                      <ListItemText
                        primary={plan.name}
                        secondary={`${plan.duration} • ${plan.totalCalories} cal/day • ${plan.ayurvedicCompliance}% Ayurvedic compliance`}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={`${plan.ayurvedicCompliance}% Ayurvedic`} 
                          size="small" 
                          color="success" 
                        />
                        <Chip 
                          label={`${plan.modernNutritionCompliance}% Modern`} 
                          size="small" 
                          color="info" 
                        />
                      </Box>
                    </ListItem>
                    {index < mockDietPlans.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
          
          {/* Export Preview */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Export Preview
              </Typography>
              
              <Paper sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  NutriVeda - AI-Powered Ayurvedic Nutrition
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Patient: Rajesh Kumar | Duration: Monthly | Generated: {new Date().toLocaleDateString()}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom>
                  Diet Plan Overview
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Chip label="Total Calories: 1800 kcal/day" color="primary" />
                  <Chip label="Ayurvedic Compliance: 92%" color="success" />
                  <Chip label="Modern Nutrition: 88%" color="info" />
                </Box>
                
                {exportOptions.includeNutritionFacts && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Nutrition Facts
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Protein: 15-20% of daily calories
                      • Carbohydrates: 45-50% of daily calories
                      • Fats: 25-30% of daily calories
                      • Fiber: 25-35g per day
                    </Typography>
                  </Box>
                )}
                
                {exportOptions.includeAyurvedicProperties && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Ayurvedic Properties
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Rasa: Sweet, Pungent, Astringent
                      • Guna: Light, Warm, Dry
                      • Virya: Warm
                      • Vipaka: Sweet
                    </Typography>
                  </Box>
                )}
                
                {exportOptions.clinicBranding && (
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" color="text.secondary">
                      Generated by NutriVeda AI Platform | Ministry of AYUSH Approved
                    </Typography>
                  </Box>
                )}
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Export History */}
        {exportedFiles.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                  Export History
                </Typography>
                
                <List>
                  {exportedFiles.map((file, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {getFormatIcon(file.split('.').pop() || 'pdf')}
                      </ListItemIcon>
                      <ListItemText
                        primary={file}
                        secondary={`Exported ${new Date().toLocaleString()}`}
                      />
                      <Button size="small" startIcon={<Download />}>
                        Download
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ExportTools;
