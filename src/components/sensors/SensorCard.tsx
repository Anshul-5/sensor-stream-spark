import { SensorData } from '@/types/sensor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sprout, AlertTriangle, CheckCircle, Clock, MapPin, Droplets, ThermometerSun, Wheat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SensorCardProps {
  sensor: SensorData;
}

const SensorCard = ({ sensor }: SensorCardProps) => {
  const latestReading = sensor.readings[sensor.readings.length - 1];
  const isWarning = latestReading?.status === 'warning' || !sensor.isOnline;
  
  const getStatusIcon = () => {
    if (!sensor.isOnline) return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (isWarning) return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <CheckCircle className="h-4 w-4 text-success" />;
  };

  const getSensorTypeIcon = () => {
    switch (sensor.type) {
      case 'soil': return <Sprout className="h-5 w-5 text-primary" />;
      case 'environmental': return <ThermometerSun className="h-5 w-5 text-primary" />;
      case 'crop': return <Wheat className="h-5 w-5 text-primary" />;
      case 'irrigation': return <Droplets className="h-5 w-5 text-primary" />;
      default: return <Sprout className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusColor = () => {
    if (!sensor.isOnline) return 'destructive';
    if (isWarning) return 'warning';
    return 'success';
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-elevated border-card-border",
      isWarning && "border-warning/30",
      !sensor.isOnline && "border-destructive/30"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            {getSensorTypeIcon()}
            <span>{sensor.name}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <Badge 
              variant="outline" 
              className={cn(
<<<<<<< HEAD
                "capitalize font-bold text-sm px-3 py-1",
                getStatusColor() === 'success' && "border-success text-green-800 bg-success/15 hover:bg-success/20",
                getStatusColor() === 'warning' && "border-warning text-amber-800 bg-warning/15 hover:bg-warning/20",
                getStatusColor() === 'destructive' && "border-destructive text-red-800 bg-destructive/15 hover:bg-destructive/20"
=======
                "capitalize",
                getStatusColor() === 'success' && "border-success text-success-foreground",
                getStatusColor() === 'warning' && "border-warning text-warning-foreground",
                getStatusColor() === 'destructive' && "border-destructive text-destructive-foreground"
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              )}
            >
              {sensor.isOnline ? (isWarning ? 'Warning' : 'Online') : 'Offline'}
            </Badge>
          </div>
        </div>
        
<<<<<<< HEAD
        <div className="text-sm text-foreground/70 capitalize">{sensor.type} sensor</div>
=======
        <div className="text-sm text-muted-foreground capitalize">{sensor.type} sensor</div>
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Reading */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-surface border border-card-border">
          <div>
<<<<<<< HEAD
            <div className="text-sm text-foreground/70">Current Reading</div>
=======
            <div className="text-sm text-muted-foreground">Current Reading</div>
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
            <div className="text-2xl font-bold text-primary">
              {latestReading ? `${latestReading.value.toFixed(1)}${latestReading.unit}` : 'N/A'}
            </div>
          </div>
          <div className="text-right">
<<<<<<< HEAD
            <div className="text-sm text-foreground/70">Status</div>
=======
            <div className="text-sm text-muted-foreground">Status</div>
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
            <div className={cn(
              "text-sm font-medium capitalize",
              getStatusColor() === 'success' && "text-success",
              getStatusColor() === 'warning' && "text-warning",
              getStatusColor() === 'destructive' && "text-destructive"
            )}>
              {latestReading?.status || 'Unknown'}
            </div>
          </div>
        </div>

        {/* Agriculture Metadata */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {latestReading?.location && (
<<<<<<< HEAD
              <div className="flex items-center space-x-2 text-foreground/70">
=======
              <div className="flex items-center space-x-2 text-muted-foreground">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
                <MapPin className="h-4 w-4" />
                <span>{latestReading.location}</span>
              </div>
            )}
            
<<<<<<< HEAD
            <div className="flex items-center space-x-2 text-foreground/70">
=======
            <div className="flex items-center space-x-2 text-muted-foreground">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              <Clock className="h-4 w-4" />
              <span>
                {new Date(sensor.lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Agriculture-specific information */}
          {(latestReading?.fieldSection || latestReading?.cropType || latestReading?.soilType) && (
            <div className="p-3 rounded-lg bg-success/5 border border-success/20">
              <div className="text-sm font-medium text-success mb-2">Field Information</div>
<<<<<<< HEAD
              <div className="grid grid-cols-1 gap-2 text-sm text-foreground/70">
=======
              <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
                {latestReading?.fieldSection && (
                  <div>Field Section: <span className="text-foreground">{latestReading.fieldSection}</span></div>
                )}
                {latestReading?.cropType && (
                  <div>Crop Type: <span className="text-foreground">{latestReading.cropType}</span></div>
                )}
                {latestReading?.soilType && (
                  <div>Soil Type: <span className="text-foreground">{latestReading.soilType}</span></div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Threshold Information */}
        {sensor.metadata?.threshold && (
          <div className="p-3 rounded-lg bg-muted/30 border border-border">
<<<<<<< HEAD
            <div className="text-xs text-foreground/70 mb-1">Threshold</div>
            <div className="flex items-center justify-between text-sm text-foreground">
=======
            <div className="text-xs text-muted-foreground mb-1">Threshold</div>
            <div className="flex items-center justify-between text-sm">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              <span>Max: {sensor.metadata.threshold}{latestReading?.unit}</span>
              {sensor.metadata.minValue && sensor.metadata.maxValue && (
                <span>Range: {sensor.metadata.minValue}-{sensor.metadata.maxValue}{latestReading?.unit}</span>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {latestReading?.description && (
<<<<<<< HEAD
          <div className="text-sm text-foreground/80">
=======
          <div className="text-sm text-muted-bright">
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
            {latestReading.description}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SensorCard;