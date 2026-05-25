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
  const [step, setStep] = useState<Step>('cart');
  const [delivery, setDelivery] = useState('standard');
  const [cart, setCart] = useState(SAMPLE_CART);
  const [form, setForm] = useState({ name: '', email: '', address: '', notes: '' });
  const [placed, setPlaced] = useState(false);

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
          <div className="flex gap-1 mb-8 glass-card rounded-2xl p-1">
            {(['cart', 'delivery', 'confirm'] as Step[]).map(s => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  step === s ? 'btn-iridescent shadow-btn' : 'text-white/50 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 'cart' && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.26 }}
              >
                <h1 className="font-display text-2xl italic text-white mb-6">Your Order</h1>

                {cart.length === 0 ? (
                  <div className="text-center py-16" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <p className="text-5xl mb-3">🛒</p>
                    <p className="text-sm">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                        <div className="text-2xl">{item.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            {item.size} · ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 glass rounded-full text-white/65 hover:text-white flex items-center justify-center text-sm"
                          >−</button>
                          <span className="text-sm font-semibold text-white w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 glass rounded-full text-white/65 hover:text-white flex items-center justify-center text-sm"
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
                  className={`w-full py-4 rounded-2xl text-sm font-semibold transition-all ${
                    cart.length > 0 ? 'btn-brand shadow-glow' : 'glass text-white/25 cursor-not-allowed'
                  }`}
                >
                  Continue to Delivery →
                </button>
              </motion.div>
            )}

            {step === 'delivery' && (
              <motion.div
                key="delivery"
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.26 }}
              >
                <h1 className="font-display text-2xl italic text-white mb-6">Delivery</h1>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {DELIVERY_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setDelivery(opt.id)}
                      className={`rounded-2xl p-4 text-left transition-all ${
                        delivery === opt.id ? 'btn-iridescent shadow-btn' : 'glass-card hover:scale-[1.02]'
                      }`}
                    >
                      <div className="text-xl mb-2">{opt.icon}</div>
                      <p className={`text-sm font-semibold ${delivery === opt.id ? 'text-plum' : 'text-white'}`}>
                        {opt.label}
                      </p>
                      <p className={`text-xs ${delivery === opt.id ? 'text-plum/60' : 'text-white/50'}`}>
                        {opt.eta}
                      </p>
                      <p className="text-xs font-bold mt-1 text-shimmer">
                        {opt.price === 0 ? 'Free' : `+$${opt.price}`}
                      </p>
                    </button>
                  ))}
                </div>

                {delivery !== 'pickup' && (
                  <div className="space-y-3 mb-6">
                    {[
                      { key: 'name',    placeholder: 'Full name',        type: 'text'  },
                      { key: 'email',   placeholder: 'Email address',    type: 'email' },
                      { key: 'address', placeholder: 'Delivery address', type: 'text'  },
                    ].map(({ key, placeholder, type }) => (
                      <input
                        key={key}
                        type={type}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full input-glass rounded-xl px-4 py-3 text-sm focus:outline-none"
                      />
                    ))}
                    <textarea
                      placeholder="Special instructions (optional)"
                      value={form.notes}
                      onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      className="w-full input-glass rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
                    />
                  </div>
                )}

                <button
                  onClick={() => setStep('confirm')}
                  className="w-full btn-brand py-4 rounded-2xl text-sm font-semibold shadow-glow"
                >
                  Review Order →
                </button>
              </motion.div>
            )}

            {step === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.26 }}
              >
                <h1 className="font-display text-2xl italic text-white mb-6">Confirm Order</h1>

                <div className="glass-card rounded-2xl p-5 mb-4 space-y-2.5">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span style={{ color: 'rgba(255,255,255,0.65)' }}>{item.emoji} {item.name} ×{item.qty}</span>
                      <span className="text-white font-semibold">${item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="pt-2.5 flex justify-between text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {DELIVERY_OPTIONS.find(d => d.id === delivery)?.icon}{' '}
                      {DELIVERY_OPTIONS.find(d => d.id === delivery)?.label}
                    </span>
                    <span className="text-white">{deliveryFee === 0 ? 'Free' : `$${deliveryFee}`}</span>
                  </div>
                  <div className="pt-2.5 flex justify-between font-bold" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                    <span className="text-white">Total</span>
                    <span className="font-display text-lg text-shimmer">${total}</span>
                  </div>
                </div>

                {form.address && (
                  <div className="glass rounded-xl p-4 mb-6 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <p className="font-semibold text-white/80 mb-0.5">{form.name}</p>
                    <p>{form.address}</p>
                    <p>{form.email}</p>
                  </div>
                )}

                <button
                  onClick={() => setPlaced(true)}
                  className="w-full btn-brand py-4 rounded-2xl text-sm font-semibold shadow-glow"
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
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 16, stiffness: 200 }}
      >
        <div className="text-7xl mb-6 animate-float-slow">🎉</div>
        <h1 className="font-display text-3xl italic text-white mb-2">Order Placed!</h1>
        <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Your baked goods are being crafted with love.
        </p>
        <p className="font-display text-lg text-shimmer mb-8">${total} confirmed</p>
        <div className="glass-card rounded-2xl p-5 text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.62)' }}>
          You&apos;ll receive a confirmation email with tracking details shortly.
        </div>
      </motion.div>
    </div>
  );
}
