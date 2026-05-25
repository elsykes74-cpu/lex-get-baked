'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Calendar, MessageSquare, Send, CheckCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import FloatingOrbs from '@/components/FloatingOrbs';

const DESSERT_TYPES = [
  'Stuffed Cookies', 'Mini Cakes', 'Custom Dessert Box',
  'Celebration Tray', 'Corporate Order', 'Other',
];

function InputRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold mb-1.5 text-plum/55">
        <Icon size={10} strokeWidth={2.5} style={{ color: 'rgba(201,116,143,0.7)' }} />
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', eventDate: '',
    dessertType: '', message: '',
  });
  const [sent, setSent] = useState(false);

  function handleChange(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  if (sent) {
    return (
      <>
        <NavBar />
        <div className="min-h-[100svh] bg-page-bg flex flex-col items-center justify-center px-6 text-center">
          <FloatingOrbs />
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 16 }}
            className="relative z-10"
          >
            <div className="text-7xl mb-6" style={{ animation: 'float 5s ease-in-out infinite' }}>💌</div>
            <div className="glass-card rounded-3xl p-8 max-w-sm mx-auto">
              <CheckCircle size={28} className="mx-auto mb-3" style={{ color: '#6B8C7A' }} />
              <h1 className="font-display text-3xl italic font-bold text-plum mb-3">Message Sent!</h1>
              <p className="text-[13px] font-medium text-plum/65 mb-5">
                We&apos;ll be in touch within 24 hours to talk all things dessert.
              </p>
              <div className="divider-rg mb-5" />
              <p className="text-sm font-medium text-plum/58">
                Expect a response from{' '}
                <span className="font-bold text-plum">hello@lexgetbaked.com</span>
              </p>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="relative min-h-[100svh] bg-page-bg pt-[4.5rem] pb-28 sm:pb-14 px-4 overflow-hidden">
        <FloatingOrbs />
        <div className="relative z-10 max-w-md mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-7 mt-3">
            <p className="text-[9px] tracking-[0.16em] uppercase font-bold mb-1 text-plum/50">
              Let&apos;s Connect
            </p>
            <h1 className="font-display text-3xl italic font-bold text-white mb-1" style={{ textShadow: '0 2px 12px rgba(10,4,36,0.3)' }}>
              Order Inquiry
            </h1>
            <p className="text-[13px] font-medium text-plum/65">
              Custom orders, events, collaborations — we love it all.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.48 }}
            onSubmit={e => { e.preventDefault(); setSent(true); }}
            className="glass-card rounded-3xl p-6 space-y-4"
          >
            {/* Name + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <InputRow icon={User} label="Name">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="w-full input-glass rounded-xl px-4 py-3 text-sm"
                />
              </InputRow>
              <InputRow icon={Phone} label="Phone">
                <input
                  type="tel"
                  placeholder="(413) 000-0000"
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  className="w-full input-glass rounded-xl px-4 py-3 text-sm"
                />
              </InputRow>
            </div>

            {/* Email */}
            <InputRow icon={Mail} label="Email">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full input-glass rounded-xl px-4 py-3 text-sm"
              />
            </InputRow>

            {/* Event date */}
            <InputRow icon={Calendar} label="Event Date (optional)">
              <input
                type="date"
                value={form.eventDate}
                onChange={e => handleChange('eventDate', e.target.value)}
                className="w-full input-glass rounded-xl px-4 py-3 text-sm"
              />
            </InputRow>

            {/* Dessert type pills */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold mb-2 text-plum/55">
                <MessageSquare size={10} strokeWidth={2.5} style={{ color: 'rgba(201,116,143,0.7)' }} />
                Dessert Type
              </label>
              <div className="flex flex-wrap gap-2">
                {DESSERT_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange('dessertType', type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      form.dessertType === type
                        ? 'btn-iridescent shadow-btn'
                        : 'glass-card text-plum/65 hover:text-plum'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <InputRow icon={MessageSquare} label="Message">
              <textarea
                required
                placeholder="Tell us about your order, event, or dream dessert..."
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                rows={4}
                className="w-full input-glass rounded-xl px-4 py-3 text-sm resize-none"
              />
            </InputRow>

            {/* Submit */}
            <button
              type="submit"
              className="w-full btn-brand py-4 rounded-2xl text-sm font-bold shadow-glow flex items-center justify-center gap-2"
            >
              <Send size={15} strokeWidth={2.2} />
              Send Message
            </button>

            <p className="text-center text-xs font-medium text-plum/45">
              We respond within 24 hours · Western Massachusetts
            </p>
          </motion.form>
        </div>
      </div>
    </>
  );
}
