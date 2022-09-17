const mongoose = require('mongoose');
const {Schema} = mongoose;

const jobSchema = new Schema({

    title:{
        type:String,
        required: true,
    }
})