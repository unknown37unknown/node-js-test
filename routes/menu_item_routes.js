const express = require('express');
const router = express.Router();
const menuItem = require('../models/menuItem')

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newItem = new menuItem(data);
        const saveMenu = await newItem.save();
        console.log('Saved');
        res.status(200).json(saveMenu);
    }
    catch (err) {
        console.log('Error :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.get('/', async (req, res) => {
    try {
        const menu = await menuItem.find();
        console.log('get menu successfully');
        res.status(200).json(menu);
    }
    catch (err) {
        console.log('Error :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste
        if (taste == "sweet" || taste == "sour" || taste == "spicy") {
            const data = await menuItem.find({ taste: taste });
            console.log('get menu successfully');
            res.status(200).json(data);
        }else{
            res.status(400).json({error: 'invalid taste'})
        }

    }
    catch (err) {
        console.log('Error :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;