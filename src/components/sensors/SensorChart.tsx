import { SensorReading } from '@/types/sensor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
<<<<<<< HEAD
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, Minus, BarChart3, Activity, Target } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
=======
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec

interface SensorChartProps {
  readings: SensorReading[];
  title?: string;
  color?: string;
  type?: 'line' | 'area';
}

const SensorChart = ({ 
  readings, 
  title = "Sensor Readings", 
  color = "hsl(var(--primary))",
  type = 'area' 
}: SensorChartProps) => {
<<<<<<< HEAD
  // Prepare data for the chart with enhanced formatting
  const chartData = readings
    .slice(-24) // Show last 24 readings for better visualization
    .map((reading, index) => ({
=======
  // Prepare data for the chart
  const chartData = readings
    .slice(-20) // Show last 20 readings
    .map((reading) => ({
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      timestamp: format(new Date(reading.timestamp), 'HH:mm'),
      value: parseFloat(reading.value.toFixed(1)),
      unit: reading.unit,
      status: reading.status,
      fullTimestamp: reading.timestamp,
<<<<<<< HEAD
      index: index,
      // Add gradient colors based on status
      fill: reading.status === 'warning' ? 'hsl(43 96% 56%)' : 
            reading.status === 'offline' ? 'hsl(0 84% 60%)' : color,
    }));

  // Enhanced tooltip component with better styling
=======
    }));

  // Custom tooltip component
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
<<<<<<< HEAD
        <div className="rounded-xl border-2 border-primary/20 bg-white/95 backdrop-blur-sm p-4 shadow-2xl ring-1 ring-black/5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">🕒 {label}</span>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs font-bold px-2 py-1",
                  data.status === 'online' && "border-success text-green-800 bg-success/15",
                  data.status === 'warning' && "border-warning text-amber-800 bg-warning/15", 
                  data.status === 'offline' && "border-destructive text-red-800 bg-destructive/15"
                )}
              >
                {data.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-primary">
                {payload[0].value}{data.unit}
              </span>
            </div>
            <div className="text-xs text-foreground/70">
              {format(new Date(data.fullTimestamp), 'MMM dd, yyyy')}
            </div>
          </div>
=======
        <div className="rounded-lg border border-border bg-surface p-3 shadow-elevated">
          <p className="text-sm font-medium">{`Time: ${label}`}</p>
          <p className="text-sm text-primary">
            {`Value: ${payload[0].value}${data.unit}`}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {`Status: ${data.status}`}
          </p>
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
        </div>
      );
    }
    return null;
  };

<<<<<<< HEAD
  // Calculate enhanced trend analysis
=======
  // Calculate trend
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
  const trend = chartData.length > 1 
    ? chartData[chartData.length - 1].value - chartData[0].value
    : 0;

<<<<<<< HEAD
  const average = chartData.length > 0 
    ? chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length 
    : 0;

  const getTrendIcon = () => {
    if (trend > 0.5) return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend < -0.5) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getTrendColor = () => {
    if (trend > 0.5) return 'text-success bg-success/10 border-success/20';
    if (trend < -0.5) return 'text-destructive bg-destructive/10 border-destructive/20';
    return 'text-muted-foreground bg-muted/20 border-muted/30';
  };

  const ChartComponent = type === 'area' ? AreaChart : LineChart;

  return (
    <Card className="w-full border-2 border-card-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/30 chart-card">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary/10 border border-primary/20">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {title}
            </span>
          </CardTitle>
          
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-full border ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="font-bold text-sm">
=======
  const ChartComponent = type === 'area' ? AreaChart : LineChart;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-success" />
            <span>{title}</span>
          </CardTitle>
          
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Trend:</span>
            <span className={`font-medium ${
              trend > 0 ? 'text-success' : trend < 0 ? 'text-destructive' : 'text-muted-foreground'
            }`}>
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}
              {chartData[0]?.unit}
            </span>
          </div>
        </div>
