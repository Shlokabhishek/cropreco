// Application constants

export const APP_NAME = "Crop Recommender";
export const VERSION = "1.0.0";

// Recommendation weights
export const WEIGHTS = {
  SOIL: 0.35,
  MARKET: 0.30,
  WEATHER: 0.20,
  BUDGET: 0.15
};

// Data paths
export const DATA_PATHS = {
  CROP_DATASET: "/data/crop_dataset.csv",
  SOIL_DATASET: "/data/soil_dataset.csv"
};

// Default values
export const DEFAULTS = {
  FERTILIZER_COST_PER_UNIT: 50,
  MIN_RECOMMENDATIONS: 5,
  MAX_RECOMMENDATIONS: 10
};

// Soil types
export const SOIL_TYPES = [
  "Loamy",
  "Clayey",
  "Sandy",
  "Black",
  "Red",
  "Laterite",
  "Alluvial"
];

// Seasons
export const SEASONS = [
  "Kharif",
  "Rabi",
  "Summer",
  "Autumn",
  "Winter",
  "Whole Year"
];

// All Indian States and Union Territories (from dataset)
export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

// Legacy alias
export const STATES = INDIAN_STATES;

// Market prices per quintal (100kg) in INR - Comprehensive list
export const MARKET_PRICES: Record<string, number> = {
  "Rice": 2183,
  "Wheat": 2275,
  "Maize": 2090,
  "Bajra": 2500,
  "Jowar": 3180,
  "Ragi": 3846,
  "Barley": 1735,
  "Cotton(lint)": 6620,
  "Sugarcane": 315,
  "Jute": 5050,
  "Potato": 1800,
  "Onion": 2200,
  "Arhar/Tur": 7000,
  "Gram": 5440,
  "Moong(Green Gram)": 8558,
  "Urad": 6950,
  "Masoor": 6425,
  "Groundnut": 6377,
  "Rapeseed &Mustard": 5650,
  "Soyabean": 4600,
  "Sunflower": 6760,
  "Sesamum": 8635,
  "Coconut": 3200,
  "Arecanut": 45000,
  "Cashewnut": 15000,
  "Black pepper": 55000,
  "Cardamom": 120000,
  "Turmeric": 9500,
  "Ginger": 4500,
  "Dry chillies": 18000,
  "Coriander": 7500,
  "Garlic": 6000,
  "Banana": 3500,
  "Tobacco": 14500,
  "Castor seed": 6800,
  "Linseed": 6560,
  "Niger seed": 7734,
  "Safflower": 5800,
  "Sweet potato": 2000,
  "Tapioca": 2500,
  "Mesta": 4500,
  "Sannhamp": 3500,
  "Horse-gram": 4500,
  "Cowpea(Lobia)": 6800,
  "Khesari": 3000,
  "Moth": 6500,
  "Peas & beans (Pulses)": 6000,
  "Guar seed": 5500,
  "Small millets": 3500,
  "Default": 3500
};