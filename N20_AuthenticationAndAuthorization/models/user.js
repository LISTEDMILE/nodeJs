
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
    },
    userName: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    userType: {
        type: String,
        required: [true, 'User Type is required'],
        enum: ['host', 'guest'],
        default: 'guest'
    },


});





module.exports = mongoose.model('User', userSchema);








