/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CakeItem, Testimonial, FAQItem } from './types';

// Let's use our generated images and highly aesthetic curated food photography
export const GENERATED_IMAGES = {
  hero: '/src/assets/images/bakery_hero_1782779979208.jpg',
  wedding: '/src/assets/images/wedding_cake_1782779989319.jpg',
  chocolate: '/src/assets/images/chocolate_cake_1782779999284.jpg',
  cupcakes: '/src/assets/images/gourmet_cupcakes_1782780009480.jpg'
};

export const CAKE_CATALOG: CakeItem[] = [
  {
    id: 'wedding-royal',
    name: 'Elegant Royal Wedding Cake',
    category: 'wedding',
    price: 450,
    description: 'A grand four-tier luxury wedding cake with white fondant, detailed edible gold lace, and a cascade of pastel blush roses.',
    image: GENERATED_IMAGES.wedding,
    rating: 5.0,
    features: ['4 Premium Tiers', 'Edible Gold Leaf', 'Customizable Flavors', 'Serves 100-120']
  },
  {
    id: 'chocolate-drip-luxury',
    name: 'Decadent Chocolate Drip Celebration',
    category: 'birthday',
    price: 85,
    description: 'Rich Belgian chocolate sponge layered with dark chocolate ganache, finished with a glossy drip, fresh wild berries, and gold dust.',
    image: GENERATED_IMAGES.chocolate,
    rating: 4.9,
    features: ['Double Chocolate Sponge', 'Fresh Berry Topping', 'Glossy Ganache Drip', 'Serves 15-20']
  },
  {
    id: 'floral-vintage',
    name: 'Blush Floral Vintage Cake',
    category: 'custom',
    price: 120,
    description: 'An elegant vintage-piped cake featuring soft pastel cream, delicate handcrafted sugar flowers, and a touch of pearl sprinkles.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    features: ['Lambeth Piping Style', 'Sugar Flowers', 'Velvet Vanilla Crème', 'Serves 20-25']
  },
  {
    id: 'gourmet-cupcakes-box',
    name: 'Artisan Cupcake Collection',
    category: 'cupcakes',
    price: 36,
    description: 'A box of six premium cupcakes frosted with our signature luxury cream, delicate gold flakes, and sweet confectionery pearls.',
    image: GENERATED_IMAGES.cupcakes,
    rating: 5.0,
    features: ['Assorted Flavors', 'Hand-piped Frosting', 'Edible Gold Sparkles', 'Box of 6 or 12']
  },
  {
    id: 'bento-love-letter',
    name: 'Korean Bento Love Cake',
    category: 'bento',
    price: 28,
    description: 'A cute, minimalist bento lunchbox cake perfect for intimate celebrations, featuring pastel cream, sprinkles, and custom lettering.',
    image: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    features: ['Cute Bento Packaging', 'Choose Your Message', 'Pastel Pink or Cream', 'Serves 1-2']
  },
  {
    id: 'heart-vintage-coquette',
    name: 'Coquette Heart Vintage Cake',
    category: 'custom',
    price: 95,
    description: 'A trend-setting heart-shaped cake covered in intricate romantic ruffles, ribbons, and cherry toppers. Instantly photogenic.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    features: ['Romantic Heart Shape', 'Vintage Ribbons & Bows', 'Maraschino Cherries', 'Serves 10-12']
  },
  {
    id: 'macaron-dessert-box',
    name: 'Grand Pastry Dessert Box',
    category: 'desserts',
    price: 48,
    description: 'A luxury curation of French macarons, rich chocolate-covered strawberries, mini tarts, and gourmet shortbread cookies.',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    features: ['French Macarons', 'Gourmet Strawberries', 'Premium Keepsake Box', 'Perfect for Gifting']
  },
  {
    id: 'fudge-brownies',
    name: 'Gooey Fudge Brownies Trio',
    category: 'desserts',
    price: 24,
    description: 'Ultra-chewy chocolate brownies baked with dark chocolate chunks and topped with sea salt flakes and a caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    features: ['Gooey Center', 'Maldon Sea Salt', 'Fudge Glaze', 'Pack of 6']
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    category: 'wedding',
    title: 'Three-Tier Ivory Wedding Dream',
    image: GENERATED_IMAGES.wedding,
    description: 'Designed for a grand estate wedding with hand-painted gold highlights.'
  },
  {
    id: 'gal-2',
    category: 'birthday',
    title: 'Double Chocolate Berry Drip',
    image: GENERATED_IMAGES.chocolate,
    description: 'Fatima\'s signature chocolate sponge dripping with decadent ganache.'
  },
  {
    id: 'gal-3',
    category: 'cupcakes',
    title: 'Blush & Gold Pearl Cupcakes',
    image: GENERATED_IMAGES.cupcakes,
    description: 'Creamy frosting decorated with gold leaf and edible sugar pearls.'
  },
  {
    id: 'gal-4',
    category: 'custom',
    title: 'Romantic Heart vintage',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop',
    description: 'Detailed vintage ruffles with deep red cherries on top.'
  },
  {
    id: 'gal-5',
    category: 'desserts',
    title: 'Luxe Macaron & Berry Tower',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop',
    description: 'French pastel macarons styled with fresh strawberries and flowers.'
  },
  {
    id: 'gal-6',
    category: 'bento',
    title: 'Minimalist Bento Cake Collection',
    image: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=600&auto=format&fit=crop',
    description: 'Sweet, small cakes packed in compostable burger-style boxes.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Seraphina Vance',
    role: 'Bride',
    comment: 'Cravine by Fatima made our wedding cake absolute perfection! Not only was it a gorgeous masterpiece that everyone photographed, but the velvet vanilla with raspberry filling was divine. Our guests are still talking about it!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    date: 'June 14, 2026'
  },
  {
    id: 't-2',
    name: 'Marcus Sterling',
    role: 'Birthday Host',
    comment: 'The chocolate drip cake was mind-blowing! Extremely moist, deeply chocolatey, and styled elegantly without being overly sweet. Fatima is a true artist. Highly recommend ordering in advance!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    date: 'May 28, 2026'
  },
  {
    id: 't-3',
    name: 'Ayla Rahman',
    role: 'Corporate Planner',
    comment: 'We ordered 50 custom cupcakes and a bento cake collection for a brand launch event. The packaging was immaculate, the design matched our luxury theme perfectly, and they tasted heavenly. 10/10 service!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    date: 'April 19, 2026'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I place an order?',
    answer: 'You can browse our pre-designed specialty cakes below or use our Interactive Custom Cake Builder to design your dream cake. Once you submit the inquiry form, you can immediately send the details to us on WhatsApp or Email. We will confirm your order, design details, and payment within a few hours!'
  },
  {
    question: 'How many days in advance should I order?',
    answer: 'For custom & wedding cakes, we recommend ordering 7 to 14 days in advance to secure your date. For signature cakes, bento cakes, or cupcakes, a minimum of 2 to 3 days notice is highly appreciated, as all treats are freshly baked to order.'
  },
  {
    question: 'Do you make fully customized cakes?',
    answer: 'Absolutely! Customization is our absolute specialty. You can define the size, layers, frosting color palette, flavors, toppers, vintage piping designs, and even submit reference photos in our Custom Builder or contact Fatima directly via WhatsApp.'
  },
  {
    question: 'Do you deliver? What are the charges?',
    answer: 'Yes! We offer professional, climate-controlled delivery for all wedding and multi-tier custom cakes to ensure they arrive in pristine, perfect condition. Delivery fees are calculated based on your distance. We also offer secure contactless pickup from our home studio.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept secure bank transfers, credit/debit card links, Venmo/Zelle, and digital wallets. A 50% deposit is required to confirm your booking date, with the balance due before or at delivery.'
  }
];

