const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    size:{
        type: Number,
    },    
    key:{
        type: String,
    },
    url:{
        type: String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        select:false,
    },

});




module.exports = mongoose.model('Post', UserSchema)