import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    model: { type: String, default: 'Model M' },
    timeline: { type: String },
    location: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ['new', 'contacted', 'feasibility_check', 'contract_sent', 'closed'],
      default: 'new'
    }
  },
  { timestamps: true }
);

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
