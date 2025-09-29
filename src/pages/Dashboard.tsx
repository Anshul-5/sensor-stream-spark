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
<<<<<<< HEAD
            KrishiPragati AI Dashboard
          </h1>
          <p className="text-lg text-foreground/80">
=======
            AgriSense Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
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
<<<<<<< HEAD
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center space-x-2">
=======
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              <Gauge className="h-4 w-4" />
              <span>Temperature</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {sensor1.sensorData?.readings.slice(-1)[0]?.value.toFixed(1) || 'N/A'}°C
            </div>
<<<<<<< HEAD
            <p className="text-xs mt-1 font-medium">
              <span className={sensor1.sensorData?.isOnline ? "text-success" : "text-destructive"}>
                {sensor1.sensorData?.isOnline ? 'Online' : 'Offline'}
              </span>
=======
            <p className="text-xs text-muted-foreground mt-1">
              {sensor1.sensorData?.isOnline ? 'Online' : 'Offline'}
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="pb-2">
<<<<<<< HEAD
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center space-x-2">
=======
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              <Droplets className="h-4 w-4" />
              <span>Humidity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {sensor2.sensorData?.readings.slice(-1)[0]?.value.toFixed(1) || 'N/A'}%
            </div>
<<<<<<< HEAD
            <p className="text-xs mt-1 font-medium">
              <span className={sensor2.sensorData?.isOnline ? "text-success" : "text-destructive"}>
                {sensor2.sensorData?.isOnline ? 'Online' : 'Offline'}
              </span>
=======
            <p className="text-xs text-muted-foreground mt-1">
              {sensor2.sensorData?.isOnline ? 'Online' : 'Offline'}
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="pb-2">
<<<<<<< HEAD
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center space-x-2">
=======
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              <Activity className="h-4 w-4" />
              <span>Active Sensors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {[sensor1.sensorData, sensor2.sensorData].filter(s => s?.isOnline).length}/2
            </div>
<<<<<<< HEAD
            <p className="text-xs text-foreground/60 mt-1">
=======
            <p className="text-xs text-muted-foreground mt-1">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              Sensors online
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="pb-2">
<<<<<<< HEAD
            <CardTitle className="text-sm font-medium text-foreground/70 flex items-center space-x-2">
=======
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              <TrendingUp className="h-4 w-4" />
              <span>Data Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
<<<<<<< HEAD
            <div className="text-2xl font-bold text-accent-glow">
              {(sensor1.sensorData?.readings.length || 0) + (sensor2.sensorData?.readings.length || 0)}
            </div>
            <p className="text-xs text-foreground/60 mt-1">
=======
            <div className="text-2xl font-bold text-accent">
              {(sensor1.sensorData?.readings.length || 0) + (sensor2.sensorData?.readings.length || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
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
<<<<<<< HEAD
              <h2 className="text-xl font-semibold text-foreground">Temperature Sensor</h2>
=======
              <h2 className="text-xl font-semibold">Temperature Sensor</h2>
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
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
<<<<<<< HEAD
              <h2 className="text-xl font-semibold text-foreground">Humidity Sensor</h2>
=======
              <h2 className="text-xl font-semibold">Humidity Sensor</h2>
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
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

<<<<<<< HEAD
      {/* Enhanced Charts Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {sensor1.sensorData && (
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-lg blur opacity-25"></div>
            <SensorChart 
              readings={sensor1.sensorData.readings}
              title="🌡️ Temperature Trends"
              color="hsl(142 76% 36%)"
              type="area"
            />
          </div>
        )}

        {sensor2.sensorData && (
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-secondary-glow/20 rounded-lg blur opacity-25"></div>
            <SensorChart 
              readings={sensor2.sensorData.readings}
              title="💧 Humidity Analysis"
              color="hsl(25 95% 53%)"
              type="area"
            />
          </div>
=======
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
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
        )}
      </div>

      {/* Feature Highlights */}
      <Card className="bg-gradient-surface border-card-border">
        <CardHeader>
<<<<<<< HEAD
          <CardTitle className="text-xl text-foreground">Platform Features</CardTitle>
=======
          <CardTitle className="text-xl">Platform Features</CardTitle>
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div>
<<<<<<< HEAD
                <h3 className="font-medium text-foreground">Real-time Monitoring</h3>
                <p className="text-sm text-foreground/70">
=======
                <h3 className="font-medium">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
                  Automatic data refresh every 10 seconds with live status updates
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-secondary" />
              </div>
              <div>
<<<<<<< HEAD
                <h3 className="font-medium text-foreground">Data Visualization</h3>
                <p className="text-sm text-foreground/70">
=======
                <h3 className="font-medium">Data Visualization</h3>
                <p className="text-sm text-muted-foreground">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
                  Interactive charts and graphs for trend analysis
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
<<<<<<< HEAD
                <RefreshCw className="h-4 w-4 text-accent-glow" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Firebase Integration</h3>
                <p className="text-sm text-foreground/70">
=======
                <RefreshCw className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="font-medium">Firebase Integration</h3>
                <p className="text-sm text-muted-foreground">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
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