const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');

// Get all grades
router.get('/', async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add grade
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newGrade = new Grade({ name });
        await newGrade.save();
        res.json(newGrade);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
