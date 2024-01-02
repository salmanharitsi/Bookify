import { Document, Schema, model, models } from "mongoose";

export interface IBook extends Document {
  _id: string;
  title: string;
  description?: string;
  writer: string;
  poster: string;
  createdAt: Date;
  imageUrl: string;
  price: string;
  isFree: boolean;
  url?: string;
  category: { _id: string, name: string }
  organizer: { _id: string, firstName: string, lastName: string }
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  writer: {type: String},
  poster: {type: String},
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Book = models.Book || model('Book', BookSchema);

export default Book;