const mongoose = require('mongoose');
const shortId = require('shortid');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
    fullURL:{
        type:String,
        required:[true,'fullURL is required']
    },

    shortURL:{
        type:String,
        default:shortId.generate
    },

    totalClicks:{
        type:Number,
        default:0
    }
});

const Model = mongoose.model('url',URLSchema);

module.exports = Model;