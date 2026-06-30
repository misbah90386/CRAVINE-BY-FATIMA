/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white border-t border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold inline-flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Words From Our Patrons</span>
            <Sparkles className="w-3 h-3" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-chocolate tracking-tight">
            Loved By Sweet <span className="italic font-normal">Patrons</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold mx-auto" />
          <p className="text-sm text-chocolate/75 font-light max-w-xl mx-auto">
            Read real, heartfelt stories from brides, birthday hosts, and pastry enthusiasts who chose Cravine by Fatima.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              id={`review-card-${t.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cream p-8 rounded-none border border-chocolate/10 shadow-sm flex flex-col justify-between text-left h-full relative group hover:shadow-md hover:border-gold/30 transition-all duration-300"
            >
              {/* Decorative quotation mark */}
              <Quote className="absolute top-6 right-8 w-12 h-12 text-gold/15" />

              <div className="space-y-6 relative z-10">
                {/* 5-Star Rating */}
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-chocolate/85 leading-relaxed italic font-light">
                  "{t.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-chocolate/10">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-none object-cover border border-chocolate/10 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-chocolate">
                    {t.name}
                  </h4>
                  <p className="text-[9px] text-chocolate/60 font-bold uppercase tracking-widest flex items-center space-x-1.5">
                    <span>{t.role}</span>
                    <span className="w-1 h-1 rounded-none bg-gold/50" />
                    <span className="text-[9px] font-normal italic text-chocolate/50">{t.date}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
