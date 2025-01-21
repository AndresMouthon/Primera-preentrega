import { Router } from "express";
import { CarManager } from "../dao/CarManager.js";
import { ProductManager } from "../dao/ProductManager.js";
import { procesaErrores } from "../utils/utils.js";

export const router = Router();

CarManager.setPath("./src/data/carrito.json");
ProductManager.setPath("./src/data/productos.json");

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        if (isNaN(Number(cid))) {
            return res.status(404).json({ Error: `El ID ${cid} no es numérico` });
        }
        const car = await CarManager.getCarById(cid);
        if (!car) {
            return res.status(404).json({ Error: `No existe un carro con el ID ${cid}` });
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ car });
    } catch (error) {
        procesaErrores(res, error)
    }
});

router.post("/", async (req, res) => {
    let carrito = await CarManager.addCar();
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json({ "Carrito creado": carrito });
})

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    if (isNaN(Number(cid)) || isNaN(Number(pid))) {
        return res.status(400).json({ Error: "El ID debe ser numérico" });
    }
    const carritoBuscar = await CarManager.getCarById(cid);
    if (!carritoBuscar) {
        return res.status(404).json({ Error: `No existe un carro con el ID ${cid}` });
    }
    const productoBuscar = await ProductManager.getProductById(pid);
    if (!productoBuscar) {
        return res.status(404).json({ Error: `No existe un producto con el ID ${pid}` });
    }
    const { products } = carritoBuscar;
    const index = products.findIndex((product) => product.product === Number(pid));
    if (index !== -1) {
        const carrito = await CarManager.updateProductToCar(cid, pid);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ "Producto actualizado": carrito });
    } else {
        const carrito = await CarManager.addProductToCar(cid, pid);
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ "Producto agregado": carrito });
    };
});