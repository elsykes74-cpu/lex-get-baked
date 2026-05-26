'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const NAV = [
  { href: '/',          icon: '/icons/nav-home.svg',    label: 'Home'    },
  { href: '/menu',      icon: '/icons/nav-menu.svg',    label: 'Menu'    },
  { href: '/customize', icon: '/icons/nav-custom.svg',  label: 'Custom'  },
  { href: '/checkout',  icon: '/icons/nav-cart.svg',    label: 'Cart'    },
  { href: '/contact',   icon: '/icons/nav-contact.svg', label: 'Contact' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 sm:hidden"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 6px)' }}
    >
      <div className="mx-3 mb-2">
        <div
          className="rounded-3xl px-2 py-2 flex items-center justify-around"
          style={{
            background: 'rgba(255,255,255,0.68)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1.5px solid rgba(255,255,255,0.90)',
            boxShadow: '0 8px 40px rgba(80,60,140,0.16), 0 2px 8px rgba(80,60,140,0.10), inset 0 1.5px 0 rgba(255,255,255,1)',
          }}
        >
          {NAV.map(({ href, icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 min-w-[56px]"
                style={{ textDecoration: 'none' }}
              >
                {/* Squircle icon container */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    padding: 4,
                    transition: 'all 0.2s ease',
                    ...(active ? {
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(224,208,255,0.92) 40%, rgba(255,200,224,0.88) 70%, rgba(255,228,208,0.85) 100%)',
                      border: '1.5px solid rgba(255,255,255,0.95)',
                      boxShadow: '0 6px 20px rgba(160,120,210,0.30), 0 2px 6px rgba(212,149,106,0.20), inset 0 1.5px 0 rgba(255,255,255,1)',
                    } : {
                      background: 'rgba(255,255,255,0.30)',
                      border: '1.5px solid rgba(255,255,255,0.50)',
                      boxShadow: '0 2px 8px rgba(80,60,140,0.08)',
                    }),
                  }}
                >
                  <img
                    src={icon}
                    alt={label}
                    width={48}
                    height={48}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: 12,
                      opacity: active ? 1 : 0.72,
                      transition: 'opacity 0.2s ease',
                      filter: active ? 'none' : 'saturate(0.7)',
                    }}
                  />
                </div>
                <span
                  className="text-[9px] font-semibold tracking-wide leading-none"
                  style={{
                    color: active ? '#3D2260' : 'rgba(45,26,74,0.44)',
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
