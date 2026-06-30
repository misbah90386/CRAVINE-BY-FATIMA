/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Phone, Mail, MessageSquare, MapPin, Check, Send, X, ClipboardCheck, Calendar, Cake } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cakeType: 'custom',
    eventDate: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const cakeTypeOptions = [
    { value: 'wedding', label: 'Wedding Cake' },
    { value: 'birthday', label: 'Birthday Cake' },
    { value: 'custom', label: 'Custom Specialty Cake' },
    { value: 'cupcakes', label: 'Artisan Cupcakes' },
    { value: 'bento', label: 'Korean Bento Cake' },
    { value: 'desserts', label: 'Dessert Boxes / Cookies' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.eventDate) {
      return;
    }
    setIsSubmitting(true);
    // Simulate API processing
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  const handleSendToWhatsApp = () => {
    const text = `*New Cake Inquiry for Cravine by Fatima* 🎂\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Cake Type:* ${formData.cakeType.toUpperCase()}\n*Event Date:* ${formData.eventDate}\n*Special Message:* ${formData.message || 'None'}`;
    const url = `https://wa.me/1234567890?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyClipboard = () => {
    const text = `Cake Inquiry for Cravine by Fatima\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nCake Type: ${formData.cakeType}\nEvent Date: ${formData.eventDate}\nMessage: ${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold inline-flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Connect Personally</span>
            <Sparkles className="w-3 h-3" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-chocolate tracking-tight">
            Book Fatima's <span className="italic font-normal">Oven</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-gold mx-auto" />
          <p className="text-sm text-chocolate/75 font-light max-w-xl mx-auto">
            Ready to secure your booking date? Reach out via our streamlined contact channels or fill out our official inquiry form below.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: Contact details & Elegant Visual Mock Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-light text-chocolate">
                Get In Touch
              </h3>
              <p className="text-sm text-chocolate/75 leading-relaxed font-light">
                Feel free to email us or call for immediate consultations. For custom designs and photos, WhatsApp is our absolute preferred platform for quick discussions.
              </p>

              {/* Quick info boxes */}
              <div className="space-y-4 pt-2">
                {/* Whatsapp Link */}
                <a
                  href="https://wa.me/1234567890?text=Hello%20Fatima!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-none bg-[#faf6f0] border border-chocolate/10 hover:border-gold/30 shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-none bg-[#25d366] text-white flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-chocolate/50 tracking-widest">Preferred Channel</span>
                    <span className="block text-sm font-semibold text-chocolate group-hover:text-gold transition-colors">Chat on WhatsApp</span>
                  </div>
                </a>

                {/* Call Link */}
                <a
                  href="tel:+1234567890"
                  className="flex items-center space-x-4 p-4 rounded-none bg-[#faf6f0] border border-chocolate/10 hover:border-gold/30 shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-none bg-gold text-white flex items-center justify-center shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-chocolate/50 tracking-widest">Direct Hotline</span>
                    <span className="block text-sm font-semibold text-chocolate group-hover:text-gold transition-colors">+1 (234) 567-890</span>
                  </div>
                </a>

                {/* Email Link */}
                <a
                  href="mailto:fatima@cravine.com?subject=Custom%20Cake%20Order"
                  className="flex items-center space-x-4 p-4 rounded-none bg-[#faf6f0] border border-chocolate/10 hover:border-gold/30 shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-none bg-chocolate text-white flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-chocolate/50 tracking-widest">Email Support</span>
                    <span className="block text-sm font-semibold text-chocolate group-hover:text-gold transition-colors">fatima@cravine.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Visual Vector Simulated map of Fatima's studio location */}
            <div className="rounded-none border border-chocolate/10 overflow-hidden bg-cream p-4 flex flex-col justify-between h-56 shadow-sm relative">
              {/* Background grids styling resembling stylized abstract maps */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="absolute top-0 left-12 w-[1px] h-full bg-slate-400 border-dashed" />
                <div className="absolute top-0 left-36 w-[1px] h-full bg-slate-400 border-dashed" />
                <div className="absolute top-0 left-64 w-[1px] h-full bg-slate-400 border-dashed" />
                <div className="absolute top-20 left-0 w-full h-[1px] bg-slate-400 border-dashed" />
                <div className="absolute top-40 left-0 w-full h-[1px] bg-slate-400 border-dashed" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-slate-400" />
              </div>

              <div className="z-10 flex justify-between items-center">
                <span className="text-[9px] font-bold uppercase tracking-widest text-chocolate/50">
                  Studio Location
                </span>
                <span className="text-[9px] font-bold uppercase text-white bg-gold px-2.5 py-0.5 rounded-none shadow-sm">
                  Secure Pickup
                </span>
              </div>

              <div className="z-10 text-center space-y-1.5 py-4">
                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shadow-sm mx-auto text-gold border border-chocolate/10 animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-semibold text-sm text-chocolate">Cravine Studio</h4>
                <p className="text-xs text-chocolate/70 font-light">123 Sweet Magnolia Drive, Beverly Hills, CA 90210</p>
              </div>

              <div className="z-10 text-[9px] text-center text-chocolate/40 uppercase tracking-wider">
                Open by Appointment Only for Private Cake Tastings.
              </div>
            </div>

          </div>

          {/* RIGHT: High-Converting Contact Form */}
          <div className="lg:col-span-7 bg-cream border border-chocolate/10 rounded-none p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-lg font-light text-chocolate mb-6 text-left">
              Send An Inquiry
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Arabella Sterling"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate placeholder-chocolate/30 focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Phone number */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate placeholder-chocolate/30 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Email address */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. arabella@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate placeholder-chocolate/30 focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Cake Type selector */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Cake Category *</label>
                  <select
                    name="cakeType"
                    value={formData.cakeType}
                    onChange={handleInputChange}
                    className="w-full bg-white px-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold"
                  >
                    {cakeTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Event Date Picker with Lucide Calendar */}
              <div className="space-y-1 text-left">
                <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60 block">Event Date *</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate/40 pointer-events-none" />
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full bg-white pl-10 pr-4 py-2.5 rounded-none border border-chocolate/10 text-xs text-chocolate focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1 text-left">
                <label className="text-[9px] font-bold uppercase tracking-widest text-chocolate/60">Tell Us Your Vision *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your event theme, required flavors, preferred frosting shades, and custom lettering..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-white p-4 rounded-none border border-chocolate/10 text-xs text-chocolate placeholder-chocolate/30 focus:outline-none focus:border-gold resize-none"
                />
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-chocolate hover:bg-gold text-white py-3.5 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-sm flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-40"
              >
                {isSubmitting ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Secure Form Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Success Receipt/Certificate Overlay Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-lg w-full rounded-none p-6 sm:p-8 border border-chocolate/10 shadow-xl relative text-center"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 bg-cream p-1.5 rounded-none text-chocolate hover:bg-chocolate hover:text-white transition-colors cursor-pointer border border-chocolate/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 bg-emerald-100 rounded-none flex items-center justify-center text-emerald-700 mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-widest text-gold">Inquiry Submitted</span>
              <h3 className="font-serif text-2xl font-light text-chocolate mt-1.5 mb-2">
                Thank You, {formData.name}!
              </h3>
              <p className="text-xs text-chocolate/70 font-light max-w-sm mx-auto leading-relaxed mb-6">
                Your luxury cake request has been logged successfully! To complete your booking instantly and discuss details directly with Fatima, click the WhatsApp button below.
              </p>

              {/* Inquiry Summary Slip */}
              <div className="bg-cream p-5 rounded-none border border-chocolate/10 text-left space-y-2 mb-6">
                <div className="flex justify-between text-[11px]">
                  <span className="text-chocolate/60">Cake Type:</span>
                  <span className="font-bold text-chocolate uppercase">{formData.cakeType}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-chocolate/60">Event Date:</span>
                  <span className="font-bold text-chocolate">{formData.eventDate}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-chocolate/60">Contact Phone:</span>
                  <span className="font-bold text-chocolate">{formData.phone}</span>
                </div>
              </div>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSendToWhatsApp}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold tracking-widest uppercase py-3 rounded-none shadow-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send WhatsApp</span>
                </button>
                <button
                  onClick={handleCopyClipboard}
                  className="flex-1 bg-white hover:bg-[#faf6f0] text-chocolate border border-chocolate/10 text-[10px] font-bold tracking-widest uppercase py-3 rounded-none transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardCheck className="w-4 h-4" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
