
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddProductDialog } from '@/components/AddProductDialog';
import { BulkImportDialog } from '@/components/BulkImportDialog';
import { PriceAlertDialog } from '@/components/PriceAlertDialog';
import { SupplierProfileDialog } from '@/components/SupplierProfileDialog';
import { AppHeader } from '@/components/AppHeader';
import { StatsOverview } from '@/components/StatsOverview';
import { DashboardTab } from '@/components/DashboardTab';
import { ProductsTab } from '@/components/ProductsTab';
import { SuppliersTab } from '@/components/SuppliersTab';
import { RecommendationsTab } from '@/components/RecommendationsTab';
import { Product, Supplier, Recommendation, PriceDataPoint } from '@/types';

const Index = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isPriceAlertOpen, setIsPriceAlertOpen] = useState(false);
  const [isSupplierProfileOpen, setIsSupplierProfileOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [alerts, setAlerts] = useState<any[]>([]);

  // Mock data for demonstration
  const priceData: PriceDataPoint[] = [
    { date: '1/1', supplier1: 2.45, supplier2: 2.48, supplier3: 2.42 },
    { date: '1/2', supplier1: 2.47, supplier2: 2.46, supplier3: 2.44 },
    { date: '1/3', supplier1: 2.44, supplier2: 2.49, supplier3: 2.43 },
    { date: '1/4', supplier1: 2.46, supplier2: 2.47, supplier3: 2.41 },
    { date: '1/5', supplier1: 2.43, supplier2: 2.45, supplier3: 2.40 },
  ];

  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      name: 'Rice (1kg)', 
      currentPrice: 2.43, 
      lastPrice: 2.46, 
      bestSupplier: 'Supplier C',
      trend: 'down',
      savings: 0.03,
      category: 'Food'
    },
    { 
      id: 2, 
      name: 'Cooking Oil (1L)', 
      currentPrice: 4.25, 
      lastPrice: 4.20, 
      bestSupplier: 'Supplier A',
      trend: 'up',
      savings: -0.05,
      category: 'Food'
    },
    { 
      id: 3, 
      name: 'Sugar (1kg)', 
      currentPrice: 1.55, 
      lastPrice: 1.58, 
      bestSupplier: 'Supplier B',
      trend: 'down',
      savings: 0.03,
      category: 'Food'
    },
  ]);

  const suppliers: Supplier[] = [
    { name: 'Supplier A', products: 45, avgPrice: 2.87, reliability: 95 },
    { name: 'Supplier B', products: 38, avgPrice: 2.82, reliability: 92 },
    { name: 'Supplier C', products: 52, avgPrice: 2.79, reliability: 98 },
  ];

  const categories = ['Food', 'Electronics', 'Household', 'Office'];
  const supplierNames = suppliers.map(s => s.name);

  const recommendations: Recommendation[] = [
    {
      type: 'buy',
      product: 'Rice (1kg)',
      reason: 'Price dropped 6.5% - best time to buy',
      savings: '$0.03 per unit',
      urgency: 'high'
    },
    {
      type: 'wait',
      product: 'Cooking Oil (1L)',
      reason: 'Price trending upward - wait for correction',
      savings: 'Potential $0.08 savings',
      urgency: 'medium'
    },
  ];

  const handleAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const handleProductAdd = (newProduct: any) => {
    setProducts(prev => [...prev, { ...newProduct, category: newProduct.category || 'General' }]);
  };

  const handleBulkImport = (importedProducts: any[]) => {
    setProducts(prev => [...prev, ...importedProducts]);
  };

  const handleAlertCreate = (alert: any) => {
    setAlerts(prev => [...prev, alert]);
  };

  const handleSupplierClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsSupplierProfileOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100">
      <AppHeader
        alertsCount={alerts.length}
        onAddProduct={handleAddProduct}
        onBulkImport={() => setIsBulkImportOpen(true)}
        onPriceAlert={() => setIsPriceAlertOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsOverview products={products} />

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab priceData={priceData} recommendations={recommendations} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab 
              products={products} 
              categories={categories} 
              supplierNames={supplierNames} 
            />
          </TabsContent>

          <TabsContent value="suppliers">
            <SuppliersTab suppliers={suppliers} onSupplierClick={handleSupplierClick} />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsTab recommendations={recommendations} />
          </TabsContent>
        </Tabs>
      </div>

      <AddProductDialog 
        open={isAddProductOpen} 
        onOpenChange={setIsAddProductOpen}
        onProductAdd={handleProductAdd}
      />
      
      <BulkImportDialog
        open={isBulkImportOpen}
        onOpenChange={setIsBulkImportOpen}
        onBulkImport={handleBulkImport}
      />
      
      <PriceAlertDialog
        open={isPriceAlertOpen}
        onOpenChange={setIsPriceAlertOpen}
        products={products}
        onAlertCreate={handleAlertCreate}
      />
      
      <SupplierProfileDialog
        open={isSupplierProfileOpen}
        onOpenChange={setIsSupplierProfileOpen}
        supplier={selectedSupplier}
      />
    </div>
  );
};

export default Index;
