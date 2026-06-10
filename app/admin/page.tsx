'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, RefreshCw, Package, ChefHat, DollarSign,
  Clock, CheckCircle, XCircle, Truck, ToggleLeft, ToggleRight,
  Camera, Upload, Check, X, Loader2, ImageOff,
} from 'lucide-react';
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

type Tab = 'orders' | 'menu';

export default function AdminPage() {
  const [tab,          setTab]          = useState<Tab>('orders');
  const [orders,       setOrders]       = useState<DbOrder[]>([]);
  const [menu,         setMenu]         = useState<DbMenuItem[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<number | null>(null);
  const [uploading,    setUploading]    = useState(false);
  const [saved,        setSaved]        = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      if (tab === 'orders') {
        const { data, error: e } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        if (e) throw e;
        setOrders(data ?? []);
      } else {
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

  async function updateOrderStatus(id: number, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as DbOrder['status'] } : o));
  }

  async function toggleAvailable(id: number, available: boolean) {
    await supabase.from('menu_items').update({ available: !available }).eq('id', id);
    setMenu(prev => prev.map(i => i.id === id ? { ...i, available: !available } : i));
  }

  function openPhotoEditor(item: DbMenuItem) {
    setEditingPhoto(item.id);
    setSaved(null);
  }

  function closePhotoEditor() {
    setEditingPhoto(null);
    setUrlInput('');
  }

  async function saveImageUrl(itemId: number, url: string) {
    await supabase.from('menu_items').update({ image_url: url }).eq('id', itemId);
    setMenu(prev => prev.map(i => i.id === itemId ? { ...i, image_url: url } : i));
    setSaved(itemId);
    setTimeout(() => setSaved(null), 2000);
    closePhotoEditor();
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
      const { data: { publicUrl } } = supabase.storage
        .from('menu-images')
        .getPublicUrl(path);
      await saveImageUrl(itemId, publicUrl);
    } catch (e) {
      console.error('Upload failed', e);
    } finally {
      setUploading(false);
    }
  }

  const pendingCount   = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing' || o.status === 'confirmed').length;
  const revenue        = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((s, o) => s + (o.total ?? 0), 0);

  return (
    <div className="min-h-screen bg-page-bg">

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-50 px-4 sm:px-8"
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

        {/* ── Stats row ───────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { Icon: Clock,       val: pendingCount,             label: 'Awaiting',   color: '#C4965A' },
            { Icon: ChefHat,     val: preparingCount,           label: 'In Kitchen', color: '#C9748F' },
            { Icon: DollarSign,  val: `$${revenue.toFixed(0)}`, label: 'Revenue',    color: '#6B8C7A' },
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

        {/* ── Tabs ────────────────────────────────────────────────── */}
        <div className="flex gap-1 glass-card rounded-[16px] p-1 mb-5 w-fit">
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

        {/* ── Error ───────────────────────────────────────────────── */}
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

        {/* ── Loading ─────────────────────────────────────────────── */}
        {loading && (
          <div className="flex justify-center pt-16">
            <div className="w-7 h-7 rounded-full border-2 border-plum/10 border-t-plum/40 animate-spin" />
          </div>
        )}

        {/* ── Orders ──────────────────────────────────────────────── */}
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
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-[14px] font-bold text-plum">
                            #{String(order.id).padStart(4, '0')}
                          </p>
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
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-muted">
                          <span className="flex items-center gap-1">
                            <Truck size={10} strokeWidth={2} />
                            {order.delivery_type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={10} strokeWidth={2} />
                            ${(order.total ?? 0).toFixed(2)}
                          </span>
                          <span>{new Date(order.created_at).toLocaleString('en-US', {
                            month: 'short', day: 'numeric',
                            hour: 'numeric', minute: '2-digit',
                          })}</span>
                        </div>
                      </div>
                    </div>
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

        {/* ── Menu ────────────────────────────────────────────────── */}
        {!loading && tab === 'menu' && (
          <div className="space-y-2">
            {menu.length === 0 && !error && (
              <div className="glass-card rounded-[28px] p-16 text-center">
                <ChefHat size={32} strokeWidth={1.4} className="mx-auto mb-3 text-plum/20" />
                <p className="text-[14px] font-semibold text-muted">No menu items</p>
              </div>
            )}

            {/* Hidden file input */}
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

            {menu.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.025 }}
                className="glass-card rounded-[18px] overflow-hidden"
              >
                {/* Main row */}
                <div className="px-4 py-3 flex items-center gap-3">
                  {/* Thumbnail / emoji */}
                  <div
                    className="w-10 h-10 rounded-[12px] flex-shrink-0 overflow-hidden flex items-center justify-center text-lg"
                    style={{ background: 'rgba(255,255,255,0.6)' }}
                  >
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      item.emoji
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-plum truncate">{item.name}</p>
                    <p className="text-[11px] text-muted capitalize">{item.category} · ${item.price}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Photo button */}
                    <button
                      onClick={() => editingPhoto === item.id ? closePhotoEditor() : openPhotoEditor(item)}
                      className="w-8 h-8 glass rounded-[10px] flex items-center justify-center transition-all"
                      title="Edit photo"
                      style={{
                        color: saved === item.id ? '#4CAF7D' : editingPhoto === item.id ? '#C9748F' : 'rgba(47,35,67,0.45)',
                      }}
                    >
                      {saved === item.id
                        ? <Check size={13} strokeWidth={2.5} />
                        : <Camera size={13} strokeWidth={2} />
                      }
                    </button>

                    {/* Available toggle */}
                    <button
                      onClick={() => toggleAvailable(item.id, item.available)}
                      className="flex items-center gap-1.5 text-[11px] font-bold transition-all px-3 py-1.5 rounded-full"
                      style={{
                        background: item.available ? 'rgba(76,175,125,0.12)' : 'rgba(224,92,92,0.10)',
                        color: item.available ? '#4CAF7D' : '#E05C5C',
                      }}
                    >
                      {item.available
                        ? <><ToggleRight size={14} strokeWidth={2} /> Available</>
                        : <><ToggleLeft  size={14} strokeWidth={2} /> Sold Out</>
                      }
                    </button>
                  </div>
                </div>

                {/* ── Photo editor ─────────────────────────────────── */}
                <AnimatePresence>
                  {editingPhoto === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="px-4 pb-4 pt-1"
                        style={{ borderTop: '1px solid rgba(47,35,67,0.07)' }}
                      >
                        <p className="text-[10px] tracking-[0.14em] uppercase font-bold text-muted mb-3 mt-2">
                          Photo
                        </p>

                        <div className="flex gap-3 items-start">
                          {/* Preview */}
                          <div
                            className="w-20 h-20 rounded-[14px] flex-shrink-0 overflow-hidden flex flex-col items-center justify-center"
                            style={{ background: 'rgba(255,255,255,0.7)', border: '1.5px dashed rgba(47,35,67,0.15)' }}
                          >
                            {item.image_url ? (
                              <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <>
                                <ImageOff size={18} strokeWidth={1.5} style={{ color: 'rgba(47,35,67,0.25)' }} />
                                <span className="text-[9px] text-plum/30 mt-1 font-medium">No photo</span>
                              </>
                            )}
                          </div>

                          <div className="flex-1 space-y-2">
                            {/* Upload button */}
                            <button
                              onClick={() => fileRef.current?.click()}
                              disabled={uploading}
                              className="w-full btn-primary rounded-[12px] flex items-center justify-center gap-2 text-[12px] font-semibold transition-all disabled:opacity-50"
                              style={{ height: '44px' }}
                            >
                              {uploading
                                ? <><Loader2 size={14} strokeWidth={2} className="animate-spin" /> Uploading…</>
                                : <><Upload size={14} strokeWidth={2} /> {item.image_url ? 'Replace photo' : 'Upload photo'}</>
                              }
                            </button>

                            {/* Remove photo */}
                            {item.image_url && (
                              <button
                                onClick={() => saveImageUrl(item.id, '')}
                                className="text-[11px] text-plum/35 hover:text-red-400 transition-colors flex items-center gap-1"
                              >
                                <X size={10} strokeWidth={2} /> Remove photo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
