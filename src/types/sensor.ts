export interface SensorReading {
  id: string;
  timestamp: string;
  value: number;
  unit: string;
  status: 'online' | 'offline' | 'warning';
  location?: string;
  description?: string;
}

export interface SensorData {
  sensorId: string;
  name: string;
  type: string;
  readings: SensorReading[];
  lastUpdated: string;
  isOnline: boolean;
  metadata?: {
    minValue?: number;
    maxValue?: number;
    threshold?: number;
    calibrationDate?: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}