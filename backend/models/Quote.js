import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema(
  {
    buildingType: { type: String, required: true },
    squareFeet: { type: Number, required: true },
    floors: { type: Number, default: 1 },
    terrace: { type: String, default: 'Yes' },
    bedrooms: { type: Number, default: 1 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    estimatedTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending_review', 'called', 'site_visit_scheduled', 'approved', 'declined'],
      default: 'pending_review'
    }
  },
  { timestamps: true }
);

export const Quote = mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);
