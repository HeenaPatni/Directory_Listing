const express = require('express');
const router = express.Router();
const ProductCombination = require('../models/ProductCombination');

// Get all combinations
// router.get('/', async (req, res) => {
//     try {
//         const combinations = await ProductCombination.find().populate('productId materialId gradeId');
//         res.json(combinations);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

router.get('/', async (req, res) => {
    try {
        // const { productId, materialId } = req.query;
        // const query = {};

        // if (productId) query.productId = productId;
        // if (materialId) query.materialId = materialId;

        const combinations = await ProductCombination.find()
            .populate('productId materialId gradeId');
            // console.log(combinations)
        res.json(combinations);
        
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Add combination
router.post('/', async (req, res) => {
    const { productId, materialId, gradeId, price, currency, shape, length, thickness } = req.body;
    try {
        const newCombination = new ProductCombination({
            productId,
            materialId,
            gradeId,
            price,
            currency,
            shape,
            length,
            thickness
        });
        await newCombination.save();
        res.json(newCombination);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { shape, length, thickness,price } = req.body;

    try {
        
        const updatedCombination = await ProductCombination.findByIdAndUpdate(
            id,
            { shape, length, thickness,price },
            { new: true } 
        );

        if (!updatedCombination) {
            return res.status(404).send('Product combination not found');
        }

        const newCombinations = await ProductCombination.findById(id)
        .populate('productId materialId gradeId');



        res.json(newCombinations);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
});

module.exports = router;
