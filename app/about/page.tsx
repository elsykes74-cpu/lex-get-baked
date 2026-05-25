'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const STATS = [
  { val: '100%', label: 'Scratch-made' },
  { val: '48hr', label: 'Max shelf life' },
  { val: 'Local', label: 'Ingredients' },
  { val: '∞',    label: 'Made with love' },
];

const VALUES = [
  { emoji: '🌾', title: 'Small Batch Quality',   desc: 'Every order is made fresh. We never mass-produce or freeze our desserts.' },
  { emoji: '🎂', title: 'Celebration Desserts',  desc: 'From birthdays to proposals, we craft moments you\'ll remember forever.' },
  { emoji: '🌿', title: 'Local Ingredients',     desc: 'Sourced from Western Massachusetts farms and artisan suppliers.' },
  { emoji: '✨', title: 'Custom Everything',     desc: 'No order is too unique. Tell us your vision and we\'ll make it real.' },
];

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-page-bg pt-20 pb-28 px-5 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-lg mx-auto">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-10"
          >
            <div className="text-6xl mb-5 animate-float-slow">🍪</div>
            <p className="text-[9px] tracking-[0.15em] uppercase font-bold mb-2 text-plum/50">Our Story</p>
            <h1 className="font-display text-4xl italic font-bold text-white mb-4" style={{ textShadow: '0 2px 12px rgba(10,4,36,0.3)' }}>
              Baked with Love<br />
              <span className="text-shimmer not-italic">Since Day One</span>
            </h1>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="glass-card rounded-3xl p-7 mb-6"
          >
            <p className="text-sm leading-relaxed font-medium text-plum/72 mb-4">
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
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
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
          <p className="text-[9px] tracking-[0.15em] uppercase font-bold mb-5 text-center text-plum/50">
            What We Stand For
          </p>
          <div className="space-y-3 mb-10">
            {VALUES.map(({ emoji, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }}
                className="glass-card rounded-2xl p-4 flex items-start gap-4"
              >
                <span className="text-2xl flex-shrink-0 animate-float-slow">{emoji}</span>
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
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="flex flex-col gap-3"
          >
            <Link href="/menu" className="btn-iridescent px-8 py-4 rounded-2xl text-sm text-center">
              Explore the Sensory Menu ✦
            </Link>
            <Link href="/contact" className="glass-card px-8 py-4 rounded-2xl text-sm text-center font-bold text-plum/65 hover:text-plum transition-colors">
              Get in Touch →
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
