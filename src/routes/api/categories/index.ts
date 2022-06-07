import { FastifyPluginAsync } from 'fastify';
import { getAllCategories, getCategoryById, createCategory } from '../../../handlers/category.handler';
import { validateCreateCategory } from '../../../validators/category.validator';

const categories: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.get('/all', getAllCategories);

    fastify.get('/:id', getCategoryById);

    fastify.post('/create', validateCreateCategory, createCategory);

};

export default categories;
