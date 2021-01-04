const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
//import validator from 'validator';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [true, 'A user must have username']
    },
    email : {
        type: String,
        required:  [true, 'A user with email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'A user with password'],
        minlength: 8,
        select: false

    },
    passwordConfirm : {
        type: String,
        required: [true,'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Password are not the same!'
        }
    },
    userimage: [String]
    
})

//fucntion for the hasing the password
userSchema.pre('save', async function(next) {
    //console.log('this is form the user model' , this)

    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    
    //delete passwordConfirm field
    this.passwordConfirm = undefined; 
    next();
})



userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User',userSchema)
module.exports = User