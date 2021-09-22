import Product from "../models/product.mjs";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

export const get_all_product = (req, res, next) => {
    Product.find({})
        .populate('categories')
        .exec((err, products) => {
            if (err) return next(err)
            res.json(products)
        })
};

export const get_single_product = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    Product.findById(id)
        .populate('categories')
        .exec((err, product) => {
            if (err) return next(err);
            if (!product) {
                const err = new Error(`Product with ID: ${id} not found`);
                return res.status(404).json({ msg: err.message })
            }
            res.json(product)
        })
}

export const post_create_product = [
    (req, res, next) => {
        switch (true) {
            case !req.body.categories:
                req.body.categories = []
                break;
            case !(req.body.categories instanceof Array):
                req.body.categories = new Array(req.body.categories);
                break;
        }
        next()
    },

    body('name', 'Product name required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Please describe the product').trim().isLength({ min: 1 }).escape(),
    body('categories.*').escape(),
    body('price', 'Price must be a valid number').isNumeric().isLength({ min: 1 }).escape(),
    body('stock', 'Please specify amount in stock').isNumeric().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            categories: req.body.categories,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img
        });

        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        } else {
            Product.findOne({ 'name': req.body.name })
                .exec((err, found_book) => {
                    if (err) return next(err);
                    if (found_book) {
                        res.status(409).json({ msg: "Product already exist" })
                    } else {
                        product.save(err => {
                            if (err) return next(err);
                            res.json({ msg: `${req.body.name} created` })
                        })
                    }
                })
        }
    }
];

export const put_update_product = [
    (req, res, next) => {
        switch (true) {
            case !req.body.categories:
                req.body.categories = []
                break;
            case !(req.body.categories instanceof Array):
                req.body.categories = new Array(req.body.categories);
                break;
        }
        next()
    },

    body('name', 'Product name required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Please describe the product').trim().isLength({ min: 1 }).escape(),
    body('categories.*').escape(),
    body('price', 'Price must be a valid number').isNumeric().isLength({ min: 1 }).escape(),
    body('stock', 'Please set product price').isNumeric().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        const id = mongoose.Types.ObjectId(req.params.id);
        const errors = validationResult(req);
        const product = {
            name: req.body.name,
            description: req.body.description,
            categories: req.body.categories,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img
        };
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        } else {
            Product.findByIdAndUpdate(id, product, {}, (err, theproduct) => {
                if (err) return next(err);
                if (!theproduct) {
                    const err = new Error(`Product with ID: ${id} not found`);
                    return res.status(404).json({ msg: err.message})
                }
                res.json({ msg: `Product with ID: ${id} modified successfully!!!` })
            })
        }
    }
];

export const delete_delete_product = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    Product.findByIdAndRemove(id, (err, product) => {
        if (err) return next(err);
        if (!product) {
            const err = new Error(`Product with ID: ${id} not found`);
            return res.status(404).json({ msg: err.message})
        }
        res.json({ msg: `Product with ID: ${id} deleted successfully!!!` })
    })
}