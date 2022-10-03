const mongoose = require('mongoose');
const dbUrl = process.env.ATLAS_URL || 'mongodb://localhost:27017/kant-map';
const returnDb = () => {
    mongoose.connect(dbUrl)
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });
    return db
}

module.exports = returnDb




// const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
// const dbName = process.env.DB_NAME;
// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
 
// var _db;
 
// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db)
//       {
//         _db = db.db(dbName);
//         console.log("Successfully connected to MongoDB."); 
//       }
//       return callback(err);
//          });
//   },
 
//   getDb: function () {
//     return _db;
//   },
// };