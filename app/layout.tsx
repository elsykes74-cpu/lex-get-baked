import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'Lex Get Baked',
  description: 'Artisan baked goods — crafted with love in Western Massachusetts.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Lex Get Baked' },
  openGraph: {
    title: 'Lex Get Baked',
    description: 'A futuristic sensory dessert ordering experience.',
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#9C94C0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pb-20 sm:pb-0">
        <CartProvider>
          {children}
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
