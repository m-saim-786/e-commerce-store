'use client';

import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/ui/table';
import { columns } from './columns';

export default function AdminPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await fetch('/api/admin/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}