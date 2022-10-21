const dbStack = require("../db");
const Role = dbStack.roleModel;
const User = dbStack.userModel;

const isAdmin = async (userId) => {
    try {
        const userDocument = await User.findById(userId);
        const roleDocuments = await Role.find({
            _id: {$in: userDocument.roles}
        });
    } catch (error) {
        return false
    }
    for (let roleDocument of roleDocuments) {
        if (roleDocument.name === "admin") {
            return true
        }
    }
    return false
}

module.exports = isAdmin;