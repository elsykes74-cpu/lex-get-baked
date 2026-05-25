'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, Wand2, ShoppingBag, Mail } from 'lucide-react';
import clsx from 'clsx';

const NAV = [
  { href: '/',          Icon: Home,            label: 'Home'    },
  { href: '/menu',      Icon: UtensilsCrossed, label: 'Menu'    },
  { href: '/customize', Icon: Wand2,           label: 'Custom'  },
  { href: '/checkout',  Icon: ShoppingBag,     label: 'Cart'    },
  { href: '/contact',   Icon: Mail,            label: 'Contact' },
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
          className="rounded-2xl px-1 py-1.5 flex items-center justify-around"
          style={{
            background: 'rgba(255,255,255,0.74)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1.5px solid rgba(255,255,255,0.92)',
            boxShadow: '0 8px 32px rgba(80,60,140,0.18), inset 0 1.5px 0 rgba(255,255,255,1)',
          }}
        >
          {NAV.map(({ href, Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-0.5 min-w-[52px] min-h-[48px] justify-center"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="nav-icon-wrap"
                  style={active ? {
                    background: 'linear-gradient(150deg, #FFFFFF 0%, rgba(224,208,255,0.97) 28%, rgba(255,200,224,0.94) 58%, rgba(255,228,208,0.90) 100%)',
                    border: '1.5px solid rgba(255,255,255,0.95)',
                    boxShadow: '0 4px 16px rgba(160,120,210,0.28), 0 1px 4px rgba(212,149,106,0.18), inset 0 1px 0 rgba(255,255,255,1)',
                  } : {
                    background: 'transparent',
                    border: '1.5px solid transparent',
                  }}
                >
                  <Icon
                    size={17}
                    strokeWidth={active ? 2.4 : 1.8}
                    style={{ color: active ? '#3D2260' : 'rgba(45,26,74,0.50)' }}
                  />
                </div>
                <span
                  className="text-[8px] font-bold tracking-wide leading-none"
                  style={{ color: active ? '#3D2260' : 'rgba(45,26,74,0.42)' }}
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
