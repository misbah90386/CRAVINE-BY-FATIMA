/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, ShoppingBag, Eye, X, Check, Search, SlidersHorizontal } from 'lucide-react';
import { CAKE_CATALOG, CAKE_FLAVORS, CAKE_SIZES } from '../data';
import { CakeItem } from '../types';

interface CakeCatalogProps {
  onAddToBag: (cake: CakeItem, quantity: number, customNotes?: string) => void;
  selectedFilter: string;
}

export default function CakeCatalog({ onAddToBag, selectedFilter }: CakeCatalogProps) {
  const [activeCategory, setActiveCategory] = useState(selectedFilter || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);
  const [quickQty, setQuickQty] = useState(1);
  const [quickNotes, setQuickNotes] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Delights' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'custom', label: 'Custom' },
    { id: 'cupcakes', label: 'Cupcakes' },
    { id: 'bento', label: 'Bento Cakes' },
    { id: 'desserts', label: 'Sweets & Boxes' }
  ];

  // Filter & Sort Logic
  const filteredCakes = CAKE_CATALOG.filter((cake) => {
    const matchesCategory = activeCategory === 'all' || cake.category === activeCategory;
    const matchesSearch = cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cake.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedCakes = [...filteredCakes].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Featured/default
  });

  const handleAddClick = (cake: CakeItem) => {
    onAddToBag(cake, 1);
    setAddedAnimationId(cake.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
  };

  const handleQuickViewAdd = (cake: CakeItem) => {
    onAddToBag(cake, quickQty, quickNotes);
    setSelectedCake(null);
    setQuickQty(1);
    setQuickNotes('');
  };

  return (
    <section id="catalog" className="py-24 bg-[#fdfaf6] border-t border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold inline-flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Our Signature Creations</span>
            <Sparkles className="w-3 h-3" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-chocolate tracking-tight">
            The Cravine <span className="italic font-normal">Gallery</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold mx-auto" />
          <p className="text-sm text-chocolate/75 font-light max-w-xl mx-auto">
            Indulge your eyes in Fatima's signature line of custom cakes, freshly crafted with bespoke details for your sweetest moments. Select an item to view or add to your inquiry.
          </p>
        </div>

        {/* Search, Filter Tabs and Sorting Bar */}
        <div className="space-y-6 mb-12">
          {/* Controls Trigger Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Filter Tabs scrollable */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-chocolate text-white shadow-sm'
                      : 'bg-white text-chocolate/80 border border-chocolate/15 hover:bg-beige/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick search and filter toggler */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-none border transition-colors flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest cursor-pointer ${
                  showFilters
                    ? 'bg-gold/10 border-gold text-gold'
                    : 'bg-white border-chocolate/15 text-chocolate hover:bg-[#faf6f0]'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Sort & Search</span>
              </button>
            </div>
          </div>

          {/* Collapsible search / sort options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-6 rounded-none border border-chocolate/10 grid sm:grid-cols-2 gap-6 overflow-hidden"
              >
                {/* Search Box */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-chocolate">Search Confections</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate/50" />
                    <input
                      type="text"
                      placeholder="e.g. Wedding, Chocolate, Red Velvet..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#faf6f0] pl-10 pr-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate placeholder-chocolate/40 focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Sort dropdown */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-chocolate">Sort Treats</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-[#faf6f0] px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold"
                  >
                    <option value="featured">Featured Favorites</option>
                    <option value="price-low">Price: Sweet to Royal (Low to High)</option>
                    <option value="price-high">Price: Royal to Sweet (High to Low)</option>
                    <option value="rating">Top Rated (5 Stars)</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cakes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedCakes.map((cake) => (
            <motion.div
              key={cake.id}
              layout
              id={`cake-item-${cake.id}`}
              className="group bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md border border-chocolate/10 transition-all duration-300 flex flex-col h-full"
            >
              {/* Product Thumbnail with hover buttons */}
              <div className="relative w-full aspect-[4/3] bg-amber-50/10 overflow-hidden">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-chocolate/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setSelectedCake(cake)}
                    className="p-3 bg-white hover:bg-[#faf6f0] text-chocolate rounded-none shadow-md transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                    title="Quick View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAddClick(cake)}
                    className="p-3 bg-chocolate hover:bg-gold text-white rounded-none shadow-md transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75 cursor-pointer"
                    title="Add to Inquiry Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/95 border border-gold/15 px-2.5 py-1 rounded-none text-[9px] font-bold text-chocolate shadow-sm flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span>{cake.rating.toFixed(1)}</span>
                </div>

                {/* Price Label */}
                <div className="absolute bottom-3 right-3 bg-chocolate/95 px-3 py-1.5 rounded-none border border-gold/10 text-[10px] font-bold text-white shadow-sm">
                  From ${cake.price}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-grow justify-between text-left">
                <div className="space-y-2">
                  <h3 className="font-serif text-sm font-semibold text-chocolate group-hover:text-gold transition-colors line-clamp-1">
                    {cake.name}
                  </h3>
                  <p className="text-xs text-chocolate/70 leading-relaxed line-clamp-2 font-light">
                    {cake.description}
                  </p>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 mt-4 border-t border-chocolate/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCake(cake)}
                    className="text-[10px] font-bold uppercase tracking-widest text-chocolate/65 hover:text-gold transition-colors cursor-pointer"
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => handleAddClick(cake)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-none transition-all duration-300 cursor-pointer ${
                      addedAnimationId === cake.id
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#faf6f0] hover:bg-beige/40 text-chocolate border border-chocolate/10'
                    }`}
                  >
                    {addedAnimationId === cake.id ? (
                      <span className="flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Added!</span>
                      </span>
                    ) : (
                      <span>Inquire Bag</span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedCakes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-none border border-dashed border-chocolate/20 max-w-lg mx-auto">
            <p className="text-chocolate/70 font-light">No delicious treats matched your current search filters.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-xs font-bold text-gold uppercase tracking-widest underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Quick View / Customization Detail Modal */}
        <AnimatePresence>
          {selectedCake && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 15 }}
                className="bg-white w-full max-w-3xl rounded-none overflow-hidden shadow-xl border border-chocolate/10 max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header banner */}
                <div className="relative w-full h-64 bg-amber-50">
                  <img
                    src={selectedCake.image}
                    alt={selectedCake.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/15 to-transparent" />
                  <button
                    onClick={() => setSelectedCake(null)}
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 p-2 text-white rounded-none transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-6 left-6 text-left">
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-gold text-white px-3 py-1 rounded-none block w-max mb-2">
                      {selectedCake.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                      {selectedCake.name}
                    </h3>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 text-left grid md:grid-cols-12 gap-8">
                  {/* Left Col: details */}
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold">Description</h4>
                      <p className="text-sm text-chocolate/80 leading-relaxed font-light">
                        {selectedCake.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold">Premium Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedCake.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-2 text-xs text-chocolate/75">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flavors & Serving Guide */}
                    <div className="space-y-3 p-4 bg-cream rounded-none border border-chocolate/10">
                      <h5 className="text-[10px] font-bold text-chocolate uppercase tracking-widest">Fatima's Quality Promise</h5>
                      <p className="text-[11px] text-chocolate/75 leading-relaxed font-light">
                        All cakes are custom baked. You can choose from our gourmet sponge flavors (Belgian Chocolate, Red Velvet, Vanilla Bean, etc.) when finalizing the order details.
                      </p>
                    </div>
                  </div>

                  {/* Right Col: Interactive Inquiry customization */}
                  <div className="md:col-span-5 space-y-5">
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold">Estimated Cost</h4>
                      <span className="text-3xl font-serif font-light text-chocolate">
                        ${selectedCake.price * quickQty}
                      </span>
                    </div>

                    {/* Quantity Picker */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-chocolate block">Quantity</label>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setQuickQty(Math.max(1, quickQty - 1))}
                          className="w-10 h-10 rounded-none bg-[#faf6f0] border border-chocolate/10 font-bold text-chocolate flex items-center justify-center hover:bg-beige/30 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold text-chocolate w-8 text-center">{quickQty}</span>
                        <button
                          onClick={() => setQuickQty(quickQty + 1)}
                          className="w-10 h-10 rounded-none bg-[#faf6f0] border border-chocolate/10 font-bold text-chocolate flex items-center justify-center hover:bg-beige/30 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Custom messages or notes */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-chocolate block">Special Design Requests</label>
                      <textarea
                        placeholder="e.g. Write 'Happy Birthday Sarah' on cake, buttercream color pastel pink..."
                        value={quickNotes}
                        onChange={(e) => setQuickNotes(e.target.value)}
                        className="w-full text-xs p-3 rounded-none border border-chocolate/10 focus:outline-none focus:border-gold placeholder-chocolate/40 bg-[#faf6f0] h-20 resize-none text-chocolate"
                      />
                    </div>

                    {/* Submit Add to Bag */}
                    <button
                      onClick={() => handleQuickViewAdd(selectedCake)}
                      className="w-full bg-chocolate hover:bg-gold text-white py-3 rounded-none text-xs font-bold tracking-widest uppercase shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Inquiry</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
