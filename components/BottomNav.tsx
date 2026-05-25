'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const NAV = [
  { href: '/',          icon: '🏠', label: 'Home'    },
  { href: '/menu',      icon: '🍪', label: 'Menu'    },
  { href: '/customize', icon: '✨', label: 'Custom'  },
  { href: '/checkout',  icon: '🛍', label: 'Cart'    },
  { href: '/contact',   icon: '💌', label: 'Contact' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 inset-x-4 z-50 sm:hidden">
      <div
        className="rounded-2xl px-1.5 py-1.5 flex items-center justify-around"
        style={{
          background: 'rgba(255,255,255,0.68)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1.5px solid rgba(255,255,255,0.9)',
          boxShadow: '0 8px 32px rgba(80,60,140,0.18), inset 0 1.5px 0 rgba(255,255,255,1)',
        }}
      >
        {NAV.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all',
                active ? 'btn-iridescent shadow-btn scale-105' : '',
              )}
              style={!active ? { color: 'rgba(45,26,74,0.55)' } : undefined}
            >
              <span className="text-[15px] leading-none">{icon}</span>
              <span className={clsx('text-[9px] font-bold tracking-wide', active ? 'text-plum' : '')}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
