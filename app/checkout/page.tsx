'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingBag, Truck, Check, ArrowRight, Shield, Clock } from 'lucide-react';
import NavBar from '@/components/NavBar';

type Step = 'cart' | 'delivery' | 'confirm';

const DELIVERY_OPTIONS = [
  { id: 'pickup',   label: 'Store Pickup', eta: 'Ready in 1hr',  price: 0,  icon: '🏪', note: 'Free' },
  { id: 'standard', label: 'Standard',     eta: '2–3 days',      price: 0,  icon: '📦', note: 'Free' },
  { id: 'express',  label: 'Express',      eta: 'Next day',      price: 8,  icon: '⚡', note: '+$8'  },
  { id: 'quantum',  label: 'Rush',         eta: '2 hours',       price: 18, icon: '🚀', note: '+$18' },
];

const SAMPLE_CART = [
  { id: 1, name: 'Velvet Stuffed Cookie', size: 'Regular', price: 6,  qty: 2, emoji: '🍪' },
  { id: 2, name: 'Rose Gold Mini Cake',   size: 'Single',  price: 12, qty: 1, emoji: '🎂' },
];

const STEP_LABELS: Step[] = ['cart', 'delivery', 'confirm'];
const STEP_NAMES = { cart: 'Cart', delivery: 'Delivery', confirm: 'Confirm' };

