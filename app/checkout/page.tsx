'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingBag, Truck, Check, ArrowRight, Package, Zap, Timer, Store, Cookie, Cake } from 'lucide-react';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

type Step = 'cart' | 'delivery' | 'confirm';

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard',  eta: '2–3 days',     price: 0,  Icon: Package, color: '#A89CC4' },
  { id: 'express',  label: 'Express',   eta: 'Next day',     price: 8,  Icon: Zap,     color: '#C9748F' },
  { id: 'quantum',  label: 'Quantum',   eta: '2 hours',      price: 18, Icon: Timer,   color: '#D4956A' },
  { id: 'pickup',   label: 'Pickup',    eta: 'Ready in 1hr', price: 0,  Icon: Store,   color: '#6B8C7A' },
];

const SAMPLE_CART = [
  { id: 1, name: 'Velvet Stuffed Cookie', size: 'Regular', price: 6,  qty: 2, Icon: Cookie, color: '#C9748F' },
  { id: 2, name: 'Rose Gold Mini Cake',   size: 'Single',  price: 12, qty: 1, Icon: Cake,   color: '#D4956A' },
];

export default function CheckoutPage() {
  const [step,     setStep]    = useState<Step>('cart');
  const [delivery, setDelivery]= useState('standard');
  const [cart,     setCart]    = useState(SAMPLE_CART);
  const [form,     setForm]    = useState({ name: '', email: '', address: '', notes: '' });
  const [placed,   setPlaced]  = useState(false);

  const subtotal    = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = DELIVERY_OPTIONS.find(d => d.id === delivery)?.price ?? 0;
  const total       = subtotal + deliveryFee;

  function updateQty(id: number, delta: number) {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
          .filter(i => i.qty > 0)
    );
  }

  if (placed) return <OrderConfirmation total={total} />;

  return (
    <>
      <NavBar />
      <div className="relative min-h-[100svh] bg-page-bg pt-[3.8rem] pb-28 sm:pb-14 px-4 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-md mx-auto">

          {/* Step tabs */}
          <div className="glass-card rounded-2xl p-1.5 flex gap-1 mb-7 mt-3">
            {(['cart', 'delivery', 'confirm'] as Step[]).map(s => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  step === s ? 'btn-iridescent shadow-btn' : 'text-plum/50 hover:text-plum'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ── Cart ─────────────────────────────────────────── */}
            {step === 'cart' && (
              <motion.div key="cart"
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.24 }}
              >
                <div className="glass-card rounded-3xl p-5 mb-4">
                  <p className="text-[9px] tracking-widest uppercase font-bold text-plum/45 mb-0.5">Review</p>
                  <h1 className="font-display text-2xl italic font-bold text-plum">Your Order</h1>
                </div>

                {cart.length === 0 ? (
                  <div className="glass-card rounded-3xl p-10 text-center">
                    <ShoppingBag size={40} strokeWidth={1.4} className="mx-auto mb-3 text-plum/28" />
                    <p className="text-sm font-semibold text-plum/55">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3 mb-5">
                    {cart.map(item => (
                      <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-3">
                        {/* Icon swatch — no emoji */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}18`, border: `1.5px solid ${item.color}30` }}
                        >
                          <item.Icon size={18} strokeWidth={1.6} style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-plum truncate">{item.name}</p>
                          <p className="text-xs font-medium text-plum/55">{item.size} · ${item.price} each</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 glass rounded-full text-plum/55 hover:text-plum flex items-center justify-center"
                          >
                            <Minus size={12} strokeWidth={2.5} />
                          </button>
                          <span className="text-sm font-bold text-plum w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 glass rounded-full text-plum/55 hover:text-plum flex items-center justify-center"
                          >
                            <Plus size={12} strokeWidth={2.5} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-shimmer w-10 text-right">
                          ${item.price * item.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setStep('delivery')}
                  disabled={cart.length === 0}
                  className={`w-full py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    cart.length > 0 ? 'btn-brand shadow-glow' : 'glass-card text-plum/30 cursor-not-allowed'
                  }`}
                >
                  Continue to Delivery
                  {cart.length > 0 && <ArrowRight size={15} strokeWidth={2.5} />}
                </button>
              </motion.div>
            )}

            {/* ── Delivery ─────────────────────────────────────── */}
            {step === 'delivery' && (
              <motion.div key="delivery"
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.24 }}
              >
                <div className="glass-card rounded-3xl p-5 mb-4">
                  <p className="text-[9px] tracking-widest uppercase font-bold text-plum/45 mb-0.5">How to receive it</p>
                  <h1 className="font-display text-2xl italic font-bold text-plum">Delivery</h1>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {DELIVERY_OPTIONS.map(opt => {
                    const active = delivery === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setDelivery(opt.id)}
                        className={`rounded-3xl p-4 text-left transition-all ${
                          active ? 'btn-iridescent shadow-btn' : 'glass-card hover:scale-[1.02]'
                        }`}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5"
                          style={{
                            background: active ? `${opt.color}22` : `${opt.color}14`,
                            border: `1.5px solid ${opt.color}${active ? '45' : '28'}`,
                          }}
                        >
                          <opt.Icon size={16} strokeWidth={1.8} style={{ color: opt.color }} />
                        </div>
                        <p className="text-sm font-bold text-plum">{opt.label}</p>
                        <p className="text-xs font-medium text-plum/55">{opt.eta}</p>
                        <p className="text-xs font-bold mt-1 text-shimmer">
                          {opt.price === 0 ? 'Free' : `+$${opt.price}`}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {delivery !== 'pickup' && (
                  <div className="glass-card rounded-3xl p-5 mb-5 space-y-3">
                    {[
                      { key: 'name',    placeholder: 'Full name',        type: 'text'  },
                      { key: 'email',   placeholder: 'Email address',    type: 'email' },
                      { key: 'address', placeholder: 'Delivery address', type: 'text'  },
                    ].map(({ key, placeholder, type }) => (
                      <input
                        key={key} type={type} placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full input-glass rounded-xl px-4 py-3 text-sm"
                      />
                    ))}
                    <textarea
                      placeholder="Special instructions (optional)"
                      value={form.notes}
                      onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      className="w-full input-glass rounded-xl px-4 py-3 text-sm resize-none"
                    />
                  </div>
                )}

                <button
                  onClick={() => setStep('confirm')}
                  className="w-full btn-brand py-4 rounded-2xl text-sm font-bold shadow-glow flex items-center justify-center gap-2"
                >
                  Review Order
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </motion.div>
            )}

            {/* ── Confirm ──────────────────────────────────────── */}
            {step === 'confirm' && (
              <motion.div key="confirm"
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.24 }}
              >
                <div className="glass-card rounded-3xl p-5 mb-4">
                  <p className="text-[9px] tracking-widest uppercase font-bold text-plum/45 mb-0.5">Almost there</p>
                  <h1 className="font-display text-2xl italic font-bold text-plum">Confirm Order</h1>
                </div>

                <div className="glass-card rounded-3xl p-5 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm py-2.5" style={{ borderBottom: '1px solid rgba(45,26,74,0.08)' }}>
                      <span className="text-plum/65 font-medium">{item.name} ×{item.qty}</span>
                      <span className="font-bold text-plum">${item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm py-2.5" style={{ borderBottom: '1px solid rgba(45,26,74,0.08)' }}>
                    <span className="font-medium text-plum/65 flex items-center gap-1.5">
                      <Truck size={13} strokeWidth={1.8} />
                      {DELIVERY_OPTIONS.find(d => d.id === delivery)?.label}
                    </span>
                    <span className="font-bold text-plum">{deliveryFee === 0 ? 'Free' : `$${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="font-bold text-plum">Total</span>
                    <span className="font-display text-xl font-bold text-shimmer">${total}</span>
                  </div>
                </div>

                {form.address && (
                  <div className="glass-card rounded-2xl p-4 mb-5 text-xs">
                    <p className="font-bold text-plum mb-0.5">{form.name}</p>
                    <p className="text-plum/60 font-medium">{form.address}</p>
                    <p className="text-plum/60 font-medium">{form.email}</p>
                  </div>
                )}

                <button
                  onClick={() => setPlaced(true)}
                  className="w-full btn-brand py-4 rounded-2xl text-sm font-bold shadow-glow flex items-center justify-center gap-2"
                >
                  <Check size={16} strokeWidth={2.5} />
                  Place Order · ${total}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function OrderConfirmation({ total }: { total: number }) {
  return (
    <div className="min-h-[100svh] bg-page-bg flex flex-col items-center justify-center px-6 text-center">
      <FloatingOrbs />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 16, stiffness: 200 }}
        className="relative z-10"
      >
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: 'linear-gradient(135deg, #A89CC4, #C9748F, #D4956A)',
            boxShadow: '0 8px 40px rgba(201,116,143,0.45)',
            animation: 'float 5s ease-in-out infinite',
          }}
        >
          <Check size={40} strokeWidth={2} style={{ color: 'white' }} />
        </div>
        <div className="glass-card rounded-3xl p-8 max-w-sm">
          <h1 className="font-display text-3xl italic font-bold text-plum mb-2">Order Placed!</h1>
          <p className="text-sm font-medium text-plum/65 mb-3">
            Your baked goods are being crafted with love.
          </p>
          <p className="font-display text-xl font-bold text-shimmer mb-5">${total} confirmed</p>
          <div className="divider-rg mb-5" />
          <p className="text-sm font-medium text-plum/58">
            You&apos;ll receive a confirmation email with tracking details shortly.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
