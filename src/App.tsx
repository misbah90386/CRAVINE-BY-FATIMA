/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Specialties from './components/Specialties';
import CakeCatalog from './components/CakeCatalog';
import CustomBuilder from './components/CustomBuilder';
import WhyChooseUs from './components/WhyChooseUs';
import OrderingProcess from './components/OrderingProcess';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import InquiryDrawer from './components/InquiryDrawer';
import { CakeItem } from './types';

export default function App() {
  const [cart, setCart] = useState<{ item: CakeItem; quantity: number; notes?: string }[]>([]);
  const [customCakes, setCustomCakes] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [catalogFilter, setCatalogFilter] = useState('all');

  // Intersection Observer for scroll highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = ['hero', 'about', 'specialties', 'catalog', 'builder', 'why-choose-us', 'ordering-process', 'gallery', 'faq', 'contact'];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleNavigateToCatalog = (filter: string) => {
    setCatalogFilter(filter);
    handleNavigate('catalog');
  };

  // Cart operations
  const handleAddToBag = (cake: CakeItem, quantity: number, customNotes?: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.item.id === cake.id);
      if (existing) {
        return prevCart.map((c) =>
          c.item.id === cake.id ? { ...c, quantity: c.quantity + quantity, notes: customNotes || c.notes } : c
        );
      }
      return [...prevCart, { item: cake, quantity, notes: customNotes }];
    });
    setIsCartOpen(true);
  };

  const handleAddCustomCake = (bespokeCake: any) => {
    setCustomCakes((prev) => [...prev, bespokeCake]);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id: string, isCustom?: boolean) => {
    if (isCustom) {
      setCustomCakes((prev) => prev.filter((c) => c.id !== id));
    } else {
      setCart((prevCart) => prevCart.filter((c) => c.item.id !== id));
    }
  };

  const handleClearCart = () => {
    setCart([]);
    setCustomCakes([]);
  };

  return (
    <div id="cravine-root-app" className="bg-[#faf6f0] text-chocolate font-sans antialiased selection:bg-gold/20 selection:text-chocolate">
      {/* Sticky Premium Header Navbar */}
      <Navbar
        cart={cart}
        customCakes={customCakes}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Sections Stack */}
      <main className="relative">
        <Hero onNavigate={handleNavigate} />
        <AboutUs />
        <Specialties onNavigateToCatalog={handleNavigateToCatalog} />
        <CakeCatalog onAddToBag={handleAddToBag} selectedFilter={catalogFilter} />
        <CustomBuilder onAddCustomCake={handleAddCustomCake} />
        <WhyChooseUs />
        <OrderingProcess />
        <Gallery />
        <Testimonials />
        <FAQ />
        <ContactSection />
      </main>

      {/* Traditional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Sliding Checkout/Inquiry Bag drawer overlay */}
      <InquiryDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        customCakes={customCakes}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
