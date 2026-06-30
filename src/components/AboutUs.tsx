/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChefHat, Heart, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { GENERATED_IMAGES } from '../data';

export default function AboutUs() {
  const highlights = [
    {
      icon: <Heart className="w-5 h-5 text-gold" />,
      title: 'Handmade with Love',
      desc: 'Each creation is individually handcrafted from scratch with meticulous attention to detail.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-gold" />,
      title: 'Premium Ingredients',
      desc: 'Only the absolute finest French chocolate, organic berries, and real vanilla beans enter our oven.'
    },
    {
      icon: <ChefHat className="w-5 h-5 text-gold" />,
      title: 'Custom Designs',
      desc: 'Tailored perfectly to your events. Tell us your story, and we will translate it into edible art.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold" />,
      title: 'Hygienic Baking',
      desc: 'Our boutique kitchen operates under strict, medical-grade sanitization standards.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-cream border-t border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Gorgeous image collage representing handcrafted care */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] rounded-none border border-chocolate/10 p-2 bg-white shadow-md">
              <img
                src="https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=600&auto=format&fit=crop"
                alt="Fatima decorating a custom cake"
                className="w-full h-full object-cover rounded-none grayscale-[15%] brightness-[0.98]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-2 bg-gradient-to-t from-chocolate/20 to-transparent pointer-events-none" />
            </div>

            {/* floating badge */}
            <motion.div
              initial={{ x: -20, y: 20, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute -bottom-6 -right-4 bg-white p-6 rounded-none shadow-lg border border-gold/25 max-w-[240px] flex items-center space-x-4"
            >
              <div className="p-3 bg-beige rounded-none text-gold border border-gold/10">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-serif text-lg font-light text-chocolate">100%</span>
                <span className="block text-[9px] text-chocolate/65 uppercase tracking-widest font-semibold">Premium Quality</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Editorial Text and Highlights Grid */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold block">
                Meet Fatima & The Bakery
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-chocolate tracking-tight">
                Our Passion: <span className="italic font-normal">Elegant Confections</span>, Precious Memories
              </h2>
              <div className="w-16 h-[1.5px] bg-gold" />
              <p className="text-sm text-chocolate/80 leading-relaxed font-light">
                Welcome to <strong className="font-semibold text-chocolate">Cravine by Fatima</strong>. What began as a passionate, late-night home kitchen hobby has blossomed into a premier bespoke bakery. We specialize in designing striking, custom cakes and gourmet sweet treats that elevate weddings, birthdays, and anniversaries into sensory feasts.
              </p>
              <p className="text-sm text-chocolate/80 leading-relaxed font-light">
                We believe that a celebration cake should never be a compromise. That is why we refuse to use pre-made mixes, artificial preservatives, or generic recipes. We source sweet dairy butter, organic local berries, and the richest single-origin chocolates to bake masterpieces that taste just as magical as they look.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-none bg-white flex items-center justify-center border border-gold/20 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-semibold text-sm text-chocolate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-chocolate/70 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
