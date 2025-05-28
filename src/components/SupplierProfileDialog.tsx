
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SupplierProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier: any;
}

export const SupplierProfileDialog = ({ open, onOpenChange, supplier }: SupplierProfileDialogProps) => {
  if (!supplier) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{supplier.name} - Supplier Profile</DialogTitle>
          <DialogDescription>
            Detailed information and performance metrics
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{supplier.products}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Avg Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${supplier.avgPrice?.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Reliability Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold">{supplier.reliability}%</p>
                <Badge variant={supplier.reliability > 95 ? 'default' : 'secondary'}>
                  {supplier.reliability > 95 ? 'Excellent' : 'Good'}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full" 
                  style={{ width: `${supplier.reliability}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="font-medium">Email:</span> contact@{supplier.name.toLowerCase().replace(/\s+/g, '')}.com</p>
              <p><span className="font-medium">Phone:</span> +1 (555) 123-4567</p>
              <p><span className="font-medium">Delivery Time:</span> 2-3 business days</p>
              <p><span className="font-medium">Payment Terms:</span> Net 30</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