export const CAKE_FLAVORS = [
  { name: 'Signature Belgian Chocolate', description: 'Rich chocolate sponge with premium fudge ganache', color: '#3d2314' },
  { name: 'Classic Velvet Vanilla Bean', description: 'Madagascar vanilla sponge layered with luxury white chocolate buttercream', color: '#fcf8f2' },
  { name: 'Luscious Red Velvet', description: 'Subtle cocoa sponge layered with sweet, tangy cream cheese frosting', color: '#7a121d' },
  { name: 'Lemon Raspberry Zest', description: 'Zesty lemon sponge filled with tart raspberry coulis and vanilla cream', color: '#f7ebc3' },
  { name: 'Salted Caramel Hazelnut', description: 'Fluffy caramel sponge with house-made salted caramel and toasted hazelnuts', color: '#c29b63' },
  { name: 'Pistachio Rosewater Dream', description: 'Gourmet cardamom and ground pistachio cake with floral rose buttercream', color: '#b2c89d' }
];

export const CAKE_SIZES = [
  { name: 'Mini (Bento)', size: '4 inch', serves: '1-2 guests', basePrice: 28 },
  { name: 'Small Celebration', size: '6 inch', serves: '8-12 guests', basePrice: 65 },
  { name: 'Medium Celebration', size: '8 inch', serves: '15-20 guests', basePrice: 85 },
  { name: 'Two-Tier Luxury', size: '6 + 8 inch', serves: '25-35 guests', basePrice: 180 },
  { name: 'Grand Three-Tier Wedding', size: '6 + 8 + 10 inch', serves: '70-90 guests', basePrice: 380 }
];

export const TOPPING_OPTIONS = [
  'Fresh Berries & Raspberries',
  'Edible Gold Leaf Accents',
  'Gourmet French Macarons',
  'Handcrafted Sugar Roses',
  'Chocolate Ganache Drizzle',
  'Luxury Sprinkles & Pearls',
  'Vintage Piping Bows & Ribbons',
  'Fresh Eucalyptus & Floral Sprigs'
];

export const PIPING_STYLES = [
  { name: 'Minimalist Smooth', desc: 'Sleek, modern flat frosting for contemporary elegance' },
  { name: 'Lambeth Vintage piping', desc: 'Ornate, dramatic multi-tiered ruffles and borders' },
  { name: 'Rustic Textures', desc: 'Artisanal, textured stucco-style spatula markings' },
  { name: 'Ribbon Swirls', desc: 'Soft ribbons flowing around the cake borders' }
];
