'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Gift } from 'lucide-react';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const CookieScene = dynamic(() => import('@/components/CookieScene'), { ssr: false });

const FADE_UP = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] } },
};
const STAGGER = { show: { transition: { staggerChildren: 0.11 } } };

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

/* Chocolate chip crumbs — positioned relative to cookie wrapper */
const CHIPS = [
  { size: 9,  top: '-6%',   left: '14%',  color: '#3C2018', delay: '0s',   dur: '5.2s' },
  { size: 6,  top: '3%',    left: '76%',  color: '#D4956A', delay: '1.1s', dur: '4.6s' },
  { size: 11, top: '53%',   left: '96%',  color: '#3C2018', delay: '0.6s', dur: '5.8s' },
  { size: 7,  top: '84%',   left: '80%',  color: '#C9748F', delay: '1.7s', dur: '4.2s' },
  { size: 8,  top: '103%',  left: '33%',  color: '#3C2018', delay: '0.3s', dur: '6.0s' },
  { size: 5,  top: '90%',   left: '-7%',  color: '#D4956A', delay: '1.4s', dur: '4.8s' },
  { size: 7,  top: '22%',   left: '-11%', color: '#3C2018', delay: '0.8s', dur: '5.4s' },
];

/* Pearl orbs — small lustrous circles in a halo around the cookie */
const PEARLS = [
  { size: 8,  top: '-13%', left: '88%',  delay: '0.2s', dur: '5.5s' },
  { size: 5,  top: '7%',   left: '103%', delay: '1.3s', dur: '4.8s' },
  { size: 10, top: '50%',  left: '98%',  delay: '0.7s', dur: '6.2s' },
  { size: 6,  top: '83%',  left: '86%',  delay: '1.9s', dur: '5.0s' },
  { size: 7,  top: '100%', left: '40%',  delay: '0.4s', dur: '4.5s' },
  { size: 4,  top: '17%',  left: '-9%',  delay: '1.1s', dur: '5.8s' },
  { size: 6,  top: '74%',  left: '-6%',  delay: '0.6s', dur: '6.5s' },
];

