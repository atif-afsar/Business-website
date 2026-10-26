import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      default: '01'
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: true
    },
    tags: [
      {
        type: String
      }
    ],
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
