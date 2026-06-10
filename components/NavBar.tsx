'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Settings2 } from 'lucide-react';
import clsx from 'clsx';
import { useCart } from '@/lib/cart-context';

const LINKS = [
  { href: '/',          label: 'Home'    },
  { href: '/menu',      label: 'Menu'    },
  { href: '/customize', label: 'Custom'  },
  { href: '/about',     label: 'About'   },
  { href: '/contact',   label: 'Contact' },
];

export default function NavBar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const { count }               = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled ? 'glass-card shadow-card' : 'bg-transparent',
        )}
        style={scrolled ? { backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' } : undefined}
      >
        <div
          className="px-4 sm:px-6 lg:px-16 xl:px-24 flex items-center justify-between w-full max-w-[1440px] mx-auto transition-all duration-300"
          style={{ height: scrolled ? '60px' : '88px' }}
        >

          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <div
              className="rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{
                width:  scrolled ? 40 : 56,
                height: scrolled ? 40 : 56,
                background: 'linear-gradient(135deg, #D4956A 0%, #EDD4A8 40%, #C9748F 100%)',
                boxShadow: scrolled
                  ? '0 2px 8px rgba(212,149,106,0.22), inset 0 1px 0 rgba(255,255,255,0.5)'
                  : '0 3px 14px rgba(212,149,106,0.30), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              <span
                className="font-display font-bold text-white transition-all duration-300"
                style={{ fontSize: scrolled ? '15px' : '21px' }}
              >
                L
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-0.5">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200',
                  pathname === href
                    ? 'btn-iridescent shadow-btn-irr'
                    : 'text-plum/60 hover:text-plum hover:bg-white/40',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Admin toggle — discrete, for owner use */}
            <Link
              href="/admin"
              className="w-8 h-8 rounded-xl glass hidden sm:flex items-center justify-center text-plum/30 hover:text-plum/70 transition-all"
              title="Admin panel"
              aria-label="Admin panel"
            >
              <Settings2 size={14} strokeWidth={2} />
            </Link>

            <Link
              href="/checkout"
              className="glass flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-plum/75 hover:text-plum transition-all"
            >
              <ShoppingBag size={13} strokeWidth={2.2} />
              <span className="hidden sm:block">Cart</span>
              <motion.span
                key={count}
                initial={{ scale: 1.4 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white leading-none"
                style={{ background: count > 0 ? '#C9748F' : 'rgba(47,35,67,0.28)' }}
              >
                {count > 9 ? '9+' : count}
              </motion.span>
            </Link>

            <button
              onClick={() => setOpen(v => !v)}
              className="sm:hidden w-8 h-8 rounded-xl glass flex items-center justify-center text-plum/70 hover:text-plum transition-all"
              aria-label="Toggle menu"
            >
              {open ? <X size={16} strokeWidth={2.5} /> : <Menu size={16} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 sm:hidden"
              style={{ background: 'rgba(47,35,67,0.12)', backdropFilter: 'blur(4px)' }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}
              className="fixed top-[92px] inset-x-4 z-40 glass-card rounded-[28px] p-2.5 flex flex-col gap-0.5 sm:hidden"
            >
              {LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    'px-4 py-3 rounded-2xl text-sm font-semibold transition-all',
                    pathname === href
                      ? 'btn-iridescent'
                      : 'text-plum/65 hover:text-plum hover:bg-white/40',
                  )}
                >
                  {label}
                </Link>
              ))}
              <div className="divider my-1" />
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-semibold text-plum/65 hover:text-plum hover:bg-white/40 transition-all flex items-center gap-2"
              >
                <ShoppingBag size={14} strokeWidth={2} />
                Cart
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
