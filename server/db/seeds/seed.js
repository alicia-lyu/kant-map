const mongoose = require('mongoose');
const connectMongoose = require('../conn')

class SeedPair {
    constructor(schema, data) {
        this.schema = schema;
        this.data = data;
    }
    async seed() {
        try {
            await this.schema.deleteMany({});
            for (let datum of this.data) {
                let datumInDb = new this.schema(datum);
                await datumInDb.save()
            }
            console.log('Seeding succeeded for', this.schema)
        } catch (error) {
            console.log('Seeding failed for', this.schema)
            console.log(error)
        }    
    }
    async logResult() {
        const dataInDb = await this.schema.find({})
        console.log('Current data under the schema', this.schema)
        console.log(dataInDb)
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
        await seedPair.seed()
    }
}

const logAll = async () => {
    for (let seedPair of seedPairs) {
        await seedPair.logResult();
    }
}

const seedNLog = async () => {
    await connectMongoose();
    await seedAll();
    await logAll();
    mongoose.connection.close();
}

seedNLog();