const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_uri);

const connection = mongoose.connection;

connection.on('error', () => {
    console.log("Error connecting to Database");
});

connection.on('connected', () => {
    console.log('MongoDB Connection Successful');
});

module.exports = connection;