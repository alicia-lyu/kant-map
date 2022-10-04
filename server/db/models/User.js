const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
    
const Email = new Schema({
	
		address: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
		// Change the default to true if you don't need to validate a new user's email address
		validated: {type: Boolean, default: true}
	
	});

const UserSchema = new Schema({

		username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
		//Our password is hashed with bcrypt
		password: { type: String, required: true },
		email: {type: Email, required: true},	
	},{
		timestamps: true
	});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
 	   return next();
    }
    this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    next();
});

UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model("User", UserSchema);