
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Supplier } from '@/types';

interface SuppliersTabProps {
  suppliers: Supplier[];
  onSupplierClick: (supplier: Supplier) => void;
}

export const SuppliersTab = ({ suppliers, onSupplierClick }: SuppliersTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {suppliers.map((supplier, index) => (
          <Card 
            key={index} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSupplierClick(supplier)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{supplier.name}</h3>
                  <p className="text-gray-600">{supplier.products} products tracked</p>
                </div>
                <div className="text-right space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Avg Price: </span>
                    <span className="font-semibold">${supplier.avgPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Reliability: </span>
                    <Badge variant={supplier.reliability > 95 ? 'default' : 'secondary'}>
                      {supplier.reliability}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
