const express = require('express');
const router = express.Router();
const Material = require('../models/Material');

// Get all materials
router.get('/', async (req, res) => {
    try {
        const materials = await Material.find();
        res.json(materials);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add material
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newMaterial = new Material({ name });
        await newMaterial.save();
        res.json(newMaterial);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
