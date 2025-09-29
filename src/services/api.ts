import { SensorData, ApiResponse } from '@/types/sensor';

// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Mock data for testing when backend is not available
const mockSoilData: SensorData = {
  sensorId: 'field-soil-001',
  name: 'Soil Conditions Monitor',
  type: 'soil',
  isOnline: true,
  lastUpdated: new Date().toISOString(),
  readings: Array.from({ length: 20 }, (_, i) => ({
    id: `reading-${i}`,
    timestamp: new Date(Date.now() - (19 - i) * 5 * 60 * 1000).toISOString(),
    value: 18 + Math.random() * 12 + Math.sin(i * 0.5) * 3,
    unit: '°C',
    status: Math.random() > 0.1 ? 'online' : 'warning' as const,
    location: 'Field Section A',
    description: 'Soil temperature monitoring',
    fieldSection: 'A-01',
    cropType: 'Wheat',
    soilType: 'Clay Loam',
    weatherCondition: 'Partly Cloudy'
  })),
  metadata: {
    minValue: 15,
    maxValue: 35,
    threshold: 30,
    calibrationDate: '2024-01-15',
    fieldId: 'FIELD-001',
    cropType: 'Winter Wheat',
    soilType: 'Clay Loam',
    plantingDate: '2023-10-15',
    harvestDate: '2024-07-20',
    irrigationSchedule: 'Daily at 6 AM',
    fertilizerLastApplied: '2024-01-10'
  }
};

const mockCropData: SensorData = {
  sensorId: 'field-crop-001',
  name: 'Crop Health Monitor',
  type: 'environmental',
  isOnline: true,
  lastUpdated: new Date().toISOString(),
  readings: Array.from({ length: 20 }, (_, i) => ({
    id: `reading-${i}`,
    timestamp: new Date(Date.now() - (19 - i) * 5 * 60 * 1000).toISOString(),
    value: 45 + Math.random() * 25 + Math.cos(i * 0.3) * 8,
    unit: '%',
    status: Math.random() > 0.05 ? 'online' : 'warning' as const,
    location: 'Field Section B',
    description: 'Environmental humidity and leaf wetness monitoring',
    fieldSection: 'B-02',
    cropType: 'Corn',
    soilType: 'Silt Loam',
    weatherCondition: 'Sunny'
  })),
  metadata: {
    minValue: 30,
    maxValue: 80,
    threshold: 70,
    calibrationDate: '2024-01-15',
    fieldId: 'FIELD-002',
    cropType: 'Sweet Corn',
    soilType: 'Silt Loam',
    plantingDate: '2024-04-20',
    harvestDate: '2024-08-15',
    irrigationSchedule: 'Every 2 days at 5 AM',
    fertilizerLastApplied: '2024-05-01'
  }
};

// Generic API fetch function with error handling
async function apiRequest<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Handle CORS if needed
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      data,
      status: 'success',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn(`API request failed for ${endpoint}, using mock data:`, error);
    
    // Return mock data based on endpoint
    const mockData = endpoint.includes('Sensor_1') ? mockCropData : mockSoilData;
    
    return {
      data: mockData as T,
      status: 'success', // Using mock data successfully
      message: 'Using mock data - backend not available',
      timestamp: new Date().toISOString()
    };
  }
}

// API functions for sensor endpoints
export const sensorApi = {
  // Fetch sensor data from /Sensor endpoint
  async getSensorData(): Promise<ApiResponse<SensorData>> {
    return apiRequest<SensorData>('/Sensor');
  },

  // Fetch sensor data from /Sensor_1 endpoint
  async getSensor1Data(): Promise<ApiResponse<SensorData>> {
    return apiRequest<SensorData>('/Sensor_1');
  },
};

// Export mock data for testing
export { mockSoilData, mockCropData };