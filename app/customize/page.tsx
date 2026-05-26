'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, ShoppingBag, Check, Sparkles, Star } from 'lucide-react';
import NavBar from '@/components/NavBar';

const STEPS = ['Base', 'Filling', 'Finish', 'Size', 'Review'] as const;
type StepKey = 'Base' | 'Filling' | 'Finish' | 'Size';

const OPTIONS: Record<StepKey, { id: string; label: string; desc: string; color: string; emoji: string; tag?: string }[]> = {
  Base: [
    { id: 'classic',    label: 'Brown Butter',     desc: 'Rich, nutty, caramelized',  color: '#D4956A', emoji: '🟤', tag: 'Most Popular' },
    { id: 'matcha',     label: 'Ceremonial Matcha', desc: 'Earthy, slightly bitter',   color: '#6B8C7A', emoji: '🍵' },
    { id: 'red-velvet', label: 'Red Velvet',        desc: 'Cocoa, tangy buttermilk',   color: '#C9748F', emoji: '❤️' },
    { id: 'tahini',     label: 'Tahini Sesame',     desc: 'Savory-sweet, nutty',       color: '#B87040', emoji: '🌾' },
  ],
  Filling: [
    { id: 'nutella', label: 'Nutella Ganache',  desc: 'Dark & hazelnut',  color: '#6B4028', emoji: '🍫', tag: 'Best Seller' },
    { id: 'lychee',  label: 'Rose Lychee Jam',  desc: 'Floral, tropical', color: '#C9748F', emoji: '🌸' },
    { id: 'salted',  label: 'Salted Caramel',   desc: 'Buttery, briny',   color: '#D4956A', emoji: '🧂' },
    { id: 'none',    label: 'No Filling',       desc: 'Pure & simple',    color: '#9B7EBC', emoji: '🤍' },
  ],
  Finish: [
    { id: 'sea-salt',  label: 'Fleur de Sel', desc: 'Crystalline crunch', color: '#9B7EBC', emoji: '✨', tag: 'Chef\'s Pick' },
    { id: 'gold-dust', label: 'Edible Gold',  desc: 'Luminous, stunning', color: '#D4956A', emoji: '🌟' },
    { id: 'cocoa',     label: 'Cocoa Dusting',desc: 'Deep, bitter accent', color: '#6B4028', emoji: '🍂' },
    { id: 'plain',     label: 'No Finish',    desc: 'Classic, pure',      color: '#9B7EBC', emoji: '🫧' },
  ],
  Size: [
    { id: 'mini',  label: 'Mini 50g',    desc: 'One perfect bite',  color: '#9B7EBC', emoji: '🤏' },
    { id: 'reg',   label: 'Regular 90g', desc: 'The signature',     color: '#C9748F', emoji: '👌', tag: 'Most Ordered' },
    { id: 'jumbo', label: 'Jumbo 150g',  desc: 'Share-worthy',      color: '#D4956A', emoji: '🤲' },
  ],
};

const PRICE_MAP: Record<string, number> = { mini: 4, reg: 6, jumbo: 9 };

type Selections = Record<StepKey, string>;

function liveEmoji(s: Selections) {
  const base = { classic: '🟤', matcha: '🍵', 'red-velvet': '❤️', tahini: '🌾' }[s.Base];
  const fill = { nutella: '🍫', lychee: '🌸', salted: '🧂', none: '' }[s.Filling];
  const fin  = { 'sea-salt': '✨', 'gold-dust': '🌟', cocoa: '🍂', plain: '' }[s.Finish];
  return base || '🍪';
}

