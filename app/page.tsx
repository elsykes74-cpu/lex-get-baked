'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Sparkles, Pencil, Flame, Gift, Heart, MapPin, Clock } from 'lucide-react';
import NavBar from '@/components/NavBar';
import VideoBackground from '@/components/ui/VideoBackground';
import Marquee from '@/components/ui/Marquee';

const FADE_UP = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};
const STAGGER = { show: { transition: { staggerChildren: 0.10 } } };

const FEATURED = [
  { name: 'Stuffed Cookie Box',  price: '$33', tag: 'Bestseller', color: '#6B4E8C',
    image: '/products/gourmet-stuffed-box.png' },
  { name: 'Classic Choc Chip',   price: '$4',  tag: 'Signature',  color: '#D4956A',
    image: '/products/single-classic-choc-chip.png' },
  { name: "Reese's Chunk",       price: '$4',  tag: 'Fan Fave',   color: '#D4956A',
    image: '/products/single-reeses-chunk.png' },
  { name: 'Build Your Mini Cake',price: '$8',  tag: 'Custom',     color: '#9B7EBC',
    image: '/products/build-your-own-mini-cake.png' },
];

const TESTIMONIALS = [
  { name: 'Sophia M.',  text: 'The most beautiful cookies I\'ve ever seen — tasted even better.',    rating: 5, avatar: 'SM' },
  { name: 'James K.',   text: 'Ordered for my wedding. Every guest asked where they were from.',     rating: 5, avatar: 'JK' },
  { name: 'Priya L.',   text: 'The custom box was perfect. Will never order from anyone else.',      rating: 5, avatar: 'PL' },
];

const STATS = [
  { val: '200+', label: 'Happy Customers', color: '#C9748F' },
  { val: '100%', label: 'Scratch-Made',    color: '#D4956A' },
  { val: '48hr', label: 'Max Lead Time',   color: '#9B7EBC' },
  { val: 'Local', label: 'Ingredients',   color: '#6B8C7A' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    Icon: Pencil,
    title: 'Build Your Box',
    desc: 'Choose your base, filling, finish, and size. Every combination is crafted for you — or go fully custom.',
    color: '#C9748F',
  },
  {
    step: '02',
    Icon: Flame,
    title: 'We Bake Fresh',
    desc: 'Every order is made to order in our Western Mass kitchen. Never frozen, never pre-made, never compromised.',
    color: '#D4956A',
  },
  {
    step: '03',
    Icon: Gift,
    title: 'Pick Up or Deliver',
    desc: 'Ready in 24–48 hours. Packaged in our signature luxury gift boxes — beautiful before it\'s even opened.',
    color: '#9B7EBC',
  },
];

const GALLERY = [
  '/products/gourmet-stuffed-box.png',
  '/products/single-classic-choc-chip.png',
  '/products/single-double-chocolate.png',
  '/products/single-birthday-cake.png',
  '/products/single-mm-crunch.png',
  '/products/single-reeses-chunk.png',
];

