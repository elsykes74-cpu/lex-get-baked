'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/menu',      label: 'Menu'      },
  { href: '/customize', label: 'Customize' },
  { href: '/about',     label: 'About'     },
];

export default function NavBar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass-card shadow-card'
            : 'bg-transparent backdrop-blur-sm',
        )}
      >
        <div className="px-5 py-3.5 flex items-center justify-between max-w-2xl mx-auto">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Rose-gold logomark */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #D4956A, #C9748F)',
                boxShadow: '0 2px 8px rgba(212,149,106,0.4)',
              }}
            >
              🍪
            </div>
            <span
              className="font-display text-base font-semibold tracking-wide"
              style={{
                color: scrolled ? '#2D1A4A' : 'rgba(255,255,255,0.95)',
                textShadow: scrolled ? 'none' : '0 1px 8px rgba(4,0,20,0.45)',
              }}
            >
              Lex Get Baked
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-0.5">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200',
                  pathname === href
                    ? 'btn-iridescent shadow-btn'
                    : scrolled
                      ? 'text-plum/65 hover:text-plum hover:bg-plum/8'
                      : 'text-white/70 hover:text-white hover:bg-white/12',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/checkout"
              className={clsx(
                'px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all',
                scrolled
                  ? 'glass text-plum hover:shadow-glass'
                  : 'glass text-white/88 hover:text-white hover:shadow-glow',
              )}
            >
              <span>🧁</span>
              <span>Cart</span>
              <span
                className="text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                style={{ background: '#C9748F' }}
              >
                0
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              className={clsx(
                'sm:hidden p-2 rounded-xl transition-all',
                scrolled ? 'glass text-plum' : 'glass text-white/80',
              )}
              aria-label="Toggle menu"
            >
              <span className={clsx('block w-4 h-0.5 bg-current mb-1 transition-transform', open && 'rotate-45 translate-y-1.5')} />
              <span className={clsx('block w-4 h-0.5 bg-current mb-1 transition-opacity', open && 'opacity-0')} />
              <span className={clsx('block w-4 h-0.5 bg-current transition-transform', open && '-rotate-45 -translate-y-1.5')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] inset-x-4 z-40 glass-card rounded-3xl p-3 flex flex-col gap-1 sm:hidden"
          >
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'px-4 py-3 rounded-2xl text-sm font-semibold transition-all',
                  pathname === href ? 'btn-iridescent' : 'text-plum/70 hover:text-plum hover:bg-white/25',
                )}
              >
                {label}
              </Link>
            ))}
            <div className="divider-rg my-1" />
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-2xl text-sm font-semibold text-plum/70 hover:text-plum hover:bg-white/25 transition-all"
            >
              🧁 Cart
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
