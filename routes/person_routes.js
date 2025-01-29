const express = require('express');
const router = express.Router();
const person = require('../models/person');


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const savePerson = await newPerson.save();
        console.log('Saved');
        res.status(200).json(savePerson);
    }
    catch (err) {
        console.log('Error :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const getUsers = await person.find();
        console.log("found");
        res.status(200).json(getUsers);
    }
    catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const data = await person.find({ work: workType })
            console.log('get work type successfully');
            res.status(200).json(data);
        } else {
            console.log('not fd')
            res.status(400).json({ error: 'invalid work type' });
        }
    }
    catch (err) {
        console.log('Error :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPerson = req.body
        const response = await person.findByIdAndUpdate(personId, updatedPerson, {
            new: true,  // return the updated document
            runValidators: true  // run moongose validator
        });

        if (!response) {
            return res.status(400).json({ error: 'person not found' });
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch (err) {
        console.log('Error :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(400).json({ error: 'person not found' });
        }

        console.log('Person Deleted');
        res.status(200).json({ error: 'Person Deleted Successfully' })
    }catch(err){
        console.log('Error :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;