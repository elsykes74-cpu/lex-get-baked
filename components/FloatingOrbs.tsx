'use client';
import { useEffect, useRef } from 'react';

// Pure CSS floating orbs — no WebGL dependency for the background layer.
// The 3D cookie scene (React Three Fiber) layers on top of these.
const ORBS = [
  { size: 320, top: '-8%',  left: '55%', color: 'rgba(107,78,140,0.35)',  delay: '0s',   dur: '7s'  },
  { size: 200, top: '30%',  left: '-5%', color: 'rgba(201,116,143,0.3)',  delay: '1.5s', dur: '5s'  },
  { size: 140, top: '60%',  left: '80%', color: 'rgba(196,150,90,0.25)',  delay: '0.8s', dur: '6s'  },
  { size: 90,  top: '15%',  left: '20%', color: 'rgba(155,126,188,0.3)',  delay: '2s',   dur: '4.5s'},
  { size: 60,  top: '75%',  left: '10%', color: 'rgba(201,116,143,0.4)',  delay: '0.3s', dur: '3.8s'},
  { size: 50,  top: '45%',  left: '70%', color: 'rgba(196,150,90,0.35)',  delay: '1.1s', dur: '5.5s'},
];

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[60px]"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: orb.color,
            animation: `float ${orb.dur} ease-in-out ${orb.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
