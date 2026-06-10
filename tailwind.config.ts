import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base:     '#F4F0F8',
        secondary:'#EDE6F6',
        accent:   '#F7C4D8',
        luxury:   '#F3C69D',
        plum:     { DEFAULT: '#2F2343', mid: 'rgba(47,35,67,0.72)', soft: 'rgba(47,35,67,0.52)', faint: 'rgba(47,35,67,0.35)' },
        muted:    '#6C6580',
        lavender: { DEFAULT: '#B4ACCC', light: '#D8D2EC', dark: '#8A82AC', faint: '#F2EFFE' },
        blush:    { DEFAULT: '#D4A8B8', light: '#EDD8E4', dark: '#B87890' },
        rosegold: { DEFAULT: '#D4956A', light: '#E8BA90', dark: '#B87040' },
        pearl:    { DEFAULT: '#FBF7FF', light: '#FFFFFF',  dark: '#EDE8F8' },
        rose:     { DEFAULT: '#C9748F', light: '#E8A4B8',  dark: '#9E4F6A' },
        gold:     { DEFAULT: '#D4956A', light: '#E8B890',  dark: '#B07040' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-bg': 'linear-gradient(160deg, #EDE6F6 0%, #E8E0F0 30%, #F0EAF8 65%, #F7F4FC 100%)',
        'page-bg': 'linear-gradient(160deg, #F4F0F8 0%, #EDE6F6 45%, #EAE4F2 100%)',
        'brand-gradient':    'linear-gradient(135deg, #9B7EBC 0%, #C9748F 55%, #D4956A 100%)',
        'rosegold-gradient': 'linear-gradient(135deg, #D4956A 0%, #E8BA90 50%, #C9748F 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.65) 100%)',
      },
      boxShadow: {
        'glass':      '0 4px 20px rgba(80,60,140,0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
        'card':       '0 4px 20px rgba(80,60,140,0.07), 0 1px 4px rgba(80,60,140,0.04), inset 0 1px 0 rgba(255,255,255,1)',
        'card-hover': '0 12px 40px rgba(80,60,140,0.12), 0 3px 10px rgba(80,60,140,0.07), inset 0 1px 0 rgba(255,255,255,1)',
        'glow':       '0 0 32px rgba(201,116,143,0.32)',
        'glow-gold':  '0 0 32px rgba(212,149,106,0.35)',
        'btn':        '0 4px 18px rgba(47,35,67,0.24), 0 1px 4px rgba(47,35,67,0.12)',
        'btn-irr':    '0 4px 18px rgba(160,120,210,0.22), 0 1px 6px rgba(212,149,106,0.14)',
      },
      animation: {
        'float':        'float 7s ease-in-out infinite',
        'pulse-soft':   'pulseSoft 3s ease-in-out infinite',
        'pulse-glow':   'pulse-glow 3s ease-in-out infinite',
        'shimmer':      'shimmer 2.8s linear infinite',
        'skeleton':     'skeleton-shimmer 1.4s infinite',
        'rise':         'rise 0.55s cubic-bezier(0.16,1,0.3,1) both',
        'btn-shine':    'btn-shine 3.2s ease-in-out infinite',
        'nav-pill-in':  'nav-pill-in 0.22s cubic-bezier(0.16,1,0.3,1) both',
        'bounce-add':   'bounce-add 0.4s cubic-bezier(0.16,1,0.3,1)',
        'blob':         'blob 9s ease-in-out infinite',
        'ring-spin':    'ring-spin 12s linear infinite',
        'marquee':      'marquee 28s linear infinite',
        'marquee-rev':  'marquee-reverse 28s linear infinite',
      },
      borderRadius: {
        'xl2': '20px',
        'xl3': '24px',
        'xl4': '28px',
        'xl5': '36px',
      },
    },
  },
  plugins: [],
};

export default config;
