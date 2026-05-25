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
            <p className="text-[9px] tracking-[0.15em] uppercase font-semibold mb-1 text-plum/55">
              Sensory Preview
            </p>
            <h1 className="font-display text-3xl italic text-white mb-1" style={{ textShadow: '0 2px 12px rgba(10,4,36,0.28)' }}>
              The Menu
            </h1>
            <p className="text-sm text-plum/65 font-medium">Tap any item to explore its full flavor profile.</p>
          </motion.div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide -mx-5 px-5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'btn-iridescent shadow-btn'
                    : 'glass-card text-plum/65 hover:text-plum'
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
                  className="glass-card rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-[1.03] hover:shadow-card-hover active:scale-[0.97]"
                >
                  {/* Image */}
                  <div className="relative h-[120px] w-full overflow-hidden">
                    <Image
                      src={item.image} alt={item.name} fill
                      className="object-cover" sizes="(max-width: 768px) 50vw, 200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent" />
                    {item.featured && (
                      <div
                        className="absolute top-2 left-2 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-bold"
                        style={{
                          background: 'rgba(255,255,255,0.82)',
                          color: item.color,
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        Featured
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 text-lg drop-shadow">{item.emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="p-3.5">
                    <p className="font-display text-sm font-semibold text-plum leading-snug mb-1">
                      {item.name}
                    </p>
                    <p className="text-[11px] mb-2.5 line-clamp-2 text-plum/62">
                      {item.desc}
                    </p>

                    {/* Sensory bars */}
                    <div className="space-y-1.5 mb-2.5">
                      {(Object.entries(item.sensory) as [string, number][]).slice(0, 2).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-[9px] font-semibold w-10 capitalize text-plum/45">{key}</span>
                          <div className="sensory-track flex-1">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${val}%`, background: `linear-gradient(90deg, ${item.color}bb, ${item.color})` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-plum">${item.price}</span>
                      <span className="text-[10px] font-bold" style={{ color: item.color }}>Preview →</span>
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
              style={{ background: 'rgba(30,10,70,0.6)' }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 inset-x-0 z-50 glass-card rounded-t-3xl overflow-hidden max-h-[88vh]"
            >
              {/* Hero image */}
              <div className="relative h-[220px] w-full">
                <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum via-plum/30 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 glass w-9 h-9 rounded-full flex items-center justify-center text-white/75 hover:text-white text-sm font-bold"
                >✕</button>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h2 className="font-display text-2xl italic text-white font-bold">{selected.name}</h2>
                    <span
                      className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-bold"
                      style={{ background: `${selected.color}44`, color: 'white', border: `1px solid ${selected.color}66` }}
                    >
                      {selected.category}
                    </span>
                  </div>
                  <span className="font-display text-2xl text-shimmer font-bold">${selected.price}</span>
                </div>
              </div>

              {/* Content — white surface, plum text */}
              <div className="p-5 overflow-y-auto max-h-[calc(88vh-220px)]" style={{ background: 'rgba(255,255,255,0.7)' }}>
                <p className="text-sm leading-relaxed mb-5 text-plum/72">{selected.desc}</p>

                <p className="text-[9px] tracking-[0.15em] uppercase font-bold mb-3" style={{ color: selected.color }}>
                  Sensory Profile
                </p>
                <div className="space-y-3 mb-5">
                  {(Object.entries(selected.sensory) as [string, number][]).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs font-semibold w-16 capitalize text-plum/55">{key}</span>
                      <div className="sensory-track flex-1 h-2">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          style={{ background: `linear-gradient(90deg, ${selected.color}bb, ${selected.color})` }}
                        />
                      </div>
                      <span className="text-xs font-bold w-6 text-right text-plum/40">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {selected.notes.map(n => (
                    <span key={n} className="text-[10px] font-semibold glass-card px-3 py-1 rounded-full text-plum/65 capitalize">{n}</span>
                  ))}
                </div>

                <div className="divider-rg mb-5" />

                <button className="w-full btn-brand py-4 rounded-2xl text-sm font-bold">
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
