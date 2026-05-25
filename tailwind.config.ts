import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — pulled from mockup
        rose:    { DEFAULT: '#C9748F', light: '#E8A4B8', dark: '#9E4F6A' },
        gold:    { DEFAULT: '#C4965A', light: '#E2BA87', dark: '#8F6430' },
        plum:    { DEFAULT: '#6B4E8C', light: '#9B7EBC', dark: '#3D2260' },
        cream:   { DEFAULT: '#F5EDE0', light: '#FDF8F2', dark: '#E0CEBC' },
        charcoal:{ DEFAULT: '#1A1220', light: '#2D1F3D', dark: '#0D0A12' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6B4E8C 0%, #C9748F 50%, #C4965A 100%)',
        'card-glass':     'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
        'hero-bg':        'radial-gradient(ellipse at 55% 25%, #2a2245 0%, #1a1530 35%, #0f0e1a 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.12)',
        glow:  '0 0 40px rgba(201,116,143,0.35)',
        'glow-gold': '0 0 40px rgba(196,150,90,0.4)',
      },
      animation: {
        'float-slow':  'float 6s ease-in-out infinite',
        'float-med':   'float 4s ease-in-out infinite',
        'float-fast':  'float 3s ease-in-out infinite',
        'spin-slow':   'spin 20s linear infinite',
        'pulse-soft':  'pulseSoft 3s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-18px) rotate(3deg)' },
          '66%':      { transform: 'translateY(-8px) rotate(-2deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};

export default config;
