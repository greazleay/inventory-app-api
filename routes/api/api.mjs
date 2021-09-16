import express from "express";
import * as categories from "../../controllers/categoryController.mjs";
import * as products from "../../controllers/productController.mjs";

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ msg: 'Please respond with a resource' });
});

// router.post('/', (req, res) => res.send(req.body));

// Categories Route

router.get('/categories', categories.get_all_categories);

router.get('/categories/:id', categories.get_single_category);

router.post('/categories/create', categories.post_create_category);

router.put('/categories/:id/update', categories.put_update_category);

router.delete('/categories/:id/delete', categories.delete_delete_category);

// Products Route

router.get('/products', products.get_all_product);

router.get('/products/:id', products.get_single_product);

router.post('/products/create', products.post_create_product);

router.put('/products/:id/update', products.put_update_product);

router.delete('/products/:id/delete', products.delete_delete_product);

export default router