import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      default: 'MODULAR CONSTRUCTION IS OUR'
    },
    philosophyText: {
      type: String,
      default: 'NEW PHILOSOPHY.'
    },
    subtext: {
      type: String,
      default: 'We design and build modern\nturnkey modular houses\naccording to your needs\nfor living and recreation'
    },
    buttonText: {
      type: String,
      default: 'DISCUSS THE PROJECT'
    },
    image: {
      type: String,
      default: '/images/hero_model_m.png'
    },
    labelNumber: {
      type: String,
      default: '01'
    },
    labelTitle: {
      type: String,
      default: 'Model M'
    }
  },
  { timestamps: true }
);

export const Hero = mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
