const express = require('express');
const app = express();
const db = require('./db');
const passport = require('./auth');
const session = require('express-session');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware
const firstMdw = (req, res, next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.url}`);
    next();
}

app.use(firstMdw);

app.use(session({
    secret: '2255', 
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


const auth = passport.authenticate('local', {session: true})


const personRoutes = require('./routes/person_routes');
app.use('/person', auth , personRoutes)
const menuItemRoutes = require('./routes/menu_item_routes');
// const person = require('./models/person');
app.use('/menu_item', menuItemRoutes);


app.get('/',auth, function (req, res) {
    res.send("welcome")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("lISTENING ON PORT", PORT);
});