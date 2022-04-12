const mongoose = require('mongoose');

const userSchema = mongooes.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    password: {
        type: String,
        minlength: 5
    },
    email: {
        type: String,
        unique: 1,
        trim: true
    },
    token: {
        type: String
    },
    token: {
        type: Number
    }
});