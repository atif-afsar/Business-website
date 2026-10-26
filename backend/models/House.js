import mongoose from 'mongoose';

const HouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "MODEL S"
    subtitle: { type: String, required: true }, // e.g. "1 Bedroom, 1 Bathroom"
    dimensions: { type: String, required: true }, // e.g. "25' x 36'"
    squareFeet: { type: String, required: true }, // e.g. "774 SF"
    basePrice: { type: String, required: true }, // e.g. "$47,875"
    basePriceNum: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    idealFor: { type: String },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const House = mongoose.models.House || mongoose.model('House', HouseSchema);
