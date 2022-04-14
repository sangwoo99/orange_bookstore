const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
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

// 각 API에서 save하면 먼저 동작하는 함수
userSchema.pre('save', () => {
    let user = this;

    if(user.isModified('password')) {
        // 비밀번호를 암호화함
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
})

userSchema.methods.comparePassword = (plainPassword, callback) => {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };