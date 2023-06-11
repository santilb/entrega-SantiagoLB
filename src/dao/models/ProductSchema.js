import mongoose from "mongoose";

export const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    //array de strings
    type: [String],
  },
});