import { SensorReading } from '@/types/sensor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';

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
  // Prepare data for the chart
  const chartData = readings
    .slice(-20) // Show last 20 readings
    .map((reading) => ({
      timestamp: format(new Date(reading.timestamp), 'HH:mm'),
      value: parseFloat(reading.value.toFixed(1)),
      unit: reading.unit,
      status: reading.status,
      fullTimestamp: reading.timestamp,
    }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-border bg-surface p-3 shadow-elevated">
          <p className="text-sm font-medium">{`Time: ${label}`}</p>
          <p className="text-sm text-primary">
            {`Value: ${payload[0].value}${data.unit}`}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {`Status: ${data.status}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate trend
  const trend = chartData.length > 1 
    ? chartData[chartData.length - 1].value - chartData[0].value
    : 0;

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
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}
              {chartData[0]?.unit}
            </span>
          </div>
        </div>
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
              
              {type === 'area' ? (
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
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
                  }}
                />
              ) : (
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
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
            </ChartComponent>
          </ResponsiveContainer>
        </div>

        {/* Chart Statistics */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center p-2 rounded-lg bg-muted/30">
            <div className="text-muted-foreground">Min</div>
            <div className="font-medium text-secondary">
              {Math.min(...chartData.map(d => d.value)).toFixed(1)}
              {chartData[0]?.unit}
            </div>
          </div>
          
          <div className="text-center p-2 rounded-lg bg-muted/30">
            <div className="text-muted-foreground">Avg</div>
            <div className="font-medium text-primary">
              {(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length).toFixed(1)}
              {chartData[0]?.unit}
            </div>
          </div>
          
          <div className="text-center p-2 rounded-lg bg-muted/30">
            <div className="text-muted-foreground">Max</div>
            <div className="font-medium text-accent">
              {Math.max(...chartData.map(d => d.value)).toFixed(1)}
              {chartData[0]?.unit}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorChart;