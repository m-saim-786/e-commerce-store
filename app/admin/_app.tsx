'use client';

import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

export default function AdminApp() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await fetch('/api/admin/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      return res.json();
    },
  });
  console.log(orders)

  return (
    <div className="container py-10 mx-auto px-4">
      <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}