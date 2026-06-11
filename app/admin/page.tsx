'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, RefreshCw, Package, ChefHat, DollarSign,
  Clock, CheckCircle, XCircle, Truck, ToggleLeft, ToggleRight,
  Camera, Upload, Check, X, Loader2, ImageOff, Plus, Pencil,
  Trash2, ChevronDown, MapPin, MessageSquare, ShoppingBag,
} from 'lucide-react';

const AdminCharts = dynamic(() => import('@/components/AdminCharts'), { ssr: false });
import { supabase, type DbOrder, type DbMenuItem } from '@/lib/supabase';

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: 'Pending',   color: '#C4965A', bg: 'rgba(196,150,90,0.12)'  },
  confirmed: { label: 'Confirmed', color: '#9B7EBC', bg: 'rgba(155,126,188,0.12)' },
  preparing: { label: 'Preparing', color: '#C9748F', bg: 'rgba(201,116,143,0.12)' },
  ready:     { label: 'Ready',     color: '#6B8C7A', bg: 'rgba(107,140,122,0.12)' },
  delivered: { label: 'Delivered', color: '#4CAF7D', bg: 'rgba(76,175,125,0.12)'  },
  cancelled: { label: 'Cancelled', color: '#888',    bg: 'rgba(128,128,128,0.10)' },
};

const NEXT_STATUS: Record<string, string> = {
  pending:   'confirmed',
  confirmed: 'preparing',
  preparing: 'ready',
  ready:     'delivered',
};

const CATEGORIES = ['cookie', 'brownie', 'cake', 'cupcake', 'bar', 'seasonal', 'custom', 'other'];

const BLANK_ITEM = { name: '', category: 'cookie', price: '', emoji: '🍪', description: '', available: true };

type Tab = 'orders' | 'menu';
type ItemForm = { name: string; category: string; price: string; emoji: string; description: string; available: boolean };

