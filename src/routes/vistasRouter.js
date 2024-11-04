import { Router } from 'express';
import axios from 'axios';

export const router = Router();

const getProducts = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/products/');
        return response.data.productos;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
};

router.get('/', async (req, res) => {
    const products = await getProducts();
    res.render("home", { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await getProducts();
    res.render("realTimeProducts", { products });
});
