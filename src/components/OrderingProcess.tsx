/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, Sparkles, CheckSquare, Truck } from 'lucide-react';

export default function OrderingProcess() {
  const steps = [
    {
      icon: <ShoppingBag className="w-6 h-6 text-gold" />,
      num: '01',
      title: 'Choose Your Cake',
      desc: 'Browse our luxurious Signature confections or open our Custom Builder to select your size, structure, and flavors.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      num: '02',
      title: 'Customize Design',
      desc: 'Select your preferred frosting tones, vintage ruffles, and premium toppings, and add your own custom lettering.'
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-gold" />,
      num: '03',
      title: 'Confirm Order',
      desc: 'Review your Inquiry Bag and submit. Send details directly to Fatima on WhatsApp or Email for instant approval.'
    },
    {
      icon: <Truck className="w-6 h-6 text-gold" />,
      num: '04',
      title: 'Fresh Delivery',
      desc: 'Fatima bakes your order from scratch. Enjoy contactless pickup or safe climate-controlled venue delivery.'
    }
  ];

  return (
    <section id="ordering-process" className="py-24 bg-cream border-t border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header Title */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold inline-flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Simple Booking Steps</span>
            <Sparkles className="w-3 h-3" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-chocolate tracking-tight">
            How Ordering <span className="italic font-normal">Works</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold mx-auto" />
          <p className="text-sm text-chocolate/75 font-light max-w-xl mx-auto">
            Our smooth bespoke process is designed to ensure you get exactly what you visualize, hassle-free.
          </p>
        </div>

        {/* Process Timeline Blocks */}
        <div className="relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-1/8 right-1/8 h-[1px] bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10 -translate-y-12 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                id={`process-step-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center space-y-5 text-center group"
              >
                {/* Icon block with floating step index */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-none bg-white border border-chocolate/10 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-gold transition-all duration-300 transform group-hover:scale-102">
                    {step.icon}
                  </div>
                  <span className="absolute -top-3.5 -right-3.5 bg-gold text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-none shadow-sm">
                    {step.num}
                  </span>
                </div>

                {/* Text Content */}
                <div className="space-y-1.5 px-4">
                  <h3 className="font-serif text-sm font-semibold text-chocolate group-hover:text-gold transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-chocolate/70 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
