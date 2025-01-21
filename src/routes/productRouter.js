import { Router } from "express";
import { ProductManager } from "../dao/ProductManager.js";
import { procesaErrores } from "../utils/utils.js";

export const router = Router();

ProductManager.setPath("./src/data/productos.json");

router.get("/", async (req, res) => {
    let { limit } = req.query;
    try {
        let productos = await ProductManager.getProducts();
        if (!limit) {
            limit = productos.length
        } else {
            limit = Number(limit)
            if (isNaN(limit)) {
                return res.status(400).json({ Error: "el limit debe ser numérico" });
            }
        }
        productos = productos.slice(0, limit)
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ productos });
    } catch (error) {
        procesaErrores(res, error)
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