'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const CookieScene = dynamic(() => import('@/components/CookieScene'), { ssr: false });

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const STAGGER = { show: { transition: { staggerChildren: 0.13 } } };

const BADGES = ['Western Massachusetts', 'Haptic Taste Preview', 'Quantum Delivery'];

const FEATURED = [
  { emoji: '🍪', name: 'Velvet Stuffed',  price: '$6',  color: '#C9748F', tag: 'Signature'  },
  { emoji: '🎂', name: 'Rose Gold Cake',  price: '$12', color: '#D4956A', tag: 'Bestseller' },
  { emoji: '🫙', name: 'Lavender Brûlée', price: '$9',  color: '#9B7EBC', tag: 'New'        },
  { emoji: '🍫', name: 'Salted Truffle',  price: '$4',  color: '#C9748F', tag: 'Classic'    },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY    = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpac = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <NavBar />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-bg px-5 pt-20 pb-10"
      >
        {/* Layer 1: background orbs */}
        <FloatingOrbs />

        {/* Layer 2: Three.js 3D tiles + spheres */}
        <CookieScene />

        {/* Layer 3: dark lavender scrim — creates contrast zone for white text */}
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              'linear-gradient(to right, rgba(12,4,36,0.68) 0%, rgba(12,4,36,0.52) 45%, rgba(12,4,36,0.15) 72%, transparent 90%)',
          }}
        />

        {/* Layer 3b: bottom vignette */}
        <div
          className="pointer-events-none absolute bottom-0 inset-x-0 h-48 z-[4]"
          style={{ background: 'linear-gradient(to top, rgba(100,88,160,0.55) 0%, transparent 100%)' }}
        />

        {/* Layer 4: Cookie photo — right, large, floating */}
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
          {/* Radial glow behind cookie */}
          <div
            className="absolute inset-[-20%] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(212,149,106,0.3) 0%, rgba(201,116,143,0.15) 45%, transparent 75%)',
              filter: 'blur(20px)',
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&q=90"
            alt=""
            aria-hidden
            className="relative w-full h-auto object-cover animate-float-slow"
            style={{
              borderRadius: '50%',
              aspectRatio: '1/1',
              filter: 'drop-shadow(0 24px 64px rgba(10,4,36,0.55)) drop-shadow(0 4px 20px rgba(201,116,143,0.35))',
            }}
          />
          {/* Pearl highlight ring */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 30% 18%, rgba(255,252,248,0.45) 0%, transparent 55%)',
            }}
          />
        </div>

        {/* Layer 5: cream splash accent top-right */}
        <div
          className="pointer-events-none absolute top-[-4%] right-[14%] z-[5]"
          style={{
            width: 180, height: 200,
            background: 'radial-gradient(ellipse at 50% 5%, rgba(255,250,242,0.8) 0%, rgba(255,240,225,0.45) 45%, transparent 78%)',
            filter: 'blur(10px)',
            transform: 'scaleX(0.65)',
          }}
        />

        {/* Layer 6: foreground floating chip/orb accents */}
        {[
          { size: 12, top: '22%',  left: '5%',  color: '#D4956A', delay: '0s'   },
          { size: 8,  top: '38%',  left: '2%',  color: '#C9748F', delay: '1.2s' },
          { size: 14, top: '65%',  left: '8%',  color: '#D4956A', delay: '0.6s' },
          { size: 10, top: '78%',  left: '42%', color: '#C9748F', delay: '1.8s' },
        ].map((dot, i) => (
          <div
            key={i}
            className="pointer-events-none absolute z-[6] rounded-full"
            style={{
              width: dot.size, height: dot.size,
              top: dot.top, left: dot.left,
              background: dot.color,
              boxShadow: `0 0 10px ${dot.color}88`,
              animation: `float 5s ease-in-out ${dot.delay} infinite`,
              opacity: 0.7,
            }}
          />
        ))}

        {/* Layer 7: hero text content */}
        <motion.div
          className="relative z-10 max-w-[305px]"
          variants={STAGGER}
          initial="hidden"
          animate="show"
          style={{ y: heroY, opacity: heroOpac }}
        >
          {/* Badges */}
          <motion.div variants={FADE_UP} className="flex flex-wrap gap-2 mb-6">
            {BADGES.map(b => (
              <span
                key={b}
                className="glass px-3 py-1 rounded-full text-[9px] tracking-[0.12em] uppercase font-semibold"
                style={{ color: 'rgba(255,255,255,0.82)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              >
                {b}
              </span>
            ))}
          </motion.div>

          {/* Headline — white on dark scrim */}
          <motion.h1
            variants={FADE_UP}
            className="font-display text-[52px] leading-[1.05] font-bold italic text-white mb-2"
            style={{ textShadow: '0 2px 20px rgba(4,0,20,0.55), 0 1px 4px rgba(4,0,20,0.4)' }}
          >
            Baked with<br />
            <span className="text-shimmer-pearl not-italic">Love</span>
          </motion.h1>

          {/* Glass content card — body copy + CTAs on a bright surface with plum text */}
          <motion.div
            variants={FADE_UP}
            className="glass-card rounded-3xl p-5 mt-4"
            style={{ background: 'rgba(255,255,255,0.58)', backdropFilter: 'blur(28px)' }}
          >
            <p className="text-sm leading-relaxed mb-5 font-body" style={{ color: 'rgba(45,26,74,0.78)' }}>
              Mini cakes, stuffed cookies, custom dessert boxes —
              crafted for unforgettable moments in Western Massachusetts.
            </p>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/customize"
                className="btn-iridescent px-5 py-3.5 rounded-2xl text-sm flex items-center justify-between"
              >
                <span>Craft Custom Box</span>
                <span className="text-rose font-bold ml-2">→</span>
              </Link>
              <Link
                href="/menu"
                className="rounded-2xl px-5 py-3.5 text-sm font-semibold flex items-center justify-between transition-all hover:bg-white/20"
                style={{
                  background: 'rgba(255,255,255,0.28)',
                  border: '1.5px solid rgba(255,255,255,0.65)',
                  color: 'rgba(45,26,74,0.82)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span>Explore Menu</span>
                <span style={{ color: 'rgba(45,26,74,0.42)' }}>↗</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
          animate={{ opacity: [0.4, 0.85, 0.4], y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
          <span
            className="text-[8px] tracking-[0.28em] uppercase font-medium"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ── FEATURED DROPS ─────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="mb-7 flex items-end justify-between"
        >
          <div>
            <p className="text-[9px] tracking-[0.15em] uppercase font-semibold mb-1 text-plum/55">This Week</p>
            <h2 className="font-display text-2xl italic text-white" style={{ textShadow: '0 1px 12px rgba(10,4,36,0.25)' }}>
              Featured Drops
            </h2>
          </div>
          <Link href="/menu" className="text-xs font-semibold text-white/55 hover:text-white/80 transition-colors">
            See all →
          </Link>
        </motion.div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {FEATURED.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }}
              className="snap-start flex-shrink-0 w-[148px]"
            >
              <Link href="/menu">
                <div className="glass-card rounded-3xl p-4 h-[190px] flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.03] hover:shadow-card-hover active:scale-[0.97]">
                  <div
                    className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-bold self-start"
                    style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}
                  >
                    {p.tag}
                  </div>
                  <div className="text-4xl text-center animate-float-slow">{p.emoji}</div>
                  <div>
                    <p className="font-display text-sm font-semibold leading-snug text-plum">{p.name}</p>
                    <p className="text-xs font-bold mt-0.5 text-shimmer">{p.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STORY SECTION ──────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65 }}
          className="max-w-sm mx-auto"
        >
          <div className="glass-card rounded-3xl p-7 text-center mb-6">
            <p className="text-[9px] tracking-[0.15em] uppercase font-semibold mb-3 text-plum/50">Our Story</p>
            <h2 className="font-display text-3xl italic text-plum mb-3">
              Small batch.<br />Big love.
            </h2>
            <p className="text-sm leading-relaxed text-plum/70">
              Every item is crafted in Western Massachusetts using locally-sourced ingredients,
              traditional techniques, and a whole lot of heart.
            </p>
          </div>

          <div className="divider-rg mb-6" />

          <div className="grid grid-cols-3 gap-3">
            {[['100%', 'Scratch-made'], ['48hr', 'Max shelf life'], ['Local', 'Ingredients']].map(([val, label]) => (
              <div key={label} className="glass-card rounded-2xl p-3.5 text-center">
                <p className="font-display text-xl text-shimmer font-bold">{val}</p>
                <p className="text-[10px] font-medium mt-0.5 text-plum/55">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA STRIP ──────────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="glass-card rounded-3xl p-7 text-center"
        >
          <div className="text-5xl mb-4 animate-float-slow">🎁</div>
          <h3 className="font-display text-2xl italic text-plum mb-2">
            Build Your Dream Box
          </h3>
          <p className="text-sm leading-relaxed mb-6 text-plum/65">
            Choose your base, fillings, finishes — we&apos;ll bake it fresh to order.
          </p>
          <div className="divider-rg mb-6" />
          <Link href="/customize" className="btn-iridescent inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm">
            Start Crafting <span className="text-rose">✦</span>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
