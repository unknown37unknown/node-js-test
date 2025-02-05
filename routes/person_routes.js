const express = require('express');
const router = express.Router();
const person = require('../models/person');
const {jwtAuthMiddleware, generateToken} = require('../jwt');


router.post('/login', async (req, res) => {
    try {
        
        const {username, password} = req.body;
        const user = await person.findOne({username: username});
        if(!user || !(await user.comparePass(password))){
            return res.status(401).json({error: 'invalid username or password'})
        }

        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        res.json({token});
    }
    catch (err) {
        console.log('Error :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data);
        const savePerson = await newPerson.save();
        console.log('Saved');
        const token = generateToken(savePerson.username);
        console.log('tokken is :', token);
        res.status(200).json({savePerson, token});
    }
    catch (err) {
        console.log('Error :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/', jwtAuthMiddleware , async (req, res) => {
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
router.get('/profile', jwtAuthMiddleware , async (req, res) => {
    try {
        const userData = req.user;
        const userId = userData.id;
        const user = await person.findById(userId);
        res.status(200).json(user);
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