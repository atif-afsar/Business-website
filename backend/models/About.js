import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
  isDark: { type: Boolean, default: false }
});

const AboutSchema = new mongoose.Schema(
  {
    badge: {
      type: String,
      default: '// ABOUT'
    },
    description: {
      type: String,
      default: 'MODE-7 its a new modern homes inspired by nature forms and materials. Our houses are design to achieve the optimal balance between functionality, quality, cost and construction times'
    },
    buttonText: {
      type: String,
      default: 'LEARN MORE'
    },
    stats: [StatSchema]
  },
  { timestamps: true }
);

export const About = mongoose.models.About || mongoose.model('About', AboutSchema);
