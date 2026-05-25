'use client';

const ORBS = [
  { size: 340, top: '-12%', left: '52%',  color: 'rgba(232,208,252,0.45)', delay: '0s',   dur: '7s'  },
  { size: 220, top: '28%',  left: '-6%',  color: 'rgba(255,210,228,0.38)', delay: '1.5s', dur: '5s'  },
  { size: 160, top: '58%',  left: '78%',  color: 'rgba(212,180,240,0.32)', delay: '0.8s', dur: '6.2s'},
  { size: 100, top: '12%',  left: '18%',  color: 'rgba(255,228,210,0.35)', delay: '2s',   dur: '4.5s'},
  { size: 70,  top: '72%',  left: '8%',   color: 'rgba(232,208,252,0.42)', delay: '0.3s', dur: '3.8s'},
  { size: 55,  top: '42%',  left: '68%',  color: 'rgba(255,200,220,0.38)', delay: '1.1s', dur: '5.5s'},
  { size: 42,  top: '85%',  left: '45%',  color: 'rgba(212,180,240,0.35)', delay: '2.3s', dur: '4s'  },
  // Cream splash blob at top-right
  { size: 260, top: '-5%',  left: '60%',  color: 'rgba(255,250,245,0.55)', delay: '0.5s', dur: '8s'  },
];

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: orb.color,
            filter: 'blur(50px)',
            animation: `float ${orb.dur} ease-in-out ${orb.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
