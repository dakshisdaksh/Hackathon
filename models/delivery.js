const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const delSchema= new Schema({
    block: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    studentID: {
        type: String,
        required: true,
    },
    productID: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Del= mongoose.model('Del', delSchema);
module.exports= Del;