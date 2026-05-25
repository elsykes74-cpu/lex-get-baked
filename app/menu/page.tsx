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
      <div className="relative min-h-screen bg-page-bg pt-20 pb-28 px-5 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-lg mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="mb-8"
          >
            <p className="text-[9px] tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Sensory Preview
            </p>
            <h1 className="font-display text-3xl italic text-white">The Menu</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Tap any item to explore its full flavor profile.
            </p>
          </motion.div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide -mx-5 px-5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'btn-iridescent shadow-btn'
                    : 'glass text-white/65 hover:text-white'
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
                  className="glass-card rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  {/* Image */}
                  <div className="relative h-[120px] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(100,80,160,0.6)] via-transparent to-transparent" />
                    {item.featured && (
                      <div
                        className="absolute top-2 left-2 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-semibold"
                        style={{
                          background: 'rgba(255,255,255,0.45)',
                          color: item.color,
                          border: `1px solid ${item.color}44`,
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        Featured
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 text-lg drop-shadow">{item.emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="font-display text-sm text-white leading-snug mb-1">{item.name}</p>
                    <p className="text-[11px] mb-2.5 line-clamp-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {item.desc}
                    </p>

                    {/* Sensory bars */}
                    <div className="space-y-1 mb-2.5">
                      {(Object.entries(item.sensory) as [string, number][]).slice(0, 2).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-[9px] w-10 capitalize" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            {key}
                          </span>
                          <div className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${val}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}99)` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">${item.price}</span>
                      <span className="text-[10px] font-medium" style={{ color: item.color }}>Preview →</span>
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
              className="fixed inset-0 z-40 backdrop-blur-sm"
              style={{ background: 'rgba(80,60,140,0.55)' }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 inset-x-0 z-50 glass-card rounded-t-3xl overflow-hidden max-h-[88vh]"
            >
              <div className="relative h-[220px] w-full">
                <Image
                  src={selected.image} alt={selected.name} fill
                  className="object-cover" sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(80,60,140,0.85)] via-[rgba(80,60,140,0.3)] to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 glass w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white"
                >✕</button>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h2 className="font-display text-2xl italic text-white">{selected.name}</h2>
                    <span
                      className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{ background: `${selected.color}33`, color: selected.color, border: `1px solid ${selected.color}44` }}
                    >
                      {selected.category}
                    </span>
                  </div>
                  <span className="font-display text-2xl text-shimmer">${selected.price}</span>
                </div>
              </div>

              <div className="p-5 overflow-y-auto max-h-[calc(88vh-220px)]">
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {selected.desc}
                </p>

                <p className="text-[9px] tracking-widest uppercase mb-3" style={{ color: selected.color }}>
                  Sensory Profile
                </p>
                <div className="space-y-3 mb-5">
                  {(Object.entries(selected.sensory) as [string, number][]).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs w-16 capitalize" style={{ color: 'rgba(255,255,255,0.55)' }}>{key}</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          style={{ background: `linear-gradient(90deg, ${selected.color}, ${selected.color}88)` }}
                        />
                      </div>
                      <span className="text-xs w-6 text-right" style={{ color: 'rgba(255,255,255,0.35)' }}>{val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {selected.notes.map(n => (
                    <span key={n} className="text-[10px] glass px-3 py-1 rounded-full text-white/55 capitalize">{n}</span>
                  ))}
                </div>

                <button className="w-full btn-brand py-4 rounded-2xl text-sm font-semibold">
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
