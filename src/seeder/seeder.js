import mongoose from "mongoose";
// import { carsModelo } from "../dao/models/carsModel.js";
import { productsModelo } from "../dao/models/productsModel.js";

const data = [
    {
        id: 1,
        title: "Smartphone X1",
        description: "Smartphone de última generación con cámara de 108MP y pantalla OLED.",
        code: "SX1001",
        price: 799.99,
        status: true,
        stock: 50,
        category: "Electrónica",
        thumbnails: ["https://example.com/img/smartphone-x1-1.jpg", "https://example.com/img/smartphone-x1-2.jpg"]
    },
    {
        id: 2,
        title: "Laptop Pro 15",
        description: "Laptop profesional con procesador i7 y 16GB de RAM.",
        code: "LP1502",
        price: 1199.99,
        status: true,
        stock: 30,
        category: "Electrónica",
        thumbnails: ["https://example.com/img/laptop-pro-15-1.jpg", "https://example.com/img/laptop-pro-15-2.jpg"]
    },
    {
        id: 3,
        title: "Auriculares Bluetooth Z",
        description: "Auriculares inalámbricos con cancelación de ruido y 20 horas de batería.",
        code: "ABZ300",
        price: 149.99,
        status: true,
        stock: 100,
        category: "Accesorios",
        thumbnails: ["https://example.com/img/auriculares-z-1.jpg", "https://example.com/img/auriculares-z-2.jpg"]
    },
    {
        id: 4,
        title: "Cámara Digital HD",
        description: "Cámara compacta con grabación en 4K y pantalla táctil.",
        code: "CDHD400",
        price: 499.99,
        status: true,
        stock: 25,
        category: "Electrónica",
        thumbnails: ["https://example.com/img/camara-hd-1.jpg", "https://example.com/img/camara-hd-2.jpg"]
    },
    {
        id: 5,
        title: "Reloj Inteligente X",
        description: "Reloj inteligente con monitoreo de salud y notificaciones de teléfono.",
        code: "RX500",
        price: 199.99,
        status: true,
        stock: 70,
        category: "Accesorios",
        thumbnails: ["https://example.com/img/reloj-x-1.jpg", "https://example.com/img/reloj-x-2.jpg"]
    },
    {
        id: 6,
        title: "Teclado Mecánico RGB",
        description: "Teclado mecánico con retroiluminación RGB y teclas programables.",
        code: "TKRGB700",
        price: 89.99,
        status: true,
        stock: 150,
        category: "Accesorios",
        thumbnails: ["https://example.com/img/teclado-rgb-1.jpg", "https://example.com/img/teclado-rgb-2.jpg"]
    },
    {
        id: 7,
        title: "Monitor Curvo 32''",
        description: "Monitor curvo de 32 pulgadas con resolución 4K y 144Hz de frecuencia de actualización.",
        code: "MC32K144",
        price: 399.99,
        status: true,
        stock: 20,
        category: "Electrónica",
        thumbnails: ["https://example.com/img/monitor-curvo-1.jpg", "https://example.com/img/monitor-curvo-2.jpg"]
    },
    {
        id: 8,
        title: "Mochila Deportiva",
        description: "Mochila resistente al agua, ideal para deportes y actividades al aire libre.",
        code: "MD350",
        price: 59.99,
        status: true,
        stock: 200,
        category: "Accesorios",
        thumbnails: ["https://example.com/img/mochila-deportiva-1.jpg", "https://example.com/img/mochila-deportiva-2.jpg"]
    },
    {
        id: 9,
        title: "Gafas de Sol Polarizadas",
        description: "Gafas de sol con protección UV y lentes polarizados para una visión clara.",
        code: "GS600",
        price: 39.99,
        status: true,
        stock: 300,
        category: "Accesorios",
        thumbnails: ["https://example.com/img/gafas-sol-1.jpg", "https://example.com/img/gafas-sol-2.jpg"]
    },
    {
        id: 10,
        title: "Altavoz Bluetooth X",
        description: "Altavoz inalámbrico con sonido estéreo y hasta 10 horas de autonomía.",
        code: "ABX200",
        price: 69.99,
        status: true,
        stock: 60,
        category: "Electrónica",
        thumbnails: ["https://example.com/img/altavoz-bluetooth-1.jpg", "https://example.com/img/altavoz-bluetooth-2.jpg"]
    },
    {
        id: 11,
        title: "Bicicleta Eléctrica 350W",
        description: "Bicicleta eléctrica con motor de 350W y batería de largo alcance.",
        code: "BE350W",
        price: 899.99,
        status: true,
        stock: 15,
        category: "Deportes",
        thumbnails: ["https://example.com/img/bicicleta-electrica-1.jpg", "https://example.com/img/bicicleta-electrica-2.jpg"]
    },
    {
        id: 12,
        title: "Silla Gaming S-Series",
        description: "Silla ergonómica para gaming con soporte lumbar ajustable y reposabrazos 4D.",
        code: "SGS100",
        price: 199.99,
        status: true,
        stock: 40,
        category: "Accesorios",
        thumbnails: ["https://example.com/img/silla-gaming-1.jpg", "https://example.com/img/silla-gaming-2.jpg"]
    },
    {
        id: 13,
        title: "Cargador Solar Portátil",
        description: "Cargador solar portátil de 20000mAh para cargar dispositivos mientras viajas.",
        code: "CSP20000",
        price: 59.99,
        status: true,
        stock: 120,
        category: "Accesorios",
        thumbnails: ["https://example.com/img/cargador-solar-1.jpg", "https://example.com/img/cargador-solar-2.jpg"]
    },
    {
        id: 14,
        title: "Patineta Eléctrica Pro",
        description: "Patineta eléctrica con velocidad máxima de 30 km/h y batería de larga duración.",
        code: "PEPRO500",
        price: 699.99,
        status: true,
        stock: 10,
        category: "Deportes",
        thumbnails: ["https://example.com/img/patineta-electrica-1.jpg", "https://example.com/img/patineta-electrica-2.jpg"]
    },
    {
        id: 15,
        title: "Cámara de Seguridad WiFi",
        description: "Cámara de seguridad con conectividad WiFi, visión nocturna y detección de movimiento.",
        code: "CSWIFI200",
        price: 129.99,
        status: true,
        stock: 80,
        category: "Hogar",
        thumbnails: ["https://example.com/img/camara-seguridad-1.jpg", "https://example.com/img/camara-seguridad-2.jpg"]
    }
];

// const data = [
//   {
//     id: 1,
//     producto: []
//   },
//   {
//     id: 2,
//     producto: []
//   },
//   {
//     id: 3,
//     producto: []
//   },
//   {
//     id: 4,
//     producto: []
//   },
//   {
//     id: 5,
//     producto: []
//   }
// ];



function assignSequentialIds(products) {
    let idCounter = 1;

    return products.map(product => {
        return { ...product, id: idCounter++ };
    });
}

async function seedDatabase() {
    try {
        await mongoose.connect('mongodb+srv://mandosed:mandosed@cluster0.l54bx.mongodb.net/storeDB?retryWrites=true&w=majority&appName=Cluster0')
            .then(() => console.log('Conectado a la base de datos'))
            .catch((err) => console.log('Error al conectar a la base de datos', err));

        console.log("Conectado a la base de datos");

        await productsModelo.insertMany(data);
        console.log("Datos insertados correctamente");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error al insertar los datos:", error);
        mongoose.connection.close();
    }
}

seedDatabase();