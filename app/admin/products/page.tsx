'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { ProductDialog } from '@/components/admin/product-dialog';
import { DataTable } from '@/components/ui/data-table';

export default function ProductsPage() {
  const [open, setOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const res = await fetch('/api/admin/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container py-10 mx-auto px-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Products</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <DataTable columns={columns} data={products} />
      <ProductDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}