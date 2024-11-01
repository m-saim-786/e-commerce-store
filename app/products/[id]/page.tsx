'use client';

import { useParams } from 'next/navigation';
import { products } from '@/lib/data';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/components/cart-sheet';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-background ">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Store</span>
          </Link>
          <CartSheet />
        </div>
      </header>

      <main className="container py-8 mx-auto">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square overflow-hidden rounded-lg bg-muted"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.category}
                </span>
              </div>
            </div>

            <p className="text-4xl font-bold">${product.price}</p>

            <p className="text-muted-foreground">{product.description}</p>

            <Button
              size="lg"
              className="w-full gap-2 transition-all hover:gap-3"
              onClick={() => addItem(product)}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}