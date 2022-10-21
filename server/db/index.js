const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbStack = {};

dbStack.mongoose = mongoose;

dbStack.listModel = require('./models/List');
dbStack.postModel = require('./models/Post');
dbStack.roleModel = require('./models/Role');
dbStack.sentenceModel = require('./models/Sentence');
dbStack.termModel = require('./models/Term');
dbStack.userModel = require('./models/User');

dbStack.ROLES = ['user', 'moderator', 'admin'];

module.exports = dbStack;
