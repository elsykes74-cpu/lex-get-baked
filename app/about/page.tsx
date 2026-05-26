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
      <div className="relative min-h-[100svh] bg-page-bg pt-[4.5rem] pb-32 sm:pb-16 px-4">
        <div className="max-w-lg mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 mb-8"
          >
            <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">Our Story</p>
            <h1 className="font-display text-[32px] italic font-bold text-plum mb-1 leading-tight">
              Baked with Love
            </h1>
            <span className="font-display text-[32px] italic font-bold text-shimmer leading-tight">
              Since Day One
            </span>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="glass-card rounded-[28px] p-7 mb-5"
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-3 mb-8"
          >
            {STATS.map(({ val, label }) => (
              <div key={label} className="glass-card rounded-[24px] p-5 text-center">
                <p className="font-display text-[26px] font-bold text-shimmer mb-1">{val}</p>
                <p className="text-[11px] font-bold text-muted">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Values */}
          <p className="text-[9px] tracking-[0.18em] uppercase font-bold mb-5 text-muted">
            What We Stand For
          </p>
          <div className="space-y-3 mb-10">
            {VALUES.map(({ emoji, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.42 }}
                className="glass-card rounded-[22px] p-4 flex items-start gap-4"
              >
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${color}15`, border: `1.5px solid ${color}28` }}
                >
                  {emoji}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-plum mb-0.5">{title}</p>
                  <p className="text-[13px] leading-relaxed font-medium text-muted">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="divider-rg mb-8" />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <Link href="/menu" className="btn-primary rounded-[18px] h-14 text-[15px] flex items-center justify-center gap-2">
              Explore the Menu
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link href="/contact" className="btn-ghost rounded-[18px] h-14 text-[15px] flex items-center justify-center gap-2">
              Get in Touch
              <ArrowRight size={15} strokeWidth={2} style={{ opacity: 0.45 }} />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
