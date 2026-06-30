/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Confections' },
    { id: 'birthday', label: 'Birthday Cakes' },
    { id: 'wedding', label: 'Wedding Cakes' },
    { id: 'cupcakes', label: 'Cupcakes' },
    { id: 'custom', label: 'Custom Cakes' },
    { id: 'desserts', label: 'Dessert Boxes' }
  ];

  // Filtered gallery items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    return activeFilter === 'all' || item.category === activeFilter;
  });

  const handleOpenLightbox = (itemId: string) => {
    const idx = filteredItems.findIndex((item) => item.id === itemId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#fdfaf6] border-t border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold inline-flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Fatima's Lookbook</span>
            <Sparkles className="w-3 h-3" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-chocolate tracking-tight">
            Visual Inspiration <span className="italic font-normal">Gallery</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold mx-auto" />
          <p className="text-sm text-chocolate/75 font-light max-w-xl mx-auto">
            Browse through Fatima's real custom work, featuring intricate frosting ruffles, delicate decorations, and sweet pastry curations.
          </p>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-chocolate text-white shadow-sm'
                  : 'bg-white text-chocolate/80 border border-chocolate/15 hover:bg-beige/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Bento-style Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {filteredItems.map((item, idx) => {
            // Give some items taller dimensions for bento masonry effect
            const isTaller = idx === 1 || idx === 4;
            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => handleOpenLightbox(item.id)}
                className={`group relative overflow-hidden rounded-none border border-chocolate/10 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer ${
                  isTaller ? 'sm:row-span-2 h-auto' : 'h-full'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Cover Layer on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/90 via-chocolate/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-1.5">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-gold">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-white/80 font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-gold uppercase tracking-widest pt-2">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Zoom View</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate/80 backdrop-blur-sm"
              onClick={() => setLightboxIndex(null)}
            >
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 bg-black/40 hover:bg-black/60 p-2.5 rounded-none text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-stretch bg-white rounded-none overflow-hidden shadow-xl border border-chocolate/10">
                {/* Left/Prev Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 text-white rounded-none z-10 transition-all cursor-pointer"
                  title="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right/Next Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 text-white rounded-none z-10 transition-all cursor-pointer"
                  title="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image Section */}
                <div
                  className="md:w-3/5 bg-amber-50/20 aspect-[4/3] md:aspect-auto max-h-[50vh] md:max-h-[70vh] flex items-center justify-center overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={filteredItems[lightboxIndex].image}
                    alt={filteredItems[lightboxIndex].title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Description info side */}
                <div
                  className="p-6 sm:p-8 md:w-2/5 flex flex-col justify-between text-left space-y-6 bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold tracking-widest uppercase bg-gold text-white px-3 py-1 rounded-none block w-max">
                        {filteredItems[lightboxIndex].category}
                      </span>
                      <h3 className="font-serif text-lg font-light text-chocolate">
                        {filteredItems[lightboxIndex].title}
                      </h3>
                    </div>
                    <div className="w-12 h-[1px] bg-chocolate/15" />
                    <p className="text-xs text-chocolate/70 leading-relaxed font-light">
                      {filteredItems[lightboxIndex].description}
                    </p>
                  </div>

                  {/* CTA Details */}
                  <div className="space-y-3 pt-6 border-t border-chocolate/10">
                    <p className="text-[10px] text-chocolate/60 font-light italic leading-relaxed">
                      Inspired by this specific design? Fatima can craft a custom replica matching your color scheme and size.
                    </p>
                    <a
                      href={`https://wa.me/1234567890?text=Hi%20Fatima,%20I'm%20absolutely%20in%20love%20with%20your%20'${encodeURIComponent(filteredItems[lightboxIndex].title)}'%20design%20from%20your%20website%20gallery!%20Can%20we%20discuss%20pricing?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-chocolate hover:bg-gold text-white text-[10px] font-bold tracking-widest uppercase py-3 rounded-none shadow-sm transition-all flex items-center justify-center space-x-1.5"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Ask About This Look</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
