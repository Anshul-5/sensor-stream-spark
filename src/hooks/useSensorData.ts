import { useQuery, useQueryClient } from '@tanstack/react-query';
import { sensorApi } from '@/services/api';
import { SensorData } from '@/types/sensor';
import { useCallback, useEffect } from 'react';

// Custom hook for sensor data fetching with auto-refresh
export const useSensorData = (sensorType: 'sensor' | 'sensor_1', autoRefresh = true) => {
  const queryClient = useQueryClient();
  
  const queryKey = [`${sensorType}Data`];
  
  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
    isFetching
  } = useQuery({
    queryKey,
    queryFn: () => {
      return sensorType === 'sensor' 
        ? sensorApi.getSensorData()
        : sensorApi.getSensor1Data();
    },
    staleTime: 30 * 1000, // Data is fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Auto-refresh every 10 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey });
    }, 10000);

    return () => clearInterval(interval);
  }, [queryClient, autoRefresh, queryKey]);

  // Manual refresh function
  const refreshData = useCallback(() => {
    return refetch();
  }, [refetch]);

  // Transform the API response data
  const sensorData: SensorData | undefined = data?.data;
  const isSuccess = data?.status === 'success';
  const apiMessage = data?.message;

  return {
    sensorData,
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
    refreshData,
    apiMessage,
    lastUpdated: data?.timestamp,
  };
};

// Hook for multiple sensors at once
export const useMultipleSensors = () => {
  const sensor1 = useSensorData('sensor', true);
  const sensor2 = useSensorData('sensor_1', true);

  const refreshAll = useCallback(async () => {
    await Promise.all([
      sensor1.refreshData(),
      sensor2.refreshData()
    ]);
  }, [sensor1.refreshData, sensor2.refreshData]);

  return {
    sensor1,
    sensor2,
    refreshAll,
    isLoading: sensor1.isLoading || sensor2.isLoading,
    isFetching: sensor1.isFetching || sensor2.isFetching,
  };
};