'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NavBar from '@/components/NavBar';

const STATS = [
  { val: '100%', label: 'Scratch-made'  },
  { val: '48hr', label: 'Max shelf life' },
  { val: 'Local', label: 'Ingredients'  },
  { val: '∞',    label: 'Made with love' },
];

const VALUES = [
  { emoji: '🌾', title: 'Small Batch Quality',  desc: 'Every order is made fresh. We never mass-produce or freeze our desserts.', color: '#D4956A' },
  { emoji: '🎂', title: 'Celebration Desserts', desc: 'From birthdays to proposals, we craft moments you\'ll remember forever.',   color: '#C9748F' },
  { emoji: '🌿', title: 'Local Ingredients',    desc: 'Sourced from Western Massachusetts farms and artisan suppliers.',            color: '#6B8C7A' },
  { emoji: '✨', title: 'Custom Everything',    desc: 'No order is too unique. Tell us your vision and we\'ll make it real.',      color: '#9B7EBC' },
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
            {/* Left: big headline */}
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

            {/* Right: intro copy */}
            <div className="pb-2">
              <p className="text-[22px] leading-relaxed font-medium text-plum/65 mb-6" style={{ maxWidth: '520px' }}>
                A Western Massachusetts small-batch dessert experience built around love, flavor, and unforgettable presentation. Every bite tells a story.
              </p>
              <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(212,149,106,0.22), transparent)' }} />
              <p className="font-display text-[24px] italic font-bold text-plum leading-snug" style={{ maxWidth: '460px' }}>
                &ldquo;Turn ordinary moments into extraordinary memories.&rdquo;
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
              Lex Get Baked is a Western Massachusetts small-batch dessert experience built around
              love, flavor, and unforgettable presentation. Every bite tells a story.
            </p>
            <div className="divider-rg mb-5" />
            <p className="font-display text-[18px] italic font-bold text-plum leading-relaxed">
              &ldquo;To turn ordinary moments into extraordinary memories — one perfectly crafted dessert at a time.&rdquo;
            </p>
          </motion.div>

          {/* ── Stats ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-16"
          >
            {STATS.map(({ val, label }) => (
              <div key={label} className="glass-card rounded-[24px] p-5 lg:p-8 text-center">
                <p className="font-display text-[26px] lg:text-[48px] font-bold text-shimmer mb-1 lg:mb-2">{val}</p>
                <p className="text-[11px] lg:text-[13px] font-bold text-muted">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* ── Values ──────────────────────────────────────────────── */}
          <div className="h-px mb-8 lg:mb-12" style={{ background: 'rgba(47,35,67,0.07)' }} />

          <p className="text-[9px] lg:text-[12px] tracking-[0.18em] uppercase font-bold mb-5 lg:mb-8 text-muted">
            What We Stand For
          </p>
          <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-5 mb-10 lg:mb-16">
            {VALUES.map(({ emoji, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.42 }}
                className="glass-card rounded-[22px] p-4 lg:p-7 flex items-start gap-4 lg:gap-5"
              >
                <div
                  className="w-11 h-11 lg:w-14 lg:h-14 rounded-[14px] lg:rounded-[18px] flex items-center justify-center text-xl lg:text-2xl flex-shrink-0"
                  style={{ background: `${color}15`, border: `1.5px solid ${color}28` }}
                >
                  {emoji}
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
              Get in Touch
              <ArrowRight size={15} strokeWidth={2} style={{ opacity: 0.45 }} />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
