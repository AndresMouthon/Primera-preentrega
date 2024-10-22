import fs from "fs"

export class ProductManager {
    static #path = "";

    static setPath(rutaArchivo = "") {
        this.#path = rutaArchivo;
    };

    static async getProducts() {
        if (fs.existsSync(this.#path)) {
            return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }))
        } else {
            return [];
        };
    };

    static async getProductById(id) {
        let productos = await this.getProducts();
        return productos.find(producto => producto.id === Number(id));
    };

    static async addProduct(producto={}){
        let productos=await this.getProducts();
        let id=1;
        if(productos.length>0){
            id=Math.max(...productos.map(d=>d.id))+1;
        };
        let nuevoProducto={
            id, 
            status:true,
            ...producto,
        };
        productos.push(nuevoProducto);
        this.#grabaArchivo(JSON.stringify(productos, null, 5));
        return nuevoProducto;
    };

    static async modificaProduct(id, modificaciones){
        let productos=await this.getProducts()
        let indiceProducto=productos.findIndex(producto=>producto.id===Number(id))
        if(indiceProducto===-1){
            throw new Error(`${id} not found`)
        }
        productos[indiceProducto]={
            ...productos[indiceProducto],
            ...modificaciones
        }

        this.#grabaArchivo(JSON.stringify(productos, null, 5))
        return productos[indiceProducto]
    };

    static async eliminaProducto(id){
        let productos=await this.getProducts();
        productos.filter(p=>p.id===Number(id));
        productos=productos.filter(p=>p.id!==Number(id));
        this.#grabaArchivo(JSON.stringify(productos, null, 5));
        return "Producto eliminado";
    };

    static async #grabaArchivo(datos = "") {
        if (typeof datos != "string") {
            throw new Error(`error método grabaArchivo - argumento con formato inválido`)
        }
        await fs.promises.writeFile(this.#path, datos)
    };
};