const TRUST_ITEMS = [
  'Small Batch Made',
  'Western Massachusetts',
  'Scratch Recipes Daily',
  'No Preservatives',
  'Gluten-Free Options',
  'Custom Orders Welcome',
  '200+ Happy Customers',
  'Locally Sourced',
  'Luxury Gift Packaging',
  'Made To Order',
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

      <section
        ref={heroRef}
        className="relative bg-hero-bg overflow-hidden pt-[5rem] pb-20 md:pt-0 md:pb-0 md:min-h-screen"
      >
        <VideoBackground
          src="/media/bakery-hero.mp4"
          poster="/media/bakery-poster.jpg"
          enabledOnDesktopOnly={false}
          respectReducedMotion
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
          <div style={{
            position: 'absolute', top: '-10%', right: '-10%',
            width: '60vw', height: '60vw', maxWidth: '800px',
            background: 'radial-gradient(ellipse, rgba(247,196,216,0.22) 0%, transparent 65%)',
            borderRadius: '50%',
          }} />
        </div>

        <motion.div
          className="md:hidden"
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
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <div className="ring-rosegold" style={{ animation: 'float 7s ease-in-out infinite' }}>
            <div className="rounded-full overflow-hidden">
              <img
                src="/products/gourmet-stuffed-box.png"
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

        <div className="relative z-20 flex flex-col md:min-h-screen md:max-w-[1440px] md:mx-auto md:w-full">
          <motion.div
            className="hidden md:flex items-center gap-6"
            style={{
              paddingTop: 'clamp(100px, 11vh, 120px)',
              paddingBottom: 'clamp(14px, 1.8vh, 22px)',
              paddingLeft: 'clamp(48px, 6vw, 96px)',
              paddingRight: 'clamp(48px, 6vw, 96px)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,149,106,0.42))' }} />
            <div className="flex items-center gap-3.5 flex-shrink-0">
              <Sparkles size={15} strokeWidth={1.8} style={{ color: '#D4956A' }} />
              <p
                className="font-display italic font-bold text-shimmer"
                style={{ fontSize: 'clamp(26px, 2.6vw, 40px)', letterSpacing: '0.10em', whiteSpace: 'nowrap' }}
              >
                Lex Get Baked
              </p>
              <Sparkles size={15} strokeWidth={1.8} style={{ color: '#C9748F' }} />
            </div>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,116,143,0.42))' }} />
          </motion.div>

          <div
            className="flex-1 flex flex-col md:grid md:items-center"
            style={{
              gridTemplateColumns: 'minmax(520px, 1fr) minmax(460px, .9fr)',
              gap: 'clamp(56px, 7vw, 120px)',
            }}
          >
            <motion.div
              className="relative z-10 flex flex-col w-[65%] max-w-[320px] md:mt-0 md:w-auto md:max-w-none md:justify-center md:pl-[clamp(48px,6vw,96px)] md:pb-16"
              style={{ y: heroY, opacity: heroOpac }}
              variants={STAGGER}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={FADE_UP} className="hidden md:flex items-center gap-2.5 glass px-4 py-2.5 rounded-full mb-7" style={{ width: 'fit-content' }}>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#D4956A" color="#D4956A" />)}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(47,35,67,0.68)', whiteSpace: 'nowrap' }}>
                  5.0 · 200+ happy customers
                </span>
              </motion.div>

              <motion.div variants={FADE_UP} className="mb-3 md:hidden">
                <p className="font-display font-bold text-plum" style={{ fontSize: 'clamp(22px, 4vw, 28px)', letterSpacing: '0.12em' }}>
                  LEX GET BAKED
                </p>
              </motion.div>

              <motion.h1
                variants={FADE_UP}
                className="font-display font-bold text-plum mb-5 md:mb-10 max-w-[300px] md:max-w-none"
                style={{ fontSize: 'clamp(44px, 13vw, 64px)', lineHeight: 0.88, letterSpacing: '-0.04em' }}
              >
                <span className="block md:hidden">
                  Luxury<br />Desserts.<br />
                  <em className="text-shimmer not-italic">Crafted</em><br />by Hand.
                </span>
                <span className="hidden md:block" style={{ fontSize: 'clamp(92px, 8vw, 148px)', letterSpacing: '-0.06em', lineHeight: 0.86 }}>
                  Luxury<br />Desserts.<br />
                  <em className="text-shimmer not-italic">Crafted</em><br />by Hand.
                </span>
              </motion.h1>

              <motion.p variants={FADE_UP} className="leading-[1.55] text-muted font-medium mb-8 md:mb-10" style={{ fontSize: 'clamp(16px, 1.4vw, 24px)', maxWidth: '560px' }}>
                Custom cookies, mini cakes, and unforgettable dessert experiences.
              </motion.p>

              <motion.div variants={FADE_UP} className="flex flex-col gap-3 w-[88%] max-w-[360px] md:w-[380px] md:max-w-[380px]">
                <Link href="/customize" className="btn-primary rounded-[24px] px-6 flex items-center justify-between w-full cursor-pointer" style={{ height: 'clamp(60px, 7vh, 72px)', fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                  <span>Build Your Box</span>
                  <ArrowRight size={17} strokeWidth={2.5} />
                </Link>
                <Link href="/menu" className="btn-ghost rounded-[24px] px-6 flex items-center justify-between w-full cursor-pointer" style={{ height: 'clamp(60px, 7vh, 72px)', fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                  <span>Explore Menu</span>
                  <ArrowRight size={15} strokeWidth={2} style={{ opacity: 0.45 }} />
                </Link>
              </motion.div>

              <motion.div variants={FADE_UP} className="flex items-center gap-2 mt-[14px]">
                <MapPin size={11} strokeWidth={2} style={{ color: '#D4956A', flexShrink: 0 }} />
                <p className="text-muted font-medium" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>Made fresh in Western Massachusetts</p>
              </motion.div>
            </motion.div>

            <div className="hidden md:flex items-center justify-center relative" style={{ paddingRight: 'clamp(48px, 6vw, 96px)' }}>
              <div className="absolute pointer-events-none" style={{ width: 'clamp(460px, 54vw, 920px)', height: 'clamp(460px, 54vw, 920px)', background: 'radial-gradient(ellipse, rgba(247,196,216,0.55) 0%, rgba(243,198,157,0.28) 38%, transparent 65%)', borderRadius: '50%', filter: 'blur(70px)', transform: 'translate(4%, -6%)', zIndex: 0 }} />
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 60 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="relative z-10"
                style={{ width: 'clamp(460px, 38vw, 680px)', flexShrink: 0 }}
              >
                <div className="ring-rosegold" style={{ animation: 'float 7s ease-in-out infinite', position: 'relative', display: 'block' }}>
                  <div className="rounded-full overflow-hidden">
                    <img src="/products/gourmet-stuffed-box.png" alt="Gourmet stuffed cookie" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', filter: 'contrast(1.02) saturate(0.97)', display: 'block' }} />
                  </div>
                  <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at 28% 18%, rgba(255,252,248,0.30) 0%, transparent 55%)' }} />
                </div>
                <div className="absolute glass px-4 py-2.5 rounded-full" style={{ bottom: '-18px', left: '10%' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#D4956A" color="#D4956A" />)}</div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(47,35,67,0.65)', whiteSpace: 'nowrap' }}>5.0 · 200+ orders</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20" animate={{ opacity: [0.3, 0.65, 0.3], y: [0, 5, 0] }} transition={{ duration: 2.6, repeat: Infinity }}>
          <div className="w-px h-6 bg-gradient-to-b from-plum/25 to-transparent" />
          <span className="text-[7px] tracking-[0.28em] uppercase font-semibold text-plum/30">Scroll</span>
        </motion.div>
      </section>

      <div style={{ borderTop: '1px solid rgba(47,35,67,0.07)', borderBottom: '1px solid rgba(47,35,67,0.07)', background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <Marquee items={TRUST_ITEMS} speed={32} className="py-4 text-[10px] font-bold tracking-[0.18em] uppercase text-plum/45" />
      </div>

      <section className="bg-page-bg px-5 lg:px-20 pt-16 lg:pt-24 pb-10 lg:pb-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48 }} className="mb-7 lg:mb-12 flex items-end justify-between">
            <div>
              <p className="text-[9px] lg:text-[11px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">This Week</p>
              <h2 className="font-display text-[28px] lg:text-[44px] font-bold text-plum italic">Featured Collection</h2>
            </div>
            <Link href="/menu" className="text-[12px] lg:text-[14px] font-semibold text-muted hover:text-plum transition-colors flex items-center gap-1 cursor-pointer">All <ArrowRight size={12} /></Link>
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-x-visible lg:mx-0 lg:px-0 lg:pb-0 lg:gap-6">
            {FEATURED.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.42 }} className="snap-start flex-shrink-0 w-[158px] lg:w-auto lg:flex-shrink">
                <Link href="/menu" className="cursor-pointer">
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', damping: 18, stiffness: 320 }} className="glass-card rounded-[28px] overflow-hidden cursor-pointer">
                    <div className="relative h-[130px] lg:h-[260px] overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 1024px) 158px, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-bold" style={{ background: 'rgba(255,255,255,0.92)', color: item.color }}>{item.tag}</div>
                    </div>
                    <div className="p-4 lg:p-5">
                      <p className="font-display text-[14px] lg:text-[22px] font-semibold text-plum leading-tight mb-2 italic">{item.name}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] lg:text-[18px] font-bold text-plum">{item.price}</p>
                        <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={8} fill="#D4956A" color="#D4956A" />)}</div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page-bg px-5 lg:px-20 py-16 lg:py-28 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12 lg:mb-20">
            <p className="text-[9px] lg:text-[11px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">The Process</p>
            <h2 className="font-display text-[28px] lg:text-[48px] font-bold text-plum italic">How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 relative">
            <div className="hidden md:block absolute pointer-events-none" style={{ top: 36, left: '16.66%', right: '16.66%', height: 1, background: 'linear-gradient(to right, rgba(201,116,143,0.20), rgba(212,149,106,0.25), rgba(155,126,188,0.20))' }} />
            {HOW_IT_WORKS.map(({ step, Icon, title, desc, color }, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.52, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center relative">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(ellipse, ${color}22 0%, transparent 70%)`, filter: 'blur(16px)', transform: 'scale(1.5)' }} />
                  <motion.div whileHover={{ scale: 1.06, rotate: 4 }} transition={{ type: 'spring', damping: 16, stiffness: 280 }} className="relative w-16 h-16 rounded-[20px] flex items-center justify-center cursor-default" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF5EC 100%)', border: `2px solid ${color}40`, boxShadow: `0 8px 28px ${color}28, 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)` }}>
                    <Icon size={22} strokeWidth={1.8} style={{ color }} />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, fontSize: '9px', fontWeight: 800, color: 'white', letterSpacing: '0.04em', boxShadow: `0 2px 8px ${color}40` }}>{i + 1}</div>
                </div>
                <h3 className="font-display text-[20px] lg:text-[26px] font-bold text-plum italic mb-3 leading-tight">{title}</h3>
                <p className="text-[14px] lg:text-[16px] leading-relaxed text-muted font-medium" style={{ maxWidth: '280px' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.45 }} className="text-center mt-14 lg:mt-20">
            <Link href="/customize" className="btn-primary rounded-[20px] inline-flex items-center gap-2.5 px-8 cursor-pointer" style={{ height: '56px', fontSize: '15px' }}>Start Your Order <ArrowRight size={15} strokeWidth={2.5} /></Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-page-bg pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20 mb-7 lg:mb-10">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="flex items-end justify-between">
            <div>
              <p className="text-[9px] lg:text-[11px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">Gallery</p>
              <h2 className="font-display text-[28px] lg:text-[44px] font-bold text-plum italic">Made with Love</h2>
            </div>
            <Link href="/menu" className="text-[12px] lg:text-[14px] font-semibold text-muted hover:text-plum transition-colors flex items-center gap-1 cursor-pointer">View Menu <ArrowRight size={12} /></Link>
          </motion.div>
        </div>
        <div className="flex gap-3 lg:gap-4 overflow-x-auto pb-2 px-5 lg:px-20 scrollbar-hide">
          {GALLERY.map((src, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="gallery-card flex-shrink-0 relative overflow-hidden rounded-[24px] lg:rounded-[28px] cursor-pointer" style={{ width: 'clamp(200px, 22vw, 300px)', height: 'clamp(260px, 30vw, 400px)', boxShadow: '0 6px 24px rgba(47,35,67,0.09)' }}>
              <Image src={src} alt={`Gallery image ${i + 1}`} fill className="object-cover transition-transform duration-700 hover:scale-110" sizes="300px" />
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(47,35,67,0.55) 0%, transparent 60%)' }}>
                <Heart size={18} strokeWidth={2} style={{ color: 'rgba(255,255,255,0.85)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-page-bg px-5 lg:px-20 py-10 lg:py-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48 }} className="mb-7 lg:mb-12">
            <p className="text-[9px] lg:text-[11px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">Reviews</p>
            <h2 className="font-display text-[28px] lg:text-[44px] font-bold text-plum italic">Customer Love</h2>
          </motion.div>
          <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.45 }} className="glass-card rounded-[24px] p-5 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px]" style={{ background: 'linear-gradient(to right, #C9748F, #D4956A, #9B7EBC)' }} />
                <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#D4956A" color="#D4956A" />)}</div>
                <p className="text-[15px] lg:text-[17px] leading-relaxed text-plum/75 font-medium mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #C9748F, #D4956A)' }}>{t.avatar}</div>
                  <p className="text-[12px] font-bold text-plum/60">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page-bg px-5 lg:px-20 py-10 lg:py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {STATS.map(({ val, label, color }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.42 }} className="glass-card rounded-[24px] p-5 lg:p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${color}60, transparent)` }} />
                <p className="font-display text-[28px] lg:text-[42px] font-bold mb-1 italic" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{val}</p>
                <p className="text-[11px] lg:text-[13px] font-semibold text-muted leading-tight">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page-bg px-5 lg:px-20 py-10 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="max-w-sm mx-auto lg:max-w-[1440px]">
          <div className="glass-card rounded-[28px] p-7 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(247,196,216,0.10) 0%, rgba(243,198,157,0.08) 100%)' }} />
            <div className="relative z-10">
              <p className="text-[9px] lg:text-[11px] tracking-[0.18em] uppercase font-semibold mb-3 text-muted">Our Story</p>
              <h2 className="font-display text-[30px] lg:text-[56px] italic font-bold text-plum mb-4 lg:mb-6 leading-tight">Small batch.<br />Big love.</h2>
              <p className="text-[14px] lg:text-[19px] leading-relaxed text-plum/62 mb-6" style={{ maxWidth: '580px' }}>Every item is crafted using locally-sourced ingredients, traditional techniques, and a whole lot of heart — in Western Massachusetts. Because dessert should always feel like something special.</p>
              <div className="flex items-center gap-3">
                <Clock size={14} strokeWidth={2} style={{ color: '#D4956A' }} />
                <span className="text-[13px] font-semibold text-muted">Order by Thursday for weekend pickup</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-page-bg px-5 lg:px-20 pb-32 sm:pb-16 lg:pb-24 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="glass-card rounded-[28px] p-8 lg:p-20 text-center max-w-sm lg:max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(247,196,216,0.18) 0%, rgba(243,198,157,0.12) 100%)' }} />
          <div className="relative z-10">
            <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-[18px] lg:rounded-[24px] mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F7C4D8, #F3C69D)', boxShadow: '0 6px 20px rgba(201,116,143,0.22)' }}>
              <ShoppingBag size={22} strokeWidth={2} className="text-plum lg:hidden" />
              <ShoppingBag size={30} strokeWidth={2} className="text-plum hidden lg:block" />
            </div>
            <h3 className="font-display text-[26px] lg:text-[48px] italic font-bold text-plum mb-3">Build Your Dream Box</h3>
            <p className="text-[14px] lg:text-[19px] leading-relaxed text-plum/60 font-medium" style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>Choose your base, fillings, and finishes —<br />baked fresh to your exact specifications.</p>
            <Link href="/customize" className="btn-primary rounded-2xl inline-flex items-center gap-3 cursor-pointer" style={{ height: '64px', paddingLeft: '40px', paddingRight: '40px', fontSize: '17px' }}>Start Crafting <Sparkles size={16} strokeWidth={2.2} /></Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
