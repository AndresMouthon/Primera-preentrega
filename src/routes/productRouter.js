import { Router } from "express";
import { ProductManagerMongo } from "../dao/ProductManagerMongo.js";
import { procesaErrores } from "../utils/utils.js";

export const router = Router();

router.get("/", async (req, res) => {
    let { page, limit, sort, query } = req.query;
    let products = await ProductManagerMongo.get(page, limit, query, sort);
    products = {
        products: products.docs,
        ...products
    };
    delete products.docs;
    res.setHeader('Content-Type', 'application/json');
    if (products.products.length > 0) {
        res.status(200).json({
            status: "success",
            payload: products
        });
    } else {
        res.status(404).json({
            status: "error",
            payload: "No se encontraron productos"
        });
    }
});

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        if (isNaN(Number(pid))) {
            return res.status(404).json({ Error: `El ID ${pid} no es numérico` });
        }
        const product = await ProductManager.getProductById(pid);
        if (!product) {
            return res.status(404).json({ Error: `No existe un producto con el ID ${pid}` });
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ "Producto": product });
    } catch (error) {
        procesaErrores(res, error)
    }
});

router.post("/", async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ Error: "Todos los campos son obligatorios" });
    } else if (isNaN(Number(price)) || isNaN(Number(stock))) {
        return res.status(400).json({ Error: "El precio y el stock deben ser numéricos" });
    } else {
        try {
            if (!thumbnails) {
                req.body.thumbnails = [];
            }
            const product = await ProductManager.addProduct(req.body);
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ "Producto creado": product });
        } catch (error) {
            procesaErrores(res, error)
        }
    }
});

router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        if (isNaN(Number(pid))) {
            return res.status(404).json({ Error: `El ID ${pid} no es numérico` });
        }
        if (req.body.id) {
            return res.status(400).json({ Error: "No se puede modificar el ID" });
        }
        const productoBuscar = await ProductManager.getProductById(pid);
        if (!productoBuscar) {
            return res.status(404).json({ Error: `No existe un producto con el ID ${pid}` });
        }
        const product = await ProductManager.modificaProduct(pid, req.body);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ "Producto actualizado": product });
    } catch (error) {
        procesaErrores(res, error)
    }
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        if (isNaN(Number(pid))) {
            return res.status(404).json({ Error: `El ID ${pid} no es numérico` });
        }
        const productoBuscar = await ProductManager.getProductById(pid);
        if (!productoBuscar) {
            return res.status(404).json({ Error: `No existe un producto con el ID ${pid}` });
        }
        const product = await ProductManager.eliminaProducto(pid);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ "mensaje": product });
    } catch (error) {
        procesaErrores(res, error)
    }
});