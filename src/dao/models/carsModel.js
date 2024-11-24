import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const carsEsquema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true
        },
        producto: {
            type: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products",
                    },
                    quantity: Number
                }
            ]
        }
    },
    {
        collection: "cars",
        timestamps: true,
    }
)
carsEsquema.plugin(paginate)
export const carsModelo = mongoose.model('cars', carsEsquema)