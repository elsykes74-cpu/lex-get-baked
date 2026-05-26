'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, ShoppingBag, Check, Sparkles } from 'lucide-react';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const STEPS = ['Base', 'Filling', 'Finish', 'Size', 'Review'];

const OPTIONS = {
  Base: [
    { id: 'classic',    label: 'Brown Butter',      emoji: '🟤', desc: 'Rich, nutty, caramelized', color: '#D4956A' },
    { id: 'matcha',     label: 'Ceremonial Matcha',  emoji: '🍵', desc: 'Earthy, slightly bitter',  color: '#6B8C7A' },
    { id: 'red-velvet', label: 'Red Velvet',          emoji: '❤️', desc: 'Cocoa, tangy buttermilk',  color: '#C9748F' },
    { id: 'tahini',     label: 'Tahini Sesame',       emoji: '🌾', desc: 'Savory-sweet, nutty',      color: '#B87040' },
  ],
  Filling: [
    { id: 'nutella', label: 'Nutella Ganache', emoji: '🍫', desc: 'Dark & hazelnut',   color: '#3C2018' },
    { id: 'lychee',  label: 'Rose Lychee Jam', emoji: '🌸', desc: 'Floral, tropical',  color: '#C9748F' },
    { id: 'salted',  label: 'Salted Caramel',  emoji: '🧂', desc: 'Buttery, briny',    color: '#D4956A' },
    { id: 'none',    label: 'No Filling',      emoji: '🤍', desc: 'Pure & simple',     color: '#A89CC4' },
  ],
  Finish: [
    { id: 'sea-salt',  label: 'Fleur de Sel',  emoji: '✨', desc: 'Crystalline crunch',  color: '#9B7EBC' },
    { id: 'gold-dust', label: 'Edible Gold',   emoji: '🌟', desc: 'Luminous, stunning',  color: '#D4956A' },
    { id: 'cocoa',     label: 'Cocoa Dusting', emoji: '🍂', desc: 'Deep, bitter accent',  color: '#3C2018' },
    { id: 'plain',     label: 'No Finish',     emoji: '🫧', desc: 'Classic, pure',        color: '#A89CC4' },
  ],
  Size: [
    { id: 'mini',  label: 'Mini 50g',    emoji: '🤏', desc: 'One perfect bite — $4', color: '#9B7EBC' },
    { id: 'reg',   label: 'Regular 90g', emoji: '👌', desc: 'The signature — $6',    color: '#C9748F' },
    { id: 'jumbo', label: 'Jumbo 150g',  emoji: '🤲', desc: 'Share-worthy — $9',     color: '#D4956A' },
  ],
};

type StepKey = keyof typeof OPTIONS;
type Selections = Record<StepKey, string>;