export default function CheckoutPage() {
  const [step,     setStep]    = useState<Step>('cart');
  const [delivery, setDelivery]= useState('pickup');
  const [cart,     setCart]    = useState(SAMPLE_CART);
  const [form,     setForm]    = useState({ name: '', email: '', address: '', notes: '' });
  const [placed,   setPlaced]  = useState(false);

  const subtotal    = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = DELIVERY_OPTIONS.find(d => d.id === delivery)?.price ?? 0;
  const tax         = +(subtotal * 0.0625).toFixed(2);
  const total       = subtotal + deliveryFee + tax;
  const eta         = DELIVERY_OPTIONS.find(d => d.id === delivery)?.eta ?? '—';

  function updateQty(id: number, delta: number) {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
          .filter(i => i.qty > 0)
    );
  }

  const stepIndex = STEP_LABELS.indexOf(step);

  if (placed) return <OrderConfirmation total={total} eta={eta} />;

  return (
    <>
      <NavBar />
      <div className="relative min-h-[100svh] bg-page-bg pt-[5.5rem] pb-32 sm:pb-16 px-4">
        <div className="max-w-md mx-auto">

          {/* ── Progress tabs ──────────────────────────────────────── */}
          <div className="mt-4 mb-7">
            {/* Progress line */}
            <div className="flex items-center mb-3">
              {STEP_LABELS.map((s, i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => stepIndex > i && setStep(s)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] transition-all ${
                      i < stepIndex
                        ? 'btn-iridescent'
                        : i === stepIndex
                          ? 'btn-primary'
                          : 'glass-card text-plum/30'
                    }`}
                    style={{ minHeight: '32px', minWidth: '32px' }}
                  >
                    {i < stepIndex ? <Check size={13} strokeWidth={3} /> : i + 1}
                  </button>
                  {i < 2 && (
                    <div className="flex-1 h-[2px] mx-2 rounded-full overflow-hidden" style={{ background: 'rgba(47,35,67,0.10)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        animate={{ width: i < stepIndex ? '100%' : '0%' }}
                        transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
                        style={{ background: 'linear-gradient(90deg, #9B7EBC, #C9748F, #D4956A)' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between px-0">
              {STEP_LABELS.map((s, i) => (
                <span key={s} className="text-[10px] font-bold" style={{ color: i === stepIndex ? '#C9748F' : 'rgba(47,35,67,0.38)' }}>
                  {STEP_NAMES[s]}
                </span>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">

            {/* ── Cart ──────────────────────────────────────────────── */}
            {step === 'cart' && (
              <motion.div key="cart"
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.24 }}
              >
                <div className="mb-4">
                  <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-1.5 text-muted">Review</p>
                  <h1 className="font-display text-[28px] italic font-bold text-plum">Your Order</h1>
                </div>

                {cart.length === 0 ? (
                  <div className="glass-card rounded-[28px] p-12 text-center">
                    <ShoppingBag size={36} strokeWidth={1.4} className="mx-auto mb-4 text-plum/20" />
                    <p className="text-[14px] font-semibold text-muted">Your cart is empty</p>
                    <p className="text-[12px] text-plum/40 mt-1">Add something delicious from the menu</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-5">
                      {cart.map(item => (
                        <motion.div
                          key={item.id}
                          layout
                          className="glass-card rounded-[22px] p-4 flex items-center gap-3.5"
                        >
                          <div
                            className="text-2xl w-11 h-11 flex items-center justify-center rounded-[14px] flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.9)' }}
                          >
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-bold text-plum truncate">{item.name}</p>
                            <p className="text-[11px] font-medium text-muted">{item.size} · ${item.price} each</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-7 h-7 glass rounded-full flex items-center justify-center text-plum/55 hover:text-plum transition-colors"
                            >
                              <Minus size={12} strokeWidth={2.5} />
                            </button>
                            <span className="text-[13px] font-bold text-plum w-4 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-7 h-7 glass rounded-full flex items-center justify-center text-plum/55 hover:text-plum transition-colors"
                            >
                              <Plus size={12} strokeWidth={2.5} />
                            </button>
                          </div>
                          <span className="text-[14px] font-bold text-plum w-10 text-right flex-shrink-0">
                            ${item.price * item.qty}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Order summary */}
                    <div className="glass-card rounded-[22px] p-5 mb-5">
                      <p className="text-[9px] tracking-[0.16em] uppercase font-bold text-muted mb-4">Order Summary</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[13px]">
                          <span className="text-muted font-medium">Subtotal</span>
                          <span className="font-bold text-plum">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                          <span className="text-muted font-medium">Delivery</span>
                          <span className="font-semibold text-plum/50">—</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                          <span className="text-muted font-medium">Tax (6.25%)</span>
                          <span className="font-bold text-plum">${tax.toFixed(2)}</span>
                        </div>
                        <div className="divider" />
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] font-bold text-plum">Estimated Total</span>
                          <span className="font-display text-[20px] font-bold text-shimmer">${(subtotal + tax).toFixed(2)}+</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  onClick={() => setStep('delivery')}
                  disabled={cart.length === 0}
                  className={`w-full rounded-[18px] h-14 text-[15px] font-bold transition-all flex items-center justify-center gap-2 ${
                    cart.length > 0 ? 'btn-primary' : 'glass-card text-plum/25 cursor-not-allowed'
                  }`}
                >
                  Continue to Delivery
                  {cart.length > 0 && <ArrowRight size={16} strokeWidth={2.5} />}
                </button>
              </motion.div>
            )}

            {/* ── Delivery ──────────────────────────────────────────── */}
            {step === 'delivery' && (
              <motion.div key="delivery"
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.24 }}
              >
                <div className="mb-5">
                  <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-1.5 text-muted">Fulfillment</p>
                  <h1 className="font-display text-[28px] italic font-bold text-plum">Delivery</h1>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {DELIVERY_OPTIONS.map(opt => (
                    <motion.button
                      key={opt.id}
                      onClick={() => setDelivery(opt.id)}
                      whileTap={{ scale: 0.97 }}
                      className={`rounded-[22px] p-4 text-left transition-all ${
                        delivery === opt.id ? 'btn-iridescent' : 'glass-card'
                      }`}
                    >
                      <div className="text-[22px] mb-2">{opt.icon}</div>
                      <p className="text-[13px] font-bold text-plum">{opt.label}</p>
                      <p className="text-[11px] font-medium text-muted mt-0.5">{opt.eta}</p>
                      <p className="text-[11px] font-bold mt-1" style={{ color: opt.price === 0 ? '#4CAF7D' : '#D4956A' }}>
                        {opt.note}
                      </p>
                    </motion.button>
                  ))}
                </div>

                {delivery !== 'pickup' && (
                  <div className="glass-card rounded-[22px] p-5 mb-5 space-y-3">
                    <p className="text-[10px] tracking-[0.14em] uppercase font-bold text-muted">Delivery Details</p>
                    {[
                      { key: 'name',    placeholder: 'Full name',        type: 'text'  },
                      { key: 'email',   placeholder: 'Email address',    type: 'email' },
                      { key: 'address', placeholder: 'Delivery address', type: 'text'  },
                    ].map(({ key, placeholder, type }) => (
                      <input
                        key={key} type={type} placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full input-glass rounded-[14px] px-4 py-3.5 text-[13px]"
                      />
                    ))}
                    <textarea
                      placeholder="Special instructions (optional)"
                      value={form.notes}
                      onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      className="w-full input-glass rounded-[14px] px-4 py-3.5 text-[13px] resize-none"
                    />
                  </div>
                )}

                <button
                  onClick={() => setStep('confirm')}
                  className="w-full btn-primary rounded-[18px] h-14 text-[15px] font-bold flex items-center justify-center gap-2"
                >
                  Review Order
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </motion.div>
            )}

            {/* ── Confirm ───────────────────────────────────────────── */}
            {step === 'confirm' && (
              <motion.div key="confirm"
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.24 }}
              >
                <div className="mb-5">
                  <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-1.5 text-muted">Almost there</p>
                  <h1 className="font-display text-[28px] italic font-bold text-plum">Confirm Order</h1>
                </div>

                <div className="glass-card rounded-[22px] p-5 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-[13px] py-3 border-b border-plum/[0.06] last:border-0">
                      <span className="text-muted font-medium">{item.emoji} {item.name} ×{item.qty}</span>
                      <span className="font-bold text-plum">${item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-[13px] py-3 border-b border-plum/[0.06]">
                    <span className="text-muted font-medium flex items-center gap-1.5">
                      <Truck size={13} strokeWidth={1.8} />
                      {DELIVERY_OPTIONS.find(d => d.id === delivery)?.label}
                    </span>
                    <span className="font-bold text-plum">{deliveryFee === 0 ? 'Free' : `$${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-[13px] py-3 border-b border-plum/[0.06]">
                    <span className="text-muted font-medium">Tax (6.25%)</span>
                    <span className="font-bold text-plum">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-[14px] font-bold text-plum">Total</span>
                    <span className="font-display text-[22px] font-bold text-shimmer">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Estimated ready time */}
                <div className="glass-card rounded-[18px] p-4 mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,149,106,0.15)' }}>
                    <Clock size={16} strokeWidth={2} style={{ color: '#D4956A' }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Estimated Ready</p>
                    <p className="text-[13px] font-bold text-plum">{eta}</p>
                  </div>
                </div>

                {form.address && (
                  <div className="glass-card rounded-[18px] p-4 mb-5">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Delivering to</p>
                    <p className="text-[13px] font-bold text-plum">{form.name}</p>
                    <p className="text-[12px] text-muted mt-0.5">{form.address}</p>
                    <p className="text-[12px] text-muted">{form.email}</p>
                  </div>
                )}

                {/* Secure badge */}
                <div className="flex items-center justify-center gap-2 mb-5">
                  <Shield size={13} strokeWidth={2} style={{ color: '#4CAF7D' }} />
                  <span className="text-[11px] font-semibold text-muted">Secure checkout · Encrypted · Trusted</span>
                </div>

                <button
                  onClick={() => setPlaced(true)}
                  className="w-full btn-primary rounded-[18px] h-14 text-[15px] font-bold flex items-center justify-center gap-2.5"
                >
                  <Check size={17} strokeWidth={2.5} />
                  Place Order · ${total.toFixed(2)}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function OrderConfirmation({ total, eta }: { total: number; eta: string }) {
  return (
    <div className="min-h-[100svh] bg-page-bg flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 18, stiffness: 220 }}
        className="w-full max-w-sm"
      >
        <motion.div
          className="w-20 h-20 rounded-[24px] mx-auto mb-7 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #4CAF7D, #45A070)',
            boxShadow: '0 8px 32px rgba(76,175,125,0.35)',
          }}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
        >
          <Check size={36} strokeWidth={2.5} style={{ color: 'white' }} />
        </motion.div>

        <h1 className="font-display text-[32px] italic font-bold text-plum mb-2">Order Placed!</h1>
        <p className="text-[14px] font-medium text-muted mb-8">Your baked goods are being crafted with love.</p>

        <div className="glass-card rounded-[24px] p-6 text-left mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[12px] font-bold text-muted uppercase tracking-wider">Order Total</p>
            <span className="font-display text-[20px] font-bold text-shimmer">${total.toFixed(2)}</span>
          </div>
          <div className="divider mb-4" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[12px] flex items-center justify-center"
              style={{ background: 'rgba(212,149,106,0.15)' }}>
              <Clock size={15} strokeWidth={2} style={{ color: '#D4956A' }} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Ready in</p>
              <p className="text-[13px] font-bold text-plum">{eta}</p>
            </div>
          </div>
        </div>

        <p className="text-[12px] font-medium text-muted leading-relaxed">
          You'll receive a confirmation email shortly from{' '}
          <span className="font-bold text-plum">hello@lexgetbaked.com</span>
        </p>
      </motion.div>
    </div>
  );
}
