import mongoose from "mongoose";
import { carsModelo } from "../dao/models/carsModel.js";

const productsData = [
    {
        id: 1,
        products: [
        ],
    },
    {
        id: 2,
        products: [

        ],
    },
    {
        id: 3,
        products: [

        ],
    },
    {
        id: 4,
        products: [

        ],
    },
];


function assignSequentialIds(products) {
    let idCounter = 1;

    return products.map(product => {
        return { ...product, id: idCounter++ };
    });
}

async function seedDatabase() {
    try {
        // Conexión a la base de datos
        await mongoose.connect('mongodb+srv://mandosed:mandosed@cluster0.l54bx.mongodb.net/storeDB?retryWrites=true&w=majority&appName=Cluster0')
            .then(() => console.log('Conectado a la base de datos'))
            .catch((err) => console.log('Error al conectar a la base de datos', err));

        console.log("Conectado a la base de datos");

        const productsWithIds = productsData;

        await carsModelo.insertMany(productsWithIds);
        console.log("Datos insertados correctamente");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error al insertar los datos:", error);
        mongoose.connection.close();
    }
}

seedDatabase();