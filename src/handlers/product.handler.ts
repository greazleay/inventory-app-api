import { FastifyRequest, FastifyReply } from 'fastify';
import Product from '../models/Product';
import { AppError } from '../errors/app.error';

export const countProducts = async (request: FastifyRequest, reply: FastifyReply): Promise<number> => {
    try {
        return await Product.estimatedDocumentCount().exec();
    } catch (error: any) {
        console.error(error);
        return error;
    }
}

export const getAllProducts = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        return await Product.find({}).exec();
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const getProductById = async (request: FastifyRequest<{
    Params: {
        id: string;
    }
}>

    , reply: FastifyReply) => {
    try {
        const product = await Product.findById(request.params.id).exec();
        if (!product) throw new AppError('Product not found', 404);
        return product;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}

export const getProductByName = async (request: FastifyRequest<{
    Querystring: {
        name: string;
    }
}>,
    reply: FastifyReply) => {
    try {
        const { name } = request.query;
        const product = await Product.findOne({ name }).exec();
        if (!product) throw new AppError('Product not found', 404);
        return product;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}

export const searchproductByName = async (request: FastifyRequest<{
    Querystring: {
        name: string;
    }
}>,
    reply: FastifyReply) => {
    try {
        const { name } = request.query;
        const product = await Product.find({ name: { $regex: name, $options: 'i' } }).exec();
        if (!product) throw new AppError('Product not found', 404);
        return product;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}

export const createProduct = async (request: FastifyRequest<{
    Body: {
        name: string;
        description: string;
        categories: string[];
        price: number;
        stock: number;
        img: string;
    }
}>,

    reply: FastifyReply) => {
    try {
        const { name, description, price, categories, stock, img } = request.body;
        const foundProduct = await Product.findOne({ name }).exec();
        if (foundProduct) throw new AppError('Product already exists', 400);
        const product = await Product.create({ name, description, price, categories, stock, img });
        return product;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}

export const updateProduct = async (request: FastifyRequest<{
    Params: {
        id: string;
    },
    Body: {
        name?: string;
        description?: string;
        categories?: string[];
        price?: number;
        stock?: number;
        img?: string;
    }
}>, reply: FastifyReply) => {
    try {
        const { id } = request.params;
        const { name, description, price, categories, stock, img } = request.body;
        const product = await Product.findByIdAndUpdate(id, { name, description, price, categories, stock, img }, { new: true }).exec();
        if (!product) throw new AppError('Product not found', 404);
        return product;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}

export const deleteProduct = async (request: FastifyRequest<{
    Params: {
        id: string;
    }
}>,

    reply: FastifyReply) => {
    try {
        const { id } = request.params;
        const product = await Product.findByIdAndDelete(id).exec();
        if (!product) throw new AppError('Product not found', 404);
        return product;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}