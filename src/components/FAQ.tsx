/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // Default open first question

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-cream border-t border-chocolate/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold inline-flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Curious Minds</span>
            <Sparkles className="w-3 h-3" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-chocolate tracking-tight">
            Frequently Asked <span className="italic font-normal">Questions</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold mx-auto" />
          <p className="text-sm text-chocolate/75 font-light max-w-lg mx-auto">
            Got questions about delivery, design structures, or payments? We have compiled everything you need to know below.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white rounded-none border border-chocolate/10 overflow-hidden shadow-sm transition-all duration-300"
              >
                {/* Header click bar */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-serif font-semibold text-chocolate hover:text-gold transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="text-xs sm:text-sm pr-4 flex items-center gap-2.5 uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <div className="flex-shrink-0 text-chocolate/60">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-chocolate/75 leading-relaxed font-light border-t border-chocolate/10 pt-4 bg-cream/35">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
