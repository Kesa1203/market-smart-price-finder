
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Package, Users, Target } from 'lucide-react';
import { Product } from '@/types';

interface StatsOverviewProps {
  products: Product[];
}

export const StatsOverview = ({ products }: StatsOverviewProps) => {
  const totalSavings = products.reduce((sum, product) => sum + product.savings, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Total Savings</p>
              <p className="text-2xl font-bold">${totalSavings.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-200" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Products Tracked</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="h-8 w-8 text-gray-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Active Suppliers</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
            <Users className="h-8 w-8 text-gray-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Avg. Savings</p>
              <p className="text-2xl font-bold text-gray-900">12.5%</p>
            </div>
            <Target className="h-8 w-8 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
