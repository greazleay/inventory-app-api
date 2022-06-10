import { FastifyPluginAsync } from 'fastify';
import { validateCreateProduct } from '../../../validators/product.validator';
import {
    countProducts,
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    searchproductByName,
    updateProduct
} from '../../../handlers/product.handler';

const products: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.get('/', getAllProducts);

    fastify.get('/count', countProducts);

    fastify.get('/:id', getProductById);

    fastify.get('/name/:name', getProductByName);

    fastify.get('/search/:name', searchproductByName);

    fastify.post('/create', validateCreateProduct, createProduct);

    fastify.patch('/:id', updateProduct);

    fastify.delete('/:id', deleteProduct);
};

export default products;
