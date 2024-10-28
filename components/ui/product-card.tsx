'use client';

import { Product } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-lg border bg-card p-4 transition-all hover:shadow-lg"
    >
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{product.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
        </div>
        <p className="text-lg font-bold">${product.price}</p>
        <Button
          onClick={() => addItem(product)}
          className="w-full gap-2 transition-all hover:gap-3"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}