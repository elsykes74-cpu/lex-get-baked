'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/',          icon: '/icons/nav-home.svg',    label: 'Home'    },
  { href: '/menu',      icon: '/icons/nav-menu.svg',    label: 'Menu'    },
  { href: '/customize', icon: '/icons/nav-custom.svg',  label: 'Custom'  },
  { href: '/checkout',  icon: '/icons/nav-cart.svg',    label: 'Cart'    },
  { href: '/contact',   icon: '/icons/nav-contact.svg', label: 'Contact' },
];

export default function BottomNav() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.92)',
            boxShadow: '0 4px 24px rgba(47,35,67,0.10), 0 1px 6px rgba(47,35,67,0.06), inset 0 1px 0 rgba(255,255,255,1)',
          }}
        >
          {NAV.map(({ href, icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center"
                style={{ textDecoration: 'none', gap: scrolled ? '0' : '4px' }}
              >
                {/* Squircle icon container */}
                <div
                  style={{
                    width: scrolled ? 44 : 54,
                    height: scrolled ? 44 : 54,
                    borderRadius: 16,
                    padding: 4,
                    transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                    ...(active ? {
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(224,208,255,0.90) 40%, rgba(247,196,216,0.85) 72%, rgba(243,198,157,0.82) 100%)',
                      border: '1px solid rgba(255,255,255,0.95)',
                      boxShadow: '0 4px 16px rgba(160,120,210,0.22), 0 1px 4px rgba(212,149,106,0.16), inset 0 1px 0 rgba(255,255,255,1)',
                    } : {
                      background: 'rgba(255,255,255,0.35)',
                      border: '1px solid rgba(255,255,255,0.55)',
                    }),
                  }}
                >
                  <img
                    src={icon}
                    alt={label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: 12,
                      opacity: active ? 1 : 0.68,
                      transition: 'all 0.25s ease',
                      filter: active ? 'none' : 'saturate(0.65) brightness(1.05)',
                    }}
                  />
                </div>

                {/* Label — hidden when scrolled */}
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
