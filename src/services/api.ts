import { SensorData, ApiResponse } from '@/types/sensor';

// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Mock data for testing when backend is not available
const mockSensorData: SensorData = {
  sensorId: 'sensor-001',
  name: 'Temperature Sensor',
  type: 'temperature',
  isOnline: true,
  lastUpdated: new Date().toISOString(),
  readings: Array.from({ length: 20 }, (_, i) => ({
    id: `reading-${i}`,
    timestamp: new Date(Date.now() - (19 - i) * 5 * 60 * 1000).toISOString(),
    value: 22 + Math.random() * 8 + Math.sin(i * 0.5) * 3,
    unit: '°C',
    status: Math.random() > 0.1 ? 'online' : 'warning' as const,
    location: 'Building A - Room 101',
    description: 'Primary temperature monitoring'
  })),
  metadata: {
    minValue: 18,
    maxValue: 35,
    threshold: 30,
    calibrationDate: '2024-01-15'
  }
};

const mockSensor1Data: SensorData = {
  sensorId: 'sensor-002',
  name: 'Humidity Sensor',
  type: 'humidity',
  isOnline: true,
  lastUpdated: new Date().toISOString(),
  readings: Array.from({ length: 20 }, (_, i) => ({
    id: `reading-${i}`,
    timestamp: new Date(Date.now() - (19 - i) * 5 * 60 * 1000).toISOString(),
    value: 45 + Math.random() * 20 + Math.cos(i * 0.3) * 5,
    unit: '%',
    status: Math.random() > 0.05 ? 'online' : 'warning' as const,
    location: 'Building A - Room 101',
    description: 'Environmental humidity monitoring'
  })),
  metadata: {
    minValue: 30,
    maxValue: 80,
    threshold: 70,
    calibrationDate: '2024-01-15'
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
    const mockData = endpoint.includes('Sensor_1') ? mockSensor1Data : mockSensorData;
    
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
export { mockSensorData, mockSensor1Data };