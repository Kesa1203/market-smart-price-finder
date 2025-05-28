
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface BulkImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBulkImport: (products: any[]) => void;
}

export const BulkImportDialog = ({ open, onOpenChange, onBulkImport }: BulkImportDialogProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImport = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to import",
        variant: "destructive"
      });
      return;
    }

    // Mock CSV processing - in real app would parse CSV
    const mockImportedProducts = [
      {
        id: Date.now() + 1,
        name: 'Imported Rice (5kg)',
        currentPrice: 12.99,
        lastPrice: 13.50,
        bestSupplier: 'Bulk Supplier A',
        trend: 'down',
        savings: 0.51,
        category: 'Food'
      },
      {
        id: Date.now() + 2,
        name: 'Imported Oil (2L)',
        currentPrice: 8.75,
        lastPrice: 8.60,
        bestSupplier: 'Bulk Supplier B',
        trend: 'up',
        savings: -0.15,
        category: 'Food'
      }
    ];

    onBulkImport(mockImportedProducts);
    
    toast({
      title: "Import Successful",
      description: `${mockImportedProducts.length} products imported successfully`,
    });

    setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bulk Import Products</DialogTitle>
          <DialogDescription>
            Upload a CSV file with columns: Name, Price, Supplier, Category
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csv-file">CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
          {file && (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Upload className="h-4 w-4" />
              <span className="text-sm">{file.name}</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleImport} disabled={!file}>
            Import Products
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