<<<<<<< HEAD
        
        {/* Quick Stats Row */}
        <div className="flex items-center space-x-4 text-sm mt-3">
          <div className="flex items-center space-x-1">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-foreground/70">Latest:</span>
            <span className="font-bold text-primary">
              {chartData[chartData.length - 1]?.value || 'N/A'}
              {chartData[0]?.unit}
            </span>
          </div>
          <div className="text-foreground/50">•</div>
          <div className="flex items-center space-x-1">
            <Activity className="h-4 w-4 text-secondary" />
            <span className="text-foreground/70">Avg:</span>
            <span className="font-bold text-secondary">
              {average.toFixed(1)}
              {chartData[0]?.unit}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="h-[350px] w-full relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-gradient-mesh rounded-lg"></div>
          
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent 
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              {/* Enhanced Grid */}
              <CartesianGrid 
                strokeDasharray="4 4" 
                stroke="hsl(var(--primary))" 
                opacity={0.1}
                horizontal={true}
                vertical={false}
              />
              
              {/* Average Reference Line */}
              <ReferenceLine 
                y={average} 
                stroke="hsl(var(--secondary))" 
                strokeDasharray="2 6" 
                opacity={0.6}
                strokeWidth={1.5}
              />
              
              {/* Enhanced Axes */}
              <XAxis 
                dataKey="timestamp" 
                stroke="hsl(var(--foreground))"
                fontSize={11}
                fontWeight={500}
                tick={{ fill: 'hsl(var(--foreground) / 0.7)' }}
                axisLine={{ stroke: 'hsl(var(--border))', strokeWidth: 2 }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                fontSize={11}
                fontWeight={500}
                tick={{ fill: 'hsl(var(--foreground) / 0.7)' }}
                axisLine={{ stroke: 'hsl(var(--border))', strokeWidth: 2 }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              
              {/* Enhanced Tooltip */}
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
=======
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
              />
              <XAxis 
                dataKey="timestamp" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              
              {type === 'area' ? (
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
<<<<<<< HEAD
                  fill={`url(#gradient-${title?.replace(/\s+/g, '-').toLowerCase()})`}
                  strokeWidth={3}
                  dot={{ 
                    fill: 'white', 
                    strokeWidth: 3, 
                    r: 5,
                    stroke: color,
                  }}
                  activeDot={{ 
                    r: 8, 
                    stroke: color,
                    strokeWidth: 3,
                    fill: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
=======
                  fill={`${color}20`}
                  strokeWidth={2}
                  dot={{ 
                    fill: color, 
                    strokeWidth: 2, 
                    r: 4,
                    stroke: 'hsl(var(--background))'
                  }}
                  activeDot={{ 
                    r: 6, 
                    stroke: color,
                    strokeWidth: 2,
                    fill: 'hsl(var(--background))'
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
                  }}
                />
              ) : (
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
<<<<<<< HEAD
                  strokeWidth={3}
                  dot={{ 
                    fill: 'white', 
                    strokeWidth: 3, 
                    r: 5,
                    stroke: color,
                  }}
                  activeDot={{ 
                    r: 8, 
                    stroke: color,
                    strokeWidth: 3,
                    fill: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }}
                />
              )}
              
              {/* Gradient Definitions */}
              <defs>
                <linearGradient id={`gradient-${title?.replace(/\s+/g, '-').toLowerCase()}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="50%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              </defs>
=======
                  strokeWidth={2}
                  dot={{ 
                    fill: color, 
                    strokeWidth: 2, 
                    r: 4,
                    stroke: 'hsl(var(--background))'
                  }}
                  activeDot={{ 
                    r: 6, 
                    stroke: color,
                    strokeWidth: 2,
                    fill: 'hsl(var(--background))'
                  }}
                />
              )}
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
            </ChartComponent>
          </ResponsiveContainer>
        </div>

<<<<<<< HEAD
        {/* Enhanced Chart Statistics */}
        <div className="mt-6 grid grid-cols-3 gap-3 chart-stats">
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 hover:shadow-md transition-all duration-200">
            <div className="text-xs font-medium text-secondary/80 mb-1 flex items-center justify-center space-x-1">
              <TrendingDown className="h-3 w-3" />
              <span>Min</span>
            </div>
            <div className="font-bold text-lg text-secondary">
              {Math.min(...chartData.map(d => d.value)).toFixed(1)}
            </div>
            <div className="text-xs text-secondary/70">
=======
        {/* Chart Statistics */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center p-2 rounded-lg bg-muted/30">
            <div className="text-muted-foreground">Min</div>
            <div className="font-medium text-secondary">
              {Math.min(...chartData.map(d => d.value)).toFixed(1)}
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              {chartData[0]?.unit}
            </div>
          </div>
          
<<<<<<< HEAD
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:shadow-md transition-all duration-200">
            <div className="text-xs font-medium text-primary/80 mb-1 flex items-center justify-center space-x-1">
              <Activity className="h-3 w-3" />
              <span>Avg</span>
            </div>
            <div className="font-bold text-lg text-primary">
              {average.toFixed(1)}
            </div>
            <div className="text-xs text-primary/70">
=======
          <div className="text-center p-2 rounded-lg bg-muted/30">
            <div className="text-muted-foreground">Avg</div>
            <div className="font-medium text-primary">
              {(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length).toFixed(1)}
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              {chartData[0]?.unit}
            </div>
          </div>
          
<<<<<<< HEAD
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20 hover:shadow-md transition-all duration-200">
            <div className="text-xs font-medium text-success/80 mb-1 flex items-center justify-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Max</span>
            </div>
            <div className="font-bold text-lg text-success">
              {Math.max(...chartData.map(d => d.value)).toFixed(1)}
            </div>
            <div className="text-xs text-success/70">
=======
          <div className="text-center p-2 rounded-lg bg-muted/30">
            <div className="text-muted-foreground">Max</div>
            <div className="font-medium text-accent">
              {Math.max(...chartData.map(d => d.value)).toFixed(1)}
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
              {chartData[0]?.unit}
            </div>
          </div>
        </div>
<<<<<<< HEAD
        
        {/* Data Quality Indicator */}
        <div className="mt-4 flex items-center justify-between text-xs text-foreground/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full live-indicator"></div>
            <span>Live Data • {chartData.length} points</span>
          </div>
          <div>
            Last updated: {format(new Date(), 'HH:mm:ss')}
          </div>
        </div>
=======
>>>>>>> 66b4987587b3e545f28b990bb836b61d418d5fec
      </CardContent>
    </Card>
  );
};

export default SensorChart;