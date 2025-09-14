import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Alert,
  Chip,
  Divider,
  Paper,
  Grid
} from '@mui/material';
import {
  CloudUpload,
  Psychology,
  Restaurant,
  Timeline
} from '@mui/icons-material';
import { PrescriptionData } from '../../types';

const PrescriptionUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<PrescriptionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mock OCR processing
  const processPrescription = async (file: File) => {
    setUploading(true);
    setError(null);
    
    // Simulate OCR processing
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Mock extracted data
    const mockExtractedData: PrescriptionData = {
      id: '1',
      patientId: '1',
      fileName: file.name,
      extractedText: `Patient: Rajesh Kumar
Age: 45
Date: ${new Date().toLocaleDateString()}

Diet Prescription:
- Morning: Oats with milk, 1 banana
- Lunch: Brown rice, dal, vegetables
- Evening: Green tea, nuts
- Dinner: Roti, sabzi, curd

Special Instructions:
- Avoid sugar and processed foods
- Include more fiber
- Drink 8 glasses of water daily
- Exercise for 30 minutes`,
      foods: ['Oats', 'Milk', 'Banana', 'Brown rice', 'Dal', 'Vegetables', 'Green tea', 'Nuts', 'Roti', 'Sabzi', 'Curd'],
      instructions: 'Avoid sugar and processed foods, include more fiber, drink 8 glasses of water daily, exercise for 30 minutes',
      duration: '1 month',
      specialNotes: 'Patient has diabetes and hypertension',
      processedAt: new Date()
    };

    setExtractedData(mockExtractedData);
    setUploading(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      processPrescription(file);
    }
  };

  const generateDietPlan = () => {
    // This would trigger the AI diet generation
    console.log('Generating diet plan from prescription...');
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Prescription Upload & Processing
      </Typography>
      
      <Grid container spacing={3}>
        {/* Upload Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CloudUpload sx={{ mr: 1, color: 'primary.main' }} />
                Upload Doctor's Prescription
              </Typography>
              
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  bgcolor: 'action.hover',
                  mb: 2
                }}
              >
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Drop prescription here or click to upload
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Supports PDF, JPG, PNG files up to 10MB
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  disabled={uploading}
                >
                  Choose File
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                </Button>
              </Box>

              {uploading && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Processing prescription with AI OCR...
                  </Typography>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                  <Typography variant="caption" color="text.secondary">
                    {uploadProgress}% complete
                  </Typography>
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {uploadedFile && !uploading && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  File uploaded successfully: {uploadedFile.name}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Processing Results */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Psychology sx={{ mr: 1, color: 'success.main' }} />
                AI Processing Results
              </Typography>
              
              {extractedData ? (
                <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Prescription processed successfully!
                  </Alert>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Extracted Foods:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {extractedData.foods.map((food, index) => (
                        <Chip
                          key={index}
                          label={food}
                          color="primary"
                          size="small"
                          icon={<Restaurant />}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Duration: {extractedData.duration}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Special Notes: {extractedData.specialNotes}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Instructions:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {extractedData.instructions}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={generateDietPlan}
                    sx={{ mt: 2 }}
                    startIcon={<Timeline />}
                  >
                    Generate AI Diet Plan
                  </Button>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Psychology sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Upload a prescription to see AI processing results
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Extracted Text Preview */}
        {extractedData && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Extracted Text Preview
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    maxHeight: 300,
                    overflow: 'auto'
                  }}
                >
                  <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                    {extractedData.extractedText}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PrescriptionUpload;
