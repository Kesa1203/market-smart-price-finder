
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, Plus, Search, Filter, DollarSign, Users, Package, Target } from 'lucide-react';
import { AddProductDialog } from '@/components/AddProductDialog';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Mock data for demonstration
  const priceData = [
    { date: '1/1', supplier1: 2.45, supplier2: 2.48, supplier3: 2.42 },
    { date: '1/2', supplier1: 2.47, supplier2: 2.46, supplier3: 2.44 },
    { date: '1/3', supplier1: 2.44, supplier2: 2.49, supplier3: 2.43 },
    { date: '1/4', supplier1: 2.46, supplier2: 2.47, supplier3: 2.41 },
    { date: '1/5', supplier1: 2.43, supplier2: 2.45, supplier3: 2.40 },
  ];

  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Rice (1kg)', 
      currentPrice: 2.43, 
      lastPrice: 2.46, 
      bestSupplier: 'Supplier C',
      trend: 'down',
      savings: 0.03
    },
    { 
      id: 2, 
      name: 'Cooking Oil (1L)', 
      currentPrice: 4.25, 
      lastPrice: 4.20, 
      bestSupplier: 'Supplier A',
      trend: 'up',
      savings: -0.05
    },
    { 
      id: 3, 
      name: 'Sugar (1kg)', 
      currentPrice: 1.55, 
      lastPrice: 1.58, 
      bestSupplier: 'Supplier B',
      trend: 'down',
      savings: 0.03
    },
  ]);

  const suppliers = [
    { name: 'Supplier A', products: 45, avgPrice: 2.87, reliability: 95 },
    { name: 'Supplier B', products: 38, avgPrice: 2.82, reliability: 92 },
    { name: 'Supplier C', products: 52, avgPrice: 2.79, reliability: 98 },
  ];

  const recommendations = [
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
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100">
      {/* Header */}
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
            <Button onClick={handleAddProduct} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Total Savings</p>
                  <p className="text-2xl font-bold">$24.50</p>
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

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Trends</CardTitle>
                  <CardDescription>Last 5 days price comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={priceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="supplier1" stroke="#10b981" strokeWidth={2} name="Supplier A" />
                      <Line type="monotone" dataKey="supplier2" stroke="#3b82f6" strokeWidth={2} name="Supplier B" />
                      <Line type="monotone" dataKey="supplier3" stroke="#8b5cf6" strokeWidth={2} name="Supplier C" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Quick Actions */}
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
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {/* Search and Filter */}
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
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Products List */}
            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
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
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <div className="grid gap-4">
              {suppliers.map((supplier, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
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
          </TabsContent>

          <TabsContent value="recommendations">
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
          </TabsContent>
        </Tabs>
      </div>

      <AddProductDialog 
        open={isAddProductOpen} 
        onOpenChange={setIsAddProductOpen}
        onProductAdd={handleProductAdd}
      />
    </div>
  );
};

export default Index;
