export interface SensorReading {
  id: string;
  timestamp: string;
  value: number;
  unit: string;
  status: 'online' | 'offline' | 'warning';
  location?: string;
  description?: string;
  // Agriculture-specific fields
  fieldSection?: string;
  cropType?: string;
  soilType?: string;
  weatherCondition?: string;
}

export interface SensorData {
  sensorId: string;
  name: string;
  type: 'soil' | 'environmental' | 'crop' | 'irrigation' | 'weather';
  readings: SensorReading[];
  lastUpdated: string;
  isOnline: boolean;
  metadata?: {
    minValue?: number;
    maxValue?: number;
    threshold?: number;
    calibrationDate?: string;
    // Agriculture-specific metadata
    fieldId?: string;
    cropType?: string;
    soilType?: string;
    plantingDate?: string;
    harvestDate?: string;
    irrigationSchedule?: string;
    fertilizerLastApplied?: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}