export default function AdminPage() {
  const [tab,          setTab]          = useState<Tab>('orders');
  const [allOrders,    setAllOrders]    = useState<DbOrder[]>([]);
  const [orders,       setOrders]       = useState<DbOrder[]>([]);
  const [menu,         setMenu]         = useState<DbMenuItem[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);

  // photo
  const [editingPhoto, setEditingPhoto] = useState<number | null>(null);
  const [uploading,    setUploading]    = useState(false);
  const [saved,        setSaved]        = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // item form (add / edit)
  const [itemModal,    setItemModal]    = useState<'add' | 'edit' | null>(null);
  const [editTarget,   setEditTarget]   = useState<DbMenuItem | null>(null);
  const [form,         setForm]         = useState<ItemForm>(BLANK_ITEM);
  const [saving,       setSaving]       = useState(false);
  const [formError,    setFormError]    = useState<string | null>(null);

  // delete
  const [confirmDel,   setConfirmDel]   = useState<number | null>(null);

  // order detail expand
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [orderItems,    setOrderItems]    = useState<Record<number, {item_name:string;quantity:number;item_price:number;size?:string}[]>>({});

  async function load() {
    setLoading(true);
    setError(null);
    try {
      // Always fetch all orders for charts/stats
      const { data: allData, error: allErr } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      if (allErr) throw allErr;
      setAllOrders(allData ?? []);
      setOrders((allData ?? []).slice(0, 50));

      if (tab === 'menu') {
        const { data, error: e } = await supabase
          .from('menu_items')
          .select('*')
          .order('category')
          .order('name');
        if (e) throw e;
        setMenu(data ?? []);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not connect to database');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [tab]);

  async function loadOrderItems(orderId: number) {
    if (orderItems[orderId]) return;
    const { data } = await supabase
      .from('order_items')
      .select('item_name,quantity,item_price,size')
      .eq('order_id', orderId);
    if (data) setOrderItems(prev => ({ ...prev, [orderId]: data }));
  }

  async function updateOrderStatus(id: number, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as DbOrder['status'] } : o));
  }

  async function toggleAvailable(id: number, available: boolean) {
    await supabase.from('menu_items').update({ available: !available }).eq('id', id);
    setMenu(prev => prev.map(i => i.id === id ? { ...i, available: !available } : i));
  }

  // ── Photo upload ──────────────────────────────────────────────────────────
  async function saveImageUrl(itemId: number, url: string) {
    await supabase.from('menu_items').update({ image_url: url }).eq('id', itemId);
    setMenu(prev => prev.map(i => i.id === itemId ? { ...i, image_url: url } : i));
    setSaved(itemId);
    setTimeout(() => setSaved(null), 2000);
    setEditingPhoto(null);
  }

  async function handleFileUpload(itemId: number, file: File) {
    setUploading(true);
    try {
      const ext  = file.name.split('.').pop() ?? 'jpg';
      const path = `item-${itemId}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('menu-images')
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { data: { publicUrl } } = supabase.storage.from('menu-images').getPublicUrl(path);
      await saveImageUrl(itemId, publicUrl);
    } catch (e) {
      console.error('Upload failed', e);
    } finally {
      setUploading(false);
    }
  }

  // ── Add / Edit item ───────────────────────────────────────────────────────
  function openAdd() {
    setForm(BLANK_ITEM);
    setFormError(null);
    setItemModal('add');
  }

  function openEdit(item: DbMenuItem) {
    setEditTarget(item);
    setForm({ name: item.name, category: item.category, price: String(item.price), emoji: item.emoji, description: item.description, available: item.available });
    setFormError(null);
    setItemModal('edit');
  }

  async function submitItem() {
    if (!form.name.trim()) { setFormError('Name is required'); return; }
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) { setFormError('Enter a valid price'); return; }
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        name:        form.name.trim(),
        category:    form.category,
        price,
        emoji:       form.emoji || '🍪',
        description: form.description.trim(),
        available:   form.available,
      };
      if (itemModal === 'add') {
        const { data, error: e } = await supabase.from('menu_items').insert({ ...payload, featured: false, color: '#F4F0F8', image_url: '', sensory_texture: 3, sensory_sweetness: 3, sensory_richness: 3, sensory_aroma: 3, notes: [] }).select().single();
        if (e) throw e;
        setMenu(prev => [...prev, data]);
      } else if (editTarget) {
        const { error: e } = await supabase.from('menu_items').update(payload).eq('id', editTarget.id);
        if (e) throw e;
        setMenu(prev => prev.map(i => i.id === editTarget.id ? { ...i, ...payload } : i));
      }
      setItemModal(null);
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(id: number) {
    await supabase.from('menu_items').delete().eq('id', id);
    setMenu(prev => prev.filter(i => i.id !== id));
    setConfirmDel(null);
  }

  // ── Stats ─────────────────────────────────────────────────────────────────
  const pendingCount   = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing' || o.status === 'confirmed').length;
  const revenue        = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total ?? 0), 0);

  // ── Item form modal ───────────────────────────────────────────────────────
  const ItemModal = () => (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(47,35,67,0.45)', backdropFilter: 'blur(8px)' }}>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass-card rounded-[28px] overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(47,35,67,0.07)' }}>
          <p className="text-[15px] font-bold text-plum">{itemModal === 'add' ? 'Add Menu Item' : 'Edit Item'}</p>
          <button onClick={() => setItemModal(null)} className="w-7 h-7 glass rounded-full flex items-center justify-center text-plum/40 hover:text-plum transition-colors">
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          {formError && <p className="text-[12px] text-red-500 bg-red-50 rounded-xl px-3 py-2">{formError}</p>}

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] tracking-widest uppercase font-bold text-muted block mb-1.5">Name *</label>
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Lavender Dream Cookie"
                className="w-full glass rounded-[12px] px-3 py-2.5 text-[13px] font-medium text-plum placeholder:text-plum/30 outline-none focus:ring-2 focus:ring-[#C9748F]/30"
              />
            </div>
            <div style={{ width: 72 }}>
              <label className="text-[10px] tracking-widest uppercase font-bold text-muted block mb-1.5">Emoji</label>
              <input
                value={form.emoji}
                onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}
                className="w-full glass rounded-[12px] px-3 py-2.5 text-[20px] text-center outline-none focus:ring-2 focus:ring-[#C9748F]/30"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] tracking-widest uppercase font-bold text-muted block mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full glass rounded-[12px] px-3 py-2.5 text-[13px] font-medium text-plum outline-none focus:ring-2 focus:ring-[#C9748F]/30 capitalize"
              >
                {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
              </select>
            </div>
            <div style={{ width: 100 }}>
              <label className="text-[10px] tracking-widest uppercase font-bold text-muted block mb-1.5">Price *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-plum/50 font-semibold">$</span>
                <input
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.25"
                  className="w-full glass rounded-[12px] pl-6 pr-3 py-2.5 text-[13px] font-medium text-plum outline-none focus:ring-2 focus:ring-[#C9748F]/30"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] tracking-widest uppercase font-bold text-muted block mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe the flavors, ingredients, or what makes it special…"
              rows={3}
              className="w-full glass rounded-[12px] px-3 py-2.5 text-[13px] font-medium text-plum placeholder:text-plum/30 outline-none focus:ring-2 focus:ring-[#C9748F]/30 resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setForm(f => ({ ...f, available: !f.available }))}
              className="flex items-center gap-2 text-[12px] font-bold transition-all px-4 py-2 rounded-full"
              style={{
                background: form.available ? 'rgba(76,175,125,0.12)' : 'rgba(224,92,92,0.10)',
                color: form.available ? '#4CAF7D' : '#E05C5C',
              }}
            >
              {form.available ? <ToggleRight size={15} strokeWidth={2} /> : <ToggleLeft size={15} strokeWidth={2} />}
              {form.available ? 'Available' : 'Unavailable'}
            </button>
          </div>
        </div>

        <div className="px-5 pb-5 flex gap-2">
          <button onClick={() => setItemModal(null)} className="flex-1 glass rounded-[14px] h-12 text-[13px] font-bold text-plum/60 hover:text-plum transition-colors">
            Cancel
          </button>
          <button
            onClick={submitItem}
            disabled={saving}
            className="flex-1 btn-primary rounded-[14px] h-12 text-[13px] font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} strokeWidth={2.5} />}
            {saving ? 'Saving…' : itemModal === 'add' ? 'Add Item' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-page-bg">

      {/* Top bar */}
      <div
        className="sticky top-0 z-40 px-4 sm:px-8"
        style={{
          background: 'rgba(244,240,248,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(47,35,67,0.06)',
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="glass flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-plum/65 hover:text-plum transition-all"
            >
              <ArrowLeft size={13} strokeWidth={2.5} />
              Back to Store
            </Link>
            <div className="h-4 w-px bg-plum/10" />
            <div>
              <span className="text-[11px] tracking-[0.16em] uppercase font-bold text-muted">Admin</span>
              <span className="text-[11px] text-plum/35 ml-2">Lex Get Baked</span>
            </div>
          </div>
          <button
            onClick={load}
            className="w-8 h-8 glass rounded-xl flex items-center justify-center text-plum/45 hover:text-plum transition-all"
            title="Refresh"
          >
            <RefreshCw size={13} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { Icon: Clock,      val: pendingCount,             label: 'Awaiting',   color: '#C4965A' },
            { Icon: ChefHat,    val: preparingCount,           label: 'In Kitchen', color: '#C9748F' },
            { Icon: DollarSign, val: `$${revenue.toFixed(0)}`, label: 'Revenue',    color: '#6B8C7A' },
          ].map(({ Icon, val, label, color }) => (
            <div key={label} className="glass-card rounded-[20px] overflow-hidden text-center">
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${color}44, ${color})` }} />
              <div className="p-4">
                <div className="w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={15} strokeWidth={2} style={{ color }} />
                </div>
                <p className="font-display text-[20px] font-bold text-plum leading-none">{val}</p>
                <p className="text-[10px] font-bold text-muted mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        {!loading && <AdminCharts orders={allOrders} />}

        {/* Tabs */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1 glass-card rounded-[16px] p-1 w-fit">
            {(['orders', 'menu'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-[12px] text-[13px] font-bold capitalize transition-all ${
                  tab === t ? 'btn-primary' : 'text-plum/50 hover:text-plum'
                }`}
                style={{ minHeight: '36px' }}
              >
                {t === 'orders' ? `Orders${pendingCount > 0 ? ` (${pendingCount})` : ''}` : 'Menu'}
              </button>
            ))}
          </div>
          {tab === 'menu' && (
            <button
              onClick={openAdd}
              className="btn-primary rounded-[14px] flex items-center gap-2 px-4 text-[13px] font-bold"
              style={{ height: '40px' }}
            >
              <Plus size={14} strokeWidth={2.5} />
              Add Item
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="glass-card rounded-[18px] p-4 mb-5 flex items-start gap-3 border border-red-200/50">
            <XCircle size={16} strokeWidth={2} style={{ color: '#E05C5C', flexShrink: 0, marginTop: 1 }} />
            <div>
              <p className="text-[13px] font-bold text-plum mb-0.5">Database offline</p>
              <p className="text-[12px] text-muted">{error}</p>
              <p className="text-[11px] text-muted mt-1">The Supabase project may be paused — resume it from your Supabase dashboard.</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center pt-16">
            <div className="w-7 h-7 rounded-full border-2 border-plum/10 border-t-plum/40 animate-spin" />
          </div>
        )}

        {/* ── Orders ── */}
        {!loading && tab === 'orders' && (
          <div className="space-y-3">
            {orders.length === 0 && !error && (
              <div className="glass-card rounded-[28px] p-16 text-center">
                <Package size={32} strokeWidth={1.4} className="mx-auto mb-3 text-plum/20" />
                <p className="text-[14px] font-semibold text-muted">No orders yet</p>
                <p className="text-[12px] text-plum/35 mt-1">Orders will appear here once customers check out</p>
              </div>
            )}
            {orders.map((order, i) => {
              const meta = STATUS_META[order.status] ?? STATUS_META.pending;
              const next = NEXT_STATUS[order.status];
              const expanded = expandedOrder === order.id;
              const items = orderItems[order.id];
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="glass-card rounded-[24px] overflow-hidden"
                >
                  <div className="h-0.5 w-full" style={{ background: meta.color }} />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-[14px] font-bold text-plum">#{String(order.id).padStart(4, '0')}</p>
                          <span
                            className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide"
                            style={{ background: meta.bg, color: meta.color }}
                          >
                            {meta.label}
                          </span>
                        </div>
                        <p className="text-[12px] font-semibold text-plum/70">
                          {order.customer_name || 'Anonymous'}
                          {order.customer_email && (
                            <span className="font-normal text-muted ml-1.5">· {order.customer_email}</span>
                          )}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-muted flex-wrap">
                          <span className="flex items-center gap-1"><Truck size={10} strokeWidth={2} />{order.delivery_type}</span>
                          <span className="flex items-center gap-1"><DollarSign size={10} strokeWidth={2} />${(order.total ?? 0).toFixed(2)}</span>
                          <span>{new Date(order.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (!expanded) loadOrderItems(order.id);
                          setExpandedOrder(expanded ? null : order.id);
                        }}
                        className="w-7 h-7 glass rounded-full flex items-center justify-center text-plum/40 hover:text-plum transition-all ml-2 flex-shrink-0"
                      >
                        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={13} strokeWidth={2.5} />
                        </motion.div>
                      </button>
                    </div>

                    {/* Expand: order details */}
                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="mb-3 pt-3" style={{ borderTop: '1px solid rgba(47,35,67,0.07)' }}>
                            {/* Items */}
                            {items && items.length > 0 && (
                              <div className="mb-3">
                                <p className="text-[10px] tracking-widest uppercase font-bold text-muted mb-2 flex items-center gap-1.5">
                                  <ShoppingBag size={9} strokeWidth={2.5} /> Items
                                </p>
                                <div className="space-y-1">
                                  {items.map((it, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-[12px]">
                                      <span className="text-plum/80 font-medium">
                                        {it.quantity}× {it.item_name}{it.size ? ` (${it.size})` : ''}
                                      </span>
                                      <span className="text-muted">${(it.item_price * it.quantity).toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {!items && <p className="text-[11px] text-muted mb-3">Loading items…</p>}

                            {/* Address */}
                            {order.delivery_address && (
                              <div className="mb-2">
                                <p className="text-[10px] tracking-widest uppercase font-bold text-muted mb-1 flex items-center gap-1.5">
                                  <MapPin size={9} strokeWidth={2.5} /> Delivery Address
                                </p>
                                <p className="text-[12px] text-plum/70">{order.delivery_address}</p>
                              </div>
                            )}

                            {/* Notes */}
                            {order.special_notes && (
                              <div>
                                <p className="text-[10px] tracking-widest uppercase font-bold text-muted mb-1 flex items-center gap-1.5">
                                  <MessageSquare size={9} strokeWidth={2.5} /> Notes
                                </p>
                                <p className="text-[12px] text-plum/70 italic">&ldquo;{order.special_notes}&rdquo;</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-2 flex-wrap items-center">
                      {next && (
                        <button
                          onClick={() => updateOrderStatus(order.id, next)}
                          className="btn-primary rounded-[12px] flex items-center gap-1.5 px-3.5"
                          style={{ height: '34px', fontSize: '12px' }}
                        >
                          <CheckCircle size={12} strokeWidth={2.5} />
                          Mark {STATUS_META[next]?.label}
                        </button>
                      )}
                      <div className="flex gap-1.5 flex-wrap">
                        {Object.keys(STATUS_META).filter(s => s !== order.status).map(s => (
                          <button
                            key={s}
                            onClick={() => updateOrderStatus(order.id, s)}
                            className="glass text-[10px] px-2.5 py-1 rounded-full font-semibold text-plum/50 hover:text-plum transition-colors capitalize"
                          >
                            {STATUS_META[s].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Menu Grid ── */}
        {!loading && tab === 'menu' && (
          <div>
            {menu.length === 0 && !error && (
              <div className="glass-card rounded-[28px] p-16 text-center">
                <ChefHat size={32} strokeWidth={1.4} className="mx-auto mb-3 text-plum/20" />
                <p className="text-[14px] font-semibold text-muted">No menu items</p>
                <p className="text-[12px] text-plum/35 mt-1">Click &ldquo;Add Item&rdquo; to get started</p>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file && editingPhoto) handleFileUpload(editingPhoto, file);
                e.target.value = '';
              }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {menu.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="glass-card rounded-[20px] overflow-hidden flex flex-col"
                >
                  {/* Photo area */}
                  <div
                    className="relative w-full flex items-center justify-center overflow-hidden"
                    style={{ height: 140, background: 'rgba(255,255,255,0.55)' }}
                  >
                    {item.image_url
                      ? <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      : <span style={{ fontSize: 52 }}>{item.emoji}</span>
                    }
                    {/* Available badge */}
                    <div
                      className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: item.available ? 'rgba(76,175,125,0.85)' : 'rgba(224,92,92,0.85)',
                        color: 'white',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {item.available ? 'Available' : 'Sold Out'}
                    </div>
                    {/* Action icons overlay */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      <button
                        onClick={() => editingPhoto === item.id ? setEditingPhoto(null) : (setEditingPhoto(item.id), setSaved(null))}
                        className="w-7 h-7 rounded-[8px] flex items-center justify-center transition-all"
                        title="Photo"
                        style={{
                          background: 'rgba(255,255,255,0.88)',
                          backdropFilter: 'blur(8px)',
                          color: saved === item.id ? '#4CAF7D' : editingPhoto === item.id ? '#C9748F' : 'rgba(47,35,67,0.6)',
                        }}
                      >
                        {saved === item.id ? <Check size={12} strokeWidth={2.5} /> : <Camera size={12} strokeWidth={2} />}
                      </button>
                      <button
                        onClick={() => openEdit(item)}
                        className="w-7 h-7 rounded-[8px] flex items-center justify-center transition-all"
                        title="Edit"
                        style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)', color: 'rgba(47,35,67,0.6)' }}
                      >
                        <Pencil size={11} strokeWidth={2} />
                      </button>
                      <button
                        onClick={() => setConfirmDel(item.id)}
                        className="w-7 h-7 rounded-[8px] flex items-center justify-center transition-all"
                        title="Delete"
                        style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)', color: 'rgba(224,92,92,0.7)' }}
                      >
                        <Trash2 size={11} strokeWidth={2} />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[13px] font-bold text-plum leading-tight mb-0.5">{item.name}</p>
                      <p className="text-[10px] text-muted capitalize">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[14px] font-bold text-plum">${item.price}</span>
                      <button
                        onClick={() => toggleAvailable(item.id, item.available)}
                        className="flex items-center gap-1 text-[10px] font-bold transition-all px-2 py-1 rounded-full"
                        style={{
                          background: item.available ? 'rgba(76,175,125,0.12)' : 'rgba(224,92,92,0.10)',
                          color: item.available ? '#4CAF7D' : '#E05C5C',
                        }}
                      >
                        {item.available
                          ? <ToggleRight size={12} strokeWidth={2} />
                          : <ToggleLeft  size={12} strokeWidth={2} />
                        }
                      </button>
                    </div>
                  </div>

                  {/* Photo upload panel */}
                  <AnimatePresence>
                    {editingPhoto === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-3 pb-3" style={{ borderTop: '1px solid rgba(47,35,67,0.07)' }}>
                          <button
                            onClick={() => fileRef.current?.click()}
                            disabled={uploading}
                            className="w-full btn-primary rounded-[10px] flex items-center justify-center gap-1.5 text-[11px] font-semibold mt-2 disabled:opacity-50"
                            style={{ height: '36px' }}
                          >
                            {uploading
                              ? <><Loader2 size={12} strokeWidth={2} className="animate-spin" /> Uploading…</>
                              : <><Upload size={12} strokeWidth={2} /> {item.image_url ? 'Replace' : 'Upload photo'}</>
                            }
                          </button>
                          {item.image_url && (
                            <button
                              onClick={() => saveImageUrl(item.id, '')}
                              className="w-full text-center text-[10px] text-plum/35 hover:text-red-400 transition-colors mt-1.5 flex items-center justify-center gap-1"
                            >
                              <X size={9} strokeWidth={2} /> Remove photo
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit modal */}
      <AnimatePresence>
        {itemModal && <ItemModal />}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {confirmDel !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(47,35,67,0.45)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="glass-card rounded-[24px] p-6 max-w-xs w-full text-center"
            >
              <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(224,92,92,0.10)' }}>
                <Trash2 size={20} strokeWidth={1.8} style={{ color: '#E05C5C' }} />
              </div>
              <p className="text-[15px] font-bold text-plum mb-1">Delete item?</p>
              <p className="text-[12px] text-muted mb-5">This cannot be undone.</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirmDel(null)} className="flex-1 glass rounded-[12px] h-10 text-[13px] font-bold text-plum/60 hover:text-plum transition-colors">
                  Cancel
                </button>
                <button onClick={() => deleteItem(confirmDel!)} className="flex-1 rounded-[12px] h-10 text-[13px] font-bold text-white transition-all" style={{ background: '#E05C5C' }}>
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
