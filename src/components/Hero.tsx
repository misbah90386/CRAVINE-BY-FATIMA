/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { GENERATED_IMAGES } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Define floating elements with motion variants
  const floatingTreats = [
    { text: '🍓 Strawberry', x: '10%', y: '15%', delay: 0 },
    { text: '🍬 Sweet Macaron', x: '82%', y: '20%', delay: 1 },
    { text: '🌸 Edible Rose', x: '8%', y: '75%', delay: 1.5 },
    { text: '🧁 Golden Cupcake', x: '85%', y: '65%', delay: 0.5 },
    { text: '🍫 Choco Drizzle', x: '50%', y: '85%', delay: 2 }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-gradient-to-r from-cream to-[#fdf1f2]/30"
    >
      {/* Background Graphic / Image overlay with elegant opacity */}
      <div className="absolute inset-0 z-0 opacity-[0.06] mix-blend-multiply pointer-events-none">
        <img
          src={GENERATED_IMAGES.hero}
          alt="Luxury Bakery Display"
          className="w-full h-full object-cover filter brightness-[0.95]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Vertical Decorative Label (from Design HTML) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 transform origin-right hidden xl:block select-none pointer-events-none">
        <span className="text-[10px] tracking-[0.55em] uppercase text-gold/35 font-medium">
          Bespoke Baking Est. 2024
        </span>
      </div>

      {/* Decorative Circular Thin Frame (from Design HTML) */}
      <div className="absolute top-[15%] right-[12%] w-[120px] h-[120px] border border-gold/15 rounded-full opacity-40 hidden lg:block select-none pointer-events-none" />

      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        {floatingTreats.map((treat, idx) => (
          <motion.div
            key={idx}
            className="absolute bg-white/90 backdrop-blur-md border border-gold/15 text-chocolate text-[11px] font-medium tracking-wide px-4 py-2 rounded-none shadow-sm flex items-center space-x-1.5"
            style={{ left: treat.x, top: treat.y }}
            animate={{
              y: [0, -12, 0],
              rotate: [-1, 2, -1],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 5 + (idx % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: treat.delay
            }}
          >
            <Sparkles className="w-3 h-3 text-gold" />
            <span>{treat.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Hero Content Panel */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 text-left">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Col */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-beige border border-gold/20 px-4 py-1.5 rounded-none text-[10px] text-gold font-bold tracking-[0.25em] uppercase"
            >
              <Star className="w-3 h-3 fill-gold text-gold" />
              <span>Fatima's Royal Confectionery</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-chocolate leading-[1.1] tracking-tight"
              >
                Crafting <span className="text-gold italic font-normal">Sweet Moments</span>,<br />
                One Cake at a Time
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base text-chocolate/75 max-w-xl font-sans font-light leading-relaxed"
              >
                Freshly baked cakes made with love for birthdays, weddings, anniversaries, and every special celebration. Indulge in culinary artistry that tastes as extraordinary as it looks.
              </motion.p>
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                id="hero-order-now"
                onClick={() => onNavigate('builder')}
                className="bg-chocolate hover:bg-gold text-white px-8 py-4 rounded-none text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <span>Order Custom Cake</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-view-cakes"
                onClick={() => onNavigate('catalog')}
                className="border border-chocolate text-chocolate hover:bg-chocolate hover:text-white px-8 py-4 rounded-none text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>View Signature Catalog</span>
              </button>
            </motion.div>

            {/* Mini Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-chocolate/10 max-w-md"
            >
              <div>
                <span className="block text-2xl font-serif font-light text-chocolate">100%</span>
                <span className="block text-[9px] uppercase tracking-widest font-semibold text-chocolate/50">Fresh Ingredients</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-light text-chocolate">5.0 ★</span>
                <span className="block text-[9px] uppercase tracking-widest font-semibold text-chocolate/50">Rating Reviews</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-light text-chocolate">Handmade</span>
                <span className="block text-[9px] uppercase tracking-widest font-semibold text-chocolate/50">With Love</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Floating Miniature Cake Promo Display Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-none overflow-hidden bg-white border border-chocolate/10 p-6 shadow-xl flex flex-col justify-between"
            >
              {/* Premium tag */}
              <div className="flex justify-between items-center">
                <span className="bg-gold text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-none">
                  Fatima's Pick
                </span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-gold text-gold" />
                  ))}
                </div>
              </div>

              {/* Teaser info */}
              <div className="my-auto text-center space-y-4">
                <div className="relative mx-auto w-36 h-36 flex items-center justify-center">
                  <div className="absolute w-32 h-32 rounded-full bg-blush opacity-30 blur-xl animate-pulse" />
                  <img
                    src={GENERATED_IMAGES.wedding}
                    alt="Cake Promo"
                    className="w-28 h-28 object-cover rounded-full border border-gold shadow-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-semibold text-chocolate tracking-wide">
                    Vintage Lambeth Heart
                  </h4>
                  <p className="text-[11px] text-chocolate/70 font-light px-2">
                    Perfect for anniversaries, birthdays, & sweet moments.
                  </p>
                </div>
              </div>

              {/* Teaser CTA */}
              <button
                onClick={() => onNavigate('builder')}
                className="w-full bg-chocolate text-white hover:bg-gold transition-colors py-2.5 rounded-none text-[11px] font-semibold tracking-widest uppercase cursor-pointer"
              >
                Design Yours Instantly
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
