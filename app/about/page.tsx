'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Layers, Gift, Leaf, Sparkles, Heart, MapPin, Clock, AtSign } from 'lucide-react';
import NavBar from '@/components/NavBar';

const STATS = [
  { val: '100%', label: 'Scratch-Made',    color: '#C9748F' },
  { val: 'Small', label: 'Batch Always',  color: '#D4956A' },
  { val: '1 wk',  label: 'Lead Time',     color: '#9B7EBC' },
  { val: 'WMA',   label: 'Local Pickup',  color: '#6B8C7A' },
];

const VALUES = [
  { Icon: Sparkles, title: 'Gourmet Stuffed Cookies', desc: 'Thick, pillowy cookies stuffed with gooey fillings — s\'mores, Oreo, M&M caramel, and more. Baked fresh in small batches.', color: '#C9748F' },
  { Icon: Layers,   title: 'Classic Cookie Flavors',  desc: 'From Classic Chocolate Chip to Reese\'s Chocolate Chunk — every classic is made from scratch with quality ingredients and a whole lot of love.', color: '#D4956A' },
  { Icon: Gift,     title: 'Build Your Own Mini Cake', desc: 'Personal cakes made to match your cravings. Pick your base, frosting, two toppings, and syrup. A whole dessert experience in one hand.', color: '#9B7EBC' },
  { Icon: Leaf,     title: 'Dessert Catering & Events', desc: 'Birthdays, baby showers, weddings, corporate events, and farmers markets. Seasonal specialty drops throughout the year too.', color: '#6B8C7A' },
];

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="relative min-h-[100svh] bg-page-bg pt-[5.5rem] pb-32 sm:pb-16 px-4 lg:px-16 xl:px-24">
        <div className="max-w-[1200px] mx-auto">

          {/* ── MOBILE Header ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 mb-8 lg:hidden"
          >
            <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">Our Story</p>
            <h1 className="font-display text-[32px] italic font-bold text-plum mb-1 leading-tight">
              Baked with Love
            </h1>
            <span className="font-display text-[32px] italic font-bold text-shimmer leading-tight">
              Since Day One
            </span>
          </motion.div>

          {/* ── DESKTOP Editorial Header (2-column split) ──────────── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-end mt-8 mb-16"
          >
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-4 text-muted">Our Story</p>
              <h1
                className="font-display italic font-bold text-plum leading-[.88] mb-3"
                style={{ fontSize: 'clamp(72px, 7.5vw, 108px)' }}
              >
                Baked with Love
              </h1>
              <span
                className="font-display italic font-bold text-shimmer leading-[.88]"
                style={{ fontSize: 'clamp(72px, 7.5vw, 108px)' }}
              >
                Since Day One
              </span>
            </div>

            <div className="pb-2">
              <p className="text-[22px] leading-relaxed font-medium text-plum/65 mb-6" style={{ maxWidth: '520px' }}>
                A Westfield, Massachusetts small-batch dessert studio — gourmet stuffed cookies, classic cookies, build-your-own mini cakes, and dessert catering for every occasion.
              </p>
              <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(212,149,106,0.22), transparent)' }} />
              <p className="font-display text-[24px] italic font-bold text-plum leading-snug" style={{ maxWidth: '460px' }}>
                &ldquo;Everything is made from scratch in small batches using quality ingredients and a whole lot of love.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* ── Mission card — mobile only ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="glass-card rounded-[28px] p-7 mb-5 lg:hidden"
          >
            <p className="text-[14px] leading-relaxed font-medium text-plum/70 mb-5">
              A Westfield, Massachusetts small-batch dessert studio — gourmet stuffed cookies, classic cookies, build-your-own mini cakes, and dessert catering for every occasion.
            </p>
            <div className="divider-rg mb-5" />
            <p className="font-display text-[18px] italic font-bold text-plum leading-relaxed">
              &ldquo;Everything is made from scratch in small batches using quality ingredients and a whole lot of love.&rdquo;
            </p>
          </motion.div>

          {/* ── Stats ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-16"
          >
            {STATS.map(({ val, label, color }) => (
              <div key={label} className="glass-card rounded-[24px] overflow-hidden text-center">
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}44, ${color})` }} />
                <div className="p-5 lg:p-8">
                  <p className="font-display text-[26px] lg:text-[48px] font-bold text-shimmer mb-1 lg:mb-2">{val}</p>
                  <p className="text-[11px] lg:text-[13px] font-bold text-muted">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Meet Lex ────────────────────────────────────────────── */}
          <div className="h-px mb-8 lg:mb-12" style={{ background: 'rgba(47,35,67,0.07)' }} />

          <p className="text-[9px] lg:text-[12px] tracking-[0.18em] uppercase font-bold mb-5 lg:mb-8 text-muted">
            The Baker Behind the Magic
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="glass-card rounded-[32px] p-6 lg:p-10 mb-8 lg:mb-14 lg:grid lg:grid-cols-[auto_1fr] lg:gap-10 lg:items-start"
          >
            {/* Photo */}
            <div className="flex justify-center mb-6 lg:mb-0 lg:justify-start">
              <div className="ring-rosegold" style={{ width: 'fit-content' }}>
                <div
                  className="rounded-[28px] overflow-hidden"
                  style={{ width: 180, height: 220 }}
                >
                  <Image
                    src="/lex.png"
                    alt="Lex — Founder & Head Baker"
                    width={180}
                    height={220}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <p className="font-display text-[22px] lg:text-[28px] italic font-bold text-plum">Alexa</p>
                <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-bold"
                  style={{ background: 'rgba(201,116,143,0.10)', color: '#C9748F', border: '1px solid rgba(201,116,143,0.20)' }}>
                  Owner & Baker
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4 text-[12px] font-semibold text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} strokeWidth={2} />
                  Westfield, Massachusetts
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={11} strokeWidth={2} />
                  1 week lead time
                </span>
              </div>

              <p className="text-[14px] lg:text-[16px] leading-relaxed text-plum/72 mb-4">
                Hi, I&apos;m Alexa — owner and baker behind Lex Get Baked. At Lex Get Baked, everything is made from scratch in small batches using quality ingredients and a whole lot of love. From gourmet stuffed cookies to build-your-own mini cakes, my goal is to create desserts that not only taste amazing but make every moment feel a little more special.
              </p>
              <p className="text-[14px] lg:text-[16px] leading-relaxed text-plum/72 mb-5">
                Thank you for being here and supporting my small business — it truly means everything. Pickup is available in Westfield, with local delivery to West Springfield, Holyoke, Chicopee, Springfield, and surrounding towns.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="https://bakesy.shop/b/lex-get-baked"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost rounded-[14px] flex items-center gap-2 px-4 cursor-pointer"
                  style={{ height: '44px', fontSize: '13px' }}
                >
                  <AtSign size={14} strokeWidth={2} />
                  Lex Get Baked
                </a>
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-muted">
                  <Heart size={11} strokeWidth={2} style={{ color: '#C9748F' }} />
                  Made with love
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Values ──────────────────────────────────────────────── */}
          <div className="h-px mb-8 lg:mb-12" style={{ background: 'rgba(47,35,67,0.07)' }} />

          <p className="text-[9px] lg:text-[12px] tracking-[0.18em] uppercase font-bold mb-5 lg:mb-8 text-muted">
            What We Stand For
          </p>
          <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-5 mb-10 lg:mb-16">
            {VALUES.map(({ Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.42 }}
                className="glass-card rounded-[22px] p-4 lg:p-7 flex items-start gap-4 lg:gap-5"
              >
                <div
                  className="w-11 h-11 lg:w-14 lg:h-14 rounded-[14px] lg:rounded-[18px] flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1.5px solid ${color}28` }}
                >
                  <Icon size={20} strokeWidth={1.8} style={{ color }} />
                </div>
                <div>
                  <p className="text-[14px] lg:text-[20px] font-bold text-plum mb-1">{title}</p>
                  <p className="text-[13px] lg:text-[17px] leading-relaxed font-medium text-muted">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="divider-rg mb-8 lg:mb-12" />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 lg:flex-row lg:gap-4"
            style={{ maxWidth: '480px' }}
          >
            <Link
              href="/menu"
              className="btn-primary rounded-[18px] flex items-center justify-center gap-2 flex-1"
              style={{ height: '60px', fontSize: '16px' }}
            >
              Explore the Menu
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              href="/contact"
              className="btn-ghost rounded-[18px] flex items-center justify-center gap-2 flex-1"
              style={{ height: '60px', fontSize: '16px' }}
            >
              Work with Lex
              <ArrowRight size={15} strokeWidth={2} style={{ opacity: 0.45 }} />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
