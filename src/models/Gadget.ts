import mongoose, { Schema, Document } from 'mongoose';

export interface IGadget extends Document {
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  brand: string;
  stock: number;
  createdBy: mongoose.Types.ObjectId;
}

const gadgetSchema = new Schema<IGadget>(
  {
    title: { type: String, required: true, trim: true },
    shortDesc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, default: 10, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Gadget = mongoose.model<IGadget>('Gadget', gadgetSchema);