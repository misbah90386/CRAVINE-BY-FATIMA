/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GENERATED_IMAGES } from '../data';

interface SpecialtiesProps {
  onNavigateToCatalog: (category: string) => void;
}

export default function Specialties({ onNavigateToCatalog }: SpecialtiesProps) {
  const categories = [
    {
      name: 'Wedding Cakes',
      image: GENERATED_IMAGES.wedding,
      desc: 'Multi-tiered bespoke wonders adorned with handcrafted gold sugar details.',
      tag: 'Grand Events',
      filter: 'wedding'
    },
    {
      name: 'Birthday Cakes',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop',
      desc: 'Joyous, fun, and modern designs with delicious flavors everyone loves.',
      tag: 'Celebrations',
      filter: 'birthday'
    },
    {
      name: 'Custom Cakes',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=400&auto=format&fit=crop',
      desc: 'If you can dream it, we can design it. Tailored to your exact theme.',
      tag: 'Bespoke Art',
      filter: 'custom'
    },
    {
      name: 'Cupcakes',
      image: GENERATED_IMAGES.cupcakes,
      desc: 'Artisan hand-piped treats decorated with gold dust and pearls.',
      tag: 'Individual Treats',
      filter: 'cupcakes'
    },
    {
      name: 'Bento Cakes',
      image: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=400&auto=format&fit=crop',
      desc: 'Cute Korean lunchbox cakes that fit perfectly in the palm of your hand.',
      tag: 'Minimalist Cute',
      filter: 'bento'
    },
    {
      name: 'Chocolate Cakes',
      image: GENERATED_IMAGES.chocolate,
      desc: 'Ultra-rich Belgian chocolate layered with velvety ganache and curls.',
      tag: 'Ultimate Decadence',
      filter: 'birthday' // chocolate drops in birthday/celebration
    },
    {
      name: 'Red Velvet Cakes',
      image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=400&auto=format&fit=crop',
      desc: 'Luscious layers of crimson sponge with creamy tang cheese frosting.',
      tag: 'Timeless Classic',
      filter: 'custom'
    },
    {
      name: 'Cookies',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400&auto=format&fit=crop',
      desc: 'Freshly baked gourmet chocolate chip and sugar butter shortbreads.',
      tag: 'Crunchy Sweets',
      filter: 'desserts'
    },
    {
      name: 'Brownies',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop',
      desc: 'Chewy, rich chocolate fudge squares with delicate sea salt sprinkles.',
      tag: 'Intense Fudge',
      filter: 'desserts'
    },
    {
      name: 'Dessert Boxes',
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=400&auto=format&fit=crop',
      desc: 'Curation of macarons, berries, cookies, & tarts perfect for gifting.',
      tag: 'Luxury Gifts',
      filter: 'desserts'
    }
  ];

  return (
    <section id="specialties" className="py-24 bg-white border-t border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold inline-flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Baked Fresh Daily</span>
            <Sparkles className="w-3 h-3 text-gold" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-chocolate tracking-tight">
            Indulge In Our <span className="italic font-normal">Specialties</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold mx-auto" />
          <p className="text-sm text-chocolate/75 font-light max-w-xl mx-auto">
            Discover our rich menu of luxurious, hand-crafted confections made from the finest ingredients to satisfy your ultimate sweet cravings.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              id={`specialty-card-${idx}`}
              whileHover={{ y: -5 }}
              className="group relative bg-[#faf6f0] rounded-none overflow-hidden shadow-sm hover:shadow-md border border-chocolate/10 transition-all duration-300 flex flex-col h-[350px]"
            >
              {/* Image Container */}
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/40 to-transparent" />
                {/* Badge Tag */}
                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-[9px] font-bold tracking-widest text-chocolate uppercase px-3 py-1 rounded-none border border-gold/15 shadow-sm">
                  {cat.tag}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-4 flex flex-col flex-grow justify-between text-left">
                <div className="space-y-1">
                  <h3 className="font-serif text-sm font-semibold text-chocolate tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-chocolate/70 leading-relaxed font-light line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

                {/* Quick Link */}
                <button
                  onClick={() => onNavigateToCatalog(cat.filter)}
                  className="inline-flex items-center space-x-1 text-[10px] font-bold text-gold group-hover:text-chocolate transition-colors uppercase tracking-widest pt-2 cursor-pointer"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
