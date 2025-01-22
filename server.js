const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const personRoutes = require('./routes/person_routes');
app.use('/person', personRoutes)
const menuItemRoutes = require('./routes/menu_item_routes');
app.use('/menu_item', menuItemRoutes)


app.get('/person', function (req, res) {
    res.send("welcome")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("lISTENING ON PORT", PORT);
});