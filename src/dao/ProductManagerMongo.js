<<<<<<< HEAD
import productsModelo from "./models/productsModel.js";

export class ProductManagerMongo{
    // static path=config.HEROES_PATH
    static async get(page=1, limit=10){
        return await productsModelo.paginate(
            {},
            {
                limit,
                page,
                lean: true
            }
        )
    } // fin get

    static async create(heroe={}){
        // if(!heroe.name){
        //     throw new Error("Propiedad name es requerida")
        // }
        // let heroes=await this.get()
        // let existe=heroes.find(h=>h.name===heroe.name)
        // if(existe){
        //     throw new Error(`Heroe existe en DB: ${heroe.name}`)
        // }
        // let id=1
        // if(heroes.length>0){
        //     id=Math.max(...heroes.map(d=>d.id))+1
        // }

        // let nuevoHeroe={id, ...heroe}
        // heroes.push(nuevoHeroe)
        // await fs.promises.writeFile(this.path, JSON.stringify(heroes, null, 5))

        let nuevoHeroe=await heroesModelo.create(heroe)
        return nuevoHeroe.toJSON()

    } // fin create

    static async update(id, aModificar={}){
        // if(isNaN(id)) throw new Error(`Formato inválido id`)
        // let heroes=await this.get()
        // if(aModificar.name){
        //     let existe=heroes.find(h=>h.name.trim().toLowerCase()===aModificar.name.trim().toLowerCase() && h.id!==id)
        //     if(existe){
        //         throw new Error(`Heroe existe en DB: ${aModificar.name.trim().toLowerCase()}`)
        //     }
        // }
        // let indiceHeroe=heroes.findIndex(h=>h.id===id)
        // if(indiceHeroe===-1) throw new Error(`Heroe no encontrado`)

        // heroes[indiceHeroe]={
        //     ...heroes[indiceHeroe], ...aModificar, id
        // }
        // await fs.promises.writeFile(this.path, JSON.stringify(heroes, null, 5))
        // return heroes[indiceHeroe]
        return await heroesModelo.findByIdAndUpdate(id, aModificar, {new:true})
    } // fin update

    static async delete(id){
        // if(isNaN(id)) throw new Error(`Formato inválido id`)
        // let heroes=await this.get()
        // let heroeEliminado=heroes.find(h=>h.id===id)
        // if(!heroeEliminado){
        //     throw new Error(`Heroe inexistente con id ${id}`)
        // }
        
        // heroes=heroes.filter(h=>h.id!==id)
        // await fs.promises.writeFile(this.path, JSON.stringify(heroes, null, 5))
        return await heroesModelo.findByIdAndDelete(id)
    }

} // fin HeroesDAO
=======
import { productsModelo } from './models/productsModel.js';

export class ProductManagerMongo {
    static async get(page = 1, limit = 10, query = null, sort = 'asc') {
        const sortOption = sort === 'desc' ? { price: -1 } : { price: 1 };
        let result = null;
        try {
            if (query) {
                result = await productsModelo.paginate(
                    { category: query },
                    {
                        limit,
                        page,
                        lean: true,
                        sort: sortOption,
                    }
                )
            } else {
                result = await productsModelo.paginate(
                    {},
                    {
                        limit,
                        page,
                        lean: true,
                        sort: sortOption,
                    }
                )
            }
            return result;
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

}
>>>>>>> 00fa4b2f39eb279628f51dee6b5ff0de1d39fecb
