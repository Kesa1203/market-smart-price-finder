
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { ProductCategoryFilter } from './ProductCategoryFilter';
import { AdvancedFilters } from './AdvancedFilters';
import { Product, Filters } from '@/types';

interface ProductsTabProps {
  products: Product[];
  categories: string[];
  supplierNames: string[];
}

export const ProductsTab = ({ products, categories, supplierNames }: ProductsTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    minPrice: '',
    maxPrice: '',
    supplier: '',
    trend: ''
  });

  const filteredProducts = products.filter(product => {
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    if (filters.minPrice && product.currentPrice < parseFloat(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && product.currentPrice > parseFloat(filters.maxPrice)) {
      return false;
    }
    if (filters.supplier && product.bestSupplier !== filters.supplier) {
      return false;
    }
    if (filters.trend && product.trend !== filters.trend) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <ProductCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <AdvancedFilters
          onFiltersChange={setFilters}
          suppliers={supplierNames}
        />
      </div>

      <div className="grid gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <p className="text-gray-600">Best price from {product.bestSupplier}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">${product.currentPrice.toFixed(2)}</span>
                    {product.trend === 'down' ? (
                      <TrendingDown className="h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">was ${product.lastPrice.toFixed(2)}</span>
                    <Badge variant={product.savings > 0 ? 'default' : 'destructive'} className="text-xs">
                      {product.savings > 0 ? '+' : ''}${product.savings.toFixed(2)}
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
