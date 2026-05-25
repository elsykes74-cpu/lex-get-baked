'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

type Step = 'cart' | 'delivery' | 'confirm';

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard',  eta: '2–3 days',    price: 0,  icon: '📦' },
  { id: 'express',  label: 'Express',   eta: 'Next day',    price: 8,  icon: '⚡' },
  { id: 'quantum',  label: 'Quantum',   eta: '2 hours',     price: 18, icon: '🚀' },
  { id: 'pickup',   label: 'Pickup',    eta: 'Ready in 1hr', price: 0, icon: '🏪' },
];

const SAMPLE_CART = [
  { id: 1, name: 'Velvet Stuffed Cookie', size: 'Regular', price: 6,  qty: 2, emoji: '🍪' },
  { id: 2, name: 'Rose Gold Mini Cake',   size: 'Single',  price: 12, qty: 1, emoji: '🎂' },
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
      <div className="relative min-h-screen bg-page-bg pt-20 pb-28 px-5 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-md mx-auto">

          {/* Step tabs */}
          <div className="glass-card rounded-2xl p-1.5 flex gap-1 mb-8">
            {(['cart', 'delivery', 'confirm'] as Step[]).map(s => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  step === s ? 'btn-iridescent shadow-btn' : 'text-plum/55 hover:text-plum'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 'cart' && (
              <motion.div key="cart"
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.26 }}
              >
                <div className="glass-card rounded-3xl p-5 mb-5">
                  <p className="text-[9px] tracking-widest uppercase font-bold text-plum/45 mb-1">Review</p>
                  <h1 className="font-display text-2xl italic font-bold text-plum">Your Order</h1>
                </div>

                {cart.length === 0 ? (
                  <div className="glass-card rounded-3xl p-10 text-center">
                    <p className="text-5xl mb-3">🛒</p>
                    <p className="text-sm font-semibold text-plum/55">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-3">
                        <div className="text-2xl">{item.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-plum truncate">{item.name}</p>
                          <p className="text-xs font-medium text-plum/55">{item.size} · ${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 glass rounded-full text-plum/60 hover:text-plum font-bold flex items-center justify-center text-sm"
                          >−</button>
                          <span className="text-sm font-bold text-plum w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 glass rounded-full text-plum/60 hover:text-plum font-bold flex items-center justify-center text-sm"
                          >+</button>
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
                  className={`w-full py-4 rounded-2xl text-sm font-bold transition-all ${
                    cart.length > 0 ? 'btn-brand shadow-glow' : 'glass-card text-plum/30 cursor-not-allowed'
                  }`}
                >
                  Continue to Delivery →
                </button>
              </motion.div>
            )}

            {step === 'delivery' && (
              <motion.div key="delivery"
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.26 }}
              >
                <div className="glass-card rounded-3xl p-5 mb-5">
                  <p className="text-[9px] tracking-widest uppercase font-bold text-plum/45 mb-1">How to receive it</p>
                  <h1 className="font-display text-2xl italic font-bold text-plum">Delivery</h1>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {DELIVERY_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setDelivery(opt.id)}
                      className={`rounded-3xl p-4 text-left transition-all ${
                        delivery === opt.id ? 'btn-iridescent shadow-btn' : 'glass-card hover:scale-[1.02]'
                      }`}
                    >
                      <div className="text-xl mb-2">{opt.icon}</div>
                      <p className="text-sm font-bold text-plum">{opt.label}</p>
                      <p className="text-xs font-medium text-plum/55">{opt.eta}</p>
                      <p className="text-xs font-bold mt-1 text-shimmer">
                        {opt.price === 0 ? 'Free' : `+$${opt.price}`}
                      </p>
                    </button>
                  ))}
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
                  className="w-full btn-brand py-4 rounded-2xl text-sm font-bold shadow-glow"
                >
                  Review Order →
                </button>
              </motion.div>
            )}

            {step === 'confirm' && (
              <motion.div key="confirm"
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.26 }}
              >
                <div className="glass-card rounded-3xl p-5 mb-5">
                  <p className="text-[9px] tracking-widest uppercase font-bold text-plum/45 mb-1">Almost there</p>
                  <h1 className="font-display text-2xl italic font-bold text-plum">Confirm Order</h1>
                </div>

                <div className="glass-card rounded-3xl p-5 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm py-2" style={{ borderBottom: '1px solid rgba(45,26,74,0.08)' }}>
                      <span className="text-plum/65 font-medium">{item.emoji} {item.name} ×{item.qty}</span>
                      <span className="font-bold text-plum">${item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm py-2.5" style={{ borderBottom: '1px solid rgba(45,26,74,0.08)' }}>
                    <span className="font-medium text-plum/65">
                      {DELIVERY_OPTIONS.find(d => d.id === delivery)?.icon}{' '}
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
                  className="w-full btn-brand py-4 rounded-2xl text-sm font-bold shadow-glow"
                >
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
    <div className="min-h-screen bg-page-bg flex flex-col items-center justify-center px-6 text-center">
      <FloatingOrbs />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 16, stiffness: 200 }}
        className="relative z-10"
      >
        <div className="text-7xl mb-6 animate-float-slow">🎉</div>
        <div className="glass-card rounded-3xl p-8 max-w-sm">
          <h1 className="font-display text-3xl italic font-bold text-plum mb-2">Order Placed!</h1>
          <p className="text-sm text-plum/65 font-medium mb-3">
            Your baked goods are being crafted with love.
          </p>
          <p className="font-display text-xl font-bold text-shimmer mb-5">${total} confirmed</p>
          <div className="divider-rg mb-5" />
          <p className="text-sm text-plum/58 font-medium">
            You&apos;ll receive a confirmation email with tracking details shortly.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
