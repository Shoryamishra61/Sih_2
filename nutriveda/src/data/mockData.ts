import { Patient, FoodItem, DashboardStats, DietPlan, DailyMeal, Meal } from '../types';

// Comprehensive Food Database (8,000+ items simulation)
export const mockFoodDatabase: FoodItem[] = [
  // Grains & Cereals
  {
    id: '1',
    name: 'Basmati Rice',
    category: 'Grains',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    fiber: 0.4,
    sugar: 0.1,
    sodium: 1,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Easy to digest', 'Cooling effect', 'Nourishing'],
    contraindications: ['High kapha', 'Obesity'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Wash and cook with 1:2 ratio of rice to water'
  },
  {
    id: '2',
    name: 'Brown Rice',
    category: 'Grains',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fats: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 5,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['High fiber', 'Nutritious', 'Blood sugar control'],
    contraindications: ['High kapha', 'Digestive issues'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Soak 30 minutes, cook with 1:2.5 ratio'
  },
  {
    id: '3',
    name: 'Quinoa',
    category: 'Grains',
    calories: 120,
    protein: 4.4,
    carbs: 22,
    fats: 1.9,
    fiber: 2.8,
    sugar: 0.9,
    sodium: 7,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Astringent'],
      guna: ['Light', 'Dry'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: 1, pitta: -1, kapha: -1 }
    },
    benefits: ['Complete protein', 'Gluten-free', 'High fiber'],
    contraindications: ['Vata imbalance'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Rinse and cook with 1:2 ratio'
  },
  {
    id: '4',
    name: 'Oats',
    category: 'Grains',
    calories: 68,
    protein: 2.4,
    carbs: 12,
    fats: 1.4,
    fiber: 1.7,
    sugar: 0.2,
    sodium: 4,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Heart healthy', 'Cholesterol lowering', 'Satiating'],
    contraindications: ['High kapha', 'Gluten sensitivity'],
    bestTimeToEat: ['Breakfast'],
    preparation: 'Cook with water or milk, add spices'
  },

  // Dairy Products
  {
    id: '5',
    name: 'Ghee',
    category: 'Dairy',
    calories: 900,
    protein: 0,
    carbs: 0,
    fats: 100,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Smooth', 'Soft'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -2, pitta: -1, kapha: 1 }
    },
    benefits: ['Enhances memory', 'Improves digestion', 'Nourishes tissues'],
    contraindications: ['High cholesterol', 'Obesity'],
    bestTimeToEat: ['Morning', 'With meals'],
    preparation: 'Use 1-2 teaspoons with warm food'
  },
  {
    id: '6',
    name: 'Fresh Milk',
    category: 'Dairy',
    calories: 42,
    protein: 3.4,
    carbs: 5,
    fats: 1,
    fiber: 0,
    sugar: 5,
    sodium: 44,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool', 'Smooth'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Bone health', 'Muscle building', 'Cooling'],
    contraindications: ['Lactose intolerance', 'High kapha'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Warm with spices like turmeric or cardamom'
  },
  {
    id: '7',
    name: 'Yogurt',
    category: 'Dairy',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fats: 0.4,
    fiber: 0,
    sugar: 3.6,
    sodium: 36,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Sour'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sour',
      doshaImpact: { vata: 1, pitta: 1, kapha: 1 }
    },
    benefits: ['Probiotics', 'Digestive health', 'Protein rich'],
    contraindications: ['High kapha', 'Cold conditions'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Consume at room temperature with spices'
  },

  // Legumes & Pulses
  {
    id: '8',
    name: 'Mung Dal',
    category: 'Legumes',
    calories: 347,
    protein: 24,
    carbs: 59,
    fats: 1.2,
    fiber: 16.3,
    sugar: 6.6,
    sodium: 15,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Astringent'],
      guna: ['Light', 'Dry'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: 1, pitta: -1, kapha: -1 }
    },
    benefits: ['Easy to digest', 'Cooling', 'Detoxifying'],
    contraindications: ['Vata imbalance'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Soak overnight, cook with spices'
  },
  {
    id: '9',
    name: 'Chickpeas',
    category: 'Legumes',
    calories: 164,
    protein: 8.9,
    carbs: 27,
    fats: 2.6,
    fiber: 7.6,
    sugar: 4.8,
    sodium: 7,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Astringent'],
      guna: ['Heavy', 'Dry'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: 1, pitta: -1, kapha: 1 }
    },
    benefits: ['High protein', 'Fiber rich', 'Iron source'],
    contraindications: ['Vata imbalance', 'Gas problems'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Soak 8 hours, cook with digestive spices'
  },
  {
    id: '10',
    name: 'Lentils (Masoor Dal)',
    category: 'Legumes',
    calories: 116,
    protein: 9,
    carbs: 20,
    fats: 0.4,
    fiber: 7.9,
    sugar: 1.8,
    sodium: 2,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Astringent'],
      guna: ['Light', 'Dry'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: 1, pitta: -1, kapha: -1 }
    },
    benefits: ['Quick cooking', 'Protein rich', 'Heart healthy'],
    contraindications: ['Vata imbalance'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Cook with spices and ghee'
  },

  // Spices & Herbs
  {
    id: '11',
    name: 'Turmeric',
    category: 'Spices',
    calories: 354,
    protein: 7.8,
    carbs: 64.9,
    fats: 9.9,
    fiber: 21.1,
    sugar: 3.2,
    sodium: 38,
    ayurvedicProperties: {
      rasa: ['Bitter', 'Pungent'],
      guna: ['Light', 'Dry'],
      virya: 'Hot',
      vipaka: 'Pungent',
      doshaImpact: { vata: 1, pitta: 1, kapha: -2 }
    },
    benefits: ['Anti-inflammatory', 'Antioxidant', 'Digestive aid'],
    contraindications: ['Pitta imbalance', 'Bleeding disorders'],
    bestTimeToEat: ['With meals'],
    preparation: 'Add pinch to warm milk or food'
  },
  {
    id: '12',
    name: 'Ginger',
    category: 'Spices',
    calories: 80,
    protein: 1.8,
    carbs: 17.8,
    fats: 0.8,
    fiber: 2,
    sugar: 1.7,
    sodium: 13,
    ayurvedicProperties: {
      rasa: ['Pungent'],
      guna: ['Light', 'Sharp'],
      virya: 'Hot',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: 1, kapha: -2 }
    },
    benefits: ['Digestive aid', 'Anti-inflammatory', 'Circulation'],
    contraindications: ['Pitta imbalance', 'Bleeding disorders'],
    bestTimeToEat: ['Morning', 'With meals'],
    preparation: 'Fresh grated or powdered'
  },
  {
    id: '13',
    name: 'Cumin',
    category: 'Spices',
    calories: 375,
    protein: 17.8,
    carbs: 44.2,
    fats: 22.3,
    fiber: 10.5,
    sugar: 2.3,
    sodium: 168,
    ayurvedicProperties: {
      rasa: ['Pungent', 'Bitter'],
      guna: ['Light', 'Sharp'],
      virya: 'Hot',
      vipaka: 'Pungent',
      doshaImpact: { vata: -1, pitta: 1, kapha: -1 }
    },
    benefits: ['Digestive', 'Carminative', 'Antioxidant'],
    contraindications: ['Pitta imbalance'],
    bestTimeToEat: ['With meals'],
    preparation: 'Dry roast and powder or use whole'
  },
  {
    id: '14',
    name: 'Coriander',
    category: 'Spices',
    calories: 23,
    protein: 2.1,
    carbs: 3.7,
    fats: 0.5,
    fiber: 2.8,
    sugar: 0.9,
    sodium: 46,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Bitter'],
      guna: ['Light', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Cooling', 'Digestive', 'Detoxifying'],
    contraindications: ['High kapha'],
    bestTimeToEat: ['With meals'],
    preparation: 'Fresh leaves or ground seeds'
  },
  {
    id: '15',
    name: 'Cardamom',
    category: 'Spices',
    calories: 311,
    protein: 10.8,
    carbs: 68.5,
    fats: 6.7,
    fiber: 28,
    sugar: 0,
    sodium: 18,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Pungent'],
      guna: ['Light', 'Sharp'],
      virya: 'Hot',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: 1, kapha: -1 }
    },
    benefits: ['Digestive', 'Aromatic', 'Heart tonic'],
    contraindications: ['Pitta imbalance'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Crush pods or use powder'
  },

  // Vegetables
  {
    id: '16',
    name: 'Bitter Gourd',
    category: 'Vegetables',
    calories: 17,
    protein: 1,
    carbs: 3.7,
    fats: 0.2,
    fiber: 2.5,
    sugar: 0,
    sodium: 5,
    ayurvedicProperties: {
      rasa: ['Bitter'],
      guna: ['Light', 'Dry'],
      virya: 'Cool',
      vipaka: 'Pungent',
      doshaImpact: { vata: 1, pitta: -1, kapha: -1 }
    },
    benefits: ['Blood sugar control', 'Detoxifying', 'Cooling'],
    contraindications: ['Vata imbalance', 'Pregnancy'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Remove seeds, cook with spices'
  },
  {
    id: '17',
    name: 'Bottle Gourd',
    category: 'Vegetables',
    calories: 12,
    protein: 0.6,
    carbs: 2.5,
    fats: 0.02,
    fiber: 0.5,
    sugar: 1.2,
    sodium: 2,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Cooling', 'Diuretic', 'Easy digestible'],
    contraindications: ['High kapha'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Peel and cook with spices'
  },
  {
    id: '18',
    name: 'Spinach',
    category: 'Vegetables',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    fiber: 2.2,
    sugar: 0.4,
    sodium: 79,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Astringent'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: 1, pitta: -1, kapha: 1 }
    },
    benefits: ['Iron rich', 'Antioxidant', 'Bone health'],
    contraindications: ['Kidney stones', 'High oxalate'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Blanch or cook with ghee'
  },
  {
    id: '19',
    name: 'Carrot',
    category: 'Vegetables',
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fats: 0.2,
    fiber: 2.8,
    sugar: 4.7,
    sodium: 69,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Eye health', 'Antioxidant', 'Digestive'],
    contraindications: ['High kapha'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Cook with ghee and spices'
  },
  {
    id: '20',
    name: 'Cucumber',
    category: 'Vegetables',
    calories: 16,
    protein: 0.7,
    carbs: 3.6,
    fats: 0.1,
    fiber: 0.5,
    sugar: 1.7,
    sodium: 2,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: 1, pitta: -1, kapha: 1 }
    },
    benefits: ['Cooling', 'Hydrating', 'Detoxifying'],
    contraindications: ['High kapha', 'Cold conditions'],
    bestTimeToEat: ['Lunch', 'Dinner'],
    preparation: 'Fresh or lightly cooked'
  },

  // Fruits
  {
    id: '21',
    name: 'Apple',
    category: 'Fruits',
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fats: 0.2,
    fiber: 2.4,
    sugar: 10.4,
    sodium: 1,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Astringent'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Heart healthy', 'Fiber rich', 'Antioxidant'],
    contraindications: ['High kapha'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Fresh or cooked with spices'
  },
  {
    id: '22',
    name: 'Pomegranate',
    category: 'Fruits',
    calories: 83,
    protein: 1.7,
    carbs: 18.7,
    fats: 1.2,
    fiber: 4,
    sugar: 13.7,
    sodium: 3,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Astringent'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Antioxidant', 'Heart healthy', 'Cooling'],
    contraindications: ['High kapha'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Fresh seeds or juice'
  },
  {
    id: '23',
    name: 'Banana',
    category: 'Fruits',
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fats: 0.3,
    fiber: 2.6,
    sugar: 12.2,
    sodium: 1,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Energy rich', 'Potassium', 'Digestive'],
    contraindications: ['High kapha', 'Diabetes'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Ripe or cooked'
  },
  {
    id: '24',
    name: 'Grapes',
    category: 'Fruits',
    calories: 62,
    protein: 0.6,
    carbs: 15.5,
    fats: 0.2,
    fiber: 0.9,
    sugar: 15.5,
    sodium: 2,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Antioxidant', 'Heart healthy', 'Cooling'],
    contraindications: ['High kapha', 'Diabetes'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Fresh or as juice'
  },

  // Nuts & Seeds
  {
    id: '25',
    name: 'Almonds',
    category: 'Nuts',
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fats: 49.9,
    fiber: 12.5,
    sugar: 4.4,
    sodium: 1,
    ayurvedicProperties: {
      rasa: ['Sweet'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Brain health', 'Heart healthy', 'Protein rich'],
    contraindications: ['High kapha', 'Obesity'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Soaked overnight or roasted'
  },
  {
    id: '26',
    name: 'Walnuts',
    category: 'Nuts',
    calories: 654,
    protein: 15.2,
    carbs: 13.7,
    fats: 65.2,
    fiber: 6.7,
    sugar: 2.6,
    sodium: 2,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Astringent'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 1 }
    },
    benefits: ['Omega-3', 'Brain health', 'Heart healthy'],
    contraindications: ['High kapha', 'Obesity'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Soaked or roasted'
  },
  {
    id: '27',
    name: 'Sesame Seeds',
    category: 'Seeds',
    calories: 573,
    protein: 17.7,
    carbs: 23.4,
    fats: 49.7,
    fiber: 11.8,
    sugar: 0.3,
    sodium: 11,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Bitter'],
      guna: ['Heavy', 'Hot'],
      virya: 'Hot',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: 1, kapha: 1 }
    },
    benefits: ['Calcium rich', 'Bone health', 'Energy'],
    contraindications: ['Pitta imbalance', 'High kapha'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Roasted or as tahini'
  },

  // Herbs & Medicinal Plants
  {
    id: '28',
    name: 'Tulsi (Holy Basil)',
    category: 'Herbs',
    calories: 22,
    protein: 3.2,
    carbs: 2.3,
    fats: 0.6,
    fiber: 1.6,
    sugar: 0,
    sodium: 4,
    ayurvedicProperties: {
      rasa: ['Pungent', 'Bitter'],
      guna: ['Light', 'Sharp'],
      virya: 'Hot',
      vipaka: 'Pungent',
      doshaImpact: { vata: -1, pitta: 1, kapha: -1 }
    },
    benefits: ['Immunity', 'Respiratory health', 'Antioxidant'],
    contraindications: ['Pitta imbalance'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Fresh leaves or tea'
  },
  {
    id: '29',
    name: 'Ashwagandha',
    category: 'Herbs',
    calories: 245,
    protein: 3.9,
    carbs: 49.9,
    fats: 0.3,
    fiber: 32.3,
    sugar: 0,
    sodium: 1,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Bitter', 'Astringent'],
      guna: ['Heavy', 'Cool'],
      virya: 'Hot',
      vipaka: 'Sweet',
      doshaImpact: { vata: -2, pitta: 1, kapha: 1 }
    },
    benefits: ['Adaptogen', 'Stress relief', 'Energy'],
    contraindications: ['Pitta imbalance', 'Pregnancy'],
    bestTimeToEat: ['Morning', 'Evening'],
    preparation: 'Powder with warm milk'
  },
  {
    id: '30',
    name: 'Triphala',
    category: 'Herbs',
    calories: 319,
    protein: 3.6,
    carbs: 78.1,
    fats: 0.4,
    fiber: 7.2,
    sugar: 0,
    sodium: 1,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Sour', 'Bitter', 'Pungent', 'Astringent'],
      guna: ['Light', 'Dry'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: 1, pitta: -1, kapha: -1 }
    },
    benefits: ['Digestive', 'Detoxifying', 'Antioxidant'],
    contraindications: ['Vata imbalance', 'Pregnancy'],
    bestTimeToEat: ['Evening'],
    preparation: 'Powder with warm water'
  }
];

// Comprehensive Patient Database
export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'male',
    email: 'rajesh.kumar@email.com',
    phone: '+91-9876543210',
    address: '123 MG Road, Bangalore, Karnataka',
    medicalHistory: ['Diabetes Type 2', 'Hypertension', 'High Cholesterol'],
    allergies: ['Peanuts', 'Shellfish'],
    dietaryRestrictions: ['Vegetarian', 'Low Sodium'],
    constitutionalAnalysis: {
      prakriti: 'Pitta',
      vikriti: ['High Pitta', 'Vata imbalance'],
      doshaImbalance: ['Pitta aggravation', 'Vata disturbance']
    },
    healthParameters: {
      weight: 75,
      height: 170,
      bloodPressure: '140/90',
      diabetes: true,
      heartCondition: false,
      otherConditions: ['High cholesterol', 'Insulin resistance']
    },
    consultationHistory: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Priya Sharma',
    age: 32,
    gender: 'female',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543211',
    address: '456 Park Street, Mumbai, Maharashtra',
    medicalHistory: ['PCOS', 'Hypothyroidism', 'Insulin Resistance'],
    allergies: ['Dairy', 'Gluten'],
    dietaryRestrictions: ['Lactose-free', 'Gluten-free'],
    constitutionalAnalysis: {
      prakriti: 'Kapha',
      vikriti: ['High Kapha', 'Pitta imbalance'],
      doshaImbalance: ['Kapha aggravation', 'Pitta disturbance']
    },
    healthParameters: {
      weight: 65,
      height: 160,
      bloodPressure: '120/80',
      diabetes: false,
      heartCondition: false,
      otherConditions: ['Weight management', 'Hormonal imbalance']
    },
    consultationHistory: [],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Anita Patel',
    age: 28,
    gender: 'female',
    email: 'anita.patel@email.com',
    phone: '+91-9876543212',
    address: '789 Gandhi Nagar, Ahmedabad, Gujarat',
    medicalHistory: ['Anemia', 'Digestive Issues'],
    allergies: ['None'],
    dietaryRestrictions: ['Vegetarian'],
    constitutionalAnalysis: {
      prakriti: 'Vata',
      vikriti: ['High Vata'],
      doshaImbalance: ['Vata aggravation']
    },
    healthParameters: {
      weight: 50,
      height: 155,
      bloodPressure: '110/70',
      diabetes: false,
      heartCondition: false,
      otherConditions: ['Iron deficiency', 'Irregular digestion']
    },
    consultationHistory: [],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    name: 'Vikram Singh',
    age: 55,
    gender: 'male',
    email: 'vikram.singh@email.com',
    phone: '+91-9876543213',
    address: '321 Nehru Place, Delhi',
    medicalHistory: ['Heart Disease', 'Diabetes Type 2', 'High Blood Pressure'],
    allergies: ['Nuts'],
    dietaryRestrictions: ['Low Sodium', 'Low Fat'],
    constitutionalAnalysis: {
      prakriti: 'Mixed',
      vikriti: ['High Pitta', 'High Kapha'],
      doshaImbalance: ['Pitta aggravation', 'Kapha aggravation']
    },
    healthParameters: {
      weight: 85,
      height: 175,
      bloodPressure: '150/95',
      diabetes: true,
      heartCondition: true,
      otherConditions: ['High cholesterol', 'Arterial stiffness']
    },
    consultationHistory: [],
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30')
  },
  {
    id: '5',
    name: 'Sushma Reddy',
    age: 38,
    gender: 'female',
    email: 'sushma.reddy@email.com',
    phone: '+91-9876543214',
    address: '654 Jubilee Hills, Hyderabad, Telangana',
    medicalHistory: ['Rheumatoid Arthritis', 'Osteoporosis'],
    allergies: ['Nightshades'],
    dietaryRestrictions: ['Anti-inflammatory diet'],
    constitutionalAnalysis: {
      prakriti: 'Vata',
      vikriti: ['High Vata', 'Ama accumulation'],
      doshaImbalance: ['Vata aggravation', 'Ama dosha']
    },
    healthParameters: {
      weight: 58,
      height: 162,
      bloodPressure: '115/75',
      diabetes: false,
      heartCondition: false,
      otherConditions: ['Joint inflammation', 'Bone density loss']
    },
    consultationHistory: [],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

// Enhanced Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalPatients: 156,
  activeDietPlans: 89,
  completedConsultations: 234,
  averageCompliance: 87.5,
  recentActivity: [
    {
      id: '1',
      type: 'patient_added',
      description: 'New patient Sushma Reddy added',
      timestamp: new Date('2024-02-01T10:30:00'),
      patientName: 'Sushma Reddy'
    },
    {
      id: '2',
      type: 'diet_created',
      description: 'Quarterly diet plan created for Vikram Singh',
      timestamp: new Date('2024-01-30T14:20:00'),
      patientName: 'Vikram Singh'
    },
    {
      id: '3',
      type: 'consultation_completed',
      description: 'Follow-up consultation completed for Anita Patel',
      timestamp: new Date('2024-01-28T16:45:00'),
      patientName: 'Anita Patel'
    },
    {
      id: '4',
      type: 'prescription_processed',
      description: 'Prescription processed and diet plan generated for Priya Sharma',
      timestamp: new Date('2024-01-25T11:15:00'),
      patientName: 'Priya Sharma'
    },
    {
      id: '5',
      type: 'diet_created',
      description: 'Monthly diet plan updated for Rajesh Kumar',
      timestamp: new Date('2024-01-22T09:30:00'),
      patientName: 'Rajesh Kumar'
    }
  ]
};

// Comprehensive Diet Plans
export const mockDietPlans: DietPlan[] = [
  {
    id: '1',
    patientId: '1',
    name: 'Diabetes Management Plan - Pitta Pacifying',
    duration: 'monthly',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    totalCalories: 1800,
    ayurvedicCompliance: 92,
    modernNutritionCompliance: 88,
    meals: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    patientId: '2',
    name: 'PCOS Weight Management - Kapha Balancing',
    duration: 'quarterly',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31'),
    totalCalories: 1600,
    ayurvedicCompliance: 85,
    modernNutritionCompliance: 90,
    meals: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    patientId: '3',
    name: 'Vata Pacifying Plan - Digestive Health',
    duration: 'weekly',
    startDate: new Date('2024-01-25'),
    endDate: new Date('2024-01-31'),
    totalCalories: 2000,
    ayurvedicCompliance: 95,
    modernNutritionCompliance: 85,
    meals: [],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    patientId: '4',
    name: 'Heart Health Plan - Pitta & Kapha Balancing',
    duration: 'monthly',
    startDate: new Date('2024-01-30'),
    endDate: new Date('2024-02-29'),
    totalCalories: 1700,
    ayurvedicCompliance: 88,
    modernNutritionCompliance: 92,
    meals: [],
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30')
  },
  {
    id: '5',
    patientId: '5',
    name: 'Anti-Inflammatory Plan - Vata Pacifying',
    duration: 'monthly',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-29'),
    totalCalories: 1900,
    ayurvedicCompliance: 90,
    modernNutritionCompliance: 87,
    meals: [],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

// Generate comprehensive daily meals for diet plans
export const generateDailyMeals = (dietPlanId: string, days: number): DailyMeal[] => {
  const meals: DailyMeal[] = [];
  const baseDate = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    
    meals.push({
      date,
      breakfast: generateMeal('Breakfast', dietPlanId),
      lunch: generateMeal('Lunch', dietPlanId),
      dinner: generateMeal('Dinner', dietPlanId),
      snacks: [generateMeal('Snack', dietPlanId)],
      waterIntake: 2.5 + Math.random() * 1.5,
      notes: `Day ${i + 1} - Follow Ayurvedic principles`
    });
  }
  
  return meals;
};

// Generate individual meals
export const generateMeal = (mealType: string, dietPlanId: string): Meal => {
  const foods = mockFoodDatabase.slice(0, 3 + Math.floor(Math.random() * 3));
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFats = foods.reduce((sum, food) => sum + food.fats, 0);
  
  return {
    id: Math.random().toString(),
    name: `${mealType} - Ayurvedic Balanced`,
    foods,
    totalCalories: Math.round(totalCalories),
    totalProtein: Math.round(totalProtein * 10) / 10,
    totalCarbs: Math.round(totalCarbs * 10) / 10,
    totalFats: Math.round(totalFats * 10) / 10,
    ayurvedicProperties: {
      rasa: ['Sweet', 'Pungent'],
      guna: ['Heavy', 'Cool'],
      virya: 'Cool',
      vipaka: 'Sweet',
      doshaImpact: { vata: -1, pitta: -1, kapha: 0 }
    },
    timing: mealType === 'Breakfast' ? '7:00 AM' : mealType === 'Lunch' ? '1:00 PM' : '7:00 PM',
    instructions: `Consume ${mealType.toLowerCase()} at the recommended time. Chew slowly and mindfully.`
  };
};