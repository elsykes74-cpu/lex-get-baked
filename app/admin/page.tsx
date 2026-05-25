'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase, type DbOrder, type DbMenuItem } from '@/lib/supabase';

const STATUS_COLORS: Record<string, string> = {
  pending:   '#C4965A',
  confirmed: '#6B4E8C',
  preparing: '#C9748F',
  ready:     '#6B8C7A',
  delivered: '#9B7EBC',
  cancelled: '#666',
};

export default function AdminPage() {
  const [tab, setTab] = useState<'orders' | 'menu'>('orders');
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [menu, setMenu] = useState<DbMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (tab === 'orders') {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        setOrders(data ?? []);
      } else {
        const { data } = await supabase
          .from('menu_items')
          .select('*')
          .order('category')
          .order('name');
        setMenu(data ?? []);
      }
      setLoading(false);
    }
    load();
  }, [tab]);

  async function updateOrderStatus(id: number, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as DbOrder['status'] } : o));
  }

  async function toggleAvailable(id: number, available: boolean) {
    await supabase.from('menu_items').update({ available: !available }).eq('id', id);
    setMenu(prev => prev.map(i => i.id === id ? { ...i, available: !available } : i));
  }

  return (
    <div className="min-h-screen bg-page-bg text-cream p-5 pt-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-[10px] tracking-widest text-rose uppercase mb-1">Dashboard</p>
          <h1 className="font-display text-3xl italic text-cream">Admin Panel</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 glass rounded-xl p-1 mb-6 w-fit">
          {(['orders', 'menu'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                tab === t ? 'bg-brand-gradient text-white' : 'text-cream/50 hover:text-cream'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center pt-20">
            <div className="w-8 h-8 border-2 border-rose/30 border-t-rose rounded-full animate-spin" />
          </div>
        ) : tab === 'orders' ? (
          <div className="space-y-3">
            {orders.length === 0 && <p className="text-cream/30 text-sm text-center pt-12">No orders yet.</p>}
            {orders.map(order => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-cream">#{order.id} — {order.customer_name || 'Anonymous'}</p>
                    <p className="text-xs text-cream/40">{new Date(order.created_at).toLocaleString()}</p>
                    <p className="text-xs text-cream/40">{order.delivery_type} · ${order.total}</p>
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide"
                    style={{ background: `${STATUS_COLORS[order.status]}22`, color: STATUS_COLORS[order.status] }}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['confirmed','preparing','ready','delivered','cancelled'].map(s => (
                    <button
                      key={s}
                      onClick={() => updateOrderStatus(order.id, s)}
                      disabled={order.status === s}
                      className={`text-[10px] px-2.5 py-1 rounded-full transition-all capitalize ${
                        order.status === s
                          ? 'bg-white/10 text-cream/40'
                          : 'glass text-cream/60 hover:text-cream'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {menu.map(item => (
              <div key={item.id} className="glass rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-cream">{item.name}</p>
                    <p className="text-xs text-cream/40">{item.category} · ${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleAvailable(item.id, item.available)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    item.available
                      ? 'bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400'
                      : 'bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400'
                  }`}
                >
                  {item.available ? 'Available' : 'Sold out'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
