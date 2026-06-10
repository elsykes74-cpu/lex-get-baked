'use client';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
  reverse?: boolean;
}

export default function Marquee({
  items,
  speed = 28,
  separator = '·',
  className = '',
  reverse = false,
}: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div
        className="inline-flex"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-0">
            <span>{item}</span>
            <span className="mx-5 opacity-35">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
