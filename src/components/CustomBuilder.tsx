/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, HelpCircle, ChevronRight, ChevronLeft, ShoppingBag, RotateCcw } from 'lucide-react';
import { CAKE_FLAVORS, CAKE_SIZES, TOPPING_OPTIONS, PIPING_STYLES } from '../data';

interface CustomBuilderProps {
  onAddCustomCake: (customCake: any) => void;
}

const FROSTING_COLORS = [
  { name: 'Elegant Buttercream', value: '#FCF8F2', textColor: '#5c2d18' },
  { name: 'Blush Velvet Pink', value: '#FBCFD0', textColor: '#a12c41' },
  { name: 'Lavender Breeze', value: '#E2D1F9', textColor: '#4b156b' },
  { name: 'Matcha Blossom Green', value: '#DFECDB', textColor: '#2b5025' },
  { name: 'Belgian Cocoa Brown', value: '#4E3629', textColor: '#faf6f0' },
  { name: 'Soft Peach Glow', value: '#FCD7B8', textColor: '#70360a' },
  { name: 'Classic Sky Blue', value: '#C9E4DE', textColor: '#164c40' }
];

export default function CustomBuilder({ onAddCustomCake }: CustomBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSize, setSelectedSize] = useState(CAKE_SIZES[1]); // Default to Small
  const [selectedFlavor, setSelectedFlavor] = useState(CAKE_FLAVORS[0]); // Default to Belgian Chocolate
  const [selectedColor, setSelectedColor] = useState(FROSTING_COLORS[1]); // Default to Blush Pink
  const [selectedPiping, setSelectedPiping] = useState(PIPING_STYLES[1]); // Default to Lambeth
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Edible Gold Leaf Accents', 'Luxury Sprinkles & Pearls']);
  const [customMessage, setCustomMessage] = useState('Happy Celebration');
  const [notes, setNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Steps labels
  const steps = [
    { label: 'Size & Structure' },
    { label: 'Gourmet Flavors' },
    { label: 'Aesthetics & Colors' },
    { label: 'Luxe Toppings' }
  ];

  // Price calculation
  const toppingsPrice = selectedToppings.length * 5;
  const totalPrice = selectedSize.basePrice + toppingsPrice;

  const handleToppingToggle = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleReset = () => {
    setSelectedSize(CAKE_SIZES[1]);
    setSelectedFlavor(CAKE_FLAVORS[0]);
    setSelectedColor(FROSTING_COLORS[1]);
    setSelectedPiping(PIPING_STYLES[1]);
    setSelectedToppings(['Edible Gold Leaf Accents', 'Luxury Sprinkles & Pearls']);
    setCustomMessage('Happy Celebration');
    setNotes('');
    setCurrentStep(0);
    setIsAdded(false);
  };

  const handleAddToBag = () => {
    const bespokeCake = {
      id: `custom-${Date.now()}`,
      name: `Bespoke: ${selectedSize.name} Cake`,
      size: selectedSize.name,
      dimensions: selectedSize.size,
      servings: selectedSize.serves,
      flavor: selectedFlavor.name,
      frostingColor: selectedColor.name,
      colorHex: selectedColor.value,
      piping: selectedPiping.name,
      toppings: selectedToppings,
      message: customMessage,
      notes: notes,
      price: totalPrice,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=400&auto=format&fit=crop', // beautiful base preview
      isCustom: true
    };
    onAddCustomCake(bespokeCake);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2500);
  };

  // Determine height multiplier of cylinders based on size/tier structure
  const getCylinderCount = () => {
    if (selectedSize.name.includes('Two-Tier')) return 2;
    if (selectedSize.name.includes('Three-Tier')) return 3;
    return 1;
  };

  const cylinderCount = getCylinderCount();

  return (
    <section id="builder" className="py-24 bg-white border-t border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold inline-flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Interactive Visual Studio</span>
            <Sparkles className="w-3 h-3" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-chocolate tracking-tight">
            Design Your <span className="italic font-normal">Bespoke Masterpiece</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold mx-auto" />
          <p className="text-sm text-chocolate/75 font-light max-w-xl mx-auto">
            Experience our visual sandbox. Customize tiers, colors, piping styles, text, and luxury toppings to watch your unique confection spring to life.
          </p>
        </div>

        {/* Builder Container */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT COLUMN: Visual SVG interactive preview */}
          <div className="lg:col-span-5 bg-cream border border-chocolate/10 rounded-none p-6 sm:p-8 flex flex-col justify-between shadow-sm min-h-[460px] relative overflow-hidden">
            
            {/* Glossy background circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blush/15 blur-3xl" />

            <div className="flex justify-between items-center z-10">
              <span className="text-[9px] font-bold tracking-widest uppercase text-chocolate/50">
                Live Preview
              </span>
              <button
                onClick={handleReset}
                className="text-[10px] font-bold text-gold hover:text-chocolate transition-colors flex items-center space-x-1 uppercase cursor-pointer tracking-wider"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Visual SVG Cake Render */}
            <div className="my-auto py-8 flex justify-center items-center z-10 relative">
              <svg
                id="interactive-cake-svg"
                viewBox="0 0 320 340"
                className="w-72 h-80 drop-shadow-xl"
              >
                {/* Cake Stand Base */}
                <ellipse cx="160" cy="285" rx="110" ry="15" fill="#e2d4c5" />
                <path d="M 120 285 L 130 310 L 190 310 L 200 285 Z" fill="#cfbeae" />
                <rect x="150" y="285" width="20" height="20" fill="#ebd9c5" />
                <ellipse cx="160" cy="283" rx="105" ry="12" fill="#faf6f0" />

                {/* Render Tiers */}
                {/* Bottom Tier (Tier 1) - Present in all cakes */}
                <g id="cake-tier-1" transform={`translate(0, ${cylinderCount === 1 ? 70 : cylinderCount === 2 ? 60 : 50})`}>
                  {/* Cylinder Base/Sides */}
                  <path
                    d="M 60 130 A 100 24 0 0 0 260 130 L 260 200 A 100 24 0 0 1 60 200 Z"
                    fill={selectedColor.value}
                  />
                  {/* Cylinder Top Oval */}
                  <ellipse cx="160" cy="130" rx="100" ry="24" fill={selectedColor.value} filter="brightness(1.08)" />

                  {/* Lambeth/Vintage Piping Borders on bottom oval border */}
                  {selectedPiping.name === 'Lambeth Vintage piping' && (
                    <g id="bottom-piping-ruffle">
                      <path d="M 60 195 C 70 205, 80 205, 90 195 C 100 205, 110 205, 120 195 C 130 205, 140 205, 150 195 C 160 205, 170 205, 180 195 C 190 205, 200 205, 210 195 C 220 205, 230 205, 240 195 C 250 205, 260 205, 260 195" fill="none" stroke="#fff" strokeWidth="6" opacity="0.85" />
                      <ellipse cx="160" cy="130" rx="98" ry="22" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="6,4" opacity="0.9" />
                    </g>
                  )}

                  {/* Sprinkles rendering */}
                  {selectedToppings.includes('Luxury Sprinkles & Pearls') && (
                    <g opacity="0.85">
                      <circle cx="100" cy="140" r="3" fill="#fbc5d0" />
                      <circle cx="130" cy="132" r="2.5" fill="#fff" />
                      <circle cx="180" cy="135" r="3.5" fill="#f7ebc3" />
                      <circle cx="210" cy="143" r="2" fill="#d8b27c" />
                      <circle cx="120" cy="180" r="2.5" fill="#fff" />
                      <circle cx="160" cy="185" r="3" fill="#fbc5d0" />
                      <circle cx="200" cy="175" r="3" fill="#d8b27c" />
                    </g>
                  )}

                  {/* Gold leaf accents */}
                  {selectedToppings.includes('Edible Gold Leaf Accents') && (
                    <g fill="#d8b27c" opacity="0.9">
                      <path d="M 75 140 L 85 145 L 80 152 Z" />
                      <path d="M 230 150 L 242 147 L 235 158 Z" />
                      <path d="M 145 180 L 155 178 L 150 185 Z" />
                      <path d="M 90 170 L 98 174 L 92 181 Z" />
                    </g>
                  )}

                  {/* Curved Custom frosting text */}
                  {customMessage && cylinderCount === 1 && (
                    <text
                      x="160"
                      y="168"
                      textAnchor="middle"
                      fill={selectedColor.textColor}
                      className="font-serif font-bold text-sm tracking-wide select-none pointer-events-none"
                    >
                      {customMessage.slice(0, 18)}
                    </text>
                  )}
                </g>

                {/* Middle Tier (Tier 2) - Only present in 2-Tier or 3-Tier */}
                {cylinderCount >= 2 && (
                  <g id="cake-tier-2" transform={`translate(0, ${cylinderCount === 2 ? 10 : -10})`}>
                    <path
                      d="M 85 110 A 75 18 0 0 0 235 110 L 235 165 A 75 18 0 0 1 85 165 Z"
                      fill={selectedColor.value}
                      filter="brightness(0.95)"
                    />
                    <ellipse cx="160" cy="110" rx="75" ry="18" fill={selectedColor.value} filter="brightness(1.05)" />

                    {selectedPiping.name === 'Lambeth Vintage piping' && (
                      <ellipse cx="160" cy="110" rx="73" ry="16" fill="none" stroke="#fff" strokeWidth="3" opacity="0.85" />
                    )}

                    {/* Text placed on tier 2 if multi-tier */}
                    {customMessage && (
                      <text
                        x="160"
                        y="142"
                        textAnchor="middle"
                        fill={selectedColor.textColor}
                        className="font-serif font-bold text-xs tracking-wide select-none pointer-events-none"
                      >
                        {customMessage.slice(0, 15)}
                      </text>
                    )}
                  </g>
                )}

                {/* Top Tier (Tier 3) - Only present in 3-Tier */}
                {cylinderCount === 3 && (
                  <g id="cake-tier-3" transform="translate(0, -60)">
                    <path
                      d="M 105 100 A 55 14 0 0 0 215 100 L 215 145 A 55 14 0 0 1 105 145 Z"
                      fill={selectedColor.value}
                      filter="brightness(0.9)"
                    />
                    <ellipse cx="160" cy="100" rx="55" ry="14" fill={selectedColor.value} filter="brightness(1.02)" />

                    {selectedPiping.name === 'Lambeth Vintage piping' && (
                      <ellipse cx="160" cy="100" rx="53" ry="12" fill="none" stroke="#fff" strokeWidth="3" opacity="0.85" />
                    )}
                  </g>
                )}

                {/* Top Cake Toppings */}
                <g id="top-toppings" transform={`translate(0, ${cylinderCount === 1 ? 70 : cylinderCount === 2 ? 10 : -60})`}>
                  {/* Cherries/Roses on the absolute top edge */}
                  {selectedToppings.includes('Handcrafted Sugar Roses') && (
                    <g fill="#fbc5d0" stroke="#fff" strokeWidth="0.5">
                      <circle cx="160" cy="100" r="8" />
                      <circle cx="148" cy="102" r="6" />
                      <circle cx="172" cy="102" r="6" />
                    </g>
                  )}

                  {selectedToppings.includes('Gourmet French Macarons') && (
                    <g fill="#c29b63" opacity="0.9">
                      <rect x="155" y="90" width="10" height="8" rx="2" />
                      <rect x="142" y="93" width="10" height="8" rx="2" />
                      <rect x="168" y="93" width="10" height="8" rx="2" />
                    </g>
                  )}

                  {selectedToppings.includes('Fresh Berries & Raspberries') && (
                    <g fill="#7a121d" opacity="0.95">
                      {/* Raspberries */}
                      <circle cx="160" cy="102" r="5" />
                      <circle cx="152" cy="100" r="4.5" />
                      <circle cx="168" cy="100" r="4.5" />
                    </g>
                  )}

                  {/* Standard candle/sprig */}
                  {selectedToppings.includes('Fresh Eucalyptus & Floral Sprigs') && (
                    <g stroke="#2b5025" strokeWidth="2.5" fill="none">
                      <path d="M 160 100 Q 155 85, 145 80" />
                      <path d="M 160 100 Q 168 88, 178 85" />
                    </g>
                  )}
                </g>
              </svg>
            </div>

            {/* Price tag summary banner */}
            <div className="bg-chocolate text-[#faf6f0] p-4 rounded-none flex justify-between items-center z-10 shadow-sm border border-gold/15">
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-widest text-[#ebd9c5]">Estimated Cost</span>
                <span className="font-serif text-lg font-light text-white">${totalPrice}</span>
              </div>
              <div className="text-right">
                <span className="block text-[9px] uppercase tracking-widest text-[#ebd9c5]">Slices</span>
                <span className="text-xs font-semibold text-white">{selectedSize.serves}</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive step controls */}
          <div className="lg:col-span-7 flex flex-col justify-between border border-chocolate/10 p-6 sm:p-8 rounded-none bg-white shadow-sm">
            
            <div className="space-y-6">
              {/* Stepper Progress bar */}
              <div className="flex items-center justify-between border-b border-chocolate/10 pb-4">
                {steps.map((step, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setCurrentStep(sIdx)}
                    className="flex flex-col items-center gap-1 cursor-pointer group focus:outline-none"
                  >
                    <div
                      className={`w-7 h-7 rounded-none text-xs font-semibold flex items-center justify-center transition-all ${
                        sIdx === currentStep
                          ? 'bg-gold text-white shadow-sm'
                          : sIdx < currentStep
                          ? 'bg-chocolate text-white'
                          : 'bg-[#faf6f0] text-chocolate/60 border border-chocolate/10'
                      }`}
                    >
                      {sIdx < currentStep ? <Check className="w-3.5 h-3.5" /> : sIdx + 1}
                    </div>
                    <span className="hidden sm:inline text-[9px] font-bold uppercase tracking-widest text-chocolate/60">
                      {step.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Step Contents */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  {/* STEP 1: Size & Structure */}
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg font-light text-chocolate">Select Structure & Size</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {CAKE_SIZES.map((size) => (
                          <div
                            key={size.name}
                            onClick={() => setSelectedSize(size)}
                            className={`p-4 rounded-none border text-left cursor-pointer transition-all ${
                              selectedSize.name === size.name
                                ? 'border-gold bg-gold/5 shadow-sm'
                                : 'border-chocolate/10 bg-white hover:bg-[#faf6f0]'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-serif text-xs font-semibold text-chocolate">{size.name}</span>
                              <span className="text-xs font-bold text-gold">${size.basePrice}</span>
                            </div>
                            <p className="text-[10px] text-chocolate/70 font-light">
                              Diameter: {size.size} | Serves: {size.serves}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Gourmet Flavors */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg font-light text-chocolate">Select Gourmet Sponge & Filling</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {CAKE_FLAVORS.map((flavor) => (
                          <div
                            key={flavor.name}
                            onClick={() => setSelectedFlavor(flavor)}
                            className={`p-4 rounded-none border text-left cursor-pointer transition-all flex items-start space-x-3.5 ${
                              selectedFlavor.name === flavor.name
                                ? 'border-gold bg-gold/5 shadow-sm'
                                : 'border-chocolate/10 bg-white hover:bg-[#faf6f0]'
                            }`}
                          >
                            <div
                              className="w-4 h-4 rounded-none mt-0.5 border border-chocolate/10"
                              style={{ backgroundColor: flavor.color }}
                            />
                            <div className="space-y-0.5">
                              <span className="font-serif text-xs font-semibold text-chocolate block">{flavor.name}</span>
                              <p className="text-[10px] text-chocolate/70 font-light leading-relaxed">
                                {flavor.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Aesthetics, Color, Piping, Text */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg font-light text-chocolate">Buttercream Color & Text Customization</h3>
                      
                      {/* Color Palette Row */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60 block">
                          Frosting Tint
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {FROSTING_COLORS.map((col) => (
                            <button
                              key={col.name}
                              onClick={() => setSelectedColor(col)}
                              className={`w-8 h-8 rounded-none border border-chocolate/15 shadow-sm transition-transform cursor-pointer relative ${
                                selectedColor.name === col.name
                                  ? 'scale-105 ring-1 ring-gold ring-offset-2'
                                  : 'hover:scale-102'
                              }`}
                              style={{ backgroundColor: col.value }}
                              title={col.name}
                            >
                              {selectedColor.name === col.name && (
                                <Check className="w-4 h-4 absolute inset-0 m-auto text-chocolate" />
                              )}
                            </button>
                          ))}
                        </div>
                        <span className="text-xs text-chocolate/60 block pt-1">
                          Current Color: <strong className="font-semibold text-chocolate">{selectedColor.name}</strong>
                        </span>
                      </div>

                      {/* Custom Inscription Text */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60 block">
                          Frosting Lettering (Max 18 chars)
                        </label>
                        <input
                          type="text"
                          maxLength={18}
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          placeholder="e.g. Marry Me, Happy 25th..."
                          className="w-full bg-[#faf6f0] px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate font-serif font-bold placeholder-chocolate/30 focus:outline-none focus:border-gold"
                        />
                      </div>

                      {/* Piping Styles selection */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60 block">
                          Border Piping Style
                        </label>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {PIPING_STYLES.map((piping) => (
                            <button
                              key={piping.name}
                              onClick={() => setSelectedPiping(piping)}
                              className={`p-3 rounded-none border text-left text-xs transition-all cursor-pointer ${
                                selectedPiping.name === piping.name
                                  ? 'border-gold bg-gold/5 font-bold text-chocolate'
                                  : 'border-chocolate/10 bg-white hover:bg-[#faf6f0] text-chocolate/70'
                              }`}
                            >
                              <span className="block font-serif text-chocolate">{piping.name}</span>
                              <span className="block text-[9px] text-chocolate/60 font-light mt-0.5">{piping.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Luxe Toppings */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-serif text-lg font-light text-chocolate">Artisanal Toppings & Accents</h3>
                        <span className="text-[9px] text-chocolate font-bold uppercase bg-[#faf6f0] px-2.5 py-1 rounded-none border border-chocolate/10">
                          +$5 per choice
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {TOPPING_OPTIONS.map((topping) => {
                          const hasTopping = selectedToppings.includes(topping);
                          return (
                            <button
                              key={topping}
                              onClick={() => handleToppingToggle(topping)}
                              className={`p-3.5 rounded-none border text-left text-xs transition-all cursor-pointer flex justify-between items-center ${
                                hasTopping
                                  ? 'border-gold bg-gold/5 font-semibold text-chocolate'
                                  : 'border-chocolate/10 bg-white hover:bg-[#faf6f0] text-chocolate/70'
                              }`}
                            >
                              <span>{topping}</span>
                              <div
                                className={`w-4 h-4 rounded-none border flex items-center justify-center transition-all ${
                                  hasTopping
                                    ? 'bg-gold border-gold text-white'
                                    : 'border-chocolate/15 bg-[#faf6f0]'
                                }`}
                              >
                                {hasTopping && <Check className="w-3 h-3" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Actions buttons and Notes input */}
            <div className="mt-8 pt-6 border-t border-chocolate/10 space-y-4">
              {currentStep === 3 && (
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60 block">
                    Special Baking Instructions
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please deliver by 2 PM, low sugar buttercream, extra raspberries..."
                    className="w-full bg-[#faf6f0] px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold"
                  />
                </div>
              )}

              {/* Step triggers buttons */}
              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2.5 rounded-none border border-chocolate/10 text-[10px] font-bold text-chocolate/70 hover:bg-[#faf6f0] transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="bg-chocolate hover:bg-gold text-white px-5 py-2.5 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-sm flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleAddToBag}
                    className={`flex-grow py-3 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-gradient-to-r from-gold to-chocolate text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isAdded ? 'Bespoke Design Added!' : 'Add Design to Inquire'}</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
