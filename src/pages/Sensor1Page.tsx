import { useSensorData } from '@/hooks/useSensorData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import SensorCard from '@/components/sensors/SensorCard';
import SensorChart from '@/components/sensors/SensorChart';
import { AlertCircle, Activity, Droplets, Clock, Wheat, Sprout } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Sensor1Page = () => {
  const { 
    sensorData, 
    isLoading, 
    isError, 
    error, 
    isFetching,
    apiMessage,
    lastUpdated 
  } = useSensorData('sensor_1');

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
        
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (isError || !sensorData) {
    return (
      <div className="container mx-auto p-6">
        <Alert className="max-w-2xl mx-auto border-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load sensor data. {error?.message || 'Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const latestReading = sensorData.readings[sensorData.readings.length - 1];
  const averageValue = sensorData.readings.reduce((sum, reading) => sum + reading.value, 0) / sensorData.readings.length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-3">
            <Wheat className="h-8 w-8 text-success" />
            <span>Crop Health Monitor</span>
          </h1>
          <div className="flex items-center space-x-2">
            {isFetching && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4 animate-pulse" />
                <span>Updating...</span>
              </div>
            )}
            {lastUpdated && (
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{new Date(lastUpdated).toLocaleTimeString()}</span>
              </Badge>
            )}
          </div>
        </div>
        <p className="text-muted-foreground">
          Monitor crop health parameters including humidity, leaf moisture, and plant vitals for optimal farming decisions
        </p>
        
        {apiMessage && (
          <Alert className="border-warning bg-warning/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{apiMessage}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-card-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-primary" />
              <span>Plant Moisture</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {latestReading?.value.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {latestReading?.status === 'online' ? 'Optimal conditions' : 'Irrigation needed'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Activity className="h-4 w-4 text-accent" />
              <span>Daily Average</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {averageValue.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {sensorData.readings.length} field samples
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Sprout className="h-4 w-4 text-primary" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              sensorData.isOnline ? 'text-success' : 'text-destructive'
            }`}>
              {sensorData.isOnline ? 'Active' : 'Maintenance'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last sync: {new Date(sensorData.lastUpdated).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Activity className="h-4 w-4 text-primary" />
              <span>Field Samples</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary flex items-center space-x-2">
              <Wheat className="h-6 w-6" />
              <span>{sensorData.readings.length}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Crop health measurements
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sensor Details Card */}
        <div className="lg:col-span-1">
          <SensorCard sensor={sensorData} />
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <SensorChart 
            readings={sensorData.readings}
            title="Crop Health Trends"
            color="hsl(var(--success))"
            type="area"
          />
        </div>
      </div>

      {/* Recent Readings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-success" />
            <span>Recent Field Measurements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground">Time</th>
                  <th className="text-left py-2 text-muted-foreground">Moisture Level</th>
                  <th className="text-left py-2 text-muted-foreground">Crop Status</th>
                  <th className="text-left py-2 text-muted-foreground">Field Location</th>
                </tr>
              </thead>
              <tbody>
                {sensorData.readings.slice(-10).reverse().map((reading) => (
                  <tr key={reading.id} className="border-b border-border/30">
                    <td className="py-2">
                      {new Date(reading.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2 font-medium">
                      {reading.value.toFixed(1)}{reading.unit}
                    </td>
                    <td className="py-2">
                      <Badge 
                        variant="outline" 
                        className={`capitalize ${
                          reading.status === 'online' ? 'border-success text-success-foreground' :
                          reading.status === 'warning' ? 'border-warning text-warning-foreground' :
                          'border-destructive text-destructive-foreground'
                        }`}
                      >
                        {reading.status}
                      </Badge>
                    </td>
                    <td className="py-2 text-muted-foreground">
                      {reading.location || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sensor1Page;