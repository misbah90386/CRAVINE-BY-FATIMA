/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Cake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CakeItem } from '../types';

interface NavbarProps {
  cart: { item: CakeItem; quantity: number }[];
  customCakes: any[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({
  cart,
  customCakes,
  onOpenCart,
  activeSection,
  onNavigate
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, c) => acc + c.quantity, 0) + customCakes.length;

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'specialties', label: 'Our Specialties' },
    { id: 'catalog', label: 'Signature Cakes' },
    { id: 'builder', label: 'Custom Cake Designer' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Fatima' }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3 border-b border-chocolate/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <div
            id="brand-logo"
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => handleLinkClick('hero')}
          >
            <div className="w-10 h-10 rounded-full bg-beige border border-gold/15 flex items-center justify-center text-gold shadow-sm">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.2em] text-chocolate uppercase block">
                Cravine
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-gold block font-sans -mt-1 font-medium">
                by Fatima
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div id="desktop-links" className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`navlink-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 relative py-1 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-gold'
                    : 'text-chocolate/80 hover:text-gold'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action Area (Inquiry Bag + Contact Button) */}
          <div id="nav-actions" className="flex items-center space-x-4">
            {/* Inquiry Bag Icon */}
            <button
              id="inquiry-bag-btn"
              onClick={onOpenCart}
              className="relative p-2 text-chocolate hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer"
              aria-label="Open Inquiry Bag"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[9px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gold rounded-full shadow-md"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Premium Call Button */}
            <a
              id="nav-quick-whatsapp"
              href="https://wa.me/1234567890?text=Hello%20Fatima,%20I'm%20interested%20in%20ordering%20a%20luxury%20cake!"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 bg-chocolate hover:bg-gold text-white px-5 py-2.5 rounded-none text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm"
            >
              <Phone className="w-3 h-3" />
              <span>Inquire Now</span>
            </a>

            {/* Mobile Hamburger Menu Icon */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-chocolate hover:text-gold transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cream border-t border-chocolate/10 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`moblink-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-none text-xs font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-beige text-gold'
                      : 'text-chocolate hover:bg-beige/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-chocolate/10 px-4 flex flex-col gap-3">
                <a
                  href="https://wa.me/1234567890?text=Hello%20Fatima!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-chocolate hover:bg-gold text-white py-3 rounded-none font-bold tracking-widest uppercase text-xs transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
