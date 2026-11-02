import React from 'react';
import { Star, Award, ShieldCheck, Flame, CheckCircle } from 'lucide-react';

export const ReviewsWall: React.FC = () => {
  const reviews = [
    {
      author: 'Rohan Malhotra',
      role: 'National Men’s Physique Athlete',
      city: 'Koramangala, Bengaluru',
      rating: 5,
      headline: 'REPLACED MY NIGHTLY POST-WORKOUT SHAKE FOREVER',
      quote: 'I used to force down 40g chalky whey shakes after heavy deadlift days. BUFF has 32g of actual isolate in the Midnight Brownie, and the texture is indistinguishable from high-end Italian artisan gelato. Absolute game changer for Indian lifters.',
      badge: 'VERIFIED ATHLETE',
      color: '#D4FF00'
    },
    {
      author: 'Ananya Deshmukh',
      role: 'CrossFit Level 2 Coach & Athlete',
      city: 'Bandra West, Mumbai',
      rating: 5,
      headline: 'ZERO BLOAT. ZERO ERYTHRITOL CRASH.',
      quote: 'Most commercial "diet" pints available in India destroy my gut with maltitol or erythritol. BUFF using rare allulose and chicory root fiber is revolutionary. I can eat a whole pint before bed and wake up with zero water retention.',
      badge: 'VERIFIED BUYER',
      color: '#FF2E93'
    },
    {
      author: 'Dr. Siddharth Rao',
      role: 'Sports Nutritionist & Biochemist',
      city: 'Jubilee Hills, Hyderabad',
      rating: 5,
      headline: 'SUPERIOR AMINO ACID BIOAVAILABILITY',
      quote: 'Cold micro-filtration prevents protein denaturation. Their leucine threshold of 3.6g triggers maximal muscle protein synthesis (MPS). From a scientific perspective, this formulation sets a new benchmark in India.',
      badge: 'NUTRITION SCIENTIST',
      color: '#2E4CFF'
    },
    {
      author: 'Tanya Bakshi',
      role: 'Marathoner & Triathlete',
      city: 'DLF Phase 5, Gurugram',
      rating: 5,
      headline: 'SHIPPED IN ROCK SOLID DRY ICE EVEN IN 42°C HEAT',
      quote: 'I was nervous ordering ice cream online in peak North Indian summer. It arrived packed with sub-zero dry ice blocks so cold that the pints were rock solid. The Alphonso Mango Pitaya Buzz is pure magic.',
      badge: 'COLD-CHAIN VERIFIED',
      color: '#FAF8F5'
    }
  ];

  return (
    <section className="w-full bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 brutal-border-t">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] text-[#D4FF00] font-space font-extrabold text-xs uppercase rounded-full brutal-border mb-3">
            <Star className="w-3.5 h-3.5 fill-[#D4FF00]" />
            <span>COMMUNITY PROOF & RAVES</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-5xl uppercase text-[#121212] tracking-tight">
            WALL OF UNFILTERED RAVE
          </h2>
          <p className="font-sans text-base text-[#121212]/80 mt-1">
            Over 250,000 pints churned and delivered across India. Read what lifters, trainers, and ice cream obsessives are saying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white brutal-border brutal-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500 text-lg">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span
                    className="px-2.5 py-0.5 text-[10px] font-space font-extrabold uppercase rounded-full brutal-border"
                    style={{
                      backgroundColor: rev.color,
                      color: rev.color === '#2E4CFF' ? '#FFF' : '#121212'
                    }}
                  >
                    {rev.badge}
                  </span>
                </div>

                <h3 className="font-syne font-extrabold text-lg uppercase text-[#121212] mb-3 leading-snug">
                  "{rev.headline}"
                </h3>

                <p className="font-sans text-sm text-[#121212]/85 leading-relaxed">
                  {rev.quote}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#121212]/20 flex items-center justify-between">
                <div>
                  <h4 className="font-syne font-extrabold text-sm text-[#121212]">
                    {rev.author}
                  </h4>
                  <div className="text-xs font-space text-[#121212]/70">
                    {rev.role} • {rev.city}
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
