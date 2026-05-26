'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, ShoppingBag, Check, Sparkles } from 'lucide-react';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const STEPS = ['Base', 'Filling', 'Finish', 'Size', 'Review'];

/* Color swatch values replace emoji icons throughout */
const OPTIONS = {
  Base: [
    { id: 'classic',    label: 'Brown Butter',      swatch: '#C4845A', desc: 'Rich, nutty, caramelized', color: '#D4956A' },
    { id: 'matcha',     label: 'Ceremonial Matcha',  swatch: '#6B8C7A', desc: 'Earthy, slightly bitter',  color: '#6B8C7A' },
    { id: 'red-velvet', label: 'Red Velvet',          swatch: '#C93055', desc: 'Cocoa, tangy buttermilk',  color: '#C9748F' },
    { id: 'tahini',     label: 'Tahini Sesame',       swatch: '#C9A060', desc: 'Savory-sweet, nutty',      color: '#B87040' },
  ],
  Filling: [
    { id: 'nutella', label: 'Nutella Ganache', swatch: '#3C2018', desc: 'Dark & hazelnut',   color: '#3C2018' },
    { id: 'lychee',  label: 'Rose Lychee Jam', swatch: '#E8A4C0', desc: 'Floral, tropical',  color: '#C9748F' },
    { id: 'salted',  label: 'Salted Caramel',  swatch: '#D4956A', desc: 'Buttery, briny',    color: '#D4956A' },
    { id: 'none',    label: 'No Filling',      swatch: '#EDE8F8', desc: 'Pure & simple',     color: '#A89CC4' },
  ],
  Finish: [
    { id: 'sea-salt',  label: 'Fleur de Sel',  swatch: '#E8E4F8', desc: 'Crystalline crunch',  color: '#9B7EBC' },
    { id: 'gold-dust', label: 'Edible Gold',   swatch: '#D4956A', desc: 'Luminous, stunning',  color: '#D4956A' },
    { id: 'cocoa',     label: 'Cocoa Dusting', swatch: '#3C2018', desc: 'Deep, bitter accent',  color: '#3C2018' },
    { id: 'plain',     label: 'No Finish',     swatch: '#EDE8F8', desc: 'Classic, pure',        color: '#A89CC4' },
  ],
  Size: [
    { id: 'mini',  label: 'Mini 50g',    swatch: '#A89CC4', desc: 'One perfect bite — $4', color: '#9B7EBC', dot: 20 },
    { id: 'reg',   label: 'Regular 90g', swatch: '#C9748F', desc: 'The signature — $6',    color: '#C9748F', dot: 28 },
    { id: 'jumbo', label: 'Jumbo 150g',  swatch: '#D4956A', desc: 'Share-worthy — $9',     color: '#D4956A', dot: 36 },
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
      <div className="relative min-h-[100svh] bg-page-bg pt-[3.8rem] pb-28 sm:pb-14 px-4 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-md mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-7 mt-3">
            <p className="text-[9px] tracking-[0.16em] uppercase font-semibold mb-1 text-plum/55">Dessert Lab</p>
            <h1 className="font-display text-3xl italic font-bold text-white"
              style={{ textShadow: '0 2px 20px rgba(70,20,90,0.50), 0 1px 5px rgba(201,116,143,0.30)' }}
            >
              Craft Your<br />
              <span className="text-shimmer-pearl not-italic">Formulation</span>
            </h1>
          </motion.div>

          {/* Step progress */}
          <div className="glass-card rounded-2xl p-3 mb-6">
            <div className="flex gap-1.5 mb-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1 overflow-hidden" style={{ height: 3, borderRadius: 9999, background: 'rgba(45,26,74,0.10)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    animate={{ width: i <= step ? '100%' : '0%' }}
                    transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: i < step
                        ? 'linear-gradient(90deg, #A89CC4, #C9748F, #D4956A)'
                        : i === step ? 'linear-gradient(90deg, #C9748F, #D4956A)' : 'transparent',
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
                    color: i === step ? '#C9748F' : i < step ? 'rgba(45,26,74,0.65)' : 'rgba(45,26,74,0.30)',
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
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.24 }}
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

                {/* Size step: show proportional dot previews */}
                {currentStepKey === 'Size' ? (
                  <div className="grid grid-cols-3 gap-3">
                    {currentOptions?.map((opt: typeof currentOptions[0]) => {
                      const active = selections[currentStepKey] === opt.id;
                      const sizeDot = (opt as { dot?: number }).dot ?? 28;
                      return (
                        <motion.button
                          key={opt.id}
                          onClick={() => select(opt.id)}
                          whileTap={{ scale: 0.96 }}
                          className={`rounded-3xl p-4 text-left transition-all ${
                            active ? 'btn-iridescent shadow-btn' : 'glass-card hover:scale-[1.02]'
                          }`}
                        >
                          <div className="flex justify-center mb-3">
                            <div
                              className="rounded-full"
                              style={{
                                width: sizeDot, height: sizeDot,
                                background: `radial-gradient(circle at 35% 30%, ${opt.swatch}dd, ${opt.swatch}88)`,
                                boxShadow: `0 3px 10px ${opt.color}50`,
                              }}
                            />
                          </div>
                          <p className="text-[12px] font-bold text-plum leading-snug text-center">{opt.label}</p>
                          <p className="text-[10px] mt-0.5 font-medium text-plum/55 text-center">{opt.desc}</p>
                          {active && (
                            <div className="mt-2 flex justify-center">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: opt.color }}>
                                <Check size={10} strokeWidth={3} style={{ color: 'white' }} />
                              </div>
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {currentOptions?.map(opt => {
                      const active = selections[currentStepKey] === opt.id;
                      return (
                        <motion.button
                          key={opt.id}
                          onClick={() => select(opt.id)}
                          whileTap={{ scale: 0.96 }}
                          className={`rounded-3xl p-4 text-left transition-all ${
                            active ? 'btn-iridescent shadow-btn' : 'glass-card hover:scale-[1.02]'
                          }`}
                        >
                          {/* Color swatch — replaces emoji */}
                          <div
                            className="w-9 h-9 rounded-xl mb-2.5"
                            style={{
                              background: `radial-gradient(circle at 35% 30%, ${opt.swatch}ee, ${opt.swatch}88)`,
                              boxShadow: `0 3px 10px ${opt.color}44`,
                              border: `1.5px solid ${opt.swatch}60`,
                            }}
                          />
                          <p className="text-[13px] font-bold leading-snug text-plum">{opt.label}</p>
                          <p className="text-[11px] mt-0.5 font-medium text-plum/55">{opt.desc}</p>
                          {active && (
                            <div className="mt-2.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: opt.color }}>
                              <Check size={10} strokeWidth={3} style={{ color: 'white' }} />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
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
                  selections[currentStepKey] ? 'btn-brand shadow-glow' : 'glass-card text-plum/30 cursor-not-allowed'
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
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
      <div className="glass-card rounded-3xl p-6 mb-4">
        <p className="text-[9px] tracking-widest uppercase font-bold text-plum/45 mb-1">Your Creation</p>
        <h2 className="font-display text-xl font-bold text-plum mb-4">
          Here&apos;s what we&apos;ll{' '}
          <span className="text-shimmer italic">bake</span> for you.
        </h2>

        {/* Cookie preview — geometric, no emoji */}
        <div className="flex justify-center mb-5">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(212,149,106,0.25), rgba(255,245,230,0.85))',
              border: '3px solid rgba(212,149,106,0.42)',
              boxShadow: '0 8px 32px rgba(201,116,143,0.22), 0 0 0 1px rgba(255,255,255,0.65)',
            }}
          >
            {/* Cookie texture dots */}
            {[
              { top: '30%', left: '28%', size: 8 },
              { top: '55%', left: '60%', size: 6 },
              { top: '40%', left: '62%', size: 5 },
              { top: '65%', left: '30%', size: 7 },
            ].map((dot, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: dot.size, height: dot.size,
                  top: dot.top, left: dot.left,
                  background: 'rgba(60,32,24,0.55)',
                  boxShadow: '0 1px 3px rgba(60,32,24,0.3)',
                }}
              />
            ))}
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
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: (chosen as { swatch: string }).swatch }}
                  />
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
