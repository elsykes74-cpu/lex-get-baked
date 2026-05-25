'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const STEPS = ['Base', 'Filling', 'Finish', 'Size', 'Review'];

const OPTIONS = {
  Base: [
    { id: 'classic',    label: 'Brown Butter',     emoji: '🟤', desc: 'Rich, nutty, caramelized' },
    { id: 'matcha',     label: 'Ceremonial Matcha', emoji: '🍵', desc: 'Earthy, slightly bitter'  },
    { id: 'red-velvet', label: 'Red Velvet',        emoji: '❤️', desc: 'Cocoa, tangy buttermilk'  },
    { id: 'tahini',     label: 'Tahini Sesame',     emoji: '🌾', desc: 'Savory-sweet, nutty'      },
  ],
  Filling: [
    { id: 'nutella', label: 'Nutella Ganache', emoji: '🍫', desc: 'Dark & hazelnut'   },
    { id: 'lychee',  label: 'Rose Lychee Jam', emoji: '🌸', desc: 'Floral, tropical'  },
    { id: 'salted',  label: 'Salted Caramel',  emoji: '🧂', desc: 'Buttery, briny'    },
    { id: 'none',    label: 'No Filling',      emoji: '🤍', desc: 'Pure & simple'     },
  ],
  Finish: [
    { id: 'sea-salt',  label: 'Fleur de Sel',  emoji: '✨', desc: 'Crystalline crunch' },
    { id: 'gold-dust', label: 'Edible Gold',   emoji: '🌟', desc: 'Luminous, stunning' },
    { id: 'cocoa',     label: 'Cocoa Dusting', emoji: '🍂', desc: 'Deep, bitter accent' },
    { id: 'plain',     label: 'No Finish',     emoji: '🫧', desc: 'Classic, pure'       },
  ],
  Size: [
    { id: 'mini',  label: 'Mini 50g',    emoji: '🤏', desc: 'One perfect bite — $4' },
    { id: 'reg',   label: 'Regular 90g', emoji: '👌', desc: 'The signature — $6'    },
    { id: 'jumbo', label: 'Jumbo 150g',  emoji: '🤲', desc: 'Share-worthy — $9'     },
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
  const isReview       = STEPS[step] === 'Review';

  function select(id: string) {
    setSelections(prev => ({ ...prev, [currentStepKey]: id }));
  }

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-page-bg pt-20 pb-28 px-5 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-md mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="text-[9px] tracking-[0.15em] uppercase font-semibold mb-1 text-plum/55">Dessert Lab</p>
            <h1 className="font-display text-3xl italic text-white mb-0.5" style={{ textShadow: '0 2px 12px rgba(10,4,36,0.28)' }}>
              Craft Custom<br />Formulation
            </h1>
          </motion.div>

          {/* Progress bar */}
          <div className="glass-card rounded-2xl p-1 flex gap-1 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(45,26,74,0.1)' }}>
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: i <= step ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: 'linear-gradient(90deg, #A89CC4, #C9748F, #D4956A)' }}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!isReview ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -22 }}
                transition={{ duration: 0.28 }}
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
                        <div className="text-2xl mb-2.5">{opt.emoji}</div>
                        <p className={`text-sm font-bold leading-snug ${active ? 'text-plum' : 'text-plum'}`}>
                          {opt.label}
                        </p>
                        <p className={`text-[11px] mt-0.5 font-medium ${active ? 'text-plum/62' : 'text-plum/55'}`}>
                          {opt.desc}
                        </p>
                        {active && (
                          <div
                            className="mt-2.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                            style={{ background: '#C9748F' }}
                          >✓</div>
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
                className="flex-1 glass-card py-3.5 rounded-2xl text-sm font-bold text-plum/65 hover:text-plum transition-colors"
              >
                ← Back
              </button>
            )}
            {!isReview ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!selections[currentStepKey]}
                className={`flex-[2] py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  selections[currentStepKey]
                    ? 'btn-brand shadow-glow'
                    : 'glass-card text-plum/30 cursor-not-allowed'
                }`}
              >
                {step === STEPS.length - 2 ? 'Review Order' : 'Continue →'}
              </button>
            ) : (
              <button
                onClick={() => router.push('/checkout')}
                className="flex-[2] btn-brand py-3.5 rounded-2xl text-sm font-bold shadow-glow"
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
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="glass-card rounded-3xl p-6 mb-4">
        <p className="text-[9px] tracking-widest uppercase font-bold text-plum/45 mb-1">Your Creation</p>
        <h2 className="font-display text-xl font-bold text-plum mb-4">
          Here&apos;s what we&apos;ll{' '}
          <span className="text-shimmer italic">bake</span> for you.
        </h2>
        <div className="text-5xl text-center mb-5 animate-float-slow">🍪</div>
        <div className="space-y-3">
          {allOptions.map(([stepKey, opts]) => {
            const chosen = opts.find(o => o.id === selections[stepKey]);
            return (
              <div key={stepKey} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(45,26,74,0.08)' }}>
                <span className="text-xs font-semibold text-plum/45">{stepKey}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{chosen?.emoji}</span>
                  <span className="text-sm font-bold text-plum">{chosen?.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-plum/55">Est. price</span>
        <span className="font-display text-lg font-bold text-shimmer">$6 – $9</span>
      </div>
    </motion.div>
  );
}