/* Cream splash blobs */
const CREAM = [
  { top: '-7%', left: '52%', w: 54, h: 38, delay: '0.5s' },
  { top: '76%', left: '64%', w: 44, h: 30, delay: '1.6s' },
  { top: '32%', left: '99%', w: 36, h: 26, delay: '1.0s' },
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
        className="relative min-h-[100svh] flex flex-col overflow-hidden bg-hero-bg px-5 pt-[3.8rem] pb-8"
      >
        <FloatingOrbs />
        <CookieScene />

        {/* Dark scrim — left contrast zone */}
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              'linear-gradient(to right, rgba(10,3,32,0.74) 0%, rgba(10,3,32,0.56) 40%, rgba(10,3,32,0.16) 66%, transparent 86%)',
          }}
        />

        {/* Bottom vignette */}
        <div
          className="pointer-events-none absolute bottom-0 inset-x-0 h-40 z-[4]"
          style={{ background: 'linear-gradient(to top, rgba(88,76,148,0.62) 0%, transparent 100%)' }}
        />

        {/* ── Cookie — dimensional spinning ring ──────────────────── */}
        <div
          className="pointer-events-none absolute z-[5]"
          style={{
            right: '-7%',
            top: '50%',
            transform: 'translateY(-50%) rotate(-12deg)',
            width: '60vw',
            maxWidth: 300,
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '-35%',
              background: 'radial-gradient(ellipse, rgba(212,149,106,0.40) 0%, rgba(201,116,143,0.18) 40%, transparent 68%)',
              filter: 'blur(24px)',
              animation: 'pulse-glow 4.5s ease-in-out infinite',
            }}
          />

          {/* Chocolate chip crumbs */}
          {CHIPS.map((chip, i) => (
            <div
              key={i}
              className="pointer-events-none absolute z-[6] rounded-full"
              style={{
                width: chip.size, height: chip.size,
                top: chip.top, left: chip.left,
                background: chip.color,
                boxShadow: `0 2px 6px ${chip.color}80`,
                animation: `float-chip ${chip.dur} ease-in-out ${chip.delay} infinite`,
                opacity: 0.75,
              }}
            />
          ))}

          {/* Pearl orbs */}
          {PEARLS.map((p, i) => (
            <div
              key={i}
              className="pointer-events-none absolute z-[7] rounded-full"
              style={{
                width: p.size, height: p.size,
                top: p.top, left: p.left,
                background: 'radial-gradient(circle at 35% 30%, rgba(255,252,250,1), rgba(238,218,230,0.92))',
                boxShadow: '0 2px 8px rgba(212,149,106,0.38), inset 0 1px 0 rgba(255,255,255,1)',
                animation: `float ${p.dur} ease-in-out ${p.delay} infinite`,
                opacity: 0.88,
              }}
            />
          ))}

          {/* Cream splash blobs */}
          {CREAM.map((s, i) => (
            <div
              key={i}
              className="pointer-events-none absolute z-[5]"
              style={{
                top: s.top, left: s.left,
                width: s.w, height: s.h,
                background: 'radial-gradient(ellipse, rgba(255,252,244,0.88) 0%, rgba(255,244,230,0.48) 50%, transparent 80%)',
                filter: 'blur(9px)',
                borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
                animation: `float 7.5s ease-in-out ${s.delay} infinite`,
              }}
            />
          ))}

          {/* Spinning conic ring + image */}
          <div
            className="ring-rosegold"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          >
            {/* Rotating conic gradient — the ring itself */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(#D4956A 0%, #EDD4A8 18%, rgba(255,252,248,0.90) 36%, #E8C4DE 52%, #C9748F 66%, #A89CC4 82%, #D4956A 100%)',
                animation: 'ring-rotate 12s linear infinite',
              }}
            />
            {/* Image inset to expose 3px of the ring */}
            <div
              className="relative rounded-full overflow-hidden"
              style={{ margin: '3px', background: '#0F0820', zIndex: 1 }}
            >
              <img
                src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&q=90"
                alt=""
                aria-hidden
                className="w-full block"
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  filter: 'brightness(1.05) contrast(1.04)',
                }}
              />
            </div>
            {/* Gloss highlight */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 28% 18%, rgba(255,252,248,0.40) 0%, transparent 50%)',
                zIndex: 2,
              }}
            />
          </div>
        </div>

        {/* ── Hero text ────────────────────────────────────────────── */}
        <motion.div
          className="relative z-10 max-w-[300px] mt-2"
          variants={STAGGER}
          initial="hidden"
          animate="show"
          style={{ y: heroY, opacity: heroOpac }}
        >
          {/* Eyebrow */}
          <motion.div variants={FADE_UP} className="mb-4">
            <span
              className="glass inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] tracking-[0.14em] uppercase font-semibold"
              style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              <Sparkles size={9} strokeWidth={2.5} />
              Western Massachusetts · Small Batch
            </span>
          </motion.div>

          {/* Headline — plum-rose tinted shadow, not heavy gray */}
          <motion.h1
            variants={FADE_UP}
            className="font-display text-[50px] sm:text-[56px] leading-[1.04] font-bold italic text-white mb-1"
            style={{ textShadow: '0 2px 22px rgba(70,20,90,0.52), 0 1px 5px rgba(201,116,143,0.32)' }}
          >
            Baked with<br />
            <span className="text-shimmer-pearl not-italic">Love</span>
          </motion.h1>

          {/* Glass CTA card */}
          <motion.div variants={FADE_UP} className="glass-card rounded-3xl p-5 mt-3">
            <p className="text-[13px] leading-relaxed mb-5 font-medium" style={{ color: 'rgba(45,26,74,0.82)' }}>
              Custom desserts made for the moments people remember — stuffed cookies,
              mini cakes, and small-batch boxes crafted in Western Massachusetts.
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Primary CTA — clearly dominant */}
              <Link
                href="/customize"
                className="btn-iridescent px-5 py-3.5 rounded-2xl text-[13px] font-bold flex items-center justify-between"
              >
                <span>Craft Custom Box</span>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,116,143,0.18)', border: '1px solid rgba(201,116,143,0.35)' }}
                >
                  <ArrowRight size={12} strokeWidth={2.5} style={{ color: '#C9748F' }} />
                </div>
              </Link>
              {/* Secondary CTA — clearly lighter weight */}
              <Link
                href="/menu"
                className="rounded-2xl px-5 py-3 text-[12px] font-semibold flex items-center justify-between transition-all hover:bg-white/32 active:scale-[0.98]"
                style={{
                  background: 'rgba(255,255,255,0.22)',
                  border: '1.5px solid rgba(255,255,255,0.55)',
                  color: 'rgba(45,26,74,0.72)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span>Explore Menu</span>
                <ArrowRight size={13} strokeWidth={1.8} style={{ color: 'rgba(45,26,74,0.38)' }} />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
          animate={{ opacity: [0.3, 0.7, 0.3], y: [0, 6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          <div className="w-px h-6 bg-gradient-to-b from-white/42 to-transparent" />
          <span className="text-[7px] tracking-[0.30em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.36)' }}>
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
            <h2 className="font-display text-2xl italic font-bold text-white" style={{ textShadow: '0 1px 12px rgba(10,4,36,0.25)' }}>
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
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="152px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent" />
                    <div
                      className="absolute top-2 left-2 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-bold"
                      style={{ background: 'rgba(255,255,255,0.84)', color: p.color, backdropFilter: 'blur(8px)' }}
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
          {/* Icon — no emoji */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,240,225,0.85))',
              border: '1.5px solid rgba(212,149,106,0.35)',
              boxShadow: '0 6px 24px rgba(212,149,106,0.22)',
              animation: 'float 5.5s ease-in-out infinite',
            }}
          >
            <Gift size={28} strokeWidth={1.5} style={{ color: '#D4956A' }} />
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
