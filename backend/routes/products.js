const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add product
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newProduct = new Product({ name });
        await newProduct.save();
        res.json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
