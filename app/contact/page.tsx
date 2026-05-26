'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Calendar, MessageSquare, Send, CheckCircle, ImagePlus } from 'lucide-react';
import NavBar from '@/components/NavBar';

const OCCASIONS = [
  'Birthday', 'Wedding', 'Baby Shower', 'Corporate',
  'Anniversary', 'Holiday', 'Just Because', 'Other',
];

const CONTACT_METHODS = [
  {
    icon: MessageSquare,
    label: 'Instagram',
    handle: '@lexgetbaked',
    desc: 'DM us for quick inquiries',
    color: '#C9748F',
    bg: 'rgba(201,116,143,0.10)',
  },
  {
    icon: Phone,
    label: 'Call / Text',
    handle: '(413) 555-0192',
    desc: 'Mon–Sat, 9am–6pm',
    color: '#9B7EBC',
    bg: 'rgba(155,126,188,0.10)',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'hello@lexgetbaked.com',
    desc: 'Response within 24hrs',
    color: '#D4956A',
    bg: 'rgba(212,149,106,0.10)',
  },
];

function InputRow({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold mb-2 text-muted">
        <Icon size={10} strokeWidth={2.5} style={{ color: 'rgba(201,116,143,0.75)' }} />
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', eventDate: '',
    occasion: '', message: '',
  });
  const [inspirationFile, setInspirationFile] = useState<File | null>(null);
  const [sent, setSent] = useState(false);

  function handleChange(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  if (sent) {
    return (
      <>
        <NavBar />
        <div className="min-h-[100svh] bg-page-bg flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 18, stiffness: 220 }}
            className="w-full max-w-sm"
          >
            <motion.div
              className="w-20 h-20 rounded-[24px] mx-auto mb-7 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #F7C4D8, #F3C69D)',
                boxShadow: '0 8px 32px rgba(201,116,143,0.28)',
              }}
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle size={36} strokeWidth={2} style={{ color: '#2F2343' }} />
            </motion.div>

            <h1 className="font-display text-[32px] italic font-bold text-plum mb-2">Message Sent!</h1>
            <p className="text-[14px] font-medium text-muted mb-8">
              We'll be in touch within 24 hours to talk all things dessert.
            </p>

            <div className="glass-card rounded-[24px] p-6">
              <p className="text-[13px] font-medium text-plum/65 leading-relaxed">
                Expect a response from{' '}
                <span className="font-bold text-plum">hello@lexgetbaked.com</span>
                {' '}or follow us at{' '}
                <span className="font-bold text-plum">@lexgetbaked</span>
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
      <div className="relative min-h-[100svh] bg-page-bg pt-[5.5rem] pb-32 sm:pb-16 px-4">
        <div className="max-w-md mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-8 mt-4">
            <p className="text-[9px] tracking-[0.18em] uppercase font-semibold mb-2 text-muted">Let's Connect</p>
            <h1 className="font-display text-[30px] italic font-bold text-plum mb-2 leading-tight">
              Tell Us Your<br />Dessert Dream
            </h1>
            <p className="text-[14px] font-medium text-muted">
              Custom orders, events, and collaborations — we love it all.
            </p>
          </motion.div>

          {/* Contact method cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-3 gap-3 mb-7"
          >
            {CONTACT_METHODS.map(({ icon: Icon, label, handle, desc, color, bg }) => (
              <motion.div
                key={label}
                whileTap={{ scale: 0.96 }}
                className="glass-card rounded-[20px] p-4 text-center cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-[14px] mx-auto mb-2.5 flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon size={18} strokeWidth={1.8} style={{ color }} />
                </div>
                <p className="text-[10px] font-bold text-plum mb-0.5">{label}</p>
                <p className="text-[9px] font-medium text-muted leading-tight">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Occasion selection */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="glass-card rounded-[24px] p-5 mb-5"
          >
            <p className="text-[10px] tracking-[0.14em] uppercase font-bold text-muted mb-3">What's the Occasion?</p>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map(occasion => (
                <motion.button
                  key={occasion}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChange('occasion', occasion)}
                  className={`px-3.5 py-2 rounded-full text-[11px] font-bold transition-all ${
                    form.occasion === occasion
                      ? 'btn-iridescent'
                      : 'glass-subtle text-plum/60 hover:text-plum'
                  }`}
                  style={{ minHeight: '36px' }}
                >
                  {occasion}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.45 }}
            onSubmit={e => { e.preventDefault(); setSent(true); }}
            className="glass-card rounded-[24px] p-6 space-y-4"
          >
            <p className="text-[10px] tracking-[0.14em] uppercase font-bold text-muted">Your Details</p>

            {/* Name + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <InputRow icon={User} label="Name">
                <input
                  type="text" required placeholder="Your name"
                  value={form.name} onChange={e => handleChange('name', e.target.value)}
                  className="w-full input-glass rounded-[14px] px-4 py-3.5 text-[13px]"
                />
              </InputRow>
              <InputRow icon={Phone} label="Phone">
                <input
                  type="tel" placeholder="(413) 000-0000"
                  value={form.phone} onChange={e => handleChange('phone', e.target.value)}
                  className="w-full input-glass rounded-[14px] px-4 py-3.5 text-[13px]"
                />
              </InputRow>
            </div>

            <InputRow icon={Mail} label="Email">
              <input
                type="email" required placeholder="your@email.com"
                value={form.email} onChange={e => handleChange('email', e.target.value)}
                className="w-full input-glass rounded-[14px] px-4 py-3.5 text-[13px]"
              />
            </InputRow>

            <InputRow icon={Calendar} label="Event Date (optional)">
              <input
                type="date" value={form.eventDate}
                onChange={e => handleChange('eventDate', e.target.value)}
                className="w-full input-glass rounded-[14px] px-4 py-3.5 text-[13px]"
              />
            </InputRow>

            <InputRow icon={MessageSquare} label="Tell Us More">
              <textarea
                required
                placeholder="Tell us about your dream dessert, event details, quantities..."
                value={form.message} onChange={e => handleChange('message', e.target.value)}
                rows={4}
                className="w-full input-glass rounded-[14px] px-4 py-3.5 text-[13px] resize-none"
              />
            </InputRow>

            {/* Upload inspiration image */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold mb-2 text-muted">
                <ImagePlus size={10} strokeWidth={2.5} style={{ color: 'rgba(201,116,143,0.75)' }} />
                Inspiration Image (optional)
              </label>
              <label
                className="w-full input-glass rounded-[14px] px-4 py-3.5 text-[13px] flex items-center gap-3 cursor-pointer transition-all hover:bg-white/90"
                style={{ minHeight: '52px' }}
              >
                <div
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,116,143,0.12)' }}
                >
                  <ImagePlus size={14} strokeWidth={1.8} style={{ color: '#C9748F' }} />
                </div>
                <span className="text-[13px] font-medium" style={{ color: inspirationFile ? '#2F2343' : 'rgba(108,101,128,0.68)' }}>
                  {inspirationFile ? inspirationFile.name : 'Upload photo or screenshot'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={e => setInspirationFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full btn-primary rounded-[18px] h-14 text-[15px] font-bold flex items-center justify-center gap-2.5"
            >
              <Send size={16} strokeWidth={2.2} />
              Send Message
            </button>

            <p className="text-center text-[11px] font-medium text-muted">
              We respond within 24 hours · Western Massachusetts
            </p>
          </motion.form>
        </div>
      </div>
    </>
  );
}
