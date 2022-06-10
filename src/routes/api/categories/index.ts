import { FastifyPluginAsync } from 'fastify';
import { validateCreateCategory } from '../../../validators/category.validator';
import { 
    countCategories,
    createCategory,
    deleteCategory,
    getAllCategories, 
    getCategoryById, 
    getCategoryByName, 
    searchCategoryByName, 
    updateCategory, 
} from '../../../handlers/category.handler';

const categories: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.get('/', { onRequest: [fastify.jwtauthenticate] }, getAllCategories);

    fastify.get('/count', { onRequest: [fastify.jwtauthenticate] }, countCategories);

    fastify.get('/:id', getCategoryById);

    fastify.get('/name/:name', getCategoryByName);

    fastify.get('/search/:name', searchCategoryByName);

    fastify.post('/create', validateCreateCategory, createCategory);

    fastify.patch('/:id', updateCategory);

    fastify.delete('/:id', deleteCategory);

};

export default categories;
