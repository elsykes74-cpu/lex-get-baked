'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, Sparkles, ShoppingBag, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';

const NAV = [
  { href: '/',          Icon: Home,            label: 'Home'    },
  { href: '/menu',      Icon: UtensilsCrossed,  label: 'Menu'    },
  { href: '/customize', Icon: Sparkles,         label: 'Custom'  },
  { href: '/checkout',  Icon: ShoppingBag,      label: 'Cart'    },
  { href: '/contact',   Icon: Mail,             label: 'Contact' },
];

export default function BottomNav() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { count }               = useCart();

  if (pathname.startsWith('/admin')) return null;

  useEffect(() => {
    let lastY = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 80 && y > lastY);
      lastY = y;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 sm:hidden"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
    >
      <div className="mx-4 mb-2">
        <div
          className="rounded-[28px] flex items-center justify-around transition-all duration-300"
          style={{
            padding: scrolled ? '6px 8px' : '10px 8px',
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.88)',
            boxShadow: '0 2px 16px rgba(47,35,67,0.07), 0 1px 4px rgba(47,35,67,0.04), inset 0 1px 0 rgba(255,255,255,1)',
          }}
        >
          {NAV.map(({ href, Icon, label }) => {
            const active   = pathname === href;
            const isCart   = href === '/checkout';
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center relative"
                style={{ textDecoration: 'none', gap: scrolled ? '0' : '4px' }}
                aria-current={active ? 'page' : undefined}
              >
                <div
                  style={{
                    width: scrolled ? 44 : 54,
                    height: scrolled ? 44 : 54,
                    borderRadius: 16,
                    padding: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                    position: 'relative',
                    ...(active ? {
                      background: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(228,215,255,0.92) 45%, rgba(247,196,216,0.88) 100%)',
                      border: '1px solid rgba(255,255,255,0.96)',
                      boxShadow: '0 3px 12px rgba(160,120,210,0.18), 0 1px 3px rgba(212,149,106,0.12), inset 0 1px 0 rgba(255,255,255,1)',
                    } : {
                      background: 'rgba(255,255,255,0.28)',
                      border: '1px solid rgba(255,255,255,0.48)',
                    }),
                  }}
                >
                  <Icon
                    size={active ? 20 : 18}
                    strokeWidth={active ? 2.2 : 1.8}
                    style={{
                      color: active ? '#2F2343' : 'rgba(47,35,67,0.45)',
                      transition: 'all 0.25s ease',
                    }}
                  />
                  {isCart && count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 1.5 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: '#C9748F',
                        color: 'white',
                        fontSize: '8px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1,
                        border: '1.5px solid rgba(255,255,255,0.9)',
                      }}
                    >
                      {count > 9 ? '9+' : count}
                    </motion.span>
                  )}
                </div>

                {!scrolled && (
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: active ? 700 : 500,
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      color: active ? '#2F2343' : 'rgba(47,35,67,0.42)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
