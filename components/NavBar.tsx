'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/menu',      label: 'Menu'      },
  { href: '/customize', label: 'Custom'    },
  { href: '/about',     label: 'About'     },
  { href: '/contact',   label: 'Contact'   },
];

export default function NavBar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-350',
          scrolled
            ? 'glass-card shadow-card'
            : 'bg-transparent',
        )}
      >
        <div className="px-4 sm:px-5 h-[60px] flex items-center justify-between max-w-2xl mx-auto">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #D4956A 0%, #E8BA90 40%, #C9748F 100%)',
                boxShadow: '0 2px 10px rgba(212,149,106,0.45), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              <span className="font-display text-[13px] font-bold text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.25)' }}>
                L
              </span>
            </div>
            <span
              className="font-display text-[15px] font-semibold tracking-wide leading-none"
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
                  'px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200',
                  pathname === href
                    ? 'btn-iridescent shadow-btn'
                    : scrolled
                      ? 'text-plum/65 hover:text-plum hover:bg-plum/5'
                      : 'text-white/75 hover:text-white hover:bg-white/12',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart pill */}
            <Link
              href="/checkout"
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all',
                scrolled
                  ? 'glass text-plum hover:shadow-glass'
                  : 'glass text-white/90 hover:text-white',
              )}
            >
              <ShoppingBag size={13} strokeWidth={2.2} />
              <span className="hidden sm:block">Cart</span>
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white leading-none"
                style={{ background: '#C9748F' }}
              >
                0
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              className={clsx(
                'sm:hidden w-8 h-8 rounded-xl flex items-center justify-center transition-all',
                scrolled ? 'glass text-plum' : 'glass text-white/80',
              )}
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
              style={{ background: 'rgba(20,10,50,0.2)', backdropFilter: 'blur(4px)' }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}
              className="fixed top-[68px] inset-x-4 z-40 glass-card rounded-3xl p-2.5 flex flex-col gap-0.5 sm:hidden"
            >
              {LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    'px-4 py-3 rounded-2xl text-sm font-semibold transition-all',
                    pathname === href
                      ? 'btn-iridescent shadow-btn'
                      : 'text-plum/70 hover:text-plum hover:bg-white/30',
                  )}
                >
                  {label}
                </Link>
              ))}
              <div className="divider-rg my-1" />
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-semibold text-plum/70 hover:text-plum hover:bg-white/30 transition-all flex items-center gap-2"
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
