'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const CookieScene = dynamic(() => import('@/components/CookieScene'), { ssr: false });

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const STAGGER = { show: { transition: { staggerChildren: 0.14 } } };

const BADGES = ['Western Massachusetts', 'Haptic Taste Preview', 'Quantum Delivery'];

const FEATURED = [
  { emoji: '🍪', name: 'Velvet Stuffed', price: '$6',  color: '#C9748F' },
  { emoji: '🎂', name: 'Rose Gold Cake', price: '$12', color: '#D4956A' },
  { emoji: '🫙', name: 'Lavender Brûlée',price: '$9',  color: '#9B7EBC' },
  { emoji: '🍫', name: 'Salted Truffle', price: '$4',  color: '#C9748F' },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY    = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroOpac = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      <NavBar />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-bg px-6 pt-20 pb-8"
      >
        <FloatingOrbs />
        <CookieScene />

        {/* Cookie photo — large, tilted, floating right */}
        <div
          className="pointer-events-none absolute z-[5]"
          style={{
            right: '-6%',
            top: '50%',
            transform: 'translateY(-50%) rotate(-13deg)',
            width: '68vw',
            maxWidth: 340,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&q=90"
            alt=""
            aria-hidden
            className="w-full h-auto object-cover animate-float-slow"
            style={{
              borderRadius: '50%',
              aspectRatio: '1/1',
              filter: 'drop-shadow(0 20px 60px rgba(80,40,120,0.35)) drop-shadow(0 4px 20px rgba(201,116,143,0.3))',
            }}
          />
          {/* Cream highlight ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(255,250,245,0.4) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Cream splash at top */}
        <div
          className="pointer-events-none absolute top-0 right-[15%] w-[200px] h-[180px] z-[4]"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,252,248,0.75) 0%, rgba(255,245,235,0.4) 50%, transparent 80%)',
            filter: 'blur(8px)',
            transform: 'scaleX(0.7)',
          }}
        />

        {/* Vignette bottom */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#9890BC]/60 to-transparent" />

        <motion.div
          className="relative z-10 max-w-[300px]"
          variants={STAGGER}
          initial="hidden"
          animate="show"
          style={{ y: heroY, opacity: heroOpac }}
        >
          {/* Badge pills */}
          <motion.div variants={FADE_UP} className="flex flex-wrap gap-2 mb-6">
            {BADGES.map(b => (
              <span
                key={b}
                className="glass px-3 py-1 rounded-full text-[9px] tracking-widest uppercase font-medium"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                {b}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={FADE_UP}
            className="font-display text-[52px] font-bold italic leading-[1.05] text-white mb-5"
            style={{ textShadow: '0 2px 24px rgba(60,30,100,0.25)' }}
          >
            Baked with<br />
            <span className="text-shimmer-pearl not-italic">Love</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={FADE_UP}
            className="text-sm leading-relaxed mb-8 max-w-[240px]"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            Mini cakes, stuffed cookies, custom dessert boxes — crafted for unforgettable moments.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={FADE_UP} className="flex flex-col gap-3">
            <Link
              href="/customize"
              className="btn-iridescent px-6 py-4 rounded-2xl text-sm tracking-wide flex items-center justify-between"
            >
              <span>Craft Custom Box</span>
              <span className="text-[#C9748F]">→</span>
            </Link>
            <Link
              href="/menu"
              className="glass px-6 py-4 rounded-2xl text-sm font-semibold tracking-wide flex items-center justify-between transition-all hover:bg-white/20"
              style={{ color: 'rgba(255,255,255,0.88)' }}
            >
              <span>Explore Menu</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>↗</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ opacity: [0.4, 0.85, 0.4], y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ── FEATURED DROPS ─────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-7 flex items-end justify-between"
        >
          <div>
            <p className="text-[9px] tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
              This Week
            </p>
            <h2 className="font-display text-2xl italic text-white">Featured Drops</h2>
          </div>
          <Link href="/menu" className="text-xs transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
            See all →
          </Link>
        </motion.div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {FEATURED.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="snap-start flex-shrink-0 w-[148px]"
            >
              <Link href="/menu">
                <div
                  className="glass-card rounded-3xl p-4 h-[188px] flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97]"
                  style={{ borderColor: `${p.color}30` }}
                >
                  <div
                    className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-semibold self-start"
                    style={{ background: `${p.color}22`, color: p.color }}
                  >
                    Featured
                  </div>
                  <div className="text-4xl text-center animate-float-slow">{p.emoji}</div>
                  <div>
                    <p className="font-display text-sm text-white leading-snug">{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STORY SECTION ──────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,116,143,0.08)] to-[rgba(212,149,106,0.06)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative z-10 max-w-sm mx-auto text-center"
        >
          <p className="text-[9px] tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Our Story
          </p>
          <h2 className="font-display text-3xl italic text-white mb-4">
            Small batch.<br />Big love.
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.62)' }}>
            Every item is crafted in Western Massachusetts using locally-sourced ingredients,
            traditional techniques, and a whole lot of heart. No preservatives. No shortcuts.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[['100%', 'Scratch-made'], ['48hr', 'Max shelf life'], ['Local', 'Ingredients']].map(([val, label]) => (
              <div key={label} className="glass-card rounded-2xl p-3 text-center">
                <p className="font-display text-xl text-shimmer">{val}</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA STRIP ──────────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-card rounded-3xl p-7 text-center"
        >
          <div className="text-4xl mb-3 animate-float-slow">🎁</div>
          <h3 className="font-display text-2xl italic text-white mb-2">
            Build Your Dream Box
          </h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.62)' }}>
            Choose your base, fillings, finishes — we&apos;ll bake it to order.
          </p>
          <Link
            href="/customize"
            className="btn-iridescent inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm"
          >
            Start Crafting ✦
          </Link>
        </motion.div>
      </section>
    </>
  );
}
