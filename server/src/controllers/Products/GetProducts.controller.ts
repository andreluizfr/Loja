import { Request, Response,  } from 'express';
import { GetProductsService } from '../../services/Products/GetProducts.service';
import { ProductsRepository } from "../../repositories/Products/Products.repository";

const productsRepository = new ProductsRepository();
const getProductsService = new GetProductsService(productsRepository);

interface Queries{
    status?: string | undefined;
    category?: string | undefined;
    keyword?: string | undefined;
}

//receive a request, calls the use-case, then send back a response
export default new class GetProductsController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const status = req.query.status as string;
        const category = req.query.categoria as string;
        const keyword = req.query.keyword as string;

        console.log(status);
        console.log(category);
        console.log(keyword);

        const queries = {} as Queries;

        if(status)
            queries.status = status;

        if(category)
            queries.category = category;
        
        if(keyword)
            queries.keyword = keyword;

        try{
            const { products } = await getProductsService.execute(queries);

            return res.status(201).send({
                refresh: false,
                success: true,
                products: products,
                message: "A busca foi um sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                refresh: false,
                success: false,
                products: [],
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}