export default function CustomizePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Selections>({
    Base: '', Filling: '', Finish: '', Size: '',
  });

  const currentStepKey = STEPS[step] as StepKey;
  const currentOptions  = OPTIONS[currentStepKey];
  const isReview        = STEPS[step] === 'Review';

  function select(id: string) {
    setSelections(prev => ({ ...prev, [currentStepKey]: id }));
  }

  return (
    <>
      <NavBar />
      <div className="relative min-h-[100svh] bg-page-bg pt-[4.5rem] pb-28 sm:pb-14 px-4 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-md mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-7 mt-3">
            <p className="text-[9px] tracking-[0.16em] uppercase font-semibold mb-1 text-plum/55">Dessert Lab</p>
            <h1 className="font-display text-3xl italic font-bold text-white" style={{ textShadow: '0 2px 12px rgba(10,4,36,0.28)' }}>
              Craft Your<br />
              <span className="text-shimmer-pearl not-italic">Formulation</span>
            </h1>
          </motion.div>

          {/* Step progress */}
          <div className="glass-card rounded-2xl p-3 mb-6">
            <div className="flex gap-1.5 mb-2">
              {STEPS.map((s, i) => (
                <div
                  key={s}
                  className="flex-1 overflow-hidden"
                  style={{ height: 3, borderRadius: 9999, background: 'rgba(45,26,74,0.10)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    animate={{ width: i <= step ? '100%' : '0%' }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: i < step
                        ? 'linear-gradient(90deg, #A89CC4, #C9748F, #D4956A)'
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
                        ? 'rgba(45,26,74,0.65)'
                        : 'rgba(45,26,74,0.30)',
                  }}
                >
                  {i < step ? '✓' : s}
                </span>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isReview ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.26 }}
              >
                <div className="glass-card rounded-3xl p-5 mb-4">
                  <p className="text-[9px] tracking-[0.15em] uppercase font-bold text-plum/45 mb-1">
                    Step {step + 1} of {STEPS.length - 1}
                  </p>
                  <h2 className="font-display text-xl font-bold text-plum">
                    Choose your{' '}
                    <span className="text-shimmer italic">{currentStepKey}</span>
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
                        className={`rounded-3xl p-4 text-left transition-all ${
                          active ? 'btn-iridescent shadow-btn' : 'glass-card hover:scale-[1.02] hover:shadow-card'
                        }`}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-xl mb-2.5"
                          style={{
                            background: `${opt.color}18`,
                            border: `1.5px solid ${opt.color}30`,
                          }}
                        >
                          {opt.emoji}
                        </div>
                        <p className="text-[13px] font-bold leading-snug text-plum">{opt.label}</p>
                        <p className="text-[11px] mt-0.5 font-medium text-plum/55">{opt.desc}</p>
                        {active && (
                          <div
                            className="mt-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: opt.color }}
                          >
                            <Check size={10} strokeWidth={3} style={{ color: 'white' }} />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <ReviewStep selections={selections} />
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-1.5 glass-card px-5 py-3.5 rounded-2xl text-sm font-bold text-plum/65 hover:text-plum transition-colors"
              >
                <ArrowLeft size={14} strokeWidth={2.5} />
                Back
              </button>
            )}
            {!isReview ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!selections[currentStepKey]}
                className={`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  selections[currentStepKey]
                    ? 'btn-brand shadow-glow'
                    : 'glass-card text-plum/30 cursor-not-allowed'
                }`}
              >
                {step === STEPS.length - 2 ? 'Review Order' : 'Continue'}
                {selections[currentStepKey] && <ArrowRight size={14} strokeWidth={2.5} />}
              </button>
            ) : (
              <button
                onClick={() => router.push('/checkout')}
                className="flex-1 btn-brand py-3.5 rounded-2xl text-sm font-bold shadow-glow flex items-center justify-center gap-2"
              >
                <ShoppingBag size={15} strokeWidth={2.2} />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ReviewStep({ selections }: { selections: Selections }) {
  const allOptions = Object.entries(OPTIONS) as [StepKey, typeof OPTIONS[StepKey]][];
  const priceMap: Record<string, number> = { mini: 4, reg: 6, jumbo: 9 };
  const price = priceMap[selections.Size] ?? 6;

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
      <div className="glass-card rounded-3xl p-6 mb-4">
        <p className="text-[9px] tracking-widest uppercase font-bold text-plum/45 mb-1">Your Creation</p>
        <h2 className="font-display text-xl font-bold text-plum mb-4">
          Here&apos;s what we&apos;ll{' '}
          <span className="text-shimmer italic">bake</span> for you.
        </h2>

        {/* Preview cookie orb */}
        <div className="flex justify-center mb-5">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,245,230,0.85))',
              border: '3px solid rgba(212,149,106,0.42)',
              boxShadow: '0 8px 32px rgba(201,116,143,0.22), 0 0 0 1px rgba(255,255,255,0.65)',
            }}
          >
            🍪
          </div>
        </div>

        <div className="space-y-2">
          {allOptions.map(([stepKey, opts]) => {
            const chosen = opts.find(o => o.id === selections[stepKey]);
            if (!chosen) return null;
            return (
              <div
                key={stepKey}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.48)', border: '1px solid rgba(255,255,255,0.65)' }}
              >
                <span className="text-[10px] font-bold text-plum/45 uppercase tracking-wide">{stepKey}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{chosen.emoji}</span>
                  <span className="text-[13px] font-bold text-plum">{chosen.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-plum/45 uppercase tracking-wide mb-0.5">Est. Price</p>
          <span className="font-display text-xl font-bold text-shimmer">${price}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-plum/55">
          <Sparkles size={11} strokeWidth={2} style={{ color: '#C9748F' }} />
          Made fresh to order
        </div>
      </div>
    </motion.div>
  );
}
