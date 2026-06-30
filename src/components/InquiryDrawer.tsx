/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, MessageSquare, Mail, Check, Calendar, MapPin, Truck } from 'lucide-react';
import { CakeItem } from '../types';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { item: CakeItem; quantity: number; notes?: string }[];
  customCakes: any[];
  onRemoveItem: (id: string, isCustom?: boolean) => void;
  onClearCart: () => void;
}

export default function InquiryDrawer({
  isOpen,
  onClose,
  cart,
  customCakes,
  onRemoveItem,
  onClearCart
}: InquiryDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'details' | 'success'>('review');
  const [recipient, setRecipient] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    delivery: 'pickup' as 'pickup' | 'delivery',
    address: '',
    notes: ''
  });

  const [copiedInvoice, setCopiedInvoice] = useState(false);

  const cartTotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  const customTotal = customCakes.reduce((acc, c) => acc + c.price, 0);
  const grandTotal = cartTotal + customTotal;

  const totalItemsCount = cart.reduce((acc, c) => acc + c.quantity, 0) + customCakes.length;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setRecipient({
      ...recipient,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.name || !recipient.phone || !recipient.date) {
      return;
    }
    setCheckoutStep('success');
  };

  // Build perfectly readable text message for WhatsApp/Email
  const generateOrderSummaryString = () => {
    let text = `🎂 *NEW CAKE ORDER FROM CRAVINE BY FATIMA* 🎂\n\n`;
    text += `*CUSTOMER DETAILS:*\n`;
    text += `• Name: ${recipient.name}\n`;
    text += `• Phone: ${recipient.phone}\n`;
    text += `• Email: ${recipient.email || 'None'}\n`;
    text += `• Event Date: ${recipient.date}\n`;
    text += `• Fulfillment: ${recipient.delivery.toUpperCase()}\n`;
    if (recipient.delivery === 'delivery' && recipient.address) {
      text += `• Venue Address: ${recipient.address}\n`;
    }
    if (recipient.notes) {
      text += `• Delivery Notes: ${recipient.notes}\n`;
    }
    text += `\n*SELECTED CREATIONS:*\n`;

    // Signature items
    if (cart.length > 0) {
      text += `\n_Signature Cakes:_\n`;
      cart.forEach((c) => {
        text += `• ${c.item.name} (x${c.quantity}) - $${c.item.price * c.quantity}\n`;
        if (c.notes) text += `  _Request:_ ${c.notes}\n`;
      });
    }

    // Custom cakes
    if (customCakes.length > 0) {
      text += `\n_Bespoke Custom Cakes:_\n`;
      customCakes.forEach((c) => {
        text += `• ${c.size} (${c.flavor})\n`;
        text += `  _Tint:_ ${c.frostingColor} | _Piping:_ ${c.piping}\n`;
        text += `  _Lettering:_ "${c.message || 'None'}"\n`;
        if (c.toppings.length > 0) text += `  _Toppings:_ ${c.toppings.join(', ')}\n`;
        text += `  _Price:_ $${c.price}\n`;
      });
    }

    text += `\n*TOTAL ESTIMATED QUOTE: $${grandTotal}*`;
    return text;
  };

  const triggerWhatsAppCheckout = () => {
    const text = generateOrderSummaryString();
    const url = `https://wa.me/1234567890?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const triggerEmailCheckout = () => {
    const text = generateOrderSummaryString();
    const subject = `Cake Inquiry - ${recipient.name}`;
    const url = `mailto:fatima@cravine.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyInvoiceText = () => {
    const text = generateOrderSummaryString();
    navigator.clipboard.writeText(text);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay mask */}
          <div
            className="fixed inset-0 z-50 bg-chocolate/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer sheet container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md sm:max-w-lg bg-white shadow-xl flex flex-col justify-between border-l border-chocolate/10 rounded-none"
          >
            {/* Header section */}
            <div className="p-6 border-b border-chocolate/10 flex justify-between items-center bg-cream">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-lg font-light text-chocolate uppercase tracking-wide">
                  Inquiry Bag ({totalItemsCount})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-none hover:bg-chocolate hover:text-white text-chocolate border border-chocolate/10 cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable contents box */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {totalItemsCount === 0 && checkoutStep !== 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-none bg-cream border border-chocolate/10 flex items-center justify-center text-gold">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-chocolate">Your Bag is Empty</h4>
                    <p className="text-xs text-chocolate/60 max-w-xs font-light mt-1">
                      Browse our signature collections or customize your bespoke cake to start designing.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-chocolate text-white px-5 py-2.5 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-sm hover:bg-gold transition-colors cursor-pointer"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : checkoutStep === 'review' ? (
                /* STEP 1: REVIEW THE ITEMS */
                <div className="space-y-4">
                  {/* List signature items */}
                  {cart.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-[9px] font-bold text-chocolate/50 uppercase tracking-widest block border-b border-chocolate/10 pb-1 text-left">
                        Signature Confections
                      </span>
                      {cart.map((c) => (
                        <div
                          key={c.item.id}
                          className="flex items-stretch space-x-4 p-3 bg-cream rounded-none border border-chocolate/10 relative group"
                        >
                          <img
                            src={c.item.image}
                            alt={c.item.name}
                            className="w-16 h-16 rounded-none object-cover border border-chocolate/10"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow text-left flex flex-col justify-between">
                            <div>
                              <h5 className="font-serif text-xs font-semibold text-chocolate pr-6 leading-tight">
                                {c.item.name}
                              </h5>
                              <p className="text-[10px] text-chocolate/60 mt-0.5">
                                Qty: {c.quantity} | ${c.item.price} each
                              </p>
                            </div>
                            {c.notes && (
                              <p className="text-[9px] text-chocolate/75 font-light leading-snug italic mt-1 bg-white px-2 py-0.5 rounded-none border border-chocolate/10 line-clamp-2">
                                Request: {c.notes}
                              </p>
                            )}
                          </div>
                          {/* Remove button */}
                          <button
                            onClick={() => onRemoveItem(c.item.id, false)}
                            className="absolute top-3 right-3 text-chocolate/40 hover:text-[#7a121d] transition-colors p-1 cursor-pointer"
                            title="Remove confection"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* List Custom Items */}
                  {customCakes.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-[9px] font-bold text-chocolate/50 uppercase tracking-widest block border-b border-chocolate/10 pb-1 text-left">
                        Bespoke Custom Designs
                      </span>
                      {customCakes.map((c) => (
                        <div
                          key={c.id}
                          className="p-4 bg-cream rounded-none border border-chocolate/10 relative text-left space-y-3"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-serif text-xs font-semibold text-chocolate pr-8">
                                Custom {c.size} Cake
                              </h5>
                              <span className="text-[9px] text-gold font-bold uppercase tracking-widest block mt-0.5">
                                serves {c.servings}
                              </span>
                            </div>
                            <span className="font-serif text-xs font-bold text-chocolate">${c.price}</span>
                          </div>

                          {/* Options grid */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-chocolate/70 font-light">
                            <div>Flavor: <strong className="font-semibold text-chocolate">{c.flavor}</strong></div>
                            <div>Color: <strong className="font-semibold text-chocolate">{c.frostingColor}</strong></div>
                            <div>Style: <strong className="font-semibold text-chocolate">{c.piping}</strong></div>
                            {c.message && <div className="col-span-2">Inscription: <strong className="font-semibold text-chocolate">"{c.message}"</strong></div>}
                          </div>

                          {c.toppings.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {c.toppings.map((top: string) => (
                                <span key={top} className="text-[8px] bg-white text-chocolate border border-chocolate/10 px-1.5 py-0.5 rounded-none font-medium uppercase tracking-wider">
                                  {top}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Delete bespoke card */}
                          <button
                            onClick={() => onRemoveItem(c.id, true)}
                            className="absolute top-2.5 right-3 text-chocolate/40 hover:text-[#7a121d] transition-colors p-1 cursor-pointer"
                            title="Remove custom cake"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : checkoutStep === 'details' ? (
                /* STEP 2: RECIPIENT AND DATE DETAILS FORM */
                <form id="drawer-fulfillment-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <h4 className="font-serif text-base font-light text-chocolate text-left">
                    Fulfillment Details
                  </h4>
                  <div className="space-y-3">
                    {/* Name */}
                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Contact Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Arabella Sterling"
                        value={recipient.name}
                        onChange={handleTextChange}
                        className="w-full bg-[#faf6f0] px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Phone */}
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="e.g. (555) 123-4567"
                          value={recipient.phone}
                          onChange={handleTextChange}
                          className="w-full bg-[#faf6f0] px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold"
                        />
                      </div>

                      {/* Event Date */}
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Event Date *</label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={recipient.date}
                          onChange={handleTextChange}
                          className="w-full bg-[#faf6f0] px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. arabella@gmail.com"
                        value={recipient.email}
                        onChange={handleTextChange}
                        className="w-full bg-[#faf6f0] px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Delivery type */}
                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Fulfillment Method *</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRecipient({ ...recipient, delivery: 'pickup' })}
                          className={`py-2.5 px-3 rounded-none border text-[10px] font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center space-x-1.5 transition-all ${
                            recipient.delivery === 'pickup'
                              ? 'bg-chocolate border-chocolate text-white shadow-sm'
                              : 'bg-white border-chocolate/10 text-chocolate/70 hover:bg-cream'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Studio Pickup</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRecipient({ ...recipient, delivery: 'delivery' })}
                          className={`py-2.5 px-3 rounded-none border text-[10px] font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center space-x-1.5 transition-all ${
                            recipient.delivery === 'delivery'
                              ? 'bg-chocolate border-chocolate text-white shadow-sm'
                              : 'bg-white border-chocolate/10 text-chocolate/70 hover:bg-cream'
                          }`}
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Venue Carriage</span>
                        </button>
                      </div>
                    </div>

                    {/* Address (conditional) */}
                    {recipient.delivery === 'delivery' && (
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Carriage Address *</label>
                        <input
                          type="text"
                          name="address"
                          required
                          placeholder="Event hall / venue street name, city"
                          value={recipient.address}
                          onChange={handleTextChange}
                          className="w-full bg-[#faf6f0] px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold"
                        />
                      </div>
                    )}

                    {/* Notes */}
                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Comments / Timing</label>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="e.g. Place at main banquet table by 12:00 PM, secure box handles..."
                        value={recipient.notes}
                        onChange={handleTextChange}
                        className="w-full bg-[#faf6f0] p-4 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold resize-none"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                /* STEP 3: SUCCESS BILLING CERTIFICATE */
                <div className="text-center py-6 space-y-6">
                  <div className="w-12 h-12 rounded-none bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gold">Inquiry Locked</span>
                    <h4 className="font-serif text-xl font-light text-chocolate">Inquiry Generated Successfully!</h4>
                    <p className="text-xs text-chocolate/70 font-light max-w-xs mx-auto">
                      All your confections and configurations have been bundled. Choose your contact method below to finalize.
                    </p>
                  </div>

                  {/* Visual invoice receipt slip */}
                  <div className="bg-[#faf6f0] p-5 rounded-none border border-chocolate/10 text-left space-y-3">
                    <div className="flex justify-between border-b border-chocolate/10 pb-2 text-[9px] font-bold text-chocolate uppercase tracking-widest">
                      <span>Recipient</span>
                      <span>{recipient.name}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-chocolate/60">Event Date:</span>
                      <span className="font-semibold text-chocolate">{recipient.date}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-chocolate/60">Total Items:</span>
                      <span className="font-semibold text-chocolate">{totalItemsCount} treats</span>
                    </div>
                    <div className="flex justify-between border-t border-chocolate/10 pt-2 text-xs font-bold text-gold">
                      <span>Estimated Quote:</span>
                      <span>${grandTotal}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions section */}
            <div className="p-6 border-t border-chocolate/10 space-y-4 bg-[#faf6f0]">
              {/* Cost summary */}
              {checkoutStep !== 'success' && (
                <div className="space-y-2 text-left">
                  <div className="flex justify-between text-xs text-chocolate/60">
                    <span>Specialties Subtotal:</span>
                    <span className="font-semibold text-chocolate">${cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-chocolate/60">
                    <span>Custom Bespoke Subtotal:</span>
                    <span className="font-semibold text-chocolate">${customTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-chocolate/10 pt-2 font-bold text-chocolate">
                    <span>Total Estimate:</span>
                    <span className="text-gold font-serif text-base">${grandTotal}</span>
                  </div>
                </div>
              )}

              {/* Step CTAs */}
              <div className="flex flex-col gap-2">
                {checkoutStep === 'review' && totalItemsCount > 0 && (
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="w-full bg-chocolate hover:bg-gold text-white py-3.5 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-sm transition-all cursor-pointer text-center block"
                  >
                    Confirm Recipient Info
                  </button>
                )}

                {checkoutStep === 'details' && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCheckoutStep('review')}
                      className="px-4 py-3 rounded-none border border-chocolate/10 text-[10px] font-bold uppercase tracking-widest text-chocolate/70 hover:bg-white transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      form="drawer-fulfillment-form"
                      type="submit"
                      className="flex-grow bg-chocolate hover:bg-gold text-white py-3 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-sm cursor-pointer text-center"
                    >
                      Generate Quote Bundle
                    </button>
                  </div>
                )}

                {checkoutStep === 'success' && (
                  <div className="space-y-2.5">
                    <button
                      onClick={triggerWhatsAppCheckout}
                      className="w-full bg-emerald-750 hover:bg-emerald-800 bg-emerald-700 text-white py-3.5 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Submit order on WhatsApp</span>
                    </button>
                    <button
                      onClick={triggerEmailCheckout}
                      className="w-full bg-chocolate hover:bg-gold text-white py-3 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Submit order via Email</span>
                    </button>
                    <button
                      onClick={copyInvoiceText}
                      className="w-full bg-white hover:bg-cream text-chocolate border border-chocolate/10 py-2.5 rounded-none text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center justify-center space-x-1"
                    >
                      {copiedInvoice ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-750 text-emerald-700" />
                          <span>Copied invoice payload!</span>
                        </>
                      ) : (
                        <span>Copy Invoice payload</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setCheckoutStep('review');
                        onClearCart();
                        onClose();
                      }}
                      className="w-full text-[9px] font-bold text-chocolate/60 uppercase tracking-widest pt-2 underline cursor-pointer"
                    >
                      Close & Clear Bag
                    </button>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
