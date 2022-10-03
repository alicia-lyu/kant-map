const returnDb = require('../conn')
const db = returnDb();

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
        } catch (error) {
            console.log(`Seeding failed.`)
            console.log(error)
        }    
    }
}

const Term = require('../models/Term')
const terms = require('./terms')
const termPair = SeedPair(Term, terms)
const List = require('../models/List')
const lists = require('./lists')
const listPair = SeedPair(List, lists)
const Post = require('../models/Post')
const posts = require('./posts')
const postPair = SeedPair(Post, posts)

const seedPairs = [termPair, listPair, postPair];

const seedAll = async () => {
    for (let seedPair of seedPairs) {
        seedPair.seed()
    }
}

seedAll.then(() => {
    mongoose.connection.close();
});

for (let seedPair of seedPairs) {
    seedPair.schema.find({}).then((dataInDb) => {
        console.log(dataInDb)
    })
}