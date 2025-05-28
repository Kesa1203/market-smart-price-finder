
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recommendation } from '@/types';

interface RecommendationsTabProps {
  recommendations: Recommendation[];
}

export const RecommendationsTab = ({ recommendations }: RecommendationsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Purchasing Recommendations</CardTitle>
        <CardDescription>AI-powered insights to maximize your savings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="border-l-4 border-emerald-500 pl-4 py-3 bg-emerald-50 rounded-r-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{rec.product}</h4>
                  <p className="text-gray-600 mt-1">{rec.reason}</p>
                  <p className="text-emerald-600 font-medium mt-2">{rec.savings}</p>
                </div>
                <Badge variant={rec.type === 'buy' ? 'default' : 'secondary'}>
                  {rec.type === 'buy' ? 'Recommended' : 'Hold'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
