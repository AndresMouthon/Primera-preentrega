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

export const productsModelo = mongoose.model('products', productsEsquema)