const mongoose = require('mongoose');
const connectMongoose = require('../conn');
const Role = require('../models/Role')

const roles = ['user', 'moderator', 'admin'];

const handleError = (error) => {
    console.log(error)
}

const seedRoles = async () => {
    for (let role of roles) {
        let roleDocument = new Role({
            name: role
        });
        await roleDocument.save().catch(handleError);
    }
}

const logInfo = async () => {
    const roleDocuments = await Role.find({});
    for (let roleDocument of roleDocuments) {
        console.log(roleDocument)
    }
}

const main = async () => {
    console.log('Seeding started...')
    await connectMongoose();
    await Role.deleteMany({});
    await seedRoles();
    await logInfo();
}

main().then(() => {
    mongoose.disconnect();
});