export default function CustomizePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Selections>({ Base: '', Filling: '', Finish: '', Size: '' });

  const currentStepKey = STEPS[step] as StepKey;
  const currentOptions = OPTIONS[currentStepKey];
  const isReview = STEPS[step] === 'Review';
  const price    = PRICE_MAP[selections.Size] ?? 6;

  function select(id: string) {
    setSelections(prev => ({ ...prev, [currentStepKey]: id }));
  }

  const completedSteps = Object.values(selections).filter(Boolean).length;

  return (
    <>
      <NavBar />
      <div className="relative min-h-[100svh] bg-page-bg pt-[4.5rem] pb-32 sm:pb-16 px-4">
        <div className="max-w-md mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-6 mt-4">
            <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">Dessert Lab</p>
            <h1 className="font-display text-[30px] italic font-bold text-plum leading-tight">
              Build Your<br />Custom Cookie
            </h1>
          </motion.div>

          {/* ── Live Preview ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-[24px] p-5 mb-5"
          >
            <div className="flex items-center gap-5">
              {/* Cookie orb */}
              <motion.div
                className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-[38px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(249,240,255,0.95))',
                  border: '2px solid rgba(212,149,106,0.30)',
                  boxShadow: '0 6px 24px rgba(201,116,143,0.16), 0 0 0 1px rgba(255,255,255,0.8)',
                }}
                animate={{
                  scale: completedSteps > 0 ? [1, 1.06, 1] : 1,
                  rotate: completedSteps > 0 ? [0, 5, -3, 0] : 0,
                }}
                transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
              >
                {liveEmoji(selections)}
              </motion.div>

              {/* Summary of selections */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] tracking-[0.14em] uppercase font-semibold text-muted mb-1.5">Your Creation</p>
                <div className="space-y-0.5">
                  {(['Base', 'Filling', 'Finish', 'Size'] as StepKey[]).map(key => {
                    const chosen = OPTIONS[key].find(o => o.id === selections[key]);
                    return (
                      <div key={key} className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-muted w-10">{key}</span>
                        <span className="text-[11px] font-semibold text-plum/70 truncate">
                          {chosen ? chosen.label : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="flex-shrink-0 text-right">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={price}
                    initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="font-display text-[22px] font-bold text-shimmer"
                  >
                    ${price}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[9px] font-semibold text-muted">per cookie</p>
              </div>
            </div>
          </motion.div>

          {/* ── Progress bar ─────────────────────────────────────────── */}
          <div className="glass-card rounded-[18px] p-3.5 mb-5">
            <div className="flex gap-1.5 mb-2">
              {STEPS.map((s, i) => (
                <div
                  key={s}
                  className="flex-1 overflow-hidden"
                  style={{ height: 4, borderRadius: 9999, background: 'rgba(47,35,67,0.08)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    animate={{ width: i <= step ? '100%' : '0%' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: i < step
                        ? 'linear-gradient(90deg, #9B7EBC, #C9748F, #D4956A)'
                        : i === step
                          ? 'linear-gradient(90deg, #C9748F, #D4956A)'
                          : 'transparent',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {STEPS.map((s, i) => (
                <span
                  key={s}
                  className="text-[9px] font-bold capitalize transition-colors"
                  style={{
                    color: i === step
                      ? '#C9748F'
                      : i < step
                        ? '#2F2343'
                        : 'rgba(47,35,67,0.28)',
                  }}
                >
                  {i < step ? '✓' : s}
                </span>
              ))}
            </div>
          </div>

          {/* ── Step content ─────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {!isReview ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="glass-card rounded-[22px] px-5 py-4 mb-4">
                  <p className="text-[9px] tracking-[0.14em] uppercase font-bold text-muted mb-0.5">
                    Step {step + 1} of {STEPS.length - 1}
                  </p>
                  <h2 className="font-display text-[20px] font-bold text-plum">
                    Choose your <em className="text-shimmer">{currentStepKey}</em>
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {currentOptions?.map(opt => {
                    const active = selections[currentStepKey] === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        onClick={() => select(opt.id)}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', damping: 18, stiffness: 320 }}
                        className={`rounded-[24px] p-4 text-left transition-all ${
                          active ? 'btn-iridescent' : 'glass-card hover:shadow-card-hover'
                        }`}
                        style={active ? {} : {}}
                      >
                        {/* Top row: emoji + tag */}
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className="w-10 h-10 rounded-[14px] flex items-center justify-center text-xl"
                            style={{
                              background: `${opt.color}15`,
                              border: `1.5px solid ${opt.color}28`,
                            }}
                          >
                            {opt.emoji}
                          </div>
                          {opt.tag && (
                            <span className="text-[8px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: `${opt.color}18`, color: opt.color }}>
                              {opt.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] font-bold text-plum leading-tight mb-0.5">{opt.label}</p>
                        <p className="text-[11px] font-medium text-muted">{opt.desc}</p>
                        {active && (
                          <div
                            className="mt-3 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: opt.color }}
                          >
                            <Check size={11} strokeWidth={3} style={{ color: 'white' }} />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <ReviewStep selections={selections} price={price} />
            )}
          </AnimatePresence>

          {/* ── Navigation ───────────────────────────────────────────── */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(s => s - 1)}
                className="glass-card flex items-center gap-1.5 px-5 py-3 rounded-[18px] text-[13px] font-bold text-plum/60 hover:text-plum transition-colors"
                style={{ minHeight: '52px' }}
              >
                <ArrowLeft size={14} strokeWidth={2.5} />
                Back
              </motion.button>
            )}

            {!isReview ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(s => s + 1)}
                disabled={!selections[currentStepKey]}
                className={`flex-1 rounded-[18px] text-[15px] font-bold transition-all flex items-center justify-center gap-2 ${
                  selections[currentStepKey]
                    ? 'btn-primary'
                    : 'glass-card text-plum/25 cursor-not-allowed'
                }`}
                style={{ minHeight: '52px' }}
              >
                {step === STEPS.length - 2 ? 'Review Order' : 'Continue'}
                {selections[currentStepKey] && <ArrowRight size={15} strokeWidth={2.5} />}
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push('/checkout')}
                className="flex-1 btn-brand rounded-[18px] text-[15px] font-bold flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} strokeWidth={2.2} />
                Add to Cart · ${price}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ReviewStep({ selections, price }: { selections: Selections; price: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
      <div className="glass-card rounded-[24px] p-6 mb-4">
        <p className="text-[9px] tracking-[0.16em] uppercase font-bold text-muted mb-1">Your Creation</p>
        <h2 className="font-display text-[20px] font-bold text-plum mb-5">
          Here's what we'll <em className="text-shimmer">bake</em> for you.
        </h2>

        <div className="space-y-2">
          {(['Base', 'Filling', 'Finish', 'Size'] as StepKey[]).map(key => {
            const chosen = OPTIONS[key].find(o => o.id === selections[key]);
            if (!chosen) return null;
            return (
              <div
                key={key}
                className="flex items-center justify-between py-3 px-4 rounded-[14px]"
                style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.85)' }}
              >
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider">{key}</span>
                <div className="flex items-center gap-2">
                  <span className="text-base">{chosen.emoji}</span>
                  <span className="text-[13px] font-bold text-plum">{chosen.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card rounded-[20px] p-5 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-semibold text-muted uppercase tracking-wider mb-1">Estimated Price</p>
          <span className="font-display text-[22px] font-bold text-shimmer">${price}</span>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted mb-1">
            <Sparkles size={11} strokeWidth={2} style={{ color: '#C9748F' }} />
            Made fresh to order
          </div>
          <div className="flex gap-0.5 justify-end">
            {[1,2,3,4,5].map(i => <Star key={i} size={9} fill="#D4956A" color="#D4956A" />)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
