'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';
import { MENU_ITEMS, CATEGORIES, type MenuItem } from '@/lib/menu-data';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const filtered = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(i => i.category === activeCategory);

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-charcoal pt-20 pb-12 px-5 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-lg mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="mb-8"
          >
            <p className="text-[10px] tracking-widest text-rose uppercase mb-1">Sensory Preview</p>
            <h1 className="font-display text-3xl italic text-cream">The Menu</h1>
            <p className="text-sm text-cream/40 mt-1">Tap any item to explore its full flavor profile.</p>
          </motion.div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide -mx-5 px-5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-rose text-white shadow-glow'
                    : 'glass text-cream/60 hover:text-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.28, delay: i * 0.05 }}
                  onClick={() => setSelected(item)}
                  className="glass rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.03] hover:shadow-glass active:scale-[0.97]"
                  style={{ borderColor: `${item.color}22` }}
                >
                  {/* Product image */}
                  <div className="relative h-[120px] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                    {item.featured && (
                      <div
                        className="absolute top-2 left-2 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: `${item.color}33`, color: item.color, border: `1px solid ${item.color}44` }}
                      >
                        Featured
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 text-lg">{item.emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="font-display text-sm text-cream leading-tight mb-1">{item.name}</p>
                    <p className="text-[11px] text-cream/40 mb-2 line-clamp-2">{item.desc}</p>

                    {/* Mini sensory bars */}
                    <div className="space-y-1 mb-2">
                      {(Object.entries(item.sensory) as [string, number][]).slice(0, 2).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-[9px] text-cream/30 w-10 capitalize">{key}</span>
                          <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${val}%`, background: item.color, opacity: 0.8 }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-cream/70">${item.price}</span>
                      <span className="text-[10px]" style={{ color: item.color }}>Preview →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Detail bottom sheet */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 inset-x-0 z-50 glass-dark rounded-t-3xl overflow-hidden max-h-[88vh]"
            >
              {/* Hero image */}
              <div className="relative h-[220px] w-full">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 glass w-8 h-8 rounded-full flex items-center justify-center text-cream/60 hover:text-cream"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h2 className="font-display text-2xl italic text-cream">{selected.name}</h2>
                    <span
                      className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{ background: `${selected.color}33`, color: selected.color }}
                    >
                      {selected.category}
                    </span>
                  </div>
                  <span className="font-display text-2xl text-gold">${selected.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 overflow-y-auto max-h-[calc(88vh-220px)]">
                <p className="text-sm text-cream/60 leading-relaxed mb-6">{selected.desc}</p>

                {/* Full sensory profile */}
                <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: selected.color }}>
                  Sensory Profile
                </p>
                <div className="space-y-3 mb-6">
                  {(Object.entries(selected.sensory) as [string, number][]).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs text-cream/50 w-16 capitalize">{key}</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          style={{ background: `linear-gradient(90deg, ${selected.color}, ${selected.color}88)` }}
                        />
                      </div>
                      <span className="text-xs text-cream/30 w-6 text-right">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Dietary notes */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.notes.map(n => (
                    <span key={n} className="text-[10px] glass px-3 py-1 rounded-full text-cream/50 capitalize">{n}</span>
                  ))}
                </div>

                <button className="w-full bg-brand-gradient py-4 rounded-2xl text-sm font-semibold text-white shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Add to Order — ${selected.price}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
