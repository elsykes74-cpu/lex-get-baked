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
  { href: '/checkout',  label: 'Order'     },
];

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 px-5 py-3 flex items-center justify-between transition-all duration-300',
          scrolled ? 'glass-dark shadow-glass' : 'bg-transparent',
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-display font-semibold text-shimmer">Lex Get Baked</span>
          <span className="text-[10px] tracking-widest text-cream/40 uppercase hidden sm:block">✦ Artisan</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200',
                pathname === href
                  ? 'bg-rose/20 text-rose-light border border-rose/30'
                  : 'text-cream/60 hover:text-cream hover:bg-white/5',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Cart pill */}
        <Link
          href="/checkout"
          className="glass px-3 py-1.5 rounded-full text-xs font-medium text-cream/80 hover:text-cream flex items-center gap-1.5 transition-all hover:shadow-glow"
        >
          <span>🧁</span>
          <span>Cart</span>
          <span className="bg-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className="sm:hidden p-2 rounded-lg glass text-cream/70"
          aria-label="Toggle menu"
        >
          <span className={clsx('block w-4 h-0.5 bg-current mb-1 transition-transform', open && 'rotate-45 translate-y-1.5')} />
          <span className={clsx('block w-4 h-0.5 bg-current mb-1 transition-opacity', open && 'opacity-0')} />
          <span className={clsx('block w-4 h-0.5 bg-current transition-transform', open && '-rotate-45 -translate-y-1.5')} />
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-14 inset-x-3 z-40 glass-dark rounded-2xl p-4 flex flex-col gap-1 sm:hidden"
          >
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  pathname === href ? 'bg-rose/20 text-rose-light' : 'text-cream/70 hover:text-cream hover:bg-white/5',
                )}
              >
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
