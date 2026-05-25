'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const CATEGORIES = ['All', 'Cookies', 'Cakes', 'Seasonal', 'Vegan'];

const MENU_ITEMS = [
  {
    id: 1, name: 'Velvet Stuffed Cookie',  category: 'Cookies', price: 6,
    desc: 'Thick, chewy, filled with Nutella ganache. Crisp edges, gooey center.',
    emoji: '🍪', color: '#C9748F', notes: ['gluten-free option', 'nut-free option'],
    sensory: { texture: 90, sweetness: 75, richness: 85, aroma: 80 },
  },
  {
    id: 2, name: 'Rose Gold Mini Cake',    category: 'Cakes', price: 12,
    desc: 'Three-layer vanilla sponge, rose lychee compote, champagne buttercream.',
    emoji: '🎂', color: '#C4965A', notes: ['contains gluten', 'contains dairy'],
    sensory: { texture: 85, sweetness: 80, richness: 70, aroma: 95 },
  },
  {
    id: 3, name: 'Lavender Crème Brûlée', category: 'Seasonal', price: 9,
    desc: 'House-made lavender custard, caramelized sugar crust, edible florals.',
    emoji: '🫙', color: '#9B7EBC', notes: ['seasonal', 'contains eggs'],
    sensory: { texture: 75, sweetness: 65, richness: 90, aroma: 100 },
  },
  {
    id: 4, name: 'Brown Butter Financier', category: 'Cakes', price: 5,
    desc: 'French almond cake, noisette brown butter, fleur de sel finish.',
    emoji: '🧁', color: '#C4965A', notes: ['contains nuts', 'contains gluten'],
    sensory: { texture: 80, sweetness: 60, richness: 95, aroma: 85 },
  },
  {
    id: 5, name: 'Matcha Cloud Cookie',    category: 'Cookies', price: 6,
    desc: 'Ceremonial grade matcha, white chocolate chips, sea salt.',
    emoji: '🍵', color: '#6B8C7A', notes: ['vegan option'],
    sensory: { texture: 85, sweetness: 55, richness: 65, aroma: 90 },
  },
  {
    id: 6, name: 'Tahini Date Blondie',    category: 'Vegan', price: 7,
    desc: '100% plant-based, medjool dates, sesame tahini, toasted walnut.',
    emoji: '🟫', color: '#C4965A', notes: ['vegan', 'refined sugar-free'],
    sensory: { texture: 70, sweetness: 70, richness: 80, aroma: 75 },
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState<typeof MENU_ITEMS[0] | null>(null);

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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <p className="text-[10px] tracking-widest text-rose uppercase mb-1">Sensory Preview</p>
            <h1 className="font-display text-3xl italic text-cream">The Menu</h1>
            <p className="text-sm text-cream/40 mt-1">Each profile shows texture, sweetness, richness & aroma.</p>
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
              {filtered.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelected(item)}
                  className="glass rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.03] hover:shadow-glass active:scale-[0.97]"
                  style={{ borderColor: `${item.color}22` }}
                >
                  <div className="text-3xl mb-3 text-center">{item.emoji}</div>
                  <p className="font-display text-sm text-cream leading-tight mb-1">{item.name}</p>
                  <p className="text-xs text-cream/40 mb-3 line-clamp-2">{item.desc}</p>
                  {/* Mini sensory bars */}
                  <div className="space-y-1">
                    {Object.entries(item.sensory).slice(0, 2).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-[9px] text-cream/30 w-12 capitalize">{key}</span>
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${val}%`, background: item.color, opacity: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-cream/70">${item.price}</span>
                    <span className="text-[10px] text-rose">Preview →</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── DETAIL SHEET ─────────────────────────────────────────── */}
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
              className="fixed bottom-0 inset-x-0 z-50 glass-dark rounded-t-3xl p-6 pb-10 max-h-[80vh] overflow-y-auto"
            >
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />
              <div className="text-5xl text-center mb-4">{selected.emoji}</div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-display text-2xl italic text-cream">{selected.name}</h2>
                <span className="text-lg font-semibold text-gold">${selected.price}</span>
              </div>
              <p className="text-sm text-cream/60 leading-relaxed mb-6">{selected.desc}</p>

              {/* Full sensory profile */}
              <p className="text-[10px] tracking-widest text-rose/70 uppercase mb-3">Sensory Profile</p>
              <div className="space-y-3 mb-6">
                {Object.entries(selected.sensory).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-cream/50 w-16 capitalize">{key}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${val}%` }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ background: `linear-gradient(90deg, ${selected.color}, ${selected.color}99)` }}
                      />
                    </div>
                    <span className="text-xs text-cream/30 w-6 text-right">{val}</span>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.notes.map(n => (
                  <span key={n} className="text-[10px] glass px-3 py-1 rounded-full text-cream/50 capitalize">{n}</span>
                ))}
              </div>

              <button className="w-full bg-brand-gradient py-4 rounded-2xl text-sm font-semibold text-white shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98]">
                Add to Order
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
