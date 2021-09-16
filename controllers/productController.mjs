import Product from "../models/product.mjs";

export const get_all_product = (req, res) => {
    Product.find({}, 'name')
    .populate('categories')
    .exec((err, product_list) => {
        if (err) {
            return res.status(500).json({ msg: "An error has occured"})
        }
        res.json({product_list})
    })
}

export const get_single_product = (req, res) => {
    Product.findById(req.params.id)
    .populate('categories')
    .exec((err, product) => {
        if (err) {
            return res.status(500).json({ msg: "An error has occured"})
        }
        res.json({product})
    })
}

export const post_create_product = (req, res) => {
    res.json({ msg: "Post:- Coming Soon!!!"})
}

export const put_update_product = (req, res) => {
    res.json({ msg: "Put:- Coming Soon!!!"})
}

export const delete_delete_product = (req, res) => {
    res.json({ msg: "Delete:- Coming Soon!!!"})
}
