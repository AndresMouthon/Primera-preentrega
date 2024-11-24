import { Router } from 'express';
import { ProductManagerMongo } from '../dao/ProductManagerMongo.js';

export const router = Router();

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
