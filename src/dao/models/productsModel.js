import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productsEsquema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: [String],
  },
  {
    collection: "products",
    timestamps: true,
  }
)
productsEsquema.plugin(paginate)
export const productsModelo = mongoose.model('products', productsEsquema)