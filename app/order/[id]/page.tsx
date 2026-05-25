'use client';
import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { getOrderStatus, type DbOrder, type OrderStatus } from '@/lib/supabase';

const STATUS_STEPS: { key: OrderStatus; label: string; icon: string }[] = [
  { key: 'pending',   label: 'Order Received', icon: '📋' },
  { key: 'confirmed', label: 'Confirmed',       icon: '✅' },
  { key: 'preparing', label: 'Being Baked',     icon: '👩‍🍳' },
  { key: 'ready',     label: 'Ready',           icon: '🎉' },
  { key: 'delivered', label: 'Delivered',       icon: '🚀' },
];

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending:   '#C4965A',
  confirmed: '#6B4E8C',
  preparing: '#C9748F',
  ready:     '#6B8C7A',
  delivered: '#9B7EBC',
  cancelled: '#666',
};

export default function OrderStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<DbOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getOrderStatus(Number(id));
        setOrder(data);
      } catch {
        setError('Order not found.');
      } finally {
        setLoading(false);
      }
    }
    load();
    // Poll every 30s for live status updates
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [id]);

  const activeStep = STATUS_STEPS.findIndex(s => s.key === order?.status);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-charcoal pt-24 pb-16 px-5">
        <div className="max-w-sm mx-auto">
          {loading && (
            <div className="text-center pt-20">
              <div className="w-8 h-8 border-2 border-rose/30 border-t-rose rounded-full animate-spin mx-auto mb-4" />
              <p className="text-cream/40 text-sm">Loading order…</p>
            </div>
          )}

          {error && (
            <div className="text-center pt-20">
              <p className="text-4xl mb-4">😕</p>
              <p className="text-cream/60 text-sm mb-6">{error}</p>
              <Link href="/" className="text-rose text-sm">← Back home</Link>
            </div>
          )}

          {order && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Header */}
              <div className="mb-8">
                <p className="text-[10px] tracking-widest text-rose uppercase mb-1">Order #{order.id}</p>
                <h1 className="font-display text-3xl italic text-cream">
                  {order.status === 'delivered' ? 'Delivered!' : 'On its way'}
                </h1>
                <p className="text-sm text-cream/40 mt-1">
                  {new Date(order.created_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>

              {/* Status timeline */}
              {order.status !== 'cancelled' && (
                <div className="glass rounded-3xl p-5 mb-5">
                  <div className="space-y-0">
                    {STATUS_STEPS.map((step, i) => {
                      const done    = i < activeStep;
                      const current = i === activeStep;
                      return (
                        <div key={step.key} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <motion.div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                              animate={{
                                background: done || current
                                  ? STATUS_COLOR[order.status]
                                  : 'rgba(255,255,255,0.06)',
                                scale: current ? 1.1 : 1,
                              }}
                              transition={{ duration: 0.4 }}
                            >
                              {done ? '✓' : step.icon}
                            </motion.div>
                            {i < STATUS_STEPS.length - 1 && (
                              <div className={`w-0.5 h-8 mt-1 rounded-full transition-colors duration-500 ${done ? 'bg-rose/60' : 'bg-white/10'}`} />
                            )}
                          </div>
                          <div className="pt-1.5 pb-6">
                            <p className={`text-sm font-medium transition-colors ${done || current ? 'text-cream' : 'text-cream/30'}`}>
                              {step.label}
                            </p>
                            {current && (
                              <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-xs text-rose mt-0.5"
                              >
                                In progress…
                              </motion.p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {order.status === 'cancelled' && (
                <div className="glass rounded-2xl p-5 mb-5 border border-red-500/20 text-center">
                  <p className="text-4xl mb-2">❌</p>
                  <p className="text-cream/60 text-sm">This order was cancelled.</p>
                </div>
              )}

              {/* Order summary */}
              <div className="glass rounded-2xl p-4 mb-5 space-y-2">
                <p className="text-[10px] tracking-widest text-cream/30 uppercase mb-3">Summary</p>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/50">Subtotal</span>
                  <span className="text-cream">${order.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/50">{order.delivery_type} delivery</span>
                  <span className="text-cream">{Number(order.delivery_fee) === 0 ? 'Free' : `$${order.delivery_fee}`}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-semibold">
                  <span className="text-cream">Total</span>
                  <span className="font-display text-lg text-gold">${order.total}</span>
                </div>
              </div>

              {/* Delivery info */}
              {order.delivery_address && (
                <div className="glass rounded-xl p-4 text-xs text-cream/50 mb-8">
                  <p className="font-medium text-cream/70 mb-1">{order.customer_name}</p>
                  <p>{order.delivery_address}</p>
                </div>
              )}

              <Link href="/menu" className="block text-center text-sm text-rose hover:text-rose-light transition-colors">
                Order more →
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
