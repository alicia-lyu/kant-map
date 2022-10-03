const mongoose = require('mongoose');
const dbUrl = process.env.ATLAS_URL || 'mongodb://localhost:27017/kant-map';
mongoose.connect(dbUrl)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

class SeedPair {
    constructor(schema, data) {
        this.schema = schema;
        this.data = data
    }
    async seed() {
        try {
            await this.schema.deleteMany({});
            for (datum of this.data) {
                let datumInDb = new this.schema(datum);
                await datumInDb.save()
            }
            console.log(`Seeding succeeded for ${this.schema}.`)
        } catch (error) {
            console.log(`Seeding failed for ${this.schema}.`)
            console.log(error)
        }    
    }
    logResult() {
        this.schema.find({}).then((dataInDb) => {
            console.log(dataInDb)
        })
    }
}

const Term = require('../models/Term')
const terms = require('./terms')
const termPair = new SeedPair(Term, terms)
const List = require('../models/List')
const lists = require('./lists')
const listPair = new SeedPair(List, lists)
const Post = require('../models/Post')
const posts = require('./posts')
const postPair = new SeedPair(Post, posts)

const seedPairs = [termPair, listPair, postPair];

const seedAll = async () => {
    for (let seedPair of seedPairs) {
        seedPair.seed()
    }
}

seedAll().then(() => {
    mongoose.connection.close();
});

for (let seedPair of seedPairs) {
    seedPair.logResult();
}