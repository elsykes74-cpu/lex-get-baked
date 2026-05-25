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
      <div className="glass-card rounded-2xl px-2 py-2 flex items-center justify-around">
        {NAV.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all',
                active
                  ? 'btn-iridescent shadow-btn scale-105'
                  : 'text-white/55 hover:text-white hover:bg-white/15',
              )}
            >
              <span className="text-base leading-none">{icon}</span>
              <span className="text-[9px] font-medium tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
