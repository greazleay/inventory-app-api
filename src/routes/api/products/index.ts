import { FastifyPluginAsync } from 'fastify';
import { validateCreateProduct } from '../../../validators/product.validator';
import { getAllProducts, getProductById, getProductByName, createProduct } from '../../../handlers/product.handler';

const products: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    
    fastify.get('/', getAllProducts);

    fastify.get('/:id', getProductById);

    fastify.get('/name/:name', getProductByName);

    fastify.post('/create', validateCreateProduct, createProduct);
};

export default products;
