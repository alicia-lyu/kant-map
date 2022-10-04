const mongoose = require('mongoose');
const connectMongoose = require('../conn')
const SeedPair = require('./SeedPair')


const Term = require('../models/Term')
const terms = require('./terms')
const termPair = new SeedPair(Term, terms)
const List = require('../models/List')
const lists = require('../seeds/lists')
const listPair = new SeedPair(List, lists)
const Post = require('../models/Post')
const posts = require('../seeds/posts')
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