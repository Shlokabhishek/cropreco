// Indian regional language translations for crop recommender
// Supports: English, Hindi, Marathi, Telugu, Tamil, Kannada, Bengali, Gujarati, Punjabi, Malayalam

export type Language = 
  | "en" // English
  | "hi" // Hindi
  | "mr" // Marathi
  | "te" // Telugu
  | "ta" // Tamil
  | "kn" // Kannada
  | "bn" // Bengali
  | "gu" // Gujarati
  | "pa" // Punjabi
  | "ml"; // Malayalam

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
  te: "తెలుగు",
  ta: "தமிழ்",
  kn: "ಕನ್ನಡ",
  bn: "বাংলা",
  gu: "ગુજરાતી",
  pa: "ਪੰਜਾਬੀ",
  ml: "മലയാളം"
};

// State to default language mapping (based on official languages)
export const stateLanguageMap: Record<string, Language> = {
  "Andhra Pradesh": "te",
  "Telangana": "te",
  "Tamil Nadu": "ta",
  "Karnataka": "kn",
  "Kerala": "ml",
  "Maharashtra": "mr",
  "Gujarat": "gu",
  "Punjab": "pa",
  "West Bengal": "bn",
  "Bihar": "hi",
  "Uttar Pradesh": "hi",
  "Madhya Pradesh": "hi",
  "Rajasthan": "hi",
  "Jharkhand": "hi",
  "Chhattisgarh": "hi",
  "Haryana": "hi",
  "Uttarakhand": "hi",
  "Himachal Pradesh": "hi",
  "Odisha": "en", // Odia not in our list, default to English
  "Assam": "en", // Assamese not in our list
  "Goa": "en",
  "Jammu and Kashmir": "hi",
  "Delhi": "hi"
};

