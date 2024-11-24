import mongoose from 'mongoose';
import { carsModelo } from './models/carsModel.js';
import { productsModelo } from './models/productsModel.js';

export class CarManagerMongo {
    static async deleteCar(idCarrito, idProducto) {
        const carrito = await carsModelo.findOne({ "id": idCarrito });
        const producto = await productsModelo.findOne({ "id": idProducto });

        if (!carrito || !producto) {
            return {
                status: "error",
                message: "Carrito o producto no encontrado",
            };
        }

        const productoEnCarrito = carrito.products.find(
            (item) => item.product.toString() === idProducto.toString()
        );

        if (!productoEnCarrito) {
            return {
                status: "error",
                message: "El producto no se encuentra en el carrito",
            };
        }

        await carsModelo.updateOne(
            { "id": idCarrito },
            { $pull: { "products": { "product": idProducto } } }
        );

        return true;
    };

    static async deleteArrayProducts(idCarrito) {
        const exist = await carsModelo.findOne({ "id": idCarrito });
        if (!exist) {
            return {
                status: "error",
                message: "Carrito no encontrado",
            };
        }
        await carsModelo.updateOne({ "id": idCarrito }, { $set: { "products": [] } });
        return true;
    };

    static async updateNewArrayProducts(idCarrito, products) {
        const exist = await carsModelo.findOne({ "id": idCarrito });
        if (!exist) {
            return {
                status: "error",
                message: "Carrito no encontrado",
            };
        }
        for (let producto = 0; producto < products.length; producto++) {
            let product = await productsModelo.findOne({ "id": products[producto].id });
            if (!product) {
                return {
                    status: "error",
                    message: "Hay un producto que no existe",
                };
            }
            product = {
                quantity: products[producto].quantity || 1,
                ...product.toObject(),
            };
            products[producto] = product;
        }
        await carsModelo.updateOne({ "id": idCarrito }, { $set: { "products": products } });
        return true;
    };

    static async updateCantidadProductoCarrito(idCarrito, idProducto, cantidad) {
        const carrito = await carsModelo.findOne({ "id": idCarrito });
        const producto = await productsModelo.findOne({ "id": idProducto });
        if (!carrito || !producto) {
            return {
                status: "error",
                message: "Carrito o producto no encontrado",
            };
        }
        const productoEnCarrito = carrito.products.find(
            (item) => item.product.toString() === idProducto.toString()
        );
        if (!productoEnCarrito) {
            return {
                status: "error",
                message: "El producto no se encuentra en el carrito",
            };
        }
        let nuevaCantidad;
        if (productoEnCarrito.quantity) {
            nuevaCantidad = productoEnCarrito.quantity + cantidad;
        } else {
            nuevaCantidad = cantidad + 1;
        }
        await carsModelo.updateOne(
            { "id": idCarrito, "products.product": idProducto },
            { $set: { "products.$.quantity": nuevaCantidad } }
        )
        return true;
    };

    static async getProductsByCarrito(idCarrito) {
        const carrito = await carsModelo.findOne(
            { "id": idCarrito },
        ).populate({
            path: "producto.product",
        });
        if (!carrito) {
            return {
                status: "error",
                message: "Carrito no encontrado",
            };
        }
        return carrito;
    };

    static async finalizarCompra(productsIds) {
        console.log('Productos recibidos:', productsIds);

        try {
            const productosIdsArray = productsIds.carrito;

            if (!Array.isArray(productosIdsArray)) {
                return { success: false, message: 'El formato de los productos es incorrecto.' };
            }

            const objectIds = productosIdsArray.map(id => new mongoose.Types.ObjectId(id));

            const productos = await productsModelo.find({
                _id: { $in: objectIds }
            });

            if (productos.length !== productosIdsArray.length) {
                return { success: false, message: 'Algunos productos no fueron encontrados' };
            }

            const lastCarrito = await carsModelo.findOne().sort({ id: -1 });
            const nuevoCarritoId = lastCarrito ? lastCarrito.id + 1 : 1;

            const nuevoCarrito = new carsModelo({
                id: nuevoCarritoId,
                producto: productos.map((producto, index) => ({
                    product: producto._id,
                    quantity: 1,
                }))
            });

            await nuevoCarrito.save();

            return { success: true, message: 'Carrito creado correctamente', carrito: nuevoCarrito };
        } catch (error) {
            console.error('Error al añadir productos al carrito:', error);
            return { success: false, message: 'Error al crear el carrito' };
        }
    };

}
