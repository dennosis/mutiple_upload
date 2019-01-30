const mongoose = require('mongoose');

const fs = require('fs')
const path = require("path");
const { promisify } = require('util')

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

UserSchema.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`
    } 
})


UserSchema.pre('remove', function(){
    
    if (process.env.STORAGE_TYPE === "local"){
        return promisify(fs.unlink)(
            path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
        )
    }
})

module.exports = mongoose.model('Post', UserSchema)