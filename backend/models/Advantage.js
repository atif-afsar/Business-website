import mongoose from 'mongoose';

const AdvantageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    metric: { type: String },
    wireframeImage: { type: String },
    text: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Advantage = mongoose.models.Advantage || mongoose.model('Advantage', AdvantageSchema);
