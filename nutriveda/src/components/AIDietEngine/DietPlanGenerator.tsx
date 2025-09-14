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
  TextField,
  Chip,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Psychology,
  Restaurant,
  CheckCircle,
  Edit,
  Download,
  Share,
  Add,
  Remove
} from '@mui/icons-material';
import { DietPlan, DailyMeal, Meal, FoodItem } from '../../types';
import { mockFoodDatabase } from '../../data/mockData';

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
      id={`diet-tabpanel-${index}`}
      aria-labelledby={`diet-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DietPlanGenerator: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState('1');
  const [duration, setDuration] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');
  const [generatedPlan, setGeneratedPlan] = useState<DietPlan | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  // Mock diet plan generation
  const generateDietPlan = () => {
    const mockPlan: DietPlan = {
      id: '1',
      patientId: selectedPatient,
      name: `${duration.charAt(0).toUpperCase() + duration.slice(1)} Diet Plan`,
      duration,
      startDate: new Date(),
      endDate: new Date(Date.now() + (duration === 'weekly' ? 7 : duration === 'monthly' ? 30 : 90) * 24 * 60 * 60 * 1000),
      totalCalories: 1800,
      ayurvedicCompliance: 92,
      modernNutritionCompliance: 88,
      meals: generateMockMeals(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setGeneratedPlan(mockPlan);
  };

  const generateMockMeals = (): DailyMeal[] => {
    const days = duration === 'weekly' ? 7 : duration === 'monthly' ? 30 : 90;
    const meals: DailyMeal[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      meals.push({
        date,
        breakfast: generateMockMeal('Breakfast', 'morning'),
        lunch: generateMockMeal('Lunch', 'afternoon'),
        dinner: generateMockMeal('Dinner', 'evening'),
        snacks: [generateMockMeal('Evening Snack', 'evening')],
        waterIntake: 2.5,
        notes: `Day ${i + 1} - Follow Ayurvedic principles`
      });
    }
    
    return meals;
  };

  const generateMockMeal = (name: string, timing: string): Meal => {
    const foods = mockFoodDatabase.slice(0, 3);
    return {
      id: Math.random().toString(),
      name,
      foods,
      totalCalories: 400,
      totalProtein: 15,
      totalCarbs: 50,
      totalFats: 12,
      ayurvedicProperties: {
        rasa: ['Sweet', 'Pungent'],
        guna: ['Light', 'Warm'],
        virya: 'Warm',
        vipaka: 'Sweet',
        doshaImpact: {
          vata: -1,
          pitta: 0,
          kapha: -1
        }
      },
      timing,
      instructions: `Consume ${name.toLowerCase()} at ${timing} for optimal digestion`
    };
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    setEditDialogOpen(true);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting diet plan as ${format}`);
    // This would trigger the actual export functionality
  };

  const renderMealCard = (meal: Meal, mealType: string) => (
    <Card key={meal.id} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">{mealType}</Typography>
          <Box>
            <IconButton size="small" onClick={() => handleEditMeal(meal)}>
              <Edit />
            </IconButton>
            <Chip 
              label={`${meal.totalCalories} cal`} 
              size="small" 
              color="primary" 
            />
          </Box>
        </Box>
        
        <List dense>
          {meal.foods.map((food: FoodItem, index: number) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemIcon>
                <Restaurant fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={food.name}
                secondary={`${food.calories} cal • ${food.ayurvedicProperties.rasa.join(', ')}`}
              />
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={`Protein: ${meal.totalProtein}g`} 
            size="small" 
            variant="outlined" 
          />
          <Chip 
            label={`Carbs: ${meal.totalCarbs}g`} 
            size="small" 
            variant="outlined" 
          />
          <Chip 
            label={`Fats: ${meal.totalFats}g`} 
            size="small" 
            variant="outlined" 
          />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        AI Diet Plan Generator
      </Typography>
      
      <Grid container spacing={3}>
        {/* Configuration Panel */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Psychology sx={{ mr: 1, color: 'primary.main' }} />
                Configuration
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Patient</InputLabel>
                <Select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                >
                  <MenuItem value="1">Rajesh Kumar (Diabetes)</MenuItem>
                  <MenuItem value="2">Priya Sharma (PCOS)</MenuItem>
                  <MenuItem value="3">Anita Patel (Weight Management)</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value as any)}
                >
                  <MenuItem value="weekly">Weekly (7 days)</MenuItem>
                  <MenuItem value="monthly">Monthly (30 days)</MenuItem>
                  <MenuItem value="quarterly">Quarterly (90 days)</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Special Requirements"
                multiline
                rows={3}
                placeholder="e.g., Avoid spicy foods, include more fiber..."
                sx={{ mb: 2 }}
              />
              
              <Button
                variant="contained"
                fullWidth
                onClick={generateDietPlan}
                startIcon={<Psychology />}
                sx={{ mb: 2 }}
              >
                Generate AI Diet Plan
              </Button>
              
              {generatedPlan && (
                <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Diet plan generated successfully!
                  </Alert>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleExport('pdf')}
                      startIcon={<Download />}
                    >
                      PDF
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleExport('excel')}
                      startIcon={<Download />}
                    >
                      Excel
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Share />}
                    >
                      Share
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
          
          {/* Compliance Metrics */}
          {generatedPlan && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Compliance Metrics
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Ayurvedic Compliance</Typography>
                    <Typography variant="body2">{generatedPlan.ayurvedicCompliance}%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                    <Typography variant="caption" color="success.main">
                      Excellent compliance
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Modern Nutrition</Typography>
                    <Typography variant="body2">{generatedPlan.modernNutritionCompliance}%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                    <Typography variant="caption" color="success.main">
                      Good compliance
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary">
                  Total Calories: {generatedPlan.totalCalories} kcal/day
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {generatedPlan.duration}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        
        {/* Diet Plan Display */}
        <Grid item xs={12} md={8}>
          {generatedPlan ? (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {generatedPlan.name}
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleExport('pdf')}
                      startIcon={<Download />}
                      sx={{ mr: 1 }}
                    >
                      Export PDF
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleExport('excel')}
                      startIcon={<Download />}
                    >
                      Export Excel
                    </Button>
                  </Box>
                </Box>
                
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
                  <Tab label="Week 1" />
                  <Tab label="Week 2" />
                  <Tab label="Week 3" />
                  <Tab label="Week 4" />
                </Tabs>
                
                <TabPanel value={tabValue} index={0}>
                  {generatedPlan.meals.slice(0, 7).map((dailyMeal, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Day {index + 1} - {dailyMeal.date.toLocaleDateString()}
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            {renderMealCard(dailyMeal.breakfast, 'Breakfast')}
                          </Grid>
                          <Grid item xs={12} md={4}>
                            {renderMealCard(dailyMeal.lunch, 'Lunch')}
                          </Grid>
                          <Grid item xs={12} md={4}>
                            {renderMealCard(dailyMeal.dinner, 'Dinner')}
                          </Grid>
                        </Grid>
                        
                        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Water Intake:</strong> {dailyMeal.waterIntake} liters
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Notes:</strong> {dailyMeal.notes}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </TabPanel>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Psychology sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Generate Your AI Diet Plan
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Configure the parameters and click "Generate AI Diet Plan" to create a personalized diet plan
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      
      {/* Edit Meal Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Meal</DialogTitle>
        <DialogContent>
          {selectedMeal && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedMeal.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedMeal.instructions}
              </Typography>
              
              <List>
                {selectedMeal.foods.map((food: FoodItem, index: number) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Restaurant />
                    </ListItemIcon>
                    <ListItemText 
                      primary={food.name}
                      secondary={`${food.calories} cal • ${food.ayurvedicProperties.rasa.join(', ')}`}
                    />
                    <IconButton size="small">
                      <Remove />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              
              <Button startIcon={<Add />} sx={{ mt: 2 }}>
                Add Food Item
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setEditDialogOpen(false)}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DietPlanGenerator;
