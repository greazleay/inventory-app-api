import Category from "../models/category.mjs";
import Product from "../models/product.mjs";
import async from "async";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

export const get_content_count = (req, res, next) => {
    async.parallel({
        category_count: (cb) => {
            Category.countDocuments({}, cb)
        },
        product_count: (cb) => {
            Product.countDocuments({}, cb)
        }
    }, (err, results) => {
        if (err) return next(err)
        res.json(results)
    }
    )
}

export const get_all_categories = (req, res, next) => {
    Category.find({}).exec((err, categories) => {
        if (err) next(err);
        res.json(categories);
    })
}

export const get_single_category = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    async.parallel({
        category: (cb) => {
            Category.findById(id).exec(cb)
        },
        category_products: (cb) => {
            Product.find({ 'categories': id }).exec(cb)
        }
    },
        (err, results) => {
            if (err) return next(err.message);
            if (!results.category) {
                const err = new Error('Category not found');
                return res.status(404).json({ msg: err.message });
            }
            res.json({ category: results.category, category_products: results.category_products })
        }
    )
}

export const post_create_category = [

    body('name', 'Category name required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Please add a category description').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const category = new Category({
            name: req.body.name,
            description: req.body.description
        });
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        } else {
            Category.findOne({ 'name': req.body.name })
                .exec((err, found_category) => {
                    if (err) return next(err)
                    if (found_category) {
                        res.status(409).json({ msg: "Category already exist" })
                    } else {
                        category.save((err) => {
                            if (err) return next(err)
                            res.status(201).json({ msg: `${req.body.name} created` })
                        })
                    }
                })
        }
    }
]

export const put_update_category = [

    body('name', 'Category name is required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Please add a description').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {

        const errors = validationResult(req);
        const category = {
            name: req.body.name,
            description: req.body.description
        }
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return
        } else {
            Category.findByIdAndUpdate(req.params.id, category, {}, (err, thecategory) => {
                if (err) return next(err)
                res.json({ msg: `${thecategory._id} modified` })
            })
        }
    }]

export const delete_delete_category = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        category_products: (cb) => {
            Product.find({ 'categories': id }).exec(cb);
        },
    },
        (err, results) => {
            if (err) return res.status(500).json({ msg: "An error has occured" });
            if (results.category_products.length) {
                const prods = results.category_products.map(prod => prod.name);
                res.status(409).json({ msg: `Please remove these Products first:- ${prods}` });
                return;
            }
            Category.findByIdAndRemove(id, (err, category) => {
                if (err) return next(err);
                if (!category) {
                    const err = new Error(`Category with ID: ${id} not found`);
                    res.status(404).json({ msg: err.message})
                }
                res.json({ msg: "Category deleted" });
            });
        }
    );
};