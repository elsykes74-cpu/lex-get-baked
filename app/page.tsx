'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Sparkles } from 'lucide-react';
import NavBar from '@/components/NavBar';

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
const STAGGER = { show: { transition: { staggerChildren: 0.09 } } };

const FEATURED = [
  { name: 'Velvet Stuffed',   price: '$6',  tag: 'Signature',  color: '#C9748F',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80' },
  { name: 'Rose Gold Cake',   price: '$12', tag: 'Bestseller', color: '#D4956A',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
  { name: 'Lavender Brûlée',  price: '$9',  tag: 'Seasonal',   color: '#9B7EBC',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&q=80' },
  { name: 'Salted Truffle',   price: '$4',  tag: 'Classic',    color: '#7A5840',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&q=80' },
];

const TESTIMONIALS = [
  { name: 'Sophia M.',  text: 'The most beautiful cookies I\'ve ever seen — tasted even better.',      rating: 5 },
  { name: 'James K.',   text: 'Ordered for my wedding. Every guest asked where they were from.',       rating: 5 },
  { name: 'Priya L.',   text: 'The custom box was perfect. Will never order from anyone else.',        rating: 5 },
];

const STATS = [
  ['100%', 'Scratch-made'],
  ['48hr',  'Max shelf life'],
  ['Local', 'Ingredients'],
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpac = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    return scrollYProgress.on('change', v => setShowSticky(v > 0.58));
  }, [scrollYProgress]);

  return (
    <>
      <NavBar />

      {/* ── Sticky Order Button ───────────────────────────────────────── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: -72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -72, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className="fixed top-[60px] inset-x-0 z-40 px-4 pointer-events-none"
          >
            <div className="max-w-sm mx-auto pointer-events-auto">
              <Link href="/customize">
                <div
                  className="btn-primary rounded-2xl h-14 px-6 flex items-center justify-between w-full"
                  style={{ boxShadow: '0 8px 32px rgba(47,35,67,0.30)' }}
                >
                  <span>Build Your Box</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium opacity-55">from $4</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col bg-hero-bg px-5 pt-[5.5rem] pb-11 overflow-hidden"
      >
        {/* Single ambient accent — top right only */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{
            position: 'absolute', top: '-8%', right: '-14%',
            width: '60vw', height: '60vw', maxWidth: 320,
            background: 'radial-gradient(ellipse, rgba(247,196,216,0.18) 0%, transparent 65%)',
            borderRadius: '50%',
          }} />
        </div>

        {/* Cookie photo — right side, parallax */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 0.82, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            y: heroY,
            scale: 0.90,
            transformOrigin: 'top center',
            position: 'absolute',
            right: '-6%',
            top: 'calc(20% + 24px)',
            width: '54.5vw',
            maxWidth: 286,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <div className="ring-rosegold" style={{ animation: 'float 7s ease-in-out infinite' }}>
            <div className="rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&q=90"
                alt=""
                aria-hidden
                className="w-full block"
                style={{ aspectRatio: '1/1', objectFit: 'cover', filter: 'contrast(1.02) saturate(0.97)' }}
              />
            </div>
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 28% 18%, rgba(255,252,248,0.30) 0%, transparent 55%)' }}
            />
          </div>
          {/* Review chip — anchored to image */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute glass px-3 py-1.5 rounded-full"
            style={{ bottom: '-18px', left: '10%' }}
          >
            <span className="text-[9px] font-bold text-plum/70 tracking-[0.12em] uppercase whitespace-nowrap">
              Western Mass · Small Batch
            </span>
          </motion.div>
        </motion.div>

        {/* Hero text */}
        <motion.div
          className="relative z-10 mt-[clamp(1.38rem,5.5vh,3.68rem)]"
          style={{ y: heroY, opacity: heroOpac, width: '65%', maxWidth: 320 }}
          variants={STAGGER}
          initial="hidden"
          animate="show"
        >
          {/* Brand label */}
          <motion.div variants={FADE_UP} className="mb-3">
            <p
              className="font-display font-bold text-plum"
              style={{ fontSize: '28px', letterSpacing: '0.12em' }}
            >
              LEX GET BAKED
            </p>
          </motion.div>

          {/* Tagline — product descriptor */}
          <motion.h1
            variants={FADE_UP}
            className="font-display font-bold leading-[.88] text-plum mb-5"
            style={{ fontSize: 'clamp(44px, 13vw, 64px)', maxWidth: 300, letterSpacing: '-0.04em' }}
          >
            Luxury<br />
            Desserts.<br />
            <em className="text-shimmer not-italic">Crafted</em><br />
            by Hand.
          </motion.h1>

          <motion.p
            variants={FADE_UP}
            className="leading-[1.4] text-muted mb-8 font-medium"
            style={{ fontSize: '18px' }}
          >
            Custom cookies, mini cakes,
            and unforgettable dessert experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={FADE_UP} className="flex flex-col gap-3" style={{ width: '88%', maxWidth: 360 }}>
            <Link href="/customize" className="btn-primary rounded-[24px] h-16 px-6 w-full flex items-center justify-between">
              <span>Build Your Box</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link href="/menu" className="btn-ghost rounded-[24px] h-16 px-6 w-full flex items-center justify-between">
              <span>Explore Menu</span>
              <ArrowRight size={15} strokeWidth={2} style={{ opacity: 0.45 }} />
            </Link>
          </motion.div>

          {/* Micro trust label */}
          <motion.div variants={FADE_UP}>
            <p
              className="text-muted font-medium"
              style={{ fontSize: '11px', letterSpacing: '0.05em', marginTop: '12px' }}
            >
              Made fresh in Western Massachusetts
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          animate={{ opacity: [0.3, 0.65, 0.3], y: [0, 5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          <div className="w-px h-6 bg-gradient-to-b from-plum/25 to-transparent" />
          <span className="text-[7px] tracking-[0.28em] uppercase font-semibold text-plum/30">Scroll</span>
        </motion.div>
      </section>

      {/* ── FEATURED COLLECTION ──────────────────────────────────────── */}
      <section className="bg-page-bg px-5 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.48 }}
          className="mb-7 flex items-end justify-between"
        >
          <div>
            <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">This Week</p>
            <h2 className="font-display text-[26px] font-bold text-plum italic">Featured Collection</h2>
          </div>
          <Link href="/menu" className="text-[12px] font-semibold text-muted hover:text-plum transition-colors flex items-center gap-1">
            All <ArrowRight size={12} />
          </Link>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-3 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {FEATURED.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.42 }}
              className="snap-start flex-shrink-0 w-[158px]"
            >
              <Link href="/menu">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', damping: 18, stiffness: 320 }}
                  className="glass-card rounded-[28px] overflow-hidden cursor-pointer"
                >
                  <div className="relative h-[130px] overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="158px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div
                      className="absolute top-2.5 left-2.5 text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-bold"
                      style={{ background: 'rgba(255,255,255,0.92)', color: item.color }}
                    >
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-display text-[14px] font-semibold text-plum leading-tight mb-2">{item.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] font-bold text-plum">{item.price}</p>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} size={8} fill="#D4956A" color="#D4956A" />)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CUSTOMER LOVE ────────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.48 }}
          className="mb-7"
        >
          <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">Reviews</p>
          <h2 className="font-display text-[26px] font-bold text-plum italic">Customer Love</h2>
        </motion.div>

        <div className="space-y-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.42 }}
              className="glass-card rounded-[24px] p-5"
            >
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#D4956A" color="#D4956A" />)}
              </div>
              <p className="text-[14px] leading-relaxed text-plum/75 font-medium mb-3">"{t.text}"</p>
              <p className="text-[11px] font-bold text-muted">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="max-w-sm mx-auto"
        >
          <div className="glass-card rounded-[28px] p-7 mb-4">
            <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-3 text-muted">Our Story</p>
            <h2 className="font-display text-[28px] italic font-bold text-plum mb-3 leading-tight">
              Small batch.<br />Big love.
            </h2>
            <p className="text-[14px] leading-relaxed text-plum/62">
              Every item is crafted using locally-sourced ingredients,
              traditional techniques, and a whole lot of heart — in
              Western Massachusetts.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {STATS.map(([val, label]) => (
              <div key={label} className="glass-card rounded-[20px] p-4 text-center">
                <p className="font-display text-[18px] font-bold text-shimmer mb-0.5">{val}</p>
                <p className="text-[10px] font-semibold text-muted leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────── */}
      <section className="bg-page-bg px-5 pb-32 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="glass-card rounded-[28px] p-8 text-center max-w-sm mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(135deg, rgba(247,196,216,0.18) 0%, rgba(243,198,157,0.12) 100%)',
          }} />
          <div className="relative z-10">
            <div
              className="w-14 h-14 rounded-[18px] mx-auto mb-6 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #F7C4D8, #F3C69D)',
                boxShadow: '0 6px 20px rgba(201,116,143,0.22)',
              }}
            >
              <ShoppingBag size={22} strokeWidth={2} className="text-plum" />
            </div>
            <h3 className="font-display text-[24px] italic font-bold text-plum mb-2">
              Build Your Dream Box
            </h3>
            <p className="text-[14px] leading-relaxed mb-8 text-plum/60">
              Choose your base, fillings, and finishes —<br />
              baked fresh to your exact specifications.
            </p>
            <Link href="/customize" className="btn-primary rounded-2xl px-8 py-4 text-[15px] inline-flex items-center gap-3">
              Start Crafting
              <Sparkles size={14} strokeWidth={2.2} />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
