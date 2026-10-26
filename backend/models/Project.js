import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    number: { type: String, required: true }, // e.g. "PROJECT #43"
    title: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: String, default: '2025' },
    area: { type: String, required: true }, // e.g. "620 SF"
    type: { type: String, required: true }, // e.g. "Model S Custom"
    exteriorImage: { type: String, required: true },
    interiorImage: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
