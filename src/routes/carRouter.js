import { Router } from "express";
import { CarManagerMongo } from "../dao/CarManagerMongo.js";
import { procesaErrores } from "../utils/utils.js";

export const router = Router();

router.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        if (isNaN(Number(cid)) || isNaN(Number(pid))) {
            return res.status(400).json({ Error: "El ID debe ser numérico" });
        }
        const carrito = await CarManagerMongo.deleteCar(cid, pid);
        if (carrito.status === "error") {
            return res.status(404).json({ Error: carrito.message });
        }
        return res.status(200).json({
            status: "success",
            payload: "Producto eliminado",
        });
    } catch (error) {
        procesaErrores(res, error)
    }
});

router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        if (isNaN(Number(cid))) {
            return res.status(400).json({ Error: "El ID debe ser numérico" });
        }
        const carrito = await CarManagerMongo.deleteArrayProducts(cid);
        if (carrito.status === "error") {
            return res.status(404).json({ Error: carrito.message });
        }
        return res.status(200).json({
            status: "success",
            payload: "Productos eliminados",
        });
    } catch (error) {
        procesaErrores(res, error)
    }
});

router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        if (isNaN(Number(cid))) {
            return res.status(400).json({ Error: "El ID debe ser numérico" });
        }
        const carrito = await CarManagerMongo.updateNewArrayProducts(cid, req.body);
        if (carrito.status === "error") {
            return res.status(404).json({ Error: carrito.message });
        }
        return res.status(200).json({
            status: "success",
            payload: "Carrito actualizado",
        });
    } catch (error) {
        procesaErrores(res, error)
    }
});

router.put("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        if (isNaN(Number(cid)) || isNaN(Number(pid))) {
            return res.status(400).json({ Error: "El ID debe ser numérico" });
        }
        const carrito = await CarManagerMongo.updateCantidadProductoCarrito(cid, pid, req.body);
        if (carrito.status === "error") {
            return res.status(404).json({ Error: carrito.message });
        }
        return res.status(200).json({
            status: "success",
            payload: "Producto actualizado",
        });
    } catch (error) {
        procesaErrores(res, error)
    }
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        if (isNaN(Number(cid))) {
            return res.status(400).json({ Error: "El ID debe ser numérico" });
        }
        const carrito = await CarManagerMongo.getProductsByCarrito(cid);
        if (carrito.status === "error") {
            return res.status(404).json({ Error: carrito.message });
        }
        return res.status(200).json({
            status: "success",
            payload: carrito,
        });
    } catch (error) {
        procesaErrores(res, error)
    }
});

router.post("/finalizar-compra", async (req, res) => {
    const carrito = await CarManagerMongo.finalizarCompra(req.body);
    if (carrito.status === "error") {
        return res.status(404).json({ Error: carrito.message });
    }
    return res.status(200).json({ success: true, message: 'Compra procesada exitosamente' });
});