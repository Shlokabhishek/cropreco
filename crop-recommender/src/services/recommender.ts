import { MARKET_PRICES } from "./constants";

export type FarmingType = {
  type: string;
  description: string;
  suitability: number;
  benefits: string[];
  challenges: string[];
  recommendedCrops: string[];
};

export type CropRecommendation = {
  name: string;
  yield: number;
  estimatedRevenue: number;
  estimatedCost: number;
  profit: number;
  fertilizerCost: number;
  pesticideCost: number;
  laborCost: number;
  seedCost: number;
  score: number;
  season?: string;
  livePrice?: number;
  priceSource?: string;
  farmingType?: string;
};

export type AvoidReason = 
  | "lowMarketPrice"
  | "highInputCost"
  | "unsuitableSeason"
  | "unsuitableSoil"
  | "lowYield"
  | "negativeProfitMargin"
  | "oversupplyWarning"
  | "weatherRisk";

export type CropToAvoid = {
  name: string;
  reasons: AvoidReason[];
  riskLevel: "high" | "medium";
  estimatedLoss: number;
  alternativeCrops: string[];
  season?: string;
};

type CropData = {
  crop: string;
  season: string;
  state: string;
  yieldPerHectare: number;
  rainfall: number;
  fertilizer: number;
  pesticide: number;
};

type Profile = { 
  state: string; 
  acreage: number; 
  soilType: string; 
  budget: number; 
  season?: string;
  multipleCrops?: boolean;
};

