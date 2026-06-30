/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cake, Instagram, Facebook, Twitter, MessageSquare, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a0c06] text-[#ebd9c5] pt-16 pb-8 border-t border-gold/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top visual grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand details */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-none bg-gold flex items-center justify-center text-chocolate shadow-sm">
                <Cake className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif text-base font-semibold tracking-widest text-white uppercase block">
                  Cravine
                </span>
                <span className="text-[8px] tracking-[0.3em] uppercase text-gold block font-sans -mt-1">
                  by Fatima
                </span>
              </div>
            </div>
            <p className="text-xs text-[#ebd9c5]/75 leading-relaxed font-light">
              Bespoke luxury cakes and artisanal sweet treats custom baked with organic ingredients to elevate weddings, anniversaries, and precious celebrations.
            </p>
            {/* Social Icons row */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-white/5 border border-white/10 hover:bg-gold hover:text-chocolate flex items-center justify-center transition-colors text-[#ebd9c5]"
                aria-label="Instagram Link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-white/5 border border-white/10 hover:bg-gold hover:text-chocolate flex items-center justify-center transition-colors text-[#ebd9c5]"
                aria-label="Facebook Link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-white/5 border border-white/10 hover:bg-gold hover:text-chocolate flex items-center justify-center transition-colors text-[#ebd9c5]"
                aria-label="Twitter Link"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick navigation anchors */}
          <div className="space-y-4 text-left">
            <h4 className="font-serif text-xs font-semibold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#ebd9c5]/60">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Home</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Our Story</button>
              </li>
              <li>
                <button onClick={() => onNavigate('specialties')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Specialties</button>
              </li>
              <li>
                <button onClick={() => onNavigate('builder')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Custom Designer</button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Booking FAQ</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sweet Treats Category Links */}
          <div className="space-y-4 text-left">
            <h4 className="font-serif text-xs font-semibold text-white uppercase tracking-widest">
              Specialties Menu
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#ebd9c5]/60">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Wedding Cakes</button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Birthday Cakes</button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Korean Bento Cakes</button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Gourmet Cupcakes</button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-gold cursor-pointer transition-colors uppercase tracking-wider text-[9px]">Luxe Dessert Boxes</button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Studio Hours */}
          <div className="space-y-4 text-left">
            <h4 className="font-serif text-xs font-semibold text-white uppercase tracking-widest">
              Studio Hours
            </h4>
            <p className="text-xs text-[#ebd9c5]/75 leading-relaxed font-light">
              Baking orders scheduled daily. Private tastings & design consultations available strictly by appointment.
            </p>
            <div className="text-[11px] font-light text-[#ebd9c5]/80 space-y-1 pt-1 uppercase tracking-wider">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="font-semibold text-white">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sat - Sun:</span>
                <span className="font-semibold text-white">10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row with scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-[#ebd9c5]/50 font-light">
          <div>
            &copy; {new Date().getFullYear()} Cravine by Fatima. All rights reserved. Made with{' '}
            <Heart className="inline w-3 h-3 text-gold fill-gold" /> for sweet celebrations.
          </div>

          <button
            onClick={handleBackToTop}
            className="mt-4 sm:mt-0 bg-white/5 hover:bg-gold hover:text-chocolate transition-all p-2.5 rounded-none text-[#ebd9c5] cursor-pointer flex items-center justify-center border border-white/10 shadow-sm"
            title="Scroll To Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
