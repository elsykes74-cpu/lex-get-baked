'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const STEPS = ['Base', 'Filling', 'Finish', 'Size', 'Review'];

const OPTIONS = {
  Base: [
    { id: 'classic',    label: 'Classic Brown Butter', emoji: '🟤', desc: 'Rich, nutty, caramelized' },
    { id: 'matcha',     label: 'Ceremonial Matcha',    emoji: '🟢', desc: 'Earthy, slightly bitter' },
    { id: 'red-velvet', label: 'Red Velvet',           emoji: '🔴', desc: 'Cocoa, tangy buttermilk' },
    { id: 'tahini',     label: 'Tahini Sesame',        emoji: '🟡', desc: 'Savory-sweet, nutty' },
  ],
  Filling: [
    { id: 'nutella',    label: 'Nutella Ganache',      emoji: '🍫', desc: 'Dark & hazelnut' },
    { id: 'lychee',     label: 'Rose Lychee Jam',      emoji: '🌸', desc: 'Floral, tropical' },
    { id: 'salted',     label: 'Salted Caramel',       emoji: '🧂', desc: 'Buttery, briny, sweet' },
    { id: 'none',       label: 'No Filling',           emoji: '⬜', desc: 'Pure & simple' },
  ],
  Finish: [
    { id: 'sea-salt',   label: 'Fleur de Sel',         emoji: '✨', desc: 'Subtle crystalline crunch' },
    { id: 'gold-dust',  label: 'Edible Gold Dust',     emoji: '🌟', desc: 'Luminous, showstopping' },
    { id: 'cocoa',      label: 'Dutch Cocoa Dusting',  emoji: '🍂', desc: 'Deep, bitter accent' },
    { id: 'plain',      label: 'No Finish',            emoji: '🤍', desc: 'Classic, unadorned' },
  ],
  Size: [
    { id: 'mini',   label: 'Mini (50g)',   emoji: '🤏', desc: 'One perfect bite — $4' },
    { id: 'reg',    label: 'Regular (90g)',emoji: '👌', desc: 'The signature size — $6' },
    { id: 'jumbo',  label: 'Jumbo (150g)', emoji: '🤲', desc: 'Share-worthy — $9' },
  ],
};

type StepKey = keyof typeof OPTIONS;

export default function CustomizePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<StepKey, string>>({
    Base: '', Filling: '', Finish: '', Size: '',
  });

  const currentStepKey = STEPS[step] as StepKey;
  const currentOptions = OPTIONS[currentStepKey];
  const isReview = STEPS[step] === 'Review';

  const allSelected = Object.values(selections).every(Boolean);

  function select(id: string) {
    setSelections(prev => ({ ...prev, [currentStepKey]: id }));
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1);
  }
  function back() {
    if (step > 0) setStep(s => s - 1);
  }

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-charcoal pt-20 pb-16 px-5 overflow-hidden">
        <FloatingOrbs />

        <div className="relative z-10 max-w-md mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="text-[10px] tracking-widest text-gold uppercase mb-1">Build Your Order</p>
            <h1 className="font-display text-3xl italic text-cream">Craft Custom<br />Formulation</h1>
          </motion.div>

          {/* Step indicators */}
          <div className="flex items-center gap-1 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1 flex-1">
                <div
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i <= step ? 'bg-brand-gradient' : 'bg-white/10'
                  }`}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!isReview ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-display text-xl text-cream mb-1">
                  Choose your <span className="text-rose italic">{currentStepKey}</span>
                </h2>
                <p className="text-xs text-cream/40 mb-5">Step {step + 1} of {STEPS.length - 1}</p>

                <div className="grid grid-cols-2 gap-3">
                  {currentOptions?.map(opt => {
                    const isActive = selections[currentStepKey] === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        onClick={() => select(opt.id)}
                        whileTap={{ scale: 0.96 }}
                        className={`glass rounded-2xl p-4 text-left transition-all ${
                          isActive
                            ? 'border-rose/60 bg-rose/10 shadow-glow'
                            : 'border-white/8 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className="text-2xl mb-2">{opt.emoji}</div>
                        <p className="text-sm font-medium text-cream leading-tight">{opt.label}</p>
                        <p className="text-[11px] text-cream/40 mt-0.5">{opt.desc}</p>
                        {isActive && (
                          <div className="mt-2 w-4 h-4 rounded-full bg-rose flex items-center justify-center">
                            <span className="text-[9px] text-white">✓</span>
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

          {/* Nav buttons */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={back}
                className="flex-1 glass py-4 rounded-2xl text-sm font-medium text-cream/60 hover:text-cream transition-colors"
              >
                ← Back
              </button>
            )}
            {!isReview ? (
              <button
                onClick={next}
                disabled={!selections[currentStepKey]}
                className={`flex-[2] py-4 rounded-2xl text-sm font-semibold transition-all ${
                  selections[currentStepKey]
                    ? 'bg-brand-gradient text-white shadow-glow hover:scale-[1.02]'
                    : 'bg-white/5 text-cream/20 cursor-not-allowed'
                }`}
              >
                {step === STEPS.length - 2 ? 'Review Order' : 'Continue →'}
              </button>
            ) : (
              <button
                onClick={() => router.push('/checkout')}
                className="flex-[2] bg-brand-gradient py-4 rounded-2xl text-sm font-semibold text-white shadow-glow hover:scale-[1.02] transition-all"
              >
                Add to Cart →
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ReviewStep({ selections }: { selections: Record<StepKey, string> }) {
  const allOptions = Object.entries(OPTIONS) as [StepKey, typeof OPTIONS[StepKey]][];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="font-display text-xl text-cream mb-1">
        Your <span className="text-gold italic">Creation</span>
      </h2>
      <p className="text-xs text-cream/40 mb-6">Here&apos;s what we&apos;ll bake for you.</p>

      {/* Preview card */}
      <div className="glass rounded-3xl p-6 mb-6 border border-gold/20">
        <div className="text-4xl text-center mb-4">🍪</div>
        <div className="space-y-3">
          {allOptions.map(([stepKey, opts]) => {
            const chosen = opts.find(o => o.id === selections[stepKey]);
            return (
              <div key={stepKey} className="flex items-center justify-between">
                <span className="text-xs text-cream/40">{stepKey}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{chosen?.emoji}</span>
                  <span className="text-xs font-medium text-cream">{chosen?.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-2xl p-4 flex items-center justify-between">
        <span className="text-sm text-cream/60">Est. price</span>
        <span className="font-display text-lg text-gold">$6 – $9</span>
      </div>
    </motion.div>
  );
}