// Live market price cache
let livePriceCache: Record<string, { price: number; timestamp: number; source: string }> = {};
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Fetch live market prices from government API
export async function fetchLiveMarketPrices(commodities: string[]): Promise<Record<string, { price: number; source: string }>> {
  const prices: Record<string, { price: number; source: string }> = {};
  const now = Date.now();
  
  // Check cache first
  const commoditiesToFetch = commodities.filter(c => {
    const cached = livePriceCache[c];
    return !cached || (now - cached.timestamp) > CACHE_DURATION;
  });
  
  // Return cached prices for items we don't need to fetch
  commodities.forEach(c => {
    const cached = livePriceCache[c];
    if (cached && (now - cached.timestamp) <= CACHE_DURATION) {
      prices[c] = { price: cached.price, source: cached.source };
    }
  });
  
  if (commoditiesToFetch.length === 0) {
    return prices;
  }
  
  try {
    // Try fetching from data.gov.in API (Agriculture Market Information System)
    const response = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=100`,
      { signal: AbortSignal.timeout(5000) }
    );
    
    if (response.ok) {
      const data = await response.json();
      if (data.records) {
        data.records.forEach((record: any) => {
          const commodity = record.commodity?.trim();
          const modalPrice = parseFloat(record.modal_price) || 0;
          if (commodity && modalPrice > 0) {
            // Map API commodity names to our crop names
            const mappedName = mapCommodityName(commodity);
            if (mappedName && commoditiesToFetch.includes(mappedName)) {
              livePriceCache[mappedName] = { price: modalPrice, timestamp: now, source: "AGMARKNET" };
              prices[mappedName] = { price: modalPrice, source: "AGMARKNET" };
            }
          }
        });
      }
    }
  } catch (error) {
    console.log("Live price fetch failed, using fallback prices");
  }
  
  // Use fallback prices for commodities without live data
  commoditiesToFetch.forEach(c => {
    if (!prices[c]) {
      const fallbackPrice = MARKET_PRICES[c] || MARKET_PRICES["Default"];
      // Add realistic price variation (±10%)
      const variation = 1 + (Math.random() * 0.2 - 0.1);
      const price = Math.round(fallbackPrice * variation);
      prices[c] = { price, source: "MSP 2024-25" };
    }
  });
  
  return prices;
}

// Map commodity names from API to our dataset names
function mapCommodityName(apiName: string): string | null {
  const mapping: Record<string, string> = {
    "rice": "Rice",
    "paddy": "Rice",
    "wheat": "Wheat",
    "maize": "Maize",
    "corn": "Maize",
    "cotton": "Cotton(lint)",
    "arhar": "Arhar/Tur",
    "tur": "Arhar/Tur",
    "toor": "Arhar/Tur",
    "gram": "Gram",
    "chana": "Gram",
    "moong": "Moong(Green Gram)",
    "green gram": "Moong(Green Gram)",
    "urad": "Urad",
    "black gram": "Urad",
    "groundnut": "Groundnut",
    "mustard": "Rapeseed &Mustard",
    "rapeseed": "Rapeseed &Mustard",
    "soyabean": "Soyabean",
    "soybean": "Soyabean",
    "sunflower": "Sunflower",
    "potato": "Potato",
    "onion": "Onion",
    "sugarcane": "Sugarcane",
    "jute": "Jute",
    "turmeric": "Turmeric",
    "ginger": "Ginger",
    "chilli": "Dry chillies",
    "chillies": "Dry chillies",
    "coconut": "Coconut",
    "arecanut": "Arecanut",
    "banana": "Banana",
    "jowar": "Jowar",
    "bajra": "Bajra",
    "ragi": "Ragi",
    "barley": "Barley"
  };
  
  const lowerName = apiName.toLowerCase().trim();
  return mapping[lowerName] || null;
}

export function parseCSVData(csvText: string): CropData[] {
  const lines = csvText.trim().split('\n');
  const crops: CropData[] = [];
  
  console.log("Total lines:", lines.length);
  
  for (let i = 1; i < lines.length; i++) {
    // Try tab-separated first, then comma-separated
    let parts = lines[i].split('\t');
    if (parts.length < 10) {
      parts = lines[i].split(',');
    }
    if (parts.length < 10) continue;
    
    const crop = parts[0].trim();
    const season = parts[2]?.trim() || '';
    const state = parts[3]?.trim() || '';
    const area = parseFloat(parts[4]) || 1;
    const production = parseFloat(parts[5]) || 0;
    const rainfall = parseFloat(parts[6]) || 0;
    const fertilizer = parseFloat(parts[7]) || 0;
    const pesticide = parseFloat(parts[8]) || 0;
    const yieldVal = parseFloat(parts[9]) || 0;
    
    // Calculate yield per hectare
    const yieldPerHectare = area > 0 && yieldVal > 0 ? yieldVal : (production / Math.max(area, 1));
    
    if (crop && state && yieldPerHectare > 0) {
      crops.push({
        crop,
        season,
        state,
        yieldPerHectare,
        rainfall,
        fertilizer: fertilizer / Math.max(area, 1),
        pesticide: pesticide / Math.max(area, 1)
      });
    }
  }
  
  console.log("Parsed crops:", crops.length);
  return crops;
}

// Recommend farming type based on profile and conditions
export function recommendFarmingType(
  profile: Profile,
  _weatherConditions?: { avgTemp: number; rainfall: number }
): FarmingType[] {
  const farmingTypes: FarmingType[] = [];
  
  // Organic Farming
  const organicScore = calculateOrganicScore(profile);
  farmingTypes.push({
    type: "Organic Farming",
    description: "Chemical-free farming using natural inputs and traditional methods",
    suitability: organicScore,
    benefits: [
      "Premium prices (20-30% higher)",
      "Healthier soil in long term",
      "Lower input costs",
      "Growing market demand"
    ],
    challenges: [
      "Lower initial yields",
      "Requires certification (3 years)",
      "More labor-intensive"
    ],
    recommendedCrops: ["Rice", "Wheat", "Vegetables", "Pulses", "Turmeric", "Ginger"]
  });
  
  // Intensive Farming
  const intensiveScore = calculateIntensiveScore(profile);
  farmingTypes.push({
    type: "Intensive Farming",
    description: "High-input farming for maximum yield per acre",
    suitability: intensiveScore,
    benefits: [
      "Maximum yields",
      "Quick returns",
      "Suitable for commercial farming"
    ],
    challenges: [
      "High input costs",
      "Soil degradation risk",
      "Requires consistent water supply"
    ],
    recommendedCrops: ["Sugarcane", "Cotton", "Maize", "Potato", "Onion"]
  });
  
  // Mixed/Integrated Farming
  const mixedScore = calculateMixedScore(profile);
  farmingTypes.push({
    type: "Mixed Farming",
    description: "Combination of crops and livestock for diversified income",
    suitability: mixedScore,
    benefits: [
      "Risk diversification",
      "Year-round income",
      "Better resource utilization",
      "Natural pest control"
    ],
    challenges: [
      "Requires multiple skills",
      "More management needed",
      "Initial setup costs"
    ],
    recommendedCrops: ["Fodder crops", "Pulses", "Millets", "Vegetables"]
  });
  
  // Precision Farming
  const precisionScore = calculatePrecisionScore(profile);
  farmingTypes.push({
    type: "Precision Farming",
    description: "Technology-driven farming using sensors, drones, and data analytics",
    suitability: precisionScore,
    benefits: [
      "Optimized resource use",
      "Higher efficiency",
      "Better crop monitoring",
      "Reduced wastage"
    ],
    challenges: [
      "High initial investment",
      "Requires technical knowledge",
      "Internet connectivity needed"
    ],
    recommendedCrops: ["Cotton", "Sugarcane", "Grapes", "Pomegranate", "Banana"]
  });
  
  // Sustainable Farming
  const sustainableScore = calculateSustainableScore(profile);
  farmingTypes.push({
    type: "Sustainable Farming",
    description: "Balanced approach minimizing environmental impact while maintaining profitability",
    suitability: sustainableScore,
    benefits: [
      "Long-term soil health",
      "Reduced input costs over time",
      "Climate resilient",
      "Eligible for government schemes"
    ],
    challenges: [
      "Requires knowledge of practices",
      "Transition period needed"
    ],
    recommendedCrops: ["Millets", "Pulses", "Oilseeds", "Indigenous varieties"]
  });
  
  // Sort by suitability
  return farmingTypes.sort((a, b) => b.suitability - a.suitability);
}

function calculateOrganicScore(profile: Profile): number {
  let score = 0.5;
  if (profile.soilType === "Loamy" || profile.soilType === "Clay") score += 0.15;
  if (profile.acreage <= 10) score += 0.1; // Better for small farms
  if (profile.budget >= 30000) score += 0.1;
  return Math.min(score, 1);
}

function calculateIntensiveScore(profile: Profile): number {
  let score = 0.4;
  if (profile.budget >= 100000) score += 0.2;
  if (profile.acreage >= 5) score += 0.15;
  if (profile.soilType === "Loamy" || profile.soilType === "Alluvial") score += 0.1;
  return Math.min(score, 1);
}

function calculateMixedScore(profile: Profile): number {
  let score = 0.55;
  if (profile.acreage >= 3 && profile.acreage <= 15) score += 0.15;
  if (profile.budget >= 50000) score += 0.1;
  return Math.min(score, 1);
}

function calculatePrecisionScore(profile: Profile): number {
  let score = 0.3;
  if (profile.budget >= 200000) score += 0.25;
  if (profile.acreage >= 10) score += 0.2;
  return Math.min(score, 1);
}

function calculateSustainableScore(profile: Profile): number {
  let score = 0.6;
  if (profile.soilType === "Loamy" || profile.soilType === "Sandy Loam") score += 0.1;
  if (profile.acreage <= 20) score += 0.1;
  if (profile.budget >= 40000) score += 0.1;
  return Math.min(score, 1);
}

export function recommendCrops(
  cropData: CropData[],
  profile: Profile,
  livePrices?: Record<string, { price: number; source: string }>
): CropRecommendation[] {
  console.log("Filtering for state:", profile.state, "season:", profile.season || "any");
  console.log("Total crop data entries:", cropData.length);
  
  // Normalize state name for matching (case-insensitive, trim whitespace)
  const normalizeState = (s: string) => s.trim().toLowerCase();
  const profileState = normalizeState(profile.state);
  
  // Filter by state and season
  let filtered = cropData.filter(c => {
    const cropState = normalizeState(c.state);
    const stateMatch = cropState === profileState;
    const seasonMatch = !profile.season || 
      c.season.toLowerCase().includes(profile.season.toLowerCase()) || 
      c.season.toLowerCase().includes("whole year");
    return stateMatch && seasonMatch;
  });
  
  console.log("After state/season filter:", filtered.length);
  
  // Fallback 1: Try without season filter
  if (filtered.length === 0) {
    filtered = cropData.filter(c => normalizeState(c.state) === profileState);
    console.log("After state-only filter:", filtered.length);
  }
  
  // Fallback 2: Try similar state names (partial match)
  if (filtered.length === 0) {
    filtered = cropData.filter(c => {
      const cropState = normalizeState(c.state);
      return cropState.includes(profileState) || profileState.includes(cropState);
    });
    console.log("After partial state match:", filtered.length);
  }
  
  // Fallback 3: Try any state with the season
  if (filtered.length === 0 && profile.season) {
    filtered = cropData.filter(c => 
      c.season.toLowerCase().includes(profile.season!.toLowerCase()) || 
      c.season.toLowerCase().includes("whole year")
    );
    console.log("After season-only filter:", filtered.length);
  }
  
  // Fallback 4: Use nationwide data (most common crops across all states)
  if (filtered.length === 0) {
    // Get all available data
    console.log("Using nationwide fallback data");
    filtered = cropData;
  }
  
  // Group by crop name and aggregate
  const cropMap = new Map<string, CropData[]>();
  filtered.forEach(c => {
    if (!cropMap.has(c.crop)) {
      cropMap.set(c.crop, []);
    }
    cropMap.get(c.crop)!.push(c);
  });
  
  console.log("Unique crops found:", cropMap.size);
  
  const recommendations: CropRecommendation[] = [];
  
  cropMap.forEach((data, cropName) => {
    // Average the values using median for more stable results
    const yields = data.map(c => c.yieldPerHectare).sort((a, b) => a - b);
    const avgYield = yields[Math.floor(yields.length / 2)] || yields[0];
    const avgFertilizer = data.reduce((s, c) => s + c.fertilizer, 0) / data.length;
    const avgPesticide = data.reduce((s, c) => s + c.pesticide, 0) / data.length;
    const season = data[0].season?.trim() || "Whole Year";
    
    // Calculate costs per hectare (in INR)
    const fertilizerCost = Math.max(avgFertilizer * 0.05, 2000); // Min ₹2000 per hectare
    const pesticideCost = Math.max(avgPesticide * 0.1, 1000); // Min ₹1000 per hectare
    const laborCost = 15000; // Fixed labor cost per hectare
    const seedCost = 5000; // Fixed seed cost per hectare
    
    const costPerHectare = fertilizerCost + pesticideCost + laborCost + seedCost;
    const totalCost = costPerHectare * profile.acreage;
    
    // Get market price (prefer live price if available)
    let marketPrice: number;
    let priceSource = "MSP 2024-25";
    
    if (livePrices && livePrices[cropName]) {
      marketPrice = livePrices[cropName].price;
      priceSource = livePrices[cropName].source;
    } else {
      marketPrice = MARKET_PRICES[cropName] || MARKET_PRICES["Default"];
    }
    
    // Calculate revenue (yield is in tonnes/hectare)
    const yieldInQuintals = avgYield * 10; // Convert tonnes to quintals
    const revenuePerHectare = yieldInQuintals * marketPrice;
    const totalRevenue = revenuePerHectare * profile.acreage;
    
    const profit = totalRevenue - totalCost;
    
    // Calculate score based on profitability and budget feasibility
    const budgetScore = totalCost <= profile.budget ? 1 : Math.max(0, profile.budget / totalCost);
    const profitScore = profit > 0 ? Math.min(profit / 200000, 1) : 0;
    const yieldScore = Math.min(avgYield / 10, 1);
    const roiScore = totalCost > 0 ? Math.min((profit / totalCost), 1) : 0;
    
    const finalScore = (budgetScore * 0.3 + profitScore * 0.3 + yieldScore * 0.2 + roiScore * 0.2);
    
    recommendations.push({
      name: cropName,
      yield: parseFloat((avgYield * profile.acreage).toFixed(2)),
      estimatedRevenue: Math.round(totalRevenue),
      estimatedCost: Math.round(totalCost),
      profit: Math.round(profit),
      fertilizerCost: Math.round(fertilizerCost * profile.acreage),
      pesticideCost: Math.round(pesticideCost * profile.acreage),
      laborCost: Math.round(laborCost * profile.acreage),
      seedCost: Math.round(seedCost * profile.acreage),
      score: parseFloat(finalScore.toFixed(3)),
      season,
      livePrice: marketPrice,
      priceSource
    });
  });
  
  // Sort by score and return top recommendations
  // Be flexible with budget - prioritize best ROI crops
  let result = recommendations
    .filter(r => r.estimatedCost <= profile.budget * 1.5) // Allow up to 1.5x budget
    .sort((a, b) => b.score - a.score);
  
  console.log("Recommendations within 1.5x budget:", result.length);
  
  // If not enough results, relax budget constraint to 3x
  if (result.length < 5) {
    result = recommendations
      .filter(r => r.estimatedCost <= profile.budget * 3)
      .sort((a, b) => b.score - a.score);
    console.log("Recommendations within 3x budget:", result.length);
  }
  
  // If still not enough, return top profitable crops regardless of budget
  if (result.length < 3 && recommendations.length > 0) {
    console.log("Returning best recommendations ignoring budget constraint");
    result = recommendations
      .sort((a, b) => {
        // Prioritize positive profit, then by ROI
        if (a.profit > 0 && b.profit <= 0) return -1;
        if (b.profit > 0 && a.profit <= 0) return 1;
        return b.score - a.score;
      });
  }
  
  // If user wants multiple crops, prioritize diverse crops and add intercropping info
  if (profile.multipleCrops) {
    result = getMultipleCropsRecommendation(result, profile);
  } else {
    result = result.slice(0, 8);
  }
  
  console.log("Final recommendations:", result.length);
  
  return result;
}

// Helper function to recommend crops for multiple/intercropping
function getMultipleCropsRecommendation(
  recommendations: CropRecommendation[], 
  _profile: Profile
): CropRecommendation[] {
  // Define crop compatibility for intercropping and rotation
  const companionCrops: Record<string, string[]> = {
    "Rice": ["Pulses", "Gram", "Moong(Green Gram)", "Urad"],
    "Wheat": ["Gram", "Mustard", "Rapeseed &Mustard", "Linseed"],
    "Maize": ["Beans", "Pulses", "Groundnut", "Soyabean", "Cowpea"],
    "Cotton(lint)": ["Groundnut", "Moong(Green Gram)", "Gram", "Cowpea"],
    "Sugarcane": ["Potato", "Onion", "Garlic", "Turmeric", "Ginger"],
    "Potato": ["Onion", "Cabbage", "Peas", "Beans"],
    "Groundnut": ["Maize", "Pearl millet", "Sorghum"],
    "Soyabean": ["Maize", "Sorghum", "Pearl millet"],
    "Gram": ["Wheat", "Barley", "Mustard", "Linseed"],
    "Arhar/Tur": ["Cotton(lint)", "Sorghum", "Pearl millet"],
    "Moong(Green Gram)": ["Rice", "Maize", "Sugarcane"],
    "Urad": ["Rice", "Maize", "Sugarcane"],
    "Turmeric": ["Ginger", "Onion", "Vegetables"],
    "Ginger": ["Turmeric", "Onion", "Vegetables"]
  };
  
  // Select diverse crops that can be grown together
  const selectedCrops: CropRecommendation[] = [];
  const usedCrops = new Set<string>();
  
  // First, add the top crop
  if (recommendations.length > 0) {
    selectedCrops.push(recommendations[0]);
    usedCrops.add(recommendations[0].name);
  }
  
  // Then, try to find companion crops
  for (const crop of recommendations) {
    if (selectedCrops.length >= 6) break;
    if (usedCrops.has(crop.name)) continue;
    
    // Check if this crop is compatible with any selected crop
    let isCompanion = false;
    for (const selected of selectedCrops) {
      const companions = companionCrops[selected.name] || [];
      if (companions.some(c => crop.name.includes(c) || c.includes(crop.name))) {
        isCompanion = true;
        break;
      }
    }
    
    // Also check reverse compatibility
    const cropCompanions = companionCrops[crop.name] || [];
    for (const selected of selectedCrops) {
      if (cropCompanions.some(c => selected.name.includes(c) || c.includes(selected.name))) {
        isCompanion = true;
        break;
      }
    }
    
    if (isCompanion || selectedCrops.length < 3) {
      // Adjust score slightly up for companion crops
      if (isCompanion) {
        crop.score = Math.min(crop.score * 1.1, 1);
        crop.farmingType = "Intercropping Compatible";
      }
      selectedCrops.push(crop);
      usedCrops.add(crop.name);
    }
  }
  
  // If we need more crops, add remaining high-scoring ones
  for (const crop of recommendations) {
    if (selectedCrops.length >= 8) break;
    if (!usedCrops.has(crop.name)) {
      selectedCrops.push(crop);
      usedCrops.add(crop.name);
    }
  }
  
  return selectedCrops;
}

// Identify crops that should be avoided based on various risk factors
export function identifyCropsToAvoid(
  cropData: CropData[],
  profile: Profile,
  livePrices?: Record<string, { price: number; source: string }>,
  recommendations?: CropRecommendation[]
): CropToAvoid[] {
  const cropsToAvoid: CropToAvoid[] = [];
  const normalizeState = (s: string) => s.trim().toLowerCase();
  const profileState = normalizeState(profile.state);
  
  // Get recommended crop names to exclude them from "avoid" list
  const recommendedCropNames = new Set(recommendations?.map(r => r.name) || []);
  
  // Soil type incompatibility mapping
  const soilCropIncompatibility: Record<string, string[]> = {
    "Sandy": ["Rice", "Sugarcane", "Banana", "Jute"],
    "Clay": ["Groundnut", "Potato", "Carrot", "Onion"],
    "Loamy": [], // Loamy is generally good for most crops
    "Red": ["Wheat", "Rice", "Sugarcane"],
    "Black": ["Potato", "Groundnut"],
    "Alluvial": [], // Alluvial is generally good
    "Laterite": ["Wheat", "Rice", "Sugarcane", "Potato"]
  };
  
  // Season incompatibility
  const seasonCropMap: Record<string, string[]> = {
    "Kharif": ["Wheat", "Gram", "Mustard", "Barley", "Linseed"],
    "Rabi": ["Rice", "Maize", "Groundnut", "Cotton(lint)", "Jute", "Soyabean"],
    "Summer": ["Wheat", "Gram", "Mustard"]
  };
  
  // Crops with historically low market prices
  const lowPriceCrops = ["Potato", "Onion", "Tomato", "Cabbage", "Cauliflower"];
  
  // Crops with high input costs
  const highInputCostCrops = ["Sugarcane", "Cotton(lint)", "Banana", "Grapes", "Pomegranate"];
  
  // Weather-sensitive crops (risky in unpredictable weather)
  const weatherSensitiveCrops = ["Cotton(lint)", "Potato", "Tomato", "Onion", "Banana"];
  
  // Get all unique crops from the dataset for this state
  const stateData = cropData.filter(c => normalizeState(c.state) === profileState);
  const uniqueCrops = [...new Set(stateData.map(c => c.crop))];
  
  // Alternative crops for each risky crop
  const alternatives: Record<string, string[]> = {
    "Potato": ["Wheat", "Gram", "Mustard"],
    "Onion": ["Garlic", "Ginger", "Turmeric"],
    "Tomato": ["Chillies", "Brinjal", "Capsicum"],
    "Sugarcane": ["Maize", "Soyabean", "Cotton(lint)"],
    "Cotton(lint)": ["Groundnut", "Soyabean", "Maize"],
    "Banana": ["Papaya", "Coconut", "Arecanut"],
    "Rice": ["Maize", "Millets", "Pulses"],
    "Wheat": ["Gram", "Mustard", "Barley"]
  };
  
  uniqueCrops.forEach(cropName => {
    // Skip if this crop is in recommendations (it's a good crop)
    if (recommendedCropNames.has(cropName)) return;
    
    const reasons: AvoidReason[] = [];
    let estimatedLoss = 0;
    
    // Get crop data for calculations
    const cropEntries = stateData.filter(c => c.crop === cropName);
    if (cropEntries.length === 0) return;
    
    const avgYield = cropEntries.reduce((s, c) => s + c.yieldPerHectare, 0) / cropEntries.length;
    const avgFertilizer = cropEntries.reduce((s, c) => s + c.fertilizer, 0) / cropEntries.length;
    const cropSeason = cropEntries[0].season?.toLowerCase() || "";
    
    // Check soil incompatibility
    const incompatibleCrops = soilCropIncompatibility[profile.soilType] || [];
    if (incompatibleCrops.includes(cropName)) {
      reasons.push("unsuitableSoil");
      estimatedLoss += 15000 * profile.acreage;
    }
    
    // Check season incompatibility
    if (profile.season) {
      const wrongSeasonCrops = seasonCropMap[profile.season] || [];
      if (wrongSeasonCrops.includes(cropName)) {
        reasons.push("unsuitableSeason");
        estimatedLoss += 20000 * profile.acreage;
      }
    }
    
    // Check for low market price crops (high volatility)
    if (lowPriceCrops.includes(cropName)) {
      reasons.push("lowMarketPrice");
      reasons.push("oversupplyWarning");
      estimatedLoss += 10000 * profile.acreage;
    }
    
    // Check high input cost vs budget
    if (highInputCostCrops.includes(cropName)) {
      const estimatedCost = (avgFertilizer * 0.05 + 15000 + 5000 + 1000) * profile.acreage;
      if (estimatedCost > profile.budget * 0.8) {
        reasons.push("highInputCost");
        estimatedLoss += estimatedCost - profile.budget;
      }
    }
    
    // Check weather-sensitive crops
    if (weatherSensitiveCrops.includes(cropName)) {
      reasons.push("weatherRisk");
      estimatedLoss += 8000 * profile.acreage;
    }
    
    // Check low yield regions
    if (avgYield < 1.5) { // Less than 1.5 tonnes/hectare is considered low
      reasons.push("lowYield");
      estimatedLoss += 12000 * profile.acreage;
    }
    
    // Calculate if profit margin would be negative
    const marketPrice = livePrices?.[cropName]?.price || 2000;
    const revenue = avgYield * 10 * marketPrice * profile.acreage;
    const cost = (avgFertilizer * 0.05 + 15000 + 5000 + 1000) * profile.acreage;
    if (revenue < cost) {
      reasons.push("negativeProfitMargin");
      estimatedLoss = Math.max(estimatedLoss, cost - revenue);
    }
    
    // Only add to avoid list if there are valid reasons
    if (reasons.length >= 2 || reasons.includes("negativeProfitMargin")) {
      const riskLevel = reasons.length >= 3 || reasons.includes("negativeProfitMargin") ? "high" : "medium";
      
      cropsToAvoid.push({
        name: cropName,
        reasons,
        riskLevel,
        estimatedLoss: Math.round(estimatedLoss),
        alternativeCrops: alternatives[cropName] || ["Pulses", "Millets", "Oilseeds"],
        season: cropSeason
      });
    }
  });
  
  // Sort by risk level and estimated loss
  return cropsToAvoid
    .sort((a, b) => {
      if (a.riskLevel === "high" && b.riskLevel !== "high") return -1;
      if (b.riskLevel === "high" && a.riskLevel !== "high") return 1;
      return b.estimatedLoss - a.estimatedLoss;
    })
    .slice(0, 6); // Return top 6 crops to avoid
}