<<<<<<< HEAD
import mongoose from "mongoose";

const productsEsquema=mongoose.model(
    new mongoose.Schema(
        {
            title: String,
            description: String,
            code: String,
            price: Number,
            status: Boolean,
            stock: Number,
            category: String,
            thumbnails: [String]
        },
        {
            timestamps: true,
            strict: false
        }
    )
)

=======
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
>>>>>>> 00fa4b2f39eb279628f51dee6b5ff0de1d39fecb
export const productsModelo = mongoose.model('products', productsEsquema)