
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from 'lucide-react';
import { InteractiveChart } from './InteractiveChart';
import { PriceDataPoint, Recommendation } from '@/types';

interface DashboardTabProps {
  priceData: PriceDataPoint[];
  recommendations: Recommendation[];
}

export const DashboardTab = ({ priceData, recommendations }: DashboardTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart data={priceData} />
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Smart recommendations for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${rec.urgency === 'high' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  <AlertCircle className={`h-4 w-4 ${rec.urgency === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{rec.product}</p>
                  <p className="text-sm text-gray-600">{rec.reason}</p>
                  <p className="text-sm font-medium text-emerald-600">{rec.savings}</p>
                </div>
                <Badge variant={rec.type === 'buy' ? 'default' : 'secondary'}>
                  {rec.type === 'buy' ? 'Buy Now' : 'Wait'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
