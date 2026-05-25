'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const STATS = [
  { val: '100%', label: 'Scratch-made' },
  { val: '48hr', label: 'Max shelf life' },
  { val: 'Local', label: 'Ingredients' },
  { val: '∞',    label: 'Made with love' },
];

const VALUES = [
  { emoji: '🌾', title: 'Small Batch Quality',   desc: 'Every order is made fresh. We never mass-produce or freeze our desserts.', color: '#D4956A' },
  { emoji: '🎂', title: 'Celebration Desserts',  desc: 'From birthdays to proposals, we craft moments you\'ll remember forever.',   color: '#C9748F' },
  { emoji: '🌿', title: 'Local Ingredients',     desc: 'Sourced from Western Massachusetts farms and artisan suppliers.',            color: '#6B8C7A' },
  { emoji: '✨', title: 'Custom Everything',     desc: 'No order is too unique. Tell us your vision and we\'ll make it real.',      color: '#9B7EBC' },
];

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="relative min-h-[100svh] bg-page-bg pt-[4.5rem] pb-28 sm:pb-14 px-4 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-lg mx-auto">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-10 mt-5"
          >
            <div
              className="text-6xl mb-5 inline-block"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              🍪
            </div>
            <p className="text-[9px] tracking-[0.16em] uppercase font-bold mb-2 text-plum/50">Our Story</p>
            <h1 className="font-display text-4xl italic font-bold text-white mb-4" style={{ textShadow: '0 2px 12px rgba(10,4,36,0.3)' }}>
              Baked with Love<br />
              <span className="text-shimmer not-italic">Since Day One</span>
            </h1>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.52 }}
            className="glass-card rounded-3xl p-7 mb-5"
          >
            <p className="text-[13px] leading-relaxed font-medium text-plum/72 mb-4">
              Lex Get Baked is a Western Massachusetts small-batch dessert experience built around
              love, flavor, and unforgettable presentation. Every bite tells a story.
            </p>
            <div className="divider-rg mb-4" />
            <p className="font-display text-lg italic font-bold text-plum leading-relaxed">
              &ldquo;To turn ordinary moments into extraordinary memories — one perfectly crafted dessert at a time.&rdquo;
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.52 }}
            className="grid grid-cols-2 gap-3 mb-8"
          >
            {STATS.map(({ val, label }) => (
              <div key={label} className="glass-card rounded-3xl p-5 text-center">
                <p className="font-display text-3xl font-bold text-shimmer mb-1">{val}</p>
                <p className="text-xs font-bold text-plum/55">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Values */}
          <p className="text-[9px] tracking-[0.16em] uppercase font-bold mb-5 text-center text-plum/50">
            What We Stand For
          </p>
          <div className="space-y-3 mb-10">
            {VALUES.map(({ emoji, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.42 }}
                className="glass-card rounded-2xl p-4 flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
                >
                  {emoji}
                </div>
                <div>
                  <p className="text-sm font-bold text-plum mb-0.5">{title}</p>
                  <p className="text-xs leading-relaxed font-medium text-plum/62">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="divider-rg mb-8" />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.52 }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/menu"
              className="btn-iridescent px-8 py-4 rounded-2xl text-sm text-center flex items-center justify-center gap-2"
            >
              Explore the Sensory Menu
              <Sparkles size={13} strokeWidth={2.2} style={{ color: '#C9748F' }} />
            </Link>
            <Link
              href="/contact"
              className="glass-card px-8 py-4 rounded-2xl text-sm text-center font-bold text-plum/65 hover:text-plum transition-colors flex items-center justify-center gap-2"
            >
              Get in Touch
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
