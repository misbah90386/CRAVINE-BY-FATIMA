/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChefHat, Heart, Sparkles, Clock, Compass, ShieldAlert, Award, Smile } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <Clock className="w-5 h-5 text-gold" />,
      title: 'Fresh Daily Baking',
      desc: 'Baked on the exact morning of your event. Never frozen, never stale, always moist.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-gold" />,
      title: 'Premium Ingredients',
      desc: 'Pure butter, Madagascar vanilla, Belgian cocoa, organic berries. Zero shortcuts.'
    },
    {
      icon: <ChefHat className="w-5 h-5 text-gold" />,
      title: 'Custom Designs',
      desc: 'Ornate Lambeth piping, vintage ribbons, custom lettering. Tailored to your vision.'
    },
    {
      icon: <Award className="w-5 h-5 text-gold" />,
      title: 'Affordable Prices',
      desc: 'Luxury aesthetics and taste priced fairly so you can celebrate without compromises.'
    },
    {
      icon: <Compass className="w-5 h-5 text-gold" />,
      title: 'On-Time Delivery',
      desc: 'Climate-controlled delivery right to your venue. Securely boxed and handled.'
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-gold" />,
      title: 'Hygienic Kitchen',
      desc: 'Sterilized home studio complying with strict cleanliness regulations.'
    },
    {
      icon: <Smile className="w-5 h-5 text-gold" />,
      title: 'Friendly Service',
      desc: 'Fatima handles your requests personally, providing dedicated consultation.'
    },
    {
      icon: <Heart className="w-5 h-5 text-gold" />,
      title: 'Delicious Taste',
      desc: 'Decadent fillings and light frostings that taste as spectacular as they look.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-cream border-t border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold inline-flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3" />
            <span>The Fatima Standards</span>
            <Sparkles className="w-3 h-3" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-chocolate tracking-tight">
            Why Order From <span className="italic font-normal">Cravine?</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold mx-auto" />
          <p className="text-sm text-chocolate/75 font-light max-w-xl mx-auto">
            We hold ourselves to a standard of excellence, ensuring every single crumb brings pure happiness to your guests.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {benefits.map((b, idx) => (
            <motion.div
              key={idx}
              id={`benefit-card-${idx}`}
              whileHover={{ y: -3 }}
              className="bg-white p-6 rounded-none border border-chocolate/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-none bg-cream border border-chocolate/10 flex items-center justify-center text-gold">
                  {b.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-sm font-semibold text-chocolate">
                    {b.title}
                  </h3>
                  <p className="text-xs text-chocolate/70 leading-relaxed font-light">
                    {b.desc}
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
