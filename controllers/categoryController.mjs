import Category from "../models/category.mjs";

export const get_all_categories = (req, res) => {
    Category.find().exec((err, category_list) => {
        if (err) {
            return res.status(500).json({ msg: "An error has occured"})
        }
        res.json({category_list})
    })
}

export const get_single_category = (req, res) => {
    Category.findById(req.params.id).exec((err, category) => {
        if (err) {
            return res.status(500).json({ msg: "An error has occured"})
        }
        res.json(category)
    })
}

export const post_create_category = (req, res) => {
    res.json({ msg: "Post:- Coming Soon!!!"})
}

export const put_update_category = (req, res) => {
    res.json({ msg: "Put:- Coming Soon!!!"})
}

export const delete_delete_category = (req, res) => {
    res.json({ msg: "Delete:- Coming Soon!!!"})
}
