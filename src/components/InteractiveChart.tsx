
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface InteractiveChartProps {
  data: any[];
  onDataPointClick?: (data: any) => void;
}

export const InteractiveChart = ({ data, onDataPointClick }: InteractiveChartProps) => {
  const { toast } = useToast();

  const handleDataPointClick = (data: any) => {
    if (onDataPointClick) {
      onDataPointClick(data);
    } else {
      toast({
        title: "Price Data",
        description: `Date: ${data.date} - Supplier A: $${data.supplier1} | B: $${data.supplier2} | C: $${data.supplier3}`,
      });
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: $${entry.value.toFixed(2)}`}
            </p>
          ))}
          <p className="text-xs text-gray-500 mt-1">Click for details</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>Interactive Price Trends</CardTitle>
        <CardDescription>Click on data points for detailed information</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} onClick={handleDataPointClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="supplier1" 
              stroke="#10b981" 
              strokeWidth={2} 
              name="Supplier A"
              dot={{ r: 6, cursor: 'pointer' }}
              activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="supplier2" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              name="Supplier B"
              dot={{ r: 6, cursor: 'pointer' }}
              activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="supplier3" 
              stroke="#8b5cf6" 
              strokeWidth={2} 
              name="Supplier C"
              dot={{ r: 6, cursor: 'pointer' }}
              activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
