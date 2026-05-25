'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const LINKS = [
  { href: '/',         label: 'Home'      },
  { href: '/menu',     label: 'Menu'      },
  { href: '/customize',label: 'Customize' },
  { href: '/about',    label: 'About'     },
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
          'fixed top-0 inset-x-0 z-50 px-5 py-3 flex items-center justify-between transition-all duration-300',
          scrolled ? 'glass shadow-glass' : 'bg-transparent',
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="text-lg font-display font-semibold text-white tracking-wide">
            Lex Get Baked
          </span>
          <span className="text-[10px] text-white/40 hidden sm:block">✦</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                pathname === href
                  ? 'btn-iridescent shadow-btn'
                  : 'text-white/65 hover:text-white hover:bg-white/12',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Cart pill */}
        <Link
          href="/checkout"
          className="glass px-3 py-1.5 rounded-full text-xs font-semibold text-white/85 hover:text-white flex items-center gap-1.5 transition-all hover:shadow-glow"
        >
          <span>🧁</span>
          <span>Cart</span>
          <span className="bg-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className="sm:hidden p-2 rounded-xl glass text-white/75"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 inset-x-3 z-40 glass-card rounded-2xl p-3 flex flex-col gap-1 sm:hidden"
          >
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  pathname === href
                    ? 'btn-iridescent'
                    : 'text-white/70 hover:text-white hover:bg-white/15',
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/15 transition-colors"
            >
              🧁 Cart
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
