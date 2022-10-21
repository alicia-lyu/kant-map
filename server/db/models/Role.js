const mongoose = require("mongoose");

const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: { type: String, enum: ["user", "admin", "moderator"] }
    })
);

module.exports = Role;