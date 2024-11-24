import { Router } from 'express';
import { ProductManagerMongo } from '../dao/ProductManagerMongo.js';

export const router = Router();
//     try {
//         const response = await axios.get('http://localhost:8080/api/products/');
//         return response.data;
//     } catch (error) {
//         console.error('Error al obtener productos:', error);
//         return [];
//     }
// };


router.get('/', async (req, res) => {
    let { page, limit, sort, query } = req.query;
    let { docs: prducts, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = await ProductManagerMongo.get(page, limit, query, sort);
    res.render("home", {
        products: prducts,
        totalPages,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage
    });
});

// router.get('/realtimeproducts', async (req, res) => {
//     const products = await getProducts();
//     res.render("realTimeProducts", { products });
// });
