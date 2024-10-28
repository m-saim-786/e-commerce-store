'use client';

import { CheckoutForm } from '@/components/checkout-form';
import { CartSheet } from '@/components/cart-sheet';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Store</span>
          </Link>
          <CartSheet />
        </div>
      </header>

      <main className="container max-w-2xl py-8">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
        <CheckoutForm />
      </main>
    </div>
  );
}