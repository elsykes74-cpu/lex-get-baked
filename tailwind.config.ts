import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: { DEFAULT: '#B4ACCC', light: '#D8D2EC', dark: '#8A82AC', faint: '#F2EFFE' },
        blush:    { DEFAULT: '#D4A8B8', light: '#EDD8E4', dark: '#B87890' },
        mauve:    { DEFAULT: '#C0A0B8', light: '#DCCCDC', dark: '#9478A0' },
        pearl:    { DEFAULT: '#FBF7FF', light: '#FFFFFF', dark: '#EDE8F8' },
        rosegold: { DEFAULT: '#D4956A', light: '#E8BA90', dark: '#B87040' },
        cream:    { DEFAULT: '#FFF5E6', light: '#FFFAF5', dark: '#F5E8D0' },
        plum:     { DEFAULT: '#2D1A4A', light: '#4A3260', dark: '#1A0E2C' },
        choco:    { DEFAULT: '#3C2018', light: '#6B4028', dark: '#200E08' },
        rose:     { DEFAULT: '#C9748F', light: '#E8A4B8', dark: '#9E4F6A' },
        gold:     { DEFAULT: '#D4956A', light: '#E8B890', dark: '#B07040' },
        charcoal: { DEFAULT: '#2C2040', light: '#3C3060', dark: '#1A1428' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-bg':  'linear-gradient(145deg, #7A6EA0 0%, #948CC0 22%, #ACA8CC 50%, #C8C0DA 78%, #DCDAEE 100%)',
        'page-bg':  'linear-gradient(160deg, #9490BE 0%, #A4A0CA 40%, #B8B4D2 75%, #CCCAEA 100%)',
        'brand-gradient':    'linear-gradient(135deg, #A89CC4 0%, #C9748F 55%, #D4956A 100%)',
        'rosegold-gradient': 'linear-gradient(135deg, #D4956A 0%, #E8BA90 50%, #C9748F 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.48) 100%)',
      },
      boxShadow: {
        'glass':      '0 8px 32px rgba(80,60,140,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
        'card':       '0 12px 40px rgba(80,60,140,0.16), 0 2px 8px rgba(80,60,140,0.08), inset 0 1.5px 0 rgba(255,255,255,1)',
        'card-hover': '0 20px 56px rgba(80,60,140,0.22), 0 4px 16px rgba(80,60,140,0.12), inset 0 1.5px 0 rgba(255,255,255,1)',
        'glow':       '0 0 40px rgba(201,116,143,0.45)',
        'glow-gold':  '0 0 40px rgba(212,149,106,0.5)',
        'glow-lav':   '0 0 40px rgba(160,140,210,0.5)',
        'btn':        '0 6px 28px rgba(160,120,210,0.30), 0 2px 8px rgba(212,149,106,0.20), inset 0 1.5px 0 rgba(255,255,255,1)',
        'btn-lg':     '0 10px 36px rgba(160,120,210,0.42), 0 3px 12px rgba(212,149,106,0.26), inset 0 1.5px 0 rgba(255,255,255,1)',
        'ring-rg':    '0 0 0 2px rgba(255,255,255,0.8), 0 0 0 4px rgba(212,149,106,0.6), 0 0 0 6px rgba(201,116,143,0.25)',
      },
      animation: {
        'float-slow':   'float 6s ease-in-out infinite',
        'float-med':    'float 4s ease-in-out infinite',
        'float-fast':   'float 3s ease-in-out infinite',
        'float-chip':   'float-chip 4s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'pulse-soft':   'pulseSoft 3s ease-in-out infinite',
        'pulse-glow':   'pulse-glow 3s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'blob':         'blob 8s ease-in-out infinite',
        'rise':         'rise 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'btn-shine':    'btn-shine 2.8s ease-in-out infinite',
        'nav-pill-in':  'nav-pill-in 0.22s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-14px) rotate(2deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-1.5deg)' },
        },
        'float-chip': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
          '50%':      { transform: 'translateY(-10px) rotate(15deg) scale(1.1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%':      { opacity: '1', transform: 'scale(1.04)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%':      { opacity: '0.8', transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'btn-shine': {
          '0%':   { left: '-100%' },
          '60%':  { left: '200%' },
          '100%': { left: '200%' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '33%':      { borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' },
          '66%':      { borderRadius: '70% 30% 50% 50% / 30% 60% 40% 70%' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'nav-pill-in': {
          from: { transform: 'scale(0.88)', opacity: '0' },
          to:   { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};

export default config;
