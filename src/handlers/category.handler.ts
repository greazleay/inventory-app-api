import { FastifyRequest, FastifyReply } from 'fastify';
import Category from '../models/Category';
import { AppError } from '../errors/app.error';


export const getAllCategories = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        return await Category.find({}).exec();
    } catch (error) {
        console.error(error);
    }
};

export const getCategoryById = async (request: FastifyRequest<{
    Params: {
        id: string;
    }
}>
    , reply: FastifyReply) => {
    try {
        const category = await Category.findById(request.params.id).exec();
        if (!category) throw new AppError('Category not found', 404);
        return category;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const createCategory = async (request: FastifyRequest<{
    Body: {
        name: string;
        description: string;
    }
}>, reply: FastifyReply) => {
    try {
        const { name, description } = request.body;
        const foundCategory = await Category.findOne({ name }).exec();
        if (foundCategory) throw new AppError('Category already exists', 400);
        const category = await Category.create({ name, description });
        return category;
    } catch (error) {
        console.error(error);
        return error;
    }
}