export type TranslationKeys = {
  // App Header
  appTitle: string;
  welcome: string;
  welcomeUser: string;
  login: string;
  logout: string;
  
  // Login
  loginTitle: string;
  signupTitle: string;
  email: string;
  password: string;
  name: string;
  loginButton: string;
  signupButton: string;
  noAccount: string;
  hasAccount: string;
  googleLogin: string;
  orContinueWith: string;
  
  // Profile
  farmerProfile: string;
  state: string;
  acreage: string;
  acres: string;
  soilType: string;
  budget: string;
  season: string;
  multipleCrops: string;
  saveProfile: string;
  
  // Crop Recommendations
  recommendedCrops: string;
  cropsToAvoid: string;
  basedOn: string;
  refreshPrices: string;
  cropRecommendations: string;
  farmingTypes: string;
  expectedYield: string;
  estimatedProfit: string;
  revenue: string;
  totalCost: string;
  costBreakdown: string;
  fertilizer: string;
  pesticide: string;
  labor: string;
  seeds: string;
  score: string;
  tonnes: string;
  quintal: string;
  
  // Crops to Avoid
  avoidCropsTitle: string;
  avoidReason: string;
  lossRisk: string;
  highRisk: string;
  mediumRisk: string;
  lowMarketPrice: string;
  highInputCost: string;
  unsuitableSeason: string;
  unsuitableSoil: string;
  lowYield: string;
  negativeProfitMargin: string;
  oversupplyWarning: string;
  weatherRisk: string;
  
  // Farming Types
  organicFarming: string;
  intensiveFarming: string;
  mixedFarming: string;
  precisionFarming: string;
  sustainableFarming: string;
  benefits: string;
  challenges: string;
  bestCrops: string;
  match: string;
  
  // Weather
  weatherTrends: string;
  temperature: string;
  rainfall: string;
  humidity: string;
  forecast: string;
  
  // Market
  marketTrends: string;
  currentPrice: string;
  priceChange: string;
  
  // Common
  loading: string;
  error: string;
  retry: string;
  noData: string;
  save: string;
  cancel: string;
  selectLanguage: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // App Header
    appTitle: "Crop Recommender",
    welcome: "Welcome! Personalized insights for farmers.",
    welcomeUser: "Welcome, {name}! Personalized insights for farmers.",
    login: "Login",
    logout: "Logout",
    
    // Login
    loginTitle: "🌾 Login",
    signupTitle: "🌾 Sign Up",
    email: "Email",
    password: "Password",
    name: "Name",
    loginButton: "Login",
    signupButton: "Sign Up",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    googleLogin: "Continue with Google",
    orContinueWith: "or continue with",
    
    // Profile
    farmerProfile: "Farmer Profile",
    state: "State",
    acreage: "Acreage",
    acres: "acres",
    soilType: "Soil Type",
    budget: "Budget",
    season: "Season",
    multipleCrops: "Multiple Crops Mode",
    saveProfile: "Save Profile",
    
    // Crop Recommendations
    recommendedCrops: "🌾 Recommended Crops",
    cropsToAvoid: "⚠️ Crops to Avoid",
    basedOn: "Based on {state}, {acreage} acres, ₹{budget} budget",
    refreshPrices: "🔄 Refresh Prices",
    cropRecommendations: "🌱 Crop Recommendations",
    farmingTypes: "🚜 Farming Types",
    expectedYield: "Expected Yield",
    estimatedProfit: "Estimated Profit",
    revenue: "Revenue",
    totalCost: "Total Cost",
    costBreakdown: "View Cost Breakdown",
    fertilizer: "Fertilizer",
    pesticide: "Pesticide",
    labor: "Labor",
    seeds: "Seeds",
    score: "Score",
    tonnes: "tonnes",
    quintal: "quintal",
    
    // Crops to Avoid
    avoidCropsTitle: "Crops You Should Avoid",
    avoidReason: "Reason to Avoid",
    lossRisk: "Loss Risk",
    highRisk: "High Risk",
    mediumRisk: "Medium Risk",
    lowMarketPrice: "Low market price expected",
    highInputCost: "High input cost compared to returns",
    unsuitableSeason: "Not suitable for current season",
    unsuitableSoil: "Not suitable for your soil type",
    lowYield: "Low yield expected in your region",
    negativeProfitMargin: "Negative profit margin",
    oversupplyWarning: "Market oversupply expected",
    weatherRisk: "Weather conditions unfavorable",
    
    // Farming Types
    organicFarming: "Organic Farming",
    intensiveFarming: "Intensive Farming",
    mixedFarming: "Mixed Farming",
    precisionFarming: "Precision Farming",
    sustainableFarming: "Sustainable Farming",
    benefits: "Benefits",
    challenges: "Challenges",
    bestCrops: "Best Crops",
    match: "Match",
    
    // Weather
    weatherTrends: "Weather Trends",
    temperature: "Temperature",
    rainfall: "Rainfall",
    humidity: "Humidity",
    forecast: "Forecast",
    
    // Market
    marketTrends: "Market Trends",
    currentPrice: "Current Price",
    priceChange: "Price Change",
    
    // Common
    loading: "Loading...",
    error: "An error occurred",
    retry: "Retry",
    noData: "No data available",
    save: "Save",
    cancel: "Cancel",
    selectLanguage: "Select Language"
  },
  
  hi: {
    // App Header
    appTitle: "फसल सिफारिशकर्ता",
    welcome: "स्वागत है! किसानों के लिए व्यक्तिगत जानकारी।",
    welcomeUser: "स्वागत है, {name}! किसानों के लिए व्यक्तिगत जानकारी।",
    login: "लॉग इन",
    logout: "लॉग आउट",
    
    // Login
    loginTitle: "🌾 लॉग इन",
    signupTitle: "🌾 साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "नाम",
    loginButton: "लॉग इन करें",
    signupButton: "साइन अप करें",
    noAccount: "खाता नहीं है?",
    hasAccount: "पहले से खाता है?",
    googleLogin: "Google से जारी रखें",
    orContinueWith: "या इसके साथ जारी रखें",
    
    // Profile
    farmerProfile: "किसान प्रोफाइल",
    state: "राज्य",
    acreage: "क्षेत्रफल",
    acres: "एकड़",
    soilType: "मिट्टी का प्रकार",
    budget: "बजट",
    season: "मौसम",
    multipleCrops: "बहु-फसल मोड",
    saveProfile: "प्रोफाइल सेव करें",
    
    // Crop Recommendations
    recommendedCrops: "🌾 अनुशंसित फसलें",
    cropsToAvoid: "⚠️ बचने योग्य फसलें",
    basedOn: "{state}, {acreage} एकड़, ₹{budget} बजट के आधार पर",
    refreshPrices: "🔄 कीमतें ताज़ा करें",
    cropRecommendations: "🌱 फसल सिफारिशें",
    farmingTypes: "🚜 खेती के प्रकार",
    expectedYield: "अपेक्षित उपज",
    estimatedProfit: "अनुमानित लाभ",
    revenue: "आय",
    totalCost: "कुल लागत",
    costBreakdown: "लागत विवरण देखें",
    fertilizer: "उर्वरक",
    pesticide: "कीटनाशक",
    labor: "श्रम",
    seeds: "बीज",
    score: "स्कोर",
    tonnes: "टन",
    quintal: "क्विंटल",
    
    // Crops to Avoid
    avoidCropsTitle: "जिन फसलों से बचना चाहिए",
    avoidReason: "बचने का कारण",
    lossRisk: "नुकसान का जोखिम",
    highRisk: "उच्च जोखिम",
    mediumRisk: "मध्यम जोखिम",
    lowMarketPrice: "बाजार मूल्य कम होने की संभावना",
    highInputCost: "लाभ की तुलना में उच्च इनपुट लागत",
    unsuitableSeason: "वर्तमान मौसम के लिए उपयुक्त नहीं",
    unsuitableSoil: "आपकी मिट्टी के लिए उपयुक्त नहीं",
    lowYield: "आपके क्षेत्र में कम उपज की उम्मीद",
    negativeProfitMargin: "नकारात्मक लाभ मार्जिन",
    oversupplyWarning: "बाजार में अधिक आपूर्ति की उम्मीद",
    weatherRisk: "मौसम की स्थिति प्रतिकूल",
    
    // Farming Types
    organicFarming: "जैविक खेती",
    intensiveFarming: "गहन खेती",
    mixedFarming: "मिश्रित खेती",
    precisionFarming: "परिशुद्ध खेती",
    sustainableFarming: "टिकाऊ खेती",
    benefits: "लाभ",
    challenges: "चुनौतियां",
    bestCrops: "सर्वोत्तम फसलें",
    match: "मिलान",
    
    // Weather
    weatherTrends: "मौसम के रुझान",
    temperature: "तापमान",
    rainfall: "वर्षा",
    humidity: "आर्द्रता",
    forecast: "पूर्वानुमान",
    
    // Market
    marketTrends: "बाजार के रुझान",
    currentPrice: "वर्तमान मूल्य",
    priceChange: "मूल्य परिवर्तन",
    
    // Common
    loading: "लोड हो रहा है...",
    error: "एक त्रुटि हुई",
    retry: "पुनः प्रयास करें",
    noData: "कोई डेटा उपलब्ध नहीं",
    save: "सेव करें",
    cancel: "रद्द करें",
    selectLanguage: "भाषा चुनें"
  },
  
  mr: {
    // App Header
    appTitle: "पीक शिफारसकर्ता",
    welcome: "स्वागत! शेतकऱ्यांसाठी वैयक्तिक माहिती.",
    welcomeUser: "स्वागत, {name}! शेतकऱ्यांसाठी वैयक्तिक माहिती.",
    login: "लॉग इन",
    logout: "लॉग आउट",
    
    // Login
    loginTitle: "🌾 लॉग इन",
    signupTitle: "🌾 साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "नाव",
    loginButton: "लॉग इन करा",
    signupButton: "साइन अप करा",
    noAccount: "खाते नाही?",
    hasAccount: "आधीच खाते आहे?",
    googleLogin: "Google ने सुरू ठेवा",
    orContinueWith: "किंवा याने सुरू ठेवा",
    
    // Profile
    farmerProfile: "शेतकरी प्रोफाइल",
    state: "राज्य",
    acreage: "क्षेत्रफळ",
    acres: "एकर",
    soilType: "मातीचा प्रकार",
    budget: "बजेट",
    season: "हंगाम",
    multipleCrops: "बहु-पीक मोड",
    saveProfile: "प्रोफाइल जतन करा",
    
    // Crop Recommendations
    recommendedCrops: "🌾 शिफारस केलेली पिके",
    cropsToAvoid: "⚠️ टाळायची पिके",
    basedOn: "{state}, {acreage} एकर, ₹{budget} बजेट वर आधारित",
    refreshPrices: "🔄 किंमती ताजेतवाने करा",
    cropRecommendations: "🌱 पीक शिफारसी",
    farmingTypes: "🚜 शेतीचे प्रकार",
    expectedYield: "अपेक्षित उत्पादन",
    estimatedProfit: "अंदाजे नफा",
    revenue: "महसूल",
    totalCost: "एकूण खर्च",
    costBreakdown: "खर्चाचा तपशील पहा",
    fertilizer: "खत",
    pesticide: "कीटकनाशक",
    labor: "मजुरी",
    seeds: "बियाणे",
    score: "गुण",
    tonnes: "टन",
    quintal: "क्विंटल",
    
    // Crops to Avoid
    avoidCropsTitle: "टाळायची पिके",
    avoidReason: "टाळण्याचे कारण",
    lossRisk: "नुकसानाचा धोका",
    highRisk: "उच्च धोका",
    mediumRisk: "मध्यम धोका",
    lowMarketPrice: "बाजारभाव कमी असण्याची शक्यता",
    highInputCost: "परताव्याच्या तुलनेत जास्त खर्च",
    unsuitableSeason: "सध्याच्या हंगामासाठी योग्य नाही",
    unsuitableSoil: "तुमच्या मातीसाठी योग्य नाही",
    lowYield: "तुमच्या प्रदेशात कमी उत्पादनाची अपेक्षा",
    negativeProfitMargin: "नकारात्मक नफा मार्जिन",
    oversupplyWarning: "बाजारात जास्त पुरवठ्याची अपेक्षा",
    weatherRisk: "हवामान प्रतिकूल",
    
    // Farming Types
    organicFarming: "सेंद्रिय शेती",
    intensiveFarming: "सघन शेती",
    mixedFarming: "मिश्र शेती",
    precisionFarming: "अचूक शेती",
    sustainableFarming: "शाश्वत शेती",
    benefits: "फायदे",
    challenges: "आव्हाने",
    bestCrops: "सर्वोत्तम पिके",
    match: "जुळणी",
    
    // Weather
    weatherTrends: "हवामान ट्रेंड",
    temperature: "तापमान",
    rainfall: "पाऊस",
    humidity: "आर्द्रता",
    forecast: "अंदाज",
    
    // Market
    marketTrends: "बाजार ट्रेंड",
    currentPrice: "सध्याची किंमत",
    priceChange: "किमतीत बदल",
    
    // Common
    loading: "लोड होत आहे...",
    error: "एक त्रुटी आली",
    retry: "पुन्हा प्रयत्न करा",
    noData: "डेटा उपलब्ध नाही",
    save: "जतन करा",
    cancel: "रद्द करा",
    selectLanguage: "भाषा निवडा"
  },
  
  te: {
    // App Header
    appTitle: "పంట సిఫార్సుదారు",
    welcome: "స్వాగతం! రైతులకు వ్యక్తిగత సమాచారం.",
    welcomeUser: "స్వాగతం, {name}! రైతులకు వ్యక్తిగత సమాచారం.",
    login: "లాగిన్",
    logout: "లాగౌట్",
    
    // Login
    loginTitle: "🌾 లాగిన్",
    signupTitle: "🌾 సైన్ అప్",
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    name: "పేరు",
    loginButton: "లాగిన్ చేయండి",
    signupButton: "సైన్ అప్ చేయండి",
    noAccount: "ఖాతా లేదా?",
    hasAccount: "ఇప్పటికే ఖాతా ఉందా?",
    googleLogin: "Google తో కొనసాగించండి",
    orContinueWith: "లేదా దీనితో కొనసాగించండి",
    
    // Profile
    farmerProfile: "రైతు ప్రొఫైల్",
    state: "రాష్ట్రం",
    acreage: "విస్తీర్ణం",
    acres: "ఎకరాలు",
    soilType: "నేల రకం",
    budget: "బడ్జెట్",
    season: "సీజన్",
    multipleCrops: "బహుళ పంటల మోడ్",
    saveProfile: "ప్రొఫైల్ సేవ్ చేయండి",
    
    // Crop Recommendations
    recommendedCrops: "🌾 సిఫార్సు చేసిన పంటలు",
    cropsToAvoid: "⚠️ నివారించాల్సిన పంటలు",
    basedOn: "{state}, {acreage} ఎకరాలు, ₹{budget} బడ్జెట్ ఆధారంగా",
    refreshPrices: "🔄 ధరలు రిఫ్రెష్ చేయండి",
    cropRecommendations: "🌱 పంట సిఫార్సులు",
    farmingTypes: "🚜 వ్యవసాయ రకాలు",
    expectedYield: "అంచనా దిగుబడి",
    estimatedProfit: "అంచనా లాభం",
    revenue: "ఆదాయం",
    totalCost: "మొత్తం ఖర్చు",
    costBreakdown: "ఖర్చు వివరాలు చూడండి",
    fertilizer: "ఎరువులు",
    pesticide: "పురుగుమందు",
    labor: "కూలి",
    seeds: "విత్తనాలు",
    score: "స్కోర్",
    tonnes: "టన్నులు",
    quintal: "క్వింటాల్",
    
    // Crops to Avoid
    avoidCropsTitle: "నివారించాల్సిన పంటలు",
    avoidReason: "నివారించే కారణం",
    lossRisk: "నష్ట ప్రమాదం",
    highRisk: "అధిక ప్రమాదం",
    mediumRisk: "మధ్యస్థ ప్రమాదం",
    lowMarketPrice: "మార్కెట్ ధర తక్కువగా ఉండే అవకాశం",
    highInputCost: "రాబడి కంటే ఎక్కువ ఖర్చు",
    unsuitableSeason: "ప్రస్తుత సీజన్‌కు అనుకూలం కాదు",
    unsuitableSoil: "మీ నేలకు అనుకూలం కాదు",
    lowYield: "మీ ప్రాంతంలో తక్కువ దిగుబడి",
    negativeProfitMargin: "ప్రతికూల లాభ మార్జిన్",
    oversupplyWarning: "మార్కెట్‌లో అధిక సరఫరా",
    weatherRisk: "వాతావరణ పరిస్థితులు ప్రతికూలం",
    
    // Farming Types
    organicFarming: "సేంద్రీయ వ్యవసాయం",
    intensiveFarming: "తీవ్ర వ్యవసాయం",
    mixedFarming: "మిశ్రమ వ్యవసాయం",
    precisionFarming: "ఖచ్చితమైన వ్యవసాయం",
    sustainableFarming: "సుస్థిర వ్యవసాయం",
    benefits: "ప్రయోజనాలు",
    challenges: "సవాళ్లు",
    bestCrops: "ఉత్తమ పంటలు",
    match: "మ్యాచ్",
    
    // Weather
    weatherTrends: "వాతావరణ ధోరణులు",
    temperature: "ఉష్ణోగ్రత",
    rainfall: "వర్షపాతం",
    humidity: "తేమ",
    forecast: "అంచనా",
    
    // Market
    marketTrends: "మార్కెట్ ధోరణులు",
    currentPrice: "ప్రస్తుత ధర",
    priceChange: "ధర మార్పు",
    
    // Common
    loading: "లోడ్ అవుతోంది...",
    error: "లోపం సంభవించింది",
    retry: "మళ్ళీ ప్రయత్నించండి",
    noData: "డేటా అందుబాటులో లేదు",
    save: "సేవ్ చేయండి",
    cancel: "రద్దు చేయండి",
    selectLanguage: "భాష ఎంచుకోండి"
  },
  
  ta: {
    // App Header
    appTitle: "பயிர் பரிந்துரையாளர்",
    welcome: "வரவேற்பு! விவசாயிகளுக்கான தனிப்பட்ட தகவல்கள்.",
    welcomeUser: "வரவேற்பு, {name}! விவசாயிகளுக்கான தனிப்பட்ட தகவல்கள்.",
    login: "உள்நுழை",
    logout: "வெளியேறு",
    
    // Login
    loginTitle: "🌾 உள்நுழை",
    signupTitle: "🌾 பதிவு செய்",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    name: "பெயர்",
    loginButton: "உள்நுழையவும்",
    signupButton: "பதிவு செய்யவும்",
    noAccount: "கணக்கு இல்லையா?",
    hasAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    googleLogin: "Google மூலம் தொடரவும்",
    orContinueWith: "அல்லது இதன் மூலம் தொடரவும்",
    
    // Profile
    farmerProfile: "விவசாயி சுயவிவரம்",
    state: "மாநிலம்",
    acreage: "பரப்பளவு",
    acres: "ஏக்கர்",
    soilType: "மண் வகை",
    budget: "பட்ஜெட்",
    season: "பருவம்",
    multipleCrops: "பல பயிர் முறை",
    saveProfile: "சுயவிவரத்தை சேமிக்கவும்",
    
    // Crop Recommendations
    recommendedCrops: "🌾 பரிந்துரைக்கப்பட்ட பயிர்கள்",
    cropsToAvoid: "⚠️ தவிர்க்க வேண்டிய பயிர்கள்",
    basedOn: "{state}, {acreage} ஏக்கர், ₹{budget} பட்ஜெட் அடிப்படையில்",
    refreshPrices: "🔄 விலைகளை புதுப்பிக்கவும்",
    cropRecommendations: "🌱 பயிர் பரிந்துரைகள்",
    farmingTypes: "🚜 விவசாய வகைகள்",
    expectedYield: "எதிர்பார்க்கப்படும் மகசூல்",
    estimatedProfit: "மதிப்பிடப்பட்ட லாபம்",
    revenue: "வருவாய்",
    totalCost: "மொத்த செலவு",
    costBreakdown: "செலவு விவரங்களைக் காண்க",
    fertilizer: "உரம்",
    pesticide: "பூச்சிக்கொல்லி",
    labor: "கூலி",
    seeds: "விதைகள்",
    score: "மதிப்பெண்",
    tonnes: "டன்",
    quintal: "குவிண்டால்",
    
    // Crops to Avoid
    avoidCropsTitle: "தவிர்க்க வேண்டிய பயிர்கள்",
    avoidReason: "தவிர்க்க காரணம்",
    lossRisk: "நஷ்ட ஆபத்து",
    highRisk: "அதிக ஆபத்து",
    mediumRisk: "நடுத்தர ஆபத்து",
    lowMarketPrice: "சந்தை விலை குறைவாக இருக்கும்",
    highInputCost: "வருவாயை விட அதிக செலவு",
    unsuitableSeason: "தற்போதைய பருவத்திற்கு ஏற்றதல்ல",
    unsuitableSoil: "உங்கள் மண்ணுக்கு ஏற்றதல்ல",
    lowYield: "உங்கள் பகுதியில் குறைந்த மகசூல்",
    negativeProfitMargin: "எதிர்மறை லாப விளிம்பு",
    oversupplyWarning: "சந்தையில் அதிக வழங்கல்",
    weatherRisk: "வானிலை சாதகமற்றது",
    
    // Farming Types
    organicFarming: "இயற்கை விவசாயம்",
    intensiveFarming: "தீவிர விவசாயம்",
    mixedFarming: "கலப்பு விவசாயம்",
    precisionFarming: "துல்லிய விவசாயம்",
    sustainableFarming: "நிலையான விவசாயம்",
    benefits: "நன்மைகள்",
    challenges: "சவால்கள்",
    bestCrops: "சிறந்த பயிர்கள்",
    match: "பொருத்தம்",
    
    // Weather
    weatherTrends: "வானிலை போக்குகள்",
    temperature: "வெப்பநிலை",
    rainfall: "மழை",
    humidity: "ஈரப்பதம்",
    forecast: "முன்னறிவிப்பு",
    
    // Market
    marketTrends: "சந்தை போக்குகள்",
    currentPrice: "தற்போதைய விலை",
    priceChange: "விலை மாற்றம்",
    
    // Common
    loading: "ஏற்றுகிறது...",
    error: "பிழை ஏற்பட்டது",
    retry: "மீண்டும் முயற்சிக்கவும்",
    noData: "தரவு கிடைக்கவில்லை",
    save: "சேமிக்கவும்",
    cancel: "ரத்து செய்யவும்",
    selectLanguage: "மொழியை தேர்ந்தெடுக்கவும்"
  },
  
  kn: {
    // App Header
    appTitle: "ಬೆಳೆ ಶಿಫಾರಸುದಾರ",
    welcome: "ಸ್ವಾಗತ! ರೈತರಿಗೆ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ.",
    welcomeUser: "ಸ್ವಾಗತ, {name}! ರೈತರಿಗೆ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ.",
    login: "ಲಾಗಿನ್",
    logout: "ಲಾಗೌಟ್",
    
    // Login
    loginTitle: "🌾 ಲಾಗಿನ್",
    signupTitle: "🌾 ಸೈನ್ ಅಪ್",
    email: "ಇಮೇಲ್",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    name: "ಹೆಸರು",
    loginButton: "ಲಾಗಿನ್ ಮಾಡಿ",
    signupButton: "ಸೈನ್ ಅಪ್ ಮಾಡಿ",
    noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
    hasAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    googleLogin: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ",
    orContinueWith: "ಅಥವಾ ಇದರೊಂದಿಗೆ ಮುಂದುವರಿಸಿ",
    
    // Profile
    farmerProfile: "ರೈತ ಪ್ರೊಫೈಲ್",
    state: "ರಾಜ್ಯ",
    acreage: "ವಿಸ್ತೀರ್ಣ",
    acres: "ಎಕರೆ",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
    budget: "ಬಜೆಟ್",
    season: "ಋತು",
    multipleCrops: "ಬಹು-ಬೆಳೆ ಮೋಡ್",
    saveProfile: "ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ",
    
    // Crop Recommendations
    recommendedCrops: "🌾 ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು",
    cropsToAvoid: "⚠️ ತಪ್ಪಿಸಬೇಕಾದ ಬೆಳೆಗಳು",
    basedOn: "{state}, {acreage} ಎಕರೆ, ₹{budget} ಬಜೆಟ್ ಆಧಾರಿತ",
    refreshPrices: "🔄 ಬೆಲೆಗಳನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ",
    cropRecommendations: "🌱 ಬೆಳೆ ಶಿಫಾರಸುಗಳು",
    farmingTypes: "🚜 ಕೃಷಿ ಪ್ರಕಾರಗಳು",
    expectedYield: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ",
    estimatedProfit: "ಅಂದಾಜು ಲಾಭ",
    revenue: "ಆದಾಯ",
    totalCost: "ಒಟ್ಟು ವೆಚ್ಚ",
    costBreakdown: "ವೆಚ್ಚ ವಿವರಗಳನ್ನು ನೋಡಿ",
    fertilizer: "ಗೊಬ್ಬರ",
    pesticide: "ಕೀಟನಾಶಕ",
    labor: "ಕೂಲಿ",
    seeds: "ಬೀಜಗಳು",
    score: "ಸ್ಕೋರ್",
    tonnes: "ಟನ್",
    quintal: "ಕ್ವಿಂಟಾಲ್",
    
    // Crops to Avoid
    avoidCropsTitle: "ತಪ್ಪಿಸಬೇಕಾದ ಬೆಳೆಗಳು",
    avoidReason: "ತಪ್ಪಿಸುವ ಕಾರಣ",
    lossRisk: "ನಷ್ಟದ ಅಪಾಯ",
    highRisk: "ಹೆಚ್ಚಿನ ಅಪಾಯ",
    mediumRisk: "ಮಧ್ಯಮ ಅಪಾಯ",
    lowMarketPrice: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಕಡಿಮೆ ಇರಬಹುದು",
    highInputCost: "ಆದಾಯಕ್ಕಿಂತ ಹೆಚ್ಚು ವೆಚ್ಚ",
    unsuitableSeason: "ಪ್ರಸ್ತುತ ಋತುವಿಗೆ ಸೂಕ್ತವಲ್ಲ",
    unsuitableSoil: "ನಿಮ್ಮ ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಲ್ಲ",
    lowYield: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಕಡಿಮೆ ಇಳುವರಿ",
    negativeProfitMargin: "ಋಣಾತ್ಮಕ ಲಾಭ ಅಂತರ",
    oversupplyWarning: "ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹೆಚ್ಚು ಸರಬರಾಜು",
    weatherRisk: "ಹವಾಮಾನ ಪ್ರತಿಕೂಲ",
    
    // Farming Types
    organicFarming: "ಸಾವಯವ ಕೃಷಿ",
    intensiveFarming: "ತೀವ್ರ ಕೃಷಿ",
    mixedFarming: "ಮಿಶ್ರ ಕೃಷಿ",
    precisionFarming: "ನಿಖರ ಕೃಷಿ",
    sustainableFarming: "ಸುಸ್ಥಿರ ಕೃಷಿ",
    benefits: "ಪ್ರಯೋಜನಗಳು",
    challenges: "ಸವಾಲುಗಳು",
    bestCrops: "ಉತ್ತಮ ಬೆಳೆಗಳು",
    match: "ಹೊಂದಾಣಿಕೆ",
    
    // Weather
    weatherTrends: "ಹವಾಮಾನ ಪ್ರವೃತ್ತಿಗಳು",
    temperature: "ತಾಪಮಾನ",
    rainfall: "ಮಳೆ",
    humidity: "ಆರ್ದ್ರತೆ",
    forecast: "ಮುನ್ಸೂಚನೆ",
    
    // Market
    marketTrends: "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು",
    currentPrice: "ಪ್ರಸ್ತುತ ಬೆಲೆ",
    priceChange: "ಬೆಲೆ ಬದಲಾವಣೆ",
    
    // Common
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    error: "ದೋಷ ಸಂಭವಿಸಿದೆ",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    noData: "ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ",
    save: "ಉಳಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ"
  },
  
  bn: {
    // App Header
    appTitle: "ফসল সুপারিশকারী",
    welcome: "স্বাগতম! কৃষকদের জন্য ব্যক্তিগত তথ্য।",
    welcomeUser: "স্বাগতম, {name}! কৃষকদের জন্য ব্যক্তিগত তথ্য।",
    login: "লগইন",
    logout: "লগআউট",
    
    // Login
    loginTitle: "🌾 লগইন",
    signupTitle: "🌾 সাইন আপ",
    email: "ইমেইল",
    password: "পাসওয়ার্ড",
    name: "নাম",
    loginButton: "লগইন করুন",
    signupButton: "সাইন আপ করুন",
    noAccount: "অ্যাকাউন্ট নেই?",
    hasAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    googleLogin: "Google দিয়ে চালিয়ে যান",
    orContinueWith: "অথবা এটি দিয়ে চালিয়ে যান",
    
    // Profile
    farmerProfile: "কৃষক প্রোফাইল",
    state: "রাজ্য",
    acreage: "জমির পরিমাণ",
    acres: "একর",
    soilType: "মাটির ধরন",
    budget: "বাজেট",
    season: "মৌসুম",
    multipleCrops: "বহু-ফসল মোড",
    saveProfile: "প্রোফাইল সংরক্ষণ করুন",
    
    // Crop Recommendations
    recommendedCrops: "🌾 সুপারিশকৃত ফসল",
    cropsToAvoid: "⚠️ এড়িয়ে চলার ফসল",
    basedOn: "{state}, {acreage} একর, ₹{budget} বাজেটের উপর ভিত্তি করে",
    refreshPrices: "🔄 দাম রিফ্রেশ করুন",
    cropRecommendations: "🌱 ফসল সুপারিশ",
    farmingTypes: "🚜 কৃষি প্রকার",
    expectedYield: "প্রত্যাশিত ফলন",
    estimatedProfit: "আনুমানিক লাভ",
    revenue: "রাজস্ব",
    totalCost: "মোট খরচ",
    costBreakdown: "খরচের বিবরণ দেখুন",
    fertilizer: "সার",
    pesticide: "কীটনাশক",
    labor: "শ্রম",
    seeds: "বীজ",
    score: "স্কোর",
    tonnes: "টন",
    quintal: "কুইন্টাল",
    
    // Crops to Avoid
    avoidCropsTitle: "এড়িয়ে চলার ফসল",
    avoidReason: "এড়ানোর কারণ",
    lossRisk: "ক্ষতির ঝুঁকি",
    highRisk: "উচ্চ ঝুঁকি",
    mediumRisk: "মাঝারি ঝুঁকি",
    lowMarketPrice: "বাজার মূল্য কম হওয়ার সম্ভাবনা",
    highInputCost: "আয়ের তুলনায় বেশি খরচ",
    unsuitableSeason: "বর্তমান মৌসুমের জন্য উপযুক্ত নয়",
    unsuitableSoil: "আপনার মাটির জন্য উপযুক্ত নয়",
    lowYield: "আপনার এলাকায় কম ফলন",
    negativeProfitMargin: "নেতিবাচক লাভ মার্জিন",
    oversupplyWarning: "বাজারে অতিরিক্ত সরবরাহ",
    weatherRisk: "আবহাওয়া প্রতিকূল",
    
    // Farming Types
    organicFarming: "জৈব কৃষি",
    intensiveFarming: "নিবিড় কৃষি",
    mixedFarming: "মিশ্র কৃষি",
    precisionFarming: "নির্ভুল কৃষি",
    sustainableFarming: "টেকসই কৃষি",
    benefits: "সুবিধা",
    challenges: "চ্যালেঞ্জ",
    bestCrops: "সেরা ফসল",
    match: "মিল",
    
    // Weather
    weatherTrends: "আবহাওয়া প্রবণতা",
    temperature: "তাপমাত্রা",
    rainfall: "বৃষ্টিপাত",
    humidity: "আর্দ্রতা",
    forecast: "পূর্বাভাস",
    
    // Market
    marketTrends: "বাজার প্রবণতা",
    currentPrice: "বর্তমান মূল্য",
    priceChange: "মূল্য পরিবর্তন",
    
    // Common
    loading: "লোড হচ্ছে...",
    error: "একটি ত্রুটি হয়েছে",
    retry: "আবার চেষ্টা করুন",
    noData: "কোনো ডেটা নেই",
    save: "সংরক্ষণ করুন",
    cancel: "বাতিল করুন",
    selectLanguage: "ভাষা নির্বাচন করুন"
  },
  
  gu: {
    // App Header
    appTitle: "પાક ભલામણકર્તા",
    welcome: "સ્વાગત! ખેડૂતો માટે વ્યક્તિગત માહિતી.",
    welcomeUser: "સ્વાગત, {name}! ખેડૂતો માટે વ્યક્તિગત માહિતી.",
    login: "લોગિન",
    logout: "લોગઆઉટ",
    
    // Login
    loginTitle: "🌾 લોગિન",
    signupTitle: "🌾 સાઇન અપ",
    email: "ઇમેઇલ",
    password: "પાસવર્ડ",
    name: "નામ",
    loginButton: "લોગિન કરો",
    signupButton: "સાઇન અપ કરો",
    noAccount: "એકાઉન્ટ નથી?",
    hasAccount: "પહેલેથી એકાઉન્ટ છે?",
    googleLogin: "Google સાથે ચાલુ રાખો",
    orContinueWith: "અથવા આની સાથે ચાલુ રાખો",
    
    // Profile
    farmerProfile: "ખેડૂત પ્રોફાઇલ",
    state: "રાજ્ય",
    acreage: "વિસ્તાર",
    acres: "એકર",
    soilType: "માટીનો પ્રકાર",
    budget: "બજેટ",
    season: "ઋતુ",
    multipleCrops: "બહુ-પાક મોડ",
    saveProfile: "પ્રોફાઇલ સાચવો",
    
    // Crop Recommendations
    recommendedCrops: "🌾 ભલામણ કરેલ પાક",
    cropsToAvoid: "⚠️ ટાળવા યોગ્ય પાક",
    basedOn: "{state}, {acreage} એકર, ₹{budget} બજેટ પર આધારિત",
    refreshPrices: "🔄 ભાવો રિફ્રેશ કરો",
    cropRecommendations: "🌱 પાક ભલામણો",
    farmingTypes: "🚜 ખેતીના પ્રકારો",
    expectedYield: "અપેક્ષિત ઉપજ",
    estimatedProfit: "અંદાજિત નફો",
    revenue: "આવક",
    totalCost: "કુલ ખર્ચ",
    costBreakdown: "ખર્ચની વિગતો જુઓ",
    fertilizer: "ખાતર",
    pesticide: "જંતુનાશક",
    labor: "મજૂરી",
    seeds: "બીજ",
    score: "સ્કોર",
    tonnes: "ટન",
    quintal: "ક્વિન્ટલ",
    
    // Crops to Avoid
    avoidCropsTitle: "ટાળવા યોગ્ય પાક",
    avoidReason: "ટાળવાનું કારણ",
    lossRisk: "નુકસાનનું જોખમ",
    highRisk: "ઉચ્ચ જોખમ",
    mediumRisk: "મધ્યમ જોખમ",
    lowMarketPrice: "બજાર ભાવ ઓછો હોઈ શકે",
    highInputCost: "આવક કરતાં વધુ ખર્ચ",
    unsuitableSeason: "વર્તમાન ઋતુ માટે યોગ્ય નથી",
    unsuitableSoil: "તમારી માટી માટે યોગ્ય નથી",
    lowYield: "તમારા વિસ્તારમાં ઓછી ઉપજ",
    negativeProfitMargin: "નકારાત્મક નફો માર્જિન",
    oversupplyWarning: "બજારમાં વધુ પુરવઠો",
    weatherRisk: "હવામાન પ્રતિકૂળ",
    
    // Farming Types
    organicFarming: "જૈવિક ખેતી",
    intensiveFarming: "સઘન ખેતી",
    mixedFarming: "મિશ્ર ખેતી",
    precisionFarming: "ચોક્કસ ખેતી",
    sustainableFarming: "ટકાઉ ખેતી",
    benefits: "ફાયદા",
    challenges: "પડકારો",
    bestCrops: "શ્રેષ્ઠ પાક",
    match: "મેચ",
    
    // Weather
    weatherTrends: "હવામાન વલણો",
    temperature: "તાપમાન",
    rainfall: "વરસાદ",
    humidity: "ભેજ",
    forecast: "આગાહી",
    
    // Market
    marketTrends: "બજાર વલણો",
    currentPrice: "વર્તમાન ભાવ",
    priceChange: "ભાવ ફેરફાર",
    
    // Common
    loading: "લોડ થઈ રહ્યું છે...",
    error: "એક ભૂલ થઈ",
    retry: "ફરી પ્રયાસ કરો",
    noData: "કોઈ ડેટા નથી",
    save: "સાચવો",
    cancel: "રદ કરો",
    selectLanguage: "ભાષા પસંદ કરો"
  },
  
  pa: {
    // App Header
    appTitle: "ਫਸਲ ਸਿਫ਼ਾਰਿਸ਼ਕਰਤਾ",
    welcome: "ਜੀ ਆਇਆਂ ਨੂੰ! ਕਿਸਾਨਾਂ ਲਈ ਨਿੱਜੀ ਜਾਣਕਾਰੀ।",
    welcomeUser: "ਜੀ ਆਇਆਂ ਨੂੰ, {name}! ਕਿਸਾਨਾਂ ਲਈ ਨਿੱਜੀ ਜਾਣਕਾਰੀ।",
    login: "ਲੌਗਇਨ",
    logout: "ਲੌਗਆਊਟ",
    
    // Login
    loginTitle: "🌾 ਲੌਗਇਨ",
    signupTitle: "🌾 ਸਾਈਨ ਅੱਪ",
    email: "ਈਮੇਲ",
    password: "ਪਾਸਵਰਡ",
    name: "ਨਾਮ",
    loginButton: "ਲੌਗਇਨ ਕਰੋ",
    signupButton: "ਸਾਈਨ ਅੱਪ ਕਰੋ",
    noAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    hasAccount: "ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?",
    googleLogin: "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ",
    orContinueWith: "ਜਾਂ ਇਸ ਨਾਲ ਜਾਰੀ ਰੱਖੋ",
    
    // Profile
    farmerProfile: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ",
    state: "ਰਾਜ",
    acreage: "ਰਕਬਾ",
    acres: "ਏਕੜ",
    soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
    budget: "ਬਜਟ",
    season: "ਮੌਸਮ",
    multipleCrops: "ਬਹੁ-ਫਸਲ ਮੋਡ",
    saveProfile: "ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ",
    
    // Crop Recommendations
    recommendedCrops: "🌾 ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀਆਂ ਫਸਲਾਂ",
    cropsToAvoid: "⚠️ ਬਚਣ ਯੋਗ ਫਸਲਾਂ",
    basedOn: "{state}, {acreage} ਏਕੜ, ₹{budget} ਬਜਟ 'ਤੇ ਆਧਾਰਿਤ",
    refreshPrices: "🔄 ਕੀਮਤਾਂ ਤਾਜ਼ਾ ਕਰੋ",
    cropRecommendations: "🌱 ਫਸਲ ਸਿਫ਼ਾਰਿਸ਼ਾਂ",
    farmingTypes: "🚜 ਖੇਤੀ ਦੀਆਂ ਕਿਸਮਾਂ",
    expectedYield: "ਅਨੁਮਾਨਿਤ ਝਾੜ",
    estimatedProfit: "ਅਨੁਮਾਨਿਤ ਲਾਭ",
    revenue: "ਆਮਦਨ",
    totalCost: "ਕੁੱਲ ਖਰਚਾ",
    costBreakdown: "ਖਰਚੇ ਦਾ ਵੇਰਵਾ ਵੇਖੋ",
    fertilizer: "ਖਾਦ",
    pesticide: "ਕੀਟਨਾਸ਼ਕ",
    labor: "ਮਜ਼ਦੂਰੀ",
    seeds: "ਬੀਜ",
    score: "ਸਕੋਰ",
    tonnes: "ਟਨ",
    quintal: "ਕੁਇੰਟਲ",
    
    // Crops to Avoid
    avoidCropsTitle: "ਬਚਣ ਯੋਗ ਫਸਲਾਂ",
    avoidReason: "ਬਚਣ ਦਾ ਕਾਰਨ",
    lossRisk: "ਨੁਕਸਾਨ ਦਾ ਖ਼ਤਰਾ",
    highRisk: "ਉੱਚ ਖ਼ਤਰਾ",
    mediumRisk: "ਦਰਮਿਆਨਾ ਖ਼ਤਰਾ",
    lowMarketPrice: "ਮਾਰਕੀਟ ਕੀਮਤ ਘੱਟ ਹੋ ਸਕਦੀ ਹੈ",
    highInputCost: "ਆਮਦਨ ਨਾਲੋਂ ਵੱਧ ਖਰਚਾ",
    unsuitableSeason: "ਮੌਜੂਦਾ ਮੌਸਮ ਲਈ ਢੁਕਵੀਂ ਨਹੀਂ",
    unsuitableSoil: "ਤੁਹਾਡੀ ਮਿੱਟੀ ਲਈ ਢੁਕਵੀਂ ਨਹੀਂ",
    lowYield: "ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਘੱਟ ਝਾੜ",
    negativeProfitMargin: "ਨਕਾਰਾਤਮਕ ਲਾਭ ਮਾਰਜਿਨ",
    oversupplyWarning: "ਮਾਰਕੀਟ ਵਿੱਚ ਵੱਧ ਸਪਲਾਈ",
    weatherRisk: "ਮੌਸਮ ਅਨੁਕੂਲ ਨਹੀਂ",
    
    // Farming Types
    organicFarming: "ਜੈਵਿਕ ਖੇਤੀ",
    intensiveFarming: "ਸਘਨ ਖੇਤੀ",
    mixedFarming: "ਮਿਸ਼ਰਤ ਖੇਤੀ",
    precisionFarming: "ਸਹੀ ਖੇਤੀ",
    sustainableFarming: "ਟਿਕਾਊ ਖੇਤੀ",
    benefits: "ਫਾਇਦੇ",
    challenges: "ਚੁਣੌਤੀਆਂ",
    bestCrops: "ਵਧੀਆ ਫਸਲਾਂ",
    match: "ਮਿਲਾਨ",
    
    // Weather
    weatherTrends: "ਮੌਸਮ ਦੇ ਰੁਝਾਨ",
    temperature: "ਤਾਪਮਾਨ",
    rainfall: "ਮੀਂਹ",
    humidity: "ਨਮੀ",
    forecast: "ਭਵਿੱਖਬਾਣੀ",
    
    // Market
    marketTrends: "ਮਾਰਕੀਟ ਰੁਝਾਨ",
    currentPrice: "ਮੌਜੂਦਾ ਕੀਮਤ",
    priceChange: "ਕੀਮਤ ਤਬਦੀਲੀ",
    
    // Common
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    error: "ਇੱਕ ਗਲਤੀ ਹੋਈ",
    retry: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    noData: "ਕੋਈ ਡਾਟਾ ਨਹੀਂ",
    save: "ਸੇਵ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ"
  },
  
  ml: {
    // App Header
    appTitle: "വിള ശുപാർശകൻ",
    welcome: "സ്വാഗതം! കർഷകർക്കായുള്ള വ്യക്തിഗത വിവരങ്ങൾ.",
    welcomeUser: "സ്വാഗതം, {name}! കർഷകർക്കായുള്ള വ്യക്തിഗത വിവരങ്ങൾ.",
    login: "ലോഗിൻ",
    logout: "ലോഗൗട്ട്",
    
    // Login
    loginTitle: "🌾 ലോഗിൻ",
    signupTitle: "🌾 സൈൻ അപ്പ്",
    email: "ഇമെയിൽ",
    password: "പാസ്‌വേഡ്",
    name: "പേര്",
    loginButton: "ലോഗിൻ ചെയ്യുക",
    signupButton: "സൈൻ അപ്പ് ചെയ്യുക",
    noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
    hasAccount: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?",
    googleLogin: "Google ഉപയോഗിച്ച് തുടരുക",
    orContinueWith: "അല്ലെങ്കിൽ ഇതുപയോഗിച്ച് തുടരുക",
    
    // Profile
    farmerProfile: "കർഷക പ്രൊഫൈൽ",
    state: "സംസ്ഥാനം",
    acreage: "വിസ്തീർണ്ണം",
    acres: "ഏക്കർ",
    soilType: "മണ്ണിന്റെ തരം",
    budget: "ബജറ്റ്",
    season: "സീസൺ",
    multipleCrops: "ബഹു-വിള മോഡ്",
    saveProfile: "പ്രൊഫൈൽ സേവ് ചെയ്യുക",
    
    // Crop Recommendations
    recommendedCrops: "🌾 ശുപാർശ ചെയ്ത വിളകൾ",
    cropsToAvoid: "⚠️ ഒഴിവാക്കേണ്ട വിളകൾ",
    basedOn: "{state}, {acreage} ഏക്കർ, ₹{budget} ബജറ്റ് അടിസ്ഥാനത്തിൽ",
    refreshPrices: "🔄 വിലകൾ പുതുക്കുക",
    cropRecommendations: "🌱 വിള ശുപാർശകൾ",
    farmingTypes: "🚜 കൃഷി തരങ്ങൾ",
    expectedYield: "പ്രതീക്ഷിത വിളവ്",
    estimatedProfit: "കണക്കാക്കിയ ലാഭം",
    revenue: "വരുമാനം",
    totalCost: "മൊത്തം ചെലവ്",
    costBreakdown: "ചെലവ് വിശദാംശങ്ങൾ കാണുക",
    fertilizer: "വളം",
    pesticide: "കീടനാശിനി",
    labor: "കൂലി",
    seeds: "വിത്തുകൾ",
    score: "സ്കോർ",
    tonnes: "ടൺ",
    quintal: "ക്വിന്റൽ",
    
    // Crops to Avoid
    avoidCropsTitle: "ഒഴിവാക്കേണ്ട വിളകൾ",
    avoidReason: "ഒഴിവാക്കാനുള്ള കാരണം",
    lossRisk: "നഷ്ട സാധ്യത",
    highRisk: "ഉയർന്ന അപകടസാധ്യത",
    mediumRisk: "മിതമായ അപകടസാധ്യത",
    lowMarketPrice: "വിപണി വില കുറവായിരിക്കും",
    highInputCost: "വരുമാനത്തേക്കാൾ കൂടുതൽ ചെലവ്",
    unsuitableSeason: "നിലവിലെ സീസണിന് അനുയോജ്യമല്ല",
    unsuitableSoil: "നിങ്ങളുടെ മണ്ണിന് അനുയോജ്യമല്ല",
    lowYield: "നിങ്ങളുടെ പ്രദേശത്ത് കുറഞ്ഞ വിളവ്",
    negativeProfitMargin: "നെഗറ്റീവ് ലാഭ മാർജിൻ",
    oversupplyWarning: "വിപണിയിൽ അമിത വിതരണം",
    weatherRisk: "കാലാവസ്ഥ പ്രതികൂലം",
    
    // Farming Types
    organicFarming: "ജൈവ കൃഷി",
    intensiveFarming: "തീവ്ര കൃഷി",
    mixedFarming: "മിശ്ര കൃഷി",
    precisionFarming: "കൃത്യമായ കൃഷി",
    sustainableFarming: "സുസ്ഥിര കൃഷി",
    benefits: "നേട്ടങ്ങൾ",
    challenges: "വെല്ലുവിളികൾ",
    bestCrops: "മികച്ച വിളകൾ",
    match: "പൊരുത്തം",
    
    // Weather
    weatherTrends: "കാലാവസ്ഥ പ്രവണതകൾ",
    temperature: "താപനില",
    rainfall: "മഴ",
    humidity: "ഈർപ്പം",
    forecast: "പ്രവചനം",
    
    // Market
    marketTrends: "വിപണി പ്രവണതകൾ",
    currentPrice: "നിലവിലെ വില",
    priceChange: "വില മാറ്റം",
    
    // Common
    loading: "ലോഡ് ചെയ്യുന്നു...",
    error: "ഒരു പിശക് സംഭവിച്ചു",
    retry: "വീണ്ടും ശ്രമിക്കുക",
    noData: "ഡാറ്റ ലഭ്യമല്ല",
    save: "സേവ് ചെയ്യുക",
    cancel: "റദ്ദാക്കുക",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക"
  }
};
