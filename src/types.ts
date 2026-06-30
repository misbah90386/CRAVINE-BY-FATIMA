/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CakeItem {
  id: string;
  name: string;
  category: 'wedding' | 'birthday' | 'custom' | 'cupcakes' | 'bento' | 'desserts';
  price: number;
  description: string;
  image: string;
  rating: number;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  image: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CustomCakeOrder {
  cakeType: string;
  flavor: string;
  size: string;
  tiers: number;
  frostingColor: string;
  pipingStyle: string;
  toppings: string[];
  customMessage: string;
  eventDate: string;
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  deliveryType: 'pickup' | 'delivery';
  additionalNotes: string;
}
