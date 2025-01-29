const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
    },

    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },

    address: {
        type: String
    },

    salary: {
        type: Number,
        required: true
    }


})


personSchema.pre('save', async function (next) {
    const person = this;

    if(!person.isModified('password')) return next();

    try{

        const salt = await bcrypt.genSalt(5);

        const hashedPass = await bcrypt.hash(person.password, salt);
       
        person.password = hashedPass;

        next();

    }catch(err){
        return next(err);
    }
})


personSchema.methods.comparePass = async function (userPass) {
    //                    |
        //          custom function

    try{

        const isMatched = await bcrypt.compare(userPass, this.password);
        return isMatched;

    }catch(err){
        throw err;
    }
    
}

// making model

const person = mongoose.model('person', personSchema);
module.exports = person;