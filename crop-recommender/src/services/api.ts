// API service for backend communication

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001/api";

// Helper to get auth token
function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

// Helper to make authenticated requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
}

// Authentication APIs
export async function register(email: string, password: string, name: string) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('authToken');
}

// Weather APIs
export async function fetchWeatherData(location: string) {
  try {
    const response = await fetch(`${API_BASE}/weather/current?location=${encodeURIComponent(location)}`);
    if (!response.ok) throw new Error("Weather API failed");
    return await response.json();
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
}

export async function fetchWeatherForecast(location: string, days: number = 7) {
  try {
    const response = await fetch(`${API_BASE}/weather/forecast?location=${encodeURIComponent(location)}&days=${days}`);
    if (!response.ok) throw new Error("Weather forecast failed");
    return await response.json();
  } catch (error) {
    console.error("Weather forecast error:", error);
    return null;
  }
}

// Market APIs
export async function fetchMarketPrices(commodity: string, state?: string, days: number = 30) {
  try {
    let url = `${API_BASE}/market/prices/${encodeURIComponent(commodity)}?days=${days}`;
    if (state) {
      url += `&state=${encodeURIComponent(state)}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Market API failed");
    return await response.json();
  } catch (error) {
    console.error("Market fetch error:", error);
    return null;
  }
}

export async function fetchMarketTrends(commodities: string[], days: number = 30) {
  try {
    const response = await fetch(
      `${API_BASE}/market/trends?commodities=${commodities.join(',')}&days=${days}`
    );
    if (!response.ok) throw new Error("Market trends failed");
    return await response.json();
  } catch (error) {
    console.error("Market trends error:", error);
    return null;
  }
}

export async function fetchPriceComparison(commodity: string) {
  try {
    const response = await fetch(`${API_BASE}/market/comparison/${encodeURIComponent(commodity)}`);
    if (!response.ok) throw new Error("Price comparison failed");
    return await response.json();
  } catch (error) {
    console.error("Price comparison error:", error);
    return null;
  }
}

// Crop APIs
export async function fetchCropRecommendations(params: {
  state: string;
  acreage: number;
  soilType: string;
  season?: string;
  rainfall?: number;
  temperature?: number;
}) {
  try {
    const response = await fetchWithAuth(`${API_BASE}/crops/recommend`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
    
    if (!response.ok) throw new Error("Crop recommendation failed");
    return await response.json();
  } catch (error) {
    console.error("Crop recommendation error:", error);
    return null;
  }
}

export async function fetchAllCrops() {
  try {
    const response = await fetch(`${API_BASE}/crops`);
    if (!response.ok) throw new Error("Fetch crops failed");
    return await response.json();
  } catch (error) {
    console.error("Fetch crops error:", error);
    return null;
  }
}

export async function fetchCropByName(name: string) {
  try {
    const response = await fetch(`${API_BASE}/crops/${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error("Fetch crop failed");
    return await response.json();
  } catch (error) {
    console.error("Fetch crop error:", error);
    return null;
  }
}

// User Profile APIs
export async function fetchUserProfile() {
  try {
    const response = await fetchWithAuth(`${API_BASE}/users/profile`);
    if (!response.ok) throw new Error("Fetch profile failed");
    return await response.json();
  } catch (error) {
    console.error("Fetch profile error:", error);
    return null;
  }
}

export async function updateFarmerProfile(profile: {
  state: string;
  district?: string;
  acreage: number;
  soilType: string;
  budget?: number;
  phone?: string;
}) {
  try {
    const response = await fetchWithAuth(`${API_BASE}/users/profile/farmer`, {
      method: 'POST',
      body: JSON.stringify(profile)
    });
    
    if (!response.ok) throw new Error("Update profile failed");
    return await response.json();
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
}

export async function fetchCropHistory() {
  try {
    const response = await fetchWithAuth(`${API_BASE}/users/history/crops`);
    if (!response.ok) throw new Error("Fetch crop history failed");
    return await response.json();
  } catch (error) {
    console.error("Fetch crop history error:", error);
    return null;
  }
}

export async function addCropHistory(entry: {
  cropName: string;
  season: string;
  year: number;
  yieldActual?: number;
  revenue?: number;
  notes?: string;
}) {
  try {
    const response = await fetchWithAuth(`${API_BASE}/users/history/crops`, {
      method: 'POST',
      body: JSON.stringify(entry)
    });
    
    if (!response.ok) throw new Error("Add crop history failed");
    return await response.json();
  } catch (error) {
    console.error("Add crop history error:", error);
    throw error;
  }
}