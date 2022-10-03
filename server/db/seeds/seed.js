const mongoose = require('mongoose');
const Term = require('../models/Term')
console.log(Term)
const List = require('../models/List')
const Post = require('../models/Post')

const dbUrl = process.env.ATLAS_URL || 'mongodb://localhost:27017/kant-map';
const connectMongoose = async () => {
    await mongoose.connect(dbUrl);
    const dataInDb = await Term.find({});
    console.log('Current data under the schema', Term)
    console.log(dataInDb)
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });
    db.on("close", () => {
        console.log("Database closed");
    })
}
connectMongoose();

class SeedPair {
    constructor(schema, data) {
        this.schema = schema;
        this.data = data;
        // this.schema.deleteMany = schema.deleteMany;
        // this.schema.find = schema.find;
    }
    async seed() {
        try {
            await this.schema.deleteMany({});
            for (let datum of this.data) {
                console.log(datum)
                let datumInDb = new this.schema(datum);
                await datumInDb.save()
            }
            console.log(`Seeding succeeded for ${this.schema}.`)
        } catch (error) {
            console.log(`Seeding failed for ${this.schema}.`)
            console.log(error)
        }    
    }
    async logResult() {
        const dataInDb = await this.schema.find({})
        console.log('Current data under the schema', this.schema)
        console.log(dataInDb)
    }
}

const terms = require('./terms')
const termPair = new SeedPair(Term, terms)
const lists = require('./lists')
const listPair = new SeedPair(List, lists)
const posts = require('./posts')
const postPair = new SeedPair(Post, posts)

const seedPairs = [termPair, listPair, postPair];

const seedAll = async () => {
    for (let seedPair of seedPairs) {
        await seedPair.seed()
    }
}

seedAll().then(() => {
    mongoose.connection.close();
});

for (let seedPair of seedPairs) {
    seedPair.logResult();
}