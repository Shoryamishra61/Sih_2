import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress
} from '@mui/material';
import {
  Search,
  FilterList,
  ExpandMore,
  Restaurant,
  Add,
  Edit,
  Delete,
  Visibility
} from '@mui/icons-material';
import { mockFoodDatabase } from '../../data/mockData';
import { FoodItem } from '../../types';

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
      id={`food-tabpanel-${index}`}
      aria-labelledby={`food-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const FoodDatabase: React.FC = () => {
  const [foods] = useState<FoodItem[]>(mockFoodDatabase);
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDosha, setSelectedDosha] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const categories = ['all', ...Array.from(new Set(foods.map(f => f.category)))];
  const doshas = ['all', 'Vata', 'Pitta', 'Kapha'];

  const filteredFoods = useMemo(() => {
    return foods.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           food.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
      const matchesDosha = selectedDosha === 'all' || 
                          (selectedDosha === 'Vata' && food.ayurvedicProperties.doshaImpact.vata < 0) ||
                          (selectedDosha === 'Pitta' && food.ayurvedicProperties.doshaImpact.pitta < 0) ||
                          (selectedDosha === 'Kapha' && food.ayurvedicProperties.doshaImpact.kapha < 0);
      return matchesSearch && matchesCategory && matchesDosha;
    });
  }, [foods, searchTerm, selectedCategory, selectedDosha]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (food?: FoodItem) => {
    setSelectedFood(food || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFood(null);
  };

  const getDoshaImpactColor = (impact: number) => {
    if (impact < 0) return 'success.main';
    if (impact > 0) return 'error.main';
    return 'text.secondary';
  };

  const getDoshaImpactText = (impact: number) => {
    if (impact < 0) return 'Pacifies';
    if (impact > 0) return 'Aggravates';
    return 'Neutral';
  };

  const FoodCard = ({ food }: { food: FoodItem }) => (
    <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {food.name}
          </Typography>
          <Chip label={food.category} size="small" color="primary" variant="outlined" />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Nutritional Value (per 100g)
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body2">Calories: {food.calories}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Protein: {food.protein}g</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Carbs: {food.carbs}g</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Fats: {food.fats}g</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Ayurvedic Properties
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {food.ayurvedicProperties.rasa.map((rasa, index) => (
              <Chip key={index} label={rasa} size="small" variant="outlined" />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            Virya: {food.ayurvedicProperties.virya} • Vipaka: {food.ayurvedicProperties.vipaka}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Dosha Impact
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color={getDoshaImpactColor(food.ayurvedicProperties.doshaImpact.vata)}>
                  Vata: {getDoshaImpactText(food.ayurvedicProperties.doshaImpact.vata)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color={getDoshaImpactColor(food.ayurvedicProperties.doshaImpact.pitta)}>
                  Pitta: {getDoshaImpactText(food.ayurvedicProperties.doshaImpact.pitta)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color={getDoshaImpactColor(food.ayurvedicProperties.doshaImpact.kapha)}>
                  Kapha: {getDoshaImpactText(food.ayurvedicProperties.doshaImpact.kapha)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {food.benefits.length} benefits
          </Typography>
          <Box>
            <Tooltip title="View Details">
              <IconButton size="small" onClick={() => handleOpenDialog(food)}>
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => handleOpenDialog(food)}>
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

  const FoodTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Food Item</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Rasa</TableCell>
            <TableCell>Virya</TableCell>
            <TableCell>Dosha Impact</TableCell>
            <TableCell>Benefits</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFoods.map((food) => (
            <TableRow key={food.id} hover>
              <TableCell>
                <Typography variant="subtitle2">{food.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {food.preparation}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip label={food.category} size="small" color="primary" variant="outlined" />
              </TableCell>
              <TableCell>
                <Typography variant="body2">{food.calories}</Typography>
                <Typography variant="body2" color="text.secondary">
                  P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {food.ayurvedicProperties.rasa.map((rasa, index) => (
                    <Chip key={index} label={rasa} size="small" />
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                <Chip 
                  label={food.ayurvedicProperties.virya} 
                  size="small" 
                  color={food.ayurvedicProperties.virya === 'Hot' ? 'error' : 'info'}
                />
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2" color={getDoshaImpactColor(food.ayurvedicProperties.doshaImpact.vata)}>
                    V: {getDoshaImpactText(food.ayurvedicProperties.doshaImpact.vata)}
                  </Typography>
                  <Typography variant="body2" color={getDoshaImpactColor(food.ayurvedicProperties.doshaImpact.pitta)}>
                    P: {getDoshaImpactText(food.ayurvedicProperties.doshaImpact.pitta)}
                  </Typography>
                  <Typography variant="body2" color={getDoshaImpactColor(food.ayurvedicProperties.doshaImpact.kapha)}>
                    K: {getDoshaImpactText(food.ayurvedicProperties.doshaImpact.kapha)}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" noWrap>
                  {food.benefits.slice(0, 2).join(', ')}
                  {food.benefits.length > 2 && ` +${food.benefits.length - 2} more`}
                </Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="View Details">
                    <IconButton size="small" onClick={() => handleOpenDialog(food)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => handleOpenDialog(food)}>
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

  const categoryStats = categories.slice(1).map(category => ({
    name: category,
    count: foods.filter(f => f.category === category).length,
    percentage: Math.round((foods.filter(f => f.category === category).length / foods.length) * 100)
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Food Database
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2 }}
        >
          Add New Food
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search foods, categories, or benefits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          sx={{ flexGrow: 1, minWidth: 300 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Dosha Benefit</InputLabel>
          <Select
            value={selectedDosha}
            label="Dosha Benefit"
            onChange={(e) => setSelectedDosha(e.target.value)}
          >
            {doshas.map(dosha => (
              <MenuItem key={dosha} value={dosha}>
                {dosha === 'all' ? 'All Doshas' : `Pacifies ${dosha}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" startIcon={<FilterList />}>
          Advanced Filters
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label={`Card View (${filteredFoods.length})`} />
          <Tab label={`Table View (${filteredFoods.length})`} />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {filteredFoods.map((food) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
              <FoodCard food={food} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <FoodTable />
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Food Categories Distribution
                </Typography>
                {categoryStats.map((stat) => (
                  <Box key={stat.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{stat.name}</Typography>
                      <Typography variant="body2">{stat.count} items ({stat.percentage}%)</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={stat.percentage} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Dosha Impact Analysis
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="error.main">
                        {foods.filter(f => f.ayurvedicProperties.doshaImpact.vata < 0).length}
                      </Typography>
                      <Typography variant="body2">Vata Pacifying</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main">
                        {foods.filter(f => f.ayurvedicProperties.doshaImpact.pitta < 0).length}
                      </Typography>
                      <Typography variant="body2">Pitta Pacifying</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="info.main">
                        {foods.filter(f => f.ayurvedicProperties.doshaImpact.kapha < 0).length}
                      </Typography>
                      <Typography variant="body2">Kapha Pacifying</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Additions
                </Typography>
                <Grid container spacing={2}>
                  {foods.slice(0, 6).map((food) => (
                    <Grid item xs={12} sm={6} md={4} key={food.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Restaurant sx={{ mr: 2, color: 'primary.main' }} />
                        <Box>
                          <Typography variant="subtitle2">{food.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{food.category}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedFood ? 'Food Details' : 'Add New Food Item'}
        </DialogTitle>
        <DialogContent>
          {selectedFood ? (
            <Box>
              <Typography variant="h5" gutterBottom>{selectedFood.name}</Typography>
              <Chip label={selectedFood.category} color="primary" sx={{ mb: 2 }} />
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Nutritional Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">Calories</Typography>
                      <Typography variant="h6">{selectedFood.calories}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">Protein</Typography>
                      <Typography variant="h6">{selectedFood.protein}g</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">Carbs</Typography>
                      <Typography variant="h6">{selectedFood.carbs}g</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">Fats</Typography>
                      <Typography variant="h6">{selectedFood.fats}g</Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Ayurvedic Properties</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>Rasa (Taste)</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedFood.ayurvedicProperties.rasa.map((rasa, index) => (
                          <Chip key={index} label={rasa} size="small" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>Guna (Quality)</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedFood.ayurvedicProperties.guna.map((guna, index) => (
                          <Chip key={index} label={guna} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>Virya (Potency)</Typography>
                      <Chip 
                        label={selectedFood.ayurvedicProperties.virya} 
                        color={selectedFood.ayurvedicProperties.virya === 'Hot' ? 'error' : 'info'}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>Vipaka (Post-digestive)</Typography>
                      <Chip label={selectedFood.ayurvedicProperties.vipaka} />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Dosha Impact</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Typography variant="h6" color={getDoshaImpactColor(selectedFood.ayurvedicProperties.doshaImpact.vata)}>
                          Vata
                        </Typography>
                        <Typography variant="body2">
                          {getDoshaImpactText(selectedFood.ayurvedicProperties.doshaImpact.vata)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Typography variant="h6" color={getDoshaImpactColor(selectedFood.ayurvedicProperties.doshaImpact.pitta)}>
                          Pitta
                        </Typography>
                        <Typography variant="body2">
                          {getDoshaImpactText(selectedFood.ayurvedicProperties.doshaImpact.pitta)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Typography variant="h6" color={getDoshaImpactColor(selectedFood.ayurvedicProperties.doshaImpact.kapha)}>
                          Kapha
                        </Typography>
                        <Typography variant="body2">
                          {getDoshaImpactText(selectedFood.ayurvedicProperties.doshaImpact.kapha)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Benefits & Contraindications</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom color="success.main">
                        Benefits
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedFood.benefits.map((benefit, index) => (
                          <Chip key={index} label={benefit} size="small" color="success" variant="outlined" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom color="error.main">
                        Contraindications
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedFood.contraindications.map((contraindication, index) => (
                          <Chip key={index} label={contraindication} size="small" color="error" variant="outlined" />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Usage Guidelines</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Best Time to Eat
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedFood.bestTimeToEat.map((time, index) => (
                          <Chip key={index} label={time} size="small" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Preparation
                      </Typography>
                      <Typography variant="body2">{selectedFood.preparation}</Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Food Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select label="Category">
                    {categories.slice(1).map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Calories" type="number" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Protein (g)" type="number" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Carbs (g)" type="number" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Fats (g)" type="number" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Preparation Instructions" multiline rows={3} variant="outlined" />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {!selectedFood && (
            <Button variant="contained" onClick={handleCloseDialog}>
              Add Food Item
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FoodDatabase;
