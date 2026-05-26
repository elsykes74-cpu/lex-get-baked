'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, X, Check, ShoppingBag } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { MENU_ITEMS, CATEGORIES, type MenuItem } from '@/lib/menu-data';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected]             = useState<MenuItem | null>(null);
  const [added, setAdded]                   = useState<number[]>([]);

  const filtered = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(i => i.category === activeCategory);

  function handleQuickAdd(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    e.preventDefault();
    setAdded(prev => [...prev, id]);
    setTimeout(() => setAdded(prev => prev.filter(x => x !== id)), 1800);
  }

  return (
    <>
      <NavBar />
      <div className="relative min-h-[100svh] bg-page-bg pt-[4.5rem] pb-32 sm:pb-16 px-4">
        <div className="max-w-lg mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }} className="mb-8 mt-4"
          >
            <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">
              Sensory Preview
            </p>
            <h1 className="font-display text-[32px] italic font-bold text-plum mb-1.5">
              The Menu
            </h1>
            <p className="text-[14px] font-medium text-muted">
              Tap any item to explore its full flavor profile.
            </p>
          </motion.div>

          {/* Category pills — floating segmented control */}
          <div className="sticky top-[62px] z-20 -mx-4 px-4 pb-4 pt-1"
            style={{ background: 'linear-gradient(to bottom, rgba(244,240,248,0.95) 80%, transparent)' }}
          >
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map(cat => {
                const count = cat === 'All' ? MENU_ITEMS.length : MENU_ITEMS.filter(i => i.category === cat).length;
                const active = activeCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold transition-all ${
                      active ? 'btn-primary' : 'glass-card text-plum/60 hover:text-plum'
                    }`}
                    style={active ? { minHeight: '36px' } : { minHeight: '36px' }}
                  >
                    {cat}
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                      style={{
                        background: active ? 'rgba(255,255,255,0.18)' : 'rgba(47,35,67,0.08)',
                        color: active ? 'rgba(255,255,255,0.75)' : 'rgba(47,35,67,0.45)',
                      }}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 gap-3.5">
            <AnimatePresence>
              {filtered.map((item, i) => {
                const isAdded = added.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -8 }}
                    transition={{ duration: 0.26, delay: i * 0.04 }}
                    onClick={() => setSelected(item)}
                    className="glass-card rounded-[28px] overflow-hidden cursor-pointer group"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(80,60,140,0.12)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Image */}
                    <div className="relative h-[130px] overflow-hidden">
                      <Image
                        src={item.image} alt={item.name} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 220px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                        {item.featured && (
                          <span className="badge-popular flex items-center gap-1">
                            <Star size={7} fill="white" strokeWidth={0} />
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Quick Add button */}
                      <motion.button
                        onClick={e => handleQuickAdd(e, item.id)}
                        className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                        style={{
                          background: isAdded ? '#4CAF7D' : 'rgba(255,255,255,0.92)',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                        }}
                        whileTap={{ scale: 0.88 }}
                        animate={isAdded ? { scale: [1, 1.18, 0.92, 1] } : {}}
                        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                      >
                        {isAdded
                          ? <Check size={15} strokeWidth={2.5} style={{ color: 'white' }} />
                          : <Plus size={15} strokeWidth={2.5} style={{ color: '#2F2343' }} />
                        }
                      </motion.button>
                    </div>

                    {/* Info */}
                    <div className="p-3.5">
                      <p className="font-display text-[14px] font-semibold text-plum leading-tight mb-1">
                        {item.name}
                      </p>
                      <p className="text-[11px] mb-3 line-clamp-2 font-medium text-muted">
                        {item.desc}
                      </p>

                      {/* Sweetness + Texture indicators */}
                      <div className="space-y-1.5 mb-3">
                        {[
                          { key: 'sweetness', label: 'Sweet', val: item.sensory.sweetness },
                          { key: 'richness',  label: 'Rich',  val: item.sensory.richness  },
                        ].map(({ key, label, val }) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="text-[9px] font-semibold w-8 text-muted">{label}</span>
                            <div className="sensory-track flex-1">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${val}%`, background: `linear-gradient(90deg, ${item.color}88, ${item.color})` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-bold text-plum">${item.price}</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => <Star key={i} size={8} fill="#D4956A" color="#D4956A" />)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Detail Bottom Sheet ──────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(47,35,67,0.40)', backdropFilter: 'blur(8px)' }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 inset-x-0 z-50 overflow-hidden max-h-[92vh]"
              style={{
                background: '#F9F7FC',
                borderRadius: '28px 28px 0 0',
                boxShadow: '0 -8px 40px rgba(47,35,67,0.18)',
              }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-plum/15" />
              </div>

              {/* Hero image */}
              <div className="relative h-[220px] w-full">
                <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F9F7FC] via-transparent to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 glass w-9 h-9 rounded-full flex items-center justify-center text-plum/65 hover:text-plum font-bold text-sm transition-all"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Content */}
              <div className="px-5 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(92vh - 260px)' }}>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <h2 className="font-display text-[24px] italic font-bold text-plum leading-tight">{selected.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#D4956A" color="#D4956A" />)}
                      </div>
                      <span className="text-[11px] font-semibold text-muted">5.0</span>
                      <span
                        className="text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-full font-bold"
                        style={{ background: `${selected.color}18`, color: selected.color, border: `1px solid ${selected.color}30` }}
                      >
                        {selected.category}
                      </span>
                    </div>
                  </div>
                  <span className="font-display text-[26px] font-bold text-shimmer">${selected.price}</span>
                </div>

                <p className="text-[14px] leading-relaxed mb-6 text-plum/68">{selected.desc}</p>

                <p className="text-[9px] tracking-[0.16em] uppercase font-bold mb-3 text-muted">
                  Sensory Profile
                </p>
                <div className="space-y-3 mb-6">
                  {(Object.entries(selected.sensory) as [string, number][]).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-[12px] font-semibold w-16 capitalize text-muted">{key}</span>
                      <div className="sensory-track flex-1 h-[5px]">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          style={{ background: `linear-gradient(90deg, ${selected.color}88, ${selected.color})` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold w-6 text-right text-plum/35">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.notes.map(n => (
                    <span key={n} className="text-[10px] font-semibold glass-card px-3 py-1.5 rounded-full text-plum/60 capitalize">{n}</span>
                  ))}
                </div>

                <div className="divider mb-6" />

                <button className="w-full btn-primary rounded-2xl h-14 text-[15px] flex items-center justify-center gap-2.5">
                  <ShoppingBag size={17} strokeWidth={2.2} />
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
