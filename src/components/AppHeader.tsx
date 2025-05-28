
import { Button } from "@/components/ui/button";
import { DollarSign, Bell, Upload, Plus } from 'lucide-react';

interface AppHeaderProps {
  alertsCount: number;
  onAddProduct: () => void;
  onBulkImport: () => void;
  onPriceAlert: () => void;
}

export const AppHeader = ({ alertsCount, onAddProduct, onBulkImport, onPriceAlert }: AppHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PriceTracker Pro</h1>
              <p className="text-sm text-gray-500">Smart Retail Price Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onPriceAlert}>
              <Bell className="h-4 w-4 mr-2" />
              Alerts
              {alertsCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {alertsCount}
                </span>
              )}
            </Button>
            <Button variant="outline" onClick={onBulkImport}>
              <Upload className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button onClick={onAddProduct} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
