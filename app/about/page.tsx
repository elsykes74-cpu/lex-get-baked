'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const STAGGER = { show: { transition: { staggerChildren: 0.12 } } };

const STATS = [
  { val: '100%', label: 'Scratch-made' },
  { val: '48hr',  label: 'Max shelf life' },
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

          {/* Hero text */}
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="show"
            className="text-center mb-14"
          >
            <motion.div variants={FADE_UP} className="text-6xl mb-6 animate-float-slow">🍪</motion.div>
            <motion.p variants={FADE_UP} className="text-[9px] tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Our Story
            </motion.p>
            <motion.h1 variants={FADE_UP} className="font-display text-4xl italic text-white leading-tight mb-5">
              Baked with Love<br />
              <span className="text-shimmer not-italic">Since Day One</span>
            </motion.h1>
            <motion.p variants={FADE_UP} className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Lex Get Baked is a Western Massachusetts small-batch dessert experience built around
              love, flavor, and unforgettable presentation. Every bite tells a story.
            </motion.p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-2 gap-3 mb-12"
          >
            {STATS.map(({ val, label }) => (
              <div key={label} className="glass-card rounded-3xl p-5 text-center">
                <p className="font-display text-3xl text-shimmer mb-1">{val}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Mission statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="glass-card rounded-3xl p-7 mb-10"
          >
            <p className="text-[9px] tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Our Mission
            </p>
            <p className="font-display text-xl italic text-white leading-relaxed mb-4">
              &ldquo;To turn ordinary moments into extraordinary memories — one perfectly crafted dessert at a time.&rdquo;
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
              We believe dessert isn&apos;t just food. It&apos;s an experience. A feeling. A memory.
              That&apos;s why every cookie, every cake, every truffle we make carries the same intention:
              to bring you pure, unapologetic joy.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <p className="text-[9px] tracking-widest uppercase mb-5 text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>
              What We Stand For
            </p>
            <div className="space-y-3">
              {VALUES.map(({ emoji, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="glass-card rounded-2xl p-4 flex items-start gap-4"
                >
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-white mb-0.5">{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Ready to experience the difference?
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/menu" className="btn-iridescent px-8 py-4 rounded-2xl text-sm text-center">
                Explore the Sensory Menu ✦
              </Link>
              <Link href="/contact" className="glass px-8 py-4 rounded-2xl text-sm text-center text-white/75 hover:text-white transition-colors">
                Get in Touch →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
