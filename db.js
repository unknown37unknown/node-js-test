const mongos = require('mongoose');
mongoUrl = 'mongodb://localhost:27017/hotel'

mongos.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongos.connection;

db.on('connected', () => {
    console.log("Connected to Mongo DB");
})
db.on('error', (err) => {
    console.error("Mongo DB Connection Error: ", err);
})
db.on('disconnected', () => {
    console.log("Mongo DB Disconnected");
})

module.exports = db;