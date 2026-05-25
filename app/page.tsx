'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const CookieScene = dynamic(() => import('@/components/CookieScene'), { ssr: false });

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const STAGGER = { show: { transition: { staggerChildren: 0.12 } } };

const FEATURED = [
  { name: 'Velvet Stuffed',  price: '$6',  color: '#C9748F', tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80' },
  { name: 'Rose Gold Cake',  price: '$12', color: '#D4956A', tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
  { name: 'Lavender Brûlée', price: '$9',  color: '#9B7EBC', tag: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&q=80' },
  { name: 'Salted Truffle',  price: '$4',  color: '#6B4028', tag: 'Classic',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&q=80' },
];

/* Floating chocolate chip / crumb positions around the cookie */
const CHIPS = [
  { top: '14%', left: '52%', size: 9,  color: '#3C2018', delay: '0s',    dur: '5.2s' },
  { top: '22%', left: '82%', size: 6,  color: '#D4956A', delay: '1.1s',  dur: '4.6s' },
  { top: '55%', left: '88%', size: 11, color: '#3C2018', delay: '0.6s',  dur: '5.8s' },
  { top: '78%', left: '72%', size: 7,  color: '#C9748F', delay: '1.7s',  dur: '4.2s' },
  { top: '82%', left: '45%', size: 8,  color: '#3C2018', delay: '0.3s',  dur: '6.0s' },
  { top: '68%', left: '28%', size: 5,  color: '#D4956A', delay: '1.4s',  dur: '4.8s' },
  { top: '30%', left: '24%', size: 7,  color: '#3C2018', delay: '0.8s',  dur: '5.4s' },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY    = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpac = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <>
      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col overflow-hidden bg-hero-bg px-5 pt-[4.5rem] pb-8"
      >
        <FloatingOrbs />
        <CookieScene />

        {/* Dark scrim — left-side contrast zone for white headline */}
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              'linear-gradient(to right, rgba(10,3,32,0.72) 0%, rgba(10,3,32,0.54) 42%, rgba(10,3,32,0.18) 68%, transparent 88%)',
          }}
        />

        {/* Bottom vignette — smooth blend into page sections */}
        <div
          className="pointer-events-none absolute bottom-0 inset-x-0 h-44 z-[4]"
          style={{ background: 'linear-gradient(to top, rgba(90,80,150,0.60) 0%, transparent 100%)' }}
        />

        {/* ── Cookie photo — dimensional, ringed ──────────────────── */}
        <div
          className="pointer-events-none absolute z-[5]"
          style={{
            right: '-8%',
            top: '50%',
            transform: 'translateY(-50%) rotate(-12deg)',
            width: '62vw',
            maxWidth: 310,
          }}
        >
          {/* Ambient glow beneath */}
          <div
            className="absolute inset-[-30%] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(212,149,106,0.38) 0%, rgba(201,116,143,0.18) 40%, transparent 70%)',
              filter: 'blur(24px)',
              animation: 'pulse-glow 4s ease-in-out infinite',
            }}
          />

          {/* Rose-gold ring border */}
          <div
            className="ring-rosegold relative"
            style={{
              animation: 'float 6s ease-in-out infinite',
            }}
          >
            <div className="rounded-full overflow-hidden" style={{ background: '#0F0820' }}>
              <img
                src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&q=90"
                alt=""
                aria-hidden
                className="w-full block"
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  filter: 'brightness(1.04) contrast(1.05)',
                }}
              />
            </div>
            {/* Top-left gloss highlight */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 28% 18%, rgba(255,252,248,0.38) 0%, transparent 52%)',
              }}
            />
          </div>
        </div>

        {/* Floating chocolate chips */}
        {CHIPS.map((chip, i) => (
          <div
            key={i}
            className="pointer-events-none absolute z-[6] rounded-full"
            style={{
              width: chip.size,
              height: chip.size,
              top: chip.top,
              left: chip.left,
              background: chip.color,
              boxShadow: `0 2px 6px ${chip.color}88`,
              animation: `float-chip ${chip.dur} ease-in-out ${chip.delay} infinite`,
              opacity: 0.72,
            }}
          />
        ))}

        {/* ── Hero text content ───────────────────────────────────── */}
        <motion.div
          className="relative z-10 max-w-[300px] mt-[clamp(1.5rem,6vh,4rem)]"
          variants={STAGGER}
          initial="hidden"
          animate="show"
          style={{ y: heroY, opacity: heroOpac }}
        >
          {/* Eyebrow badge */}
          <motion.div variants={FADE_UP} className="mb-5">
            <span
              className="glass inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] tracking-[0.14em] uppercase font-semibold"
              style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              <Sparkles size={9} strokeWidth={2.5} />
              Western Massachusetts · Small Batch
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={FADE_UP}
            className="font-display text-[50px] sm:text-[56px] leading-[1.04] font-bold italic text-white mb-1"
            style={{ textShadow: '0 2px 24px rgba(4,0,20,0.60), 0 1px 6px rgba(4,0,20,0.45)' }}
          >
            Baked with<br />
            <span className="text-shimmer-pearl not-italic">Love</span>
          </motion.h1>

          {/* Glass content card */}
          <motion.div
            variants={FADE_UP}
            className="glass-card rounded-3xl p-5 mt-4"
          >
            <p className="text-[13px] leading-relaxed mb-5 font-medium" style={{ color: 'rgba(45,26,74,0.80)' }}>
              Custom desserts made for the moments people remember — stuffed cookies,
              mini cakes, and small-batch boxes crafted in Western Massachusetts.
            </p>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/customize"
                className="btn-iridescent px-5 py-3.5 rounded-2xl text-[13px] flex items-center justify-between"
              >
                <span>Craft Custom Box</span>
                <ArrowRight size={15} strokeWidth={2.5} style={{ color: '#C9748F' }} />
              </Link>
              <Link
                href="/menu"
                className="rounded-2xl px-5 py-3.5 text-[13px] font-semibold flex items-center justify-between transition-all hover:bg-white/30 active:scale-[0.98]"
                style={{
                  background: 'rgba(255,255,255,0.30)',
                  border: '1.5px solid rgba(255,255,255,0.68)',
                  color: 'rgba(45,26,74,0.80)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span>Explore Menu</span>
                <ArrowRight size={14} strokeWidth={2} style={{ color: 'rgba(45,26,74,0.42)' }} />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
          animate={{ opacity: [0.35, 0.75, 0.35], y: [0, 6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          <div className="w-px h-7 bg-gradient-to-b from-white/45 to-transparent" />
          <span className="text-[7px] tracking-[0.30em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ── FEATURED DROPS ───────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 pt-12 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-6 flex items-end justify-between"
        >
          <div>
            <p className="text-[9px] tracking-[0.15em] uppercase font-semibold mb-1 text-plum/55">This Week</p>
            <h2 className="font-display text-2xl italic text-white" style={{ textShadow: '0 1px 12px rgba(10,4,36,0.25)' }}>
              Featured Drops
            </h2>
          </div>
          <Link href="/menu" className="text-[11px] font-semibold text-white/55 hover:text-white/80 transition-colors flex items-center gap-1">
            See all <ArrowRight size={11} />
          </Link>
        </motion.div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {FEATURED.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.42 }}
              className="snap-start flex-shrink-0 w-[152px]"
            >
              <Link href="/menu">
                <div className="glass-card rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-[1.03] hover:shadow-card-hover active:scale-[0.97]">
                  <div className="relative h-[110px] overflow-hidden">
                    <Image
                      src={p.image} alt={p.name} fill
                      className="object-cover"
                      sizes="152px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent" />
                    <div
                      className="absolute top-2 left-2 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-bold"
                      style={{ background: 'rgba(255,255,255,0.82)', color: p.color, border: `1px solid ${p.color}35`, backdropFilter: 'blur(8px)' }}
                    >
                      {p.tag}
                    </div>
                  </div>
                  <div className="p-3.5">
                    <p className="font-display text-[13px] font-semibold leading-snug text-plum mb-0.5">{p.name}</p>
                    <p className="text-xs font-bold text-shimmer">{p.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STORY SECTION ────────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-sm mx-auto"
        >
          <div className="glass-card rounded-3xl p-7 text-center mb-5">
            <p className="text-[9px] tracking-[0.15em] uppercase font-semibold mb-3 text-plum/50">Our Story</p>
            <h2 className="font-display text-3xl italic font-bold text-plum mb-3">
              Small batch.<br />Big love.
            </h2>
            <p className="text-[13px] leading-relaxed font-medium text-plum/68">
              Every item is crafted using locally-sourced ingredients, traditional techniques,
              and a whole lot of heart.
            </p>
          </div>

          <div className="divider-rg mb-5" />

          <div className="grid grid-cols-3 gap-3">
            {[['100%', 'Scratch-made'], ['48hr', 'Max shelf life'], ['Local', 'Ingredients']].map(([val, label]) => (
              <div key={label} className="glass-card rounded-2xl p-3.5 text-center">
                <p className="font-display text-xl text-shimmer font-bold">{val}</p>
                <p className="text-[10px] font-semibold mt-0.5 text-plum/55">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 pb-28 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="glass-card rounded-3xl p-7 text-center max-w-sm mx-auto"
        >
          <div
            className="text-5xl mb-4 inline-block"
            style={{ animation: 'float 5s ease-in-out infinite' }}
          >
            🎁
          </div>
          <h3 className="font-display text-2xl italic font-bold text-plum mb-2">
            Build Your Dream Box
          </h3>
          <p className="text-[13px] leading-relaxed mb-6 font-medium text-plum/65">
            Choose your base, fillings, and finishes — we&apos;ll bake it fresh to order.
          </p>
          <div className="divider-rg mb-6" />
          <Link
            href="/customize"
            className="btn-iridescent inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm"
          >
            Start Crafting
            <Sparkles size={13} strokeWidth={2.2} style={{ color: '#C9748F' }} />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
