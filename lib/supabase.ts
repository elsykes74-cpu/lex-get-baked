import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey);

// ── Types ─────────────────────────────────────────────────────────────────────
export type DbMenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  emoji: string;
  color: string;
  image_url: string;
  featured: boolean;
  available: boolean;
  sensory_texture: number;
  sensory_sweetness: number;
  sensory_richness: number;
  sensory_aroma: number;
  notes: string[];
};

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export type DbOrder = {
  id: number;
  status: OrderStatus;
  delivery_type: string;
  customer_name: string;
  customer_email: string;
  delivery_address: string;
  special_notes: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  created_at: string;
};

export type OrderPayload = {
  delivery_type: string;
  customer_name: string;
  customer_email: string;
  delivery_address: string;
  special_notes: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  items: {
    menu_item_id?: number;
    item_name: string;
    item_price: number;
    quantity: number;
    size?: string;
  }[];
  custom?: {
    base: string;
    filling: string;
    finish: string;
    size: string;
    quantity: number;
    unit_price: number;
  };
};

// ── API helpers ───────────────────────────────────────────────────────────────
export async function fetchMenu(): Promise<DbMenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('available', true)
    .order('featured', { ascending: false })
    .order('category');
  if (error) throw error;
  return data ?? [];
}

export async function submitOrder(payload: OrderPayload): Promise<{ orderId: number }> {
  // Insert order
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert({
      delivery_type:    payload.delivery_type,
      customer_name:    payload.customer_name,
      customer_email:   payload.customer_email,
      delivery_address: payload.delivery_address,
      special_notes:    payload.special_notes,
      subtotal:         payload.subtotal,
      delivery_fee:     payload.delivery_fee,
      total:            payload.total,
    })
    .select('id')
    .single();
  if (orderErr || !order) throw orderErr ?? new Error('Order insert failed');

  // Insert line items
  if (payload.items.length > 0) {
    const { error: itemErr } = await supabase.from('order_items').insert(
      payload.items.map(i => ({ ...i, order_id: order.id }))
    );
    if (itemErr) throw itemErr;
  }

  // Insert custom order if present
  if (payload.custom) {
    const { error: custErr } = await supabase.from('custom_orders').insert({
      ...payload.custom,
      order_id: order.id,
    });
    if (custErr) throw custErr;
  }

  return { orderId: order.id };
}

export async function getOrderStatus(orderId: number): Promise<DbOrder> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();
  if (error) throw error;
  return data;
}
