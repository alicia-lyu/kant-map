const mongoose = require('mongoose');
const dbUrl = process.env.ATLAS_URL || 'mongodb://localhost:27017/kant-map';
const connectMongoose = async () => {
    await mongoose.connect(dbUrl);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });
    db.on("close", () => {
        console.log("Database closed");
    })
}

module.exports = connectMongoose