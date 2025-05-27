
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdd: (product: any) => void;
}

export const AddProductDialog = ({ open, onOpenChange, onProductAdd }: AddProductDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    currentPrice: '',
    supplier: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.currentPrice || !formData.supplier) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      currentPrice: parseFloat(formData.currentPrice),
      lastPrice: parseFloat(formData.currentPrice) * 1.02, // Mock previous price slightly higher
      bestSupplier: formData.supplier,
      trend: 'down',
      savings: parseFloat(formData.currentPrice) * 0.02
    };

    onProductAdd(newProduct);
    
    toast({
      title: "Product Added",
      description: `${formData.name} has been added to tracking`,
    });

    // Reset form
    setFormData({ name: '', currentPrice: '', supplier: '' });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new product to track prices from multiple suppliers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="e.g., Rice (1kg)"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Current Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="e.g., 2.43"
              value={formData.currentPrice}
              onChange={(e) => handleInputChange('currentPrice', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Input
              id="supplier"
              placeholder="e.g., Supplier A"
              value={formData.supplier}
              onChange={(e) => handleInputChange('supplier', e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
