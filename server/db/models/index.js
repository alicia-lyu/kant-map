const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbStack = {};

dbStack.mongoose = mongoose;

dbStack.listModel = require('./List');
dbStack.postModel = require('./Post');
dbStack.roleModel = require('./Role');
dbStack.sentenceModel = require('./Sentence');
dbStack.termModel = require('./Term');
dbStack.userModel = require('./User');

dbStack.ROLES = ['user', 'moderator', 'admin'];

module.exports = dbStack;
