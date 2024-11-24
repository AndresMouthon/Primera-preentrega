import { productsModelo } from './models/productsModel.js';

export class ProductManagerMongo {
    static async get(page = 1, limit = 10, query = null, sort = 'asc') {
        const sortOption = sort === 'desc' ? { price: -1 } : { price: 1 };
        let result = null;
        console.log("query:", query);
        
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
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }
}
