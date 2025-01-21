import fs from "fs"

export class CarManager {
    static #path = "";

    static setPath(rutaArchivo = "") {
        this.#path = rutaArchivo;
    }

    static async getCars() {
        if (fs.existsSync(this.#path)) {
            return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));
        } else {
            return [];
        }
    };

    static async getCarById(id) {
        let carritos = await this.getCars();
        return carritos.find(carrito => carrito.id === Number(id));
    };

    static async addCar() {
        let carritos = await this.getCars();
        let id = 1;
        if (carritos.length > 0) {
            id = Math.max(...carritos.map(car => car.id)) + 1;
        };
        let nuevoCarrito = { id, products: [] };
        carritos.push(nuevoCarrito);
        await this.#grabaArchivo(JSON.stringify(carritos, null, 5));
        return nuevoCarrito;
    };

    static async addProductToCar(cid, pid) {
        let carritos = await this.getCars();
        let carrito = carritos.find(carrito => carrito.id === Number(cid));
        carrito.products.push({ product: Number(pid), quantity: 1 });
        await this.#grabaArchivo(JSON.stringify(carritos, null, 5));
        return carrito;
    };

    static async updateProductToCar(cid, pid) {
        let carritos = await this.getCars();
        let carrito = carritos.find(carrito => carrito.id === Number(cid));
        let index = carrito.products.findIndex(product => product.product === Number(pid));
        carrito.products[index].quantity++;
        await this.#grabaArchivo(JSON.stringify(carritos, null, 5));
        return carrito;
    };

    static async #grabaArchivo(datos = "") {
        if (typeof datos != "string") {
            throw new Error(`error método grabaArchivo - argumento con formato inválido`)
        }
        await fs.promises.writeFile(this.#path, datos)
    };
}