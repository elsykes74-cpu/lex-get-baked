'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, ChevronDown } from 'lucide-react';
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
      <div className="relative min-h-[100svh] bg-page-bg pt-[3.8rem] pb-28 sm:pb-14 px-4 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-lg mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.46 }} className="mb-7 mt-3"
          >
            <p className="text-[9px] tracking-[0.16em] uppercase font-semibold mb-1 text-plum/55">
              Sensory Preview
            </p>
            <h1 className="font-display text-3xl italic font-bold text-white mb-1.5"
              style={{ textShadow: '0 2px 20px rgba(70,20,90,0.50), 0 1px 5px rgba(201,116,143,0.30)' }}
            >
              The Menu
            </h1>
            <p className="text-[13px] font-medium text-plum/65">Tap any item to explore its full flavor profile.</p>
          </motion.div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide -mx-4 px-4">
            {CATEGORIES.map(cat => {
              const count = cat === 'All' ? MENU_ITEMS.length : MENU_ITEMS.filter(i => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'btn-iridescent shadow-btn'
                      : 'glass-card text-plum/65 hover:text-plum'
                  }`}
                >
                  {cat}
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                    style={{
                      background: activeCategory === cat ? 'rgba(201,116,143,0.15)' : 'rgba(45,26,74,0.08)',
                      color: activeCategory === cat ? '#C9748F' : 'rgba(45,26,74,0.48)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.93, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ duration: 0.24, delay: i * 0.04 }}
                  onClick={() => setSelected(item)}
                  className="glass-card rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-[1.03] hover:shadow-card-hover active:scale-[0.97]"
                >
                  {/* Image — no emoji overlay */}
                  <div className="relative h-[118px] w-full overflow-hidden">
                    <Image
                      src={item.image} alt={item.name} fill
                      className="object-cover" sizes="(max-width: 768px) 50vw, 200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/55 via-transparent to-transparent" />
                    {item.featured && (
                      <div
                        className="absolute top-2 left-2 flex items-center gap-0.5 text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-full font-bold"
                        style={{ background: 'rgba(255,255,255,0.86)', color: item.color, backdropFilter: 'blur(8px)' }}
                      >
                        <Star size={7} fill={item.color} strokeWidth={0} />
                        Featured
                      </div>
                    )}
                    {/* Price badge bottom-right — replaces emoji */}
                    <div
                      className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.82)', color: item.color, backdropFilter: 'blur(8px)' }}
                    >
                      ${item.price}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3.5">
                    <p className="font-display text-[13px] font-semibold text-plum leading-snug mb-1">
                      {item.name}
                    </p>
                    <p className="text-[11px] mb-2.5 line-clamp-2 font-medium text-plum/62">
                      {item.desc}
                    </p>

                    {/* Sensory bars */}
                    <div className="space-y-1.5 mb-3">
                      {(Object.entries(item.sensory) as [string, number][]).slice(0, 2).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-[9px] font-semibold w-10 capitalize text-plum/45">{key}</span>
                          <div className="sensory-track flex-1">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${val}%`, background: `linear-gradient(90deg, ${item.color}aa, ${item.color})` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-plum">${item.price}</span>
                      <span
                        className="text-[10px] font-bold flex items-center gap-0.5"
                        style={{ color: item.color }}
                      >
                        Preview <ChevronDown size={9} />
                      </span>
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
              style={{ background: 'rgba(20,8,55,0.65)' }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed bottom-0 inset-x-0 z-50 glass-card rounded-t-3xl overflow-hidden max-h-[90vh]"
            >
              {/* Hero image */}
              <div className="relative h-[210px] w-full">
                <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum via-plum/30 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 glass w-9 h-9 rounded-full flex items-center justify-center text-white/75 hover:text-white text-sm font-bold"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h2 className="font-display text-[22px] italic text-white font-bold leading-tight">{selected.name}</h2>
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

              {/* Content */}
              <div
                className="p-5 overflow-y-auto"
                style={{ background: 'rgba(255,255,255,0.72)', maxHeight: 'calc(90vh - 210px)' }}
              >
                <p className="text-[13px] leading-relaxed mb-5 font-medium text-plum/72">{selected.desc}</p>

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
                          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                          style={{ background: `linear-gradient(90deg, ${selected.color}aa, ${selected.color})` }}
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

                <button className="w-full btn-brand py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
                  <Plus size={16} strokeWidth={2.5} />
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
