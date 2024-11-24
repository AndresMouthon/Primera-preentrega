import { Router } from 'express';
import { ProductManagerMongo } from '../dao/ProductManagerMongo.js';
import { CarManagerMongo } from '../dao/CarManagerMongo.js';

export const router = Router();

router.get('/', async (req, res) => {
    let { page, limit, sort, query } = req.query;
    let { docs: prducts, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = await ProductManagerMongo.get(page, limit, query, sort);
    let carritos = await CarManagerMongo.getCars();
    res.render("home", {
        products: prducts,
        totalPages,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        carritos
    });
});

router.get('/carrito/:id', async (req, res) => {
    const carrito = await CarManagerMongo.getProductsByCarrito(req.params.id);

    let productos = [];
    carrito.producto.forEach(element => {
        productos.push(element.product);
    });
    res.render("carrito", {
        productos: productos
    });
});


