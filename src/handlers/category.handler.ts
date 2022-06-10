import { FastifyRequest, FastifyReply } from 'fastify';
import Category from '../models/Category';
import { AppError } from '../errors/app.error';


export const countCategories = async (request: FastifyRequest, reply: FastifyReply): Promise<number> => {
    try {
        return await Category.estimatedDocumentCount().exec();
    } catch (error: any) {
        console.error(error);
        return error;
    }
};

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

export const getCategoryByName = async (request: FastifyRequest<{
    Querystring: {
        name: string;
    }
}>,
    reply: FastifyReply) => {
    try {
        const { name } = request.query;
        const category = await Category.findOne({ name }).exec();
        if (!category) throw new AppError('Category not found', 404);
        return category;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const searchCategoryByName = async (request: FastifyRequest<{
    Querystring: {
        name: string;
    }
}>,
    reply: FastifyReply) => {
    try {
        const { name } = request.query;
        const category = await Category.find({ name: { $regex: name, $options: 'i' } }).exec();
        if (!category) throw new AppError('Category not found', 404);
        return category;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const createCategory = async (request: FastifyRequest<{
    Body: {
        name: string;
        description: string;
    }
}>,
    reply: FastifyReply) => {
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

export const updateCategory = async (request: FastifyRequest<{
    Params: {
        id: string;
    },
    Body: {
        name: string;
        description: string;
    }
}>,

    reply: FastifyReply) => {
    try {
        const { id } = request.params;
        const { name, description } = request.body;
        const categoryToUpdate = await Category.findByIdAndUpdate(id, { name, description }, { new: true }).exec();
        if (!categoryToUpdate) throw new AppError('Category not found', 404);
        return categoryToUpdate;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const deleteCategory = async (request: FastifyRequest<{
    Params: {
        id: string;
    }
}>, reply: FastifyReply) => {
    try {
        const { id } = request.params;
        const categoryToDelete = await Category.findByIdAndDelete(id).exec();
        if (!categoryToDelete) throw new AppError('Category not found', 404);
        return categoryToDelete;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}