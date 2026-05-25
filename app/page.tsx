'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

// Load the 3D scene only on the client — no SSR for WebGL
const CookieScene = dynamic(() => import('@/components/CookieScene'), { ssr: false });

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
};

const STAGGER = { show: { transition: { staggerChildren: 0.12 } } };

const BADGES = ['Western Massachusetts', 'Haptic Taste Preview', 'Quantum Delivery'];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY    = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpac = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden bg-hero-bg px-6 pt-20"
      >
        <FloatingOrbs />
        <CookieScene />

        {/* Gradient vignette at bottom */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-charcoal to-transparent" />

        <motion.div
          className="relative z-10 max-w-sm"
          variants={STAGGER}
          initial="hidden"
          animate="show"
          style={{ y: heroY, opacity: heroOpac }}
        >
          {/* Badge row */}
          <motion.div variants={FADE_UP} className="flex flex-wrap gap-2 mb-6">
            {BADGES.map(b => (
              <span key={b} className="glass px-3 py-1 rounded-full text-[10px] tracking-widest text-cream/60 uppercase">
                {b}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={FADE_UP}
            className="font-display text-5xl font-bold italic leading-[1.1] text-cream mb-5"
          >
            Baked with<br />
            <span className="text-shimmer not-italic">Love</span>
          </motion.h1>

          {/* Sub */}
          <motion.p variants={FADE_UP} className="text-cream/60 text-sm leading-relaxed mb-8 max-w-[260px]">
            Experience the genesis of flavor. Haptic samples available.
            Mini cakes, stuffed cookies, small-batch roasted.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={FADE_UP} className="flex flex-col gap-3">
            <Link
              href="/customize"
              className="group relative overflow-hidden bg-brand-gradient px-6 py-4 rounded-2xl text-sm font-semibold text-white tracking-wide shadow-glow transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(201,116,143,0.5)] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-between">
                Craft Custom Formulation
                <span className="ml-3 text-white/60 group-hover:translate-x-1 transition-transform">→</span>
              </span>
              {/* Shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </Link>

            <Link
              href="/menu"
              className="glass px-6 py-4 rounded-2xl text-sm font-semibold text-cream/80 tracking-wide border border-white/10 transition-all hover:bg-white/10 hover:text-cream hover:border-white/20 active:scale-[0.98]"
            >
              <span className="flex items-center justify-between">
                Explore Sensory Preview Menu
                <span className="text-cream/40">↗</span>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-cream/30 to-transparent" />
          <span className="text-[9px] tracking-[0.25em] text-cream/30 uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ── FEATURED PRODUCTS STRIP ──────────────────────────────── */}
      <FeaturedSection />

      {/* ── STORY SECTION ────────────────────────────────────────── */}
      <StorySection />
    </>
  );
}

// ─────────────────────────────────────────────────────────
function FeaturedSection() {
  const PRODUCTS = [
    { name: 'Velvet Stuffed Cookie',  tag: 'Signature',      price: '$6',  emoji: '🍪', color: '#C9748F' },
    { name: 'Rose Gold Mini Cake',    tag: 'Bestseller',     price: '$12', emoji: '🎂', color: '#C4965A' },
    { name: 'Lavender Crème Brûlée',  tag: 'New',            price: '$9',  emoji: '🫙', color: '#9B7EBC' },
    { name: 'Brown Butter Financier', tag: 'Chef\'s Choice', price: '$5',  emoji: '🧁', color: '#C4965A' },
  ];

  return (
    <section className="px-5 py-16 bg-charcoal">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex items-end justify-between"
      >
        <div>
          <p className="text-[10px] tracking-widest text-rose uppercase mb-1">Featured</p>
          <h2 className="font-display text-2xl text-cream">This Week&apos;s Drops</h2>
        </div>
        <Link href="/menu" className="text-xs text-cream/40 hover:text-cream transition-colors">
          See all →
        </Link>
      </motion.div>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="snap-start flex-shrink-0 w-[160px]"
          >
            <div
              className="glass rounded-2xl p-4 h-[200px] flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.03] hover:shadow-glass active:scale-[0.98]"
              style={{ borderColor: `${p.color}22` }}
            >
              <div>
                <span
                  className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${p.color}22`, color: p.color }}
                >
                  {p.tag}
                </span>
              </div>
              <div className="text-4xl text-center animate-float-slow">{p.emoji}</div>
              <div>
                <p className="font-display text-sm text-cream leading-tight">{p.name}</p>
                <p className="text-xs text-cream/40 mt-0.5">{p.price}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
function StorySection() {
  return (
    <section className="px-5 py-16 bg-charcoal-light relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-plum/10 to-rose/5 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-sm mx-auto text-center"
      >
        <p className="text-[10px] tracking-widest text-gold uppercase mb-3">Our Story</p>
        <h2 className="font-display text-3xl italic text-cream mb-4">
          Small batch.<br />Big love.
        </h2>
        <p className="text-sm text-cream/50 leading-relaxed mb-8">
          Every item is crafted in Western Massachusetts using locally-sourced ingredients,
          traditional techniques, and a whole lot of heart. No preservatives. No shortcuts.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[['100%', 'Scratch-made'], ['48hr', 'Max shelf life'], ['Local', 'Ingredients']].map(([val, label]) => (
            <div key={label} className="glass rounded-xl p-3 text-center">
              <p className="font-display text-xl text-shimmer">{val}</p>
              <p className="text-[10px] text-cream/40 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
