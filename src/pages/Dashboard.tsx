import { useMultipleSensors } from '@/hooks/useSensorData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import SensorCard from '@/components/sensors/SensorCard';
import SensorChart from '@/components/sensors/SensorChart';
import { Activity, Gauge, Droplets, TrendingUp, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { sensor1, sensor2, refreshAll, isLoading, isFetching } = useMultipleSensors();

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
            AgriSense Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor your fields in real-time with smart agriculture IoT sensors
          </p>
        </div>
        
        <Button 
          onClick={refreshAll}
          disabled={isFetching}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
          <span>Refresh All</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-card-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Gauge className="h-4 w-4" />
              <span>Temperature</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {sensor1.sensorData?.readings.slice(-1)[0]?.value.toFixed(1) || 'N/A'}°C
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {sensor1.sensorData?.isOnline ? 'Online' : 'Offline'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Droplets className="h-4 w-4" />
              <span>Humidity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {sensor2.sensorData?.readings.slice(-1)[0]?.value.toFixed(1) || 'N/A'}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {sensor2.sensorData?.isOnline ? 'Online' : 'Offline'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Active Sensors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {[sensor1.sensorData, sensor2.sensorData].filter(s => s?.isOnline).length}/2
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sensors online
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Data Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {(sensor1.sensorData?.readings.length || 0) + (sensor2.sensorData?.readings.length || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total readings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {sensor1.sensorData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Temperature Sensor</h2>
              <Link to="/sensor">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
            <SensorCard sensor={sensor1.sensorData} />
          </div>
        )}

        {sensor2.sensorData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Humidity Sensor</h2>
              <Link to="/sensor-1">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
            <SensorCard sensor={sensor2.sensorData} />
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {sensor1.sensorData && (
          <SensorChart 
            readings={sensor1.sensorData.readings}
            title="Temperature Overview"
            color="hsl(var(--primary))"
            type="area"
          />
        )}

        {sensor2.sensorData && (
          <SensorChart 
            readings={sensor2.sensorData.readings}
            title="Humidity Overview"
            color="hsl(var(--secondary))"
            type="area"
          />
        )}
      </div>

      {/* Feature Highlights */}
      <Card className="bg-gradient-surface border-card-border">
        <CardHeader>
          <CardTitle className="text-xl">Platform Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic data refresh every 10 seconds with live status updates
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium">Data Visualization</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive charts and graphs for trend analysis
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <RefreshCw className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="font-medium">Firebase Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Seamless connection to FastAPI backend with Firebase
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;