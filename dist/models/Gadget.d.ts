import mongoose, { Document } from 'mongoose';
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
export declare const Gadget: mongoose.Model<IGadget, {}, {}, {}, Document<unknown, {}, IGadget, {}, mongoose.DefaultSchemaOptions> & IGadget & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IGadget>;
//# sourceMappingURL=Gadget.d.ts.map