import React from 'react';

interface MarqueeTickerProps {
  text?: string[];
  bg?: string;
  textColor?: string;
  borderClass?: string;
  speed?: 'normal' | 'fast' | 'reverse';
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  text = [
    '28G PROTEIN PER PINT',
    'ZERO ADDED SUGAR',
    'COLD-CHURNED ARTISAN GELATO',
    'NO CHALKY AFTERTASTE',
    'KETO-FRIENDLY',
    'OVERNIGHT DRY ICE DELIVERY',
    'PURE DOPAMINE INDULGENCE',
    'HYPER-ANABOLIC DENSITY'
  ],
  bg = 'bg-[#D4FF00]',
  textColor = 'text-[#121212]',
  borderClass = 'border-y-[2.5px] border-[#121212]',
  speed = 'normal'
}) => {
  const repeatedText = [...text, ...text, ...text, ...text];

  const animationClass =
    speed === 'fast'
      ? 'animate-marquee-fast'
      : speed === 'reverse'
      ? 'animate-marquee-reverse'
      : 'animate-marquee';

  return (
    <div className={`overflow-hidden py-2.5 ${bg} ${textColor} ${borderClass} select-none`}>
      <div className={animationClass}>
        {repeatedText.map((item, idx) => (
          <div key={idx} className="flex items-center mx-4 whitespace-nowrap font-space font-bold text-sm tracking-wider uppercase">
            <span>{item}</span>
            <span className="mx-4 text-xs">⚡</span>
          </div>
        ))}
      </div>
    </div>
  );
};
