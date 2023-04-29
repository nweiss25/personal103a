
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var promptItemSchema = Schema( {
    prompt: String,
    response: String,
    createdAt: Date,
    userId: {type:ObjectId, ref:'user' }
})
module.exports = mongoose.model('promptIdemNW25',promptItemSchema);