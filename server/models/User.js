const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const res = require('express/lib/response');
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
});

userSchema.methods.comparePassword = (plainPassword, cb) => {
    bcrypt.compare(plainPassword, this.password, (isMatch, err) => {
        if(err) return cb(err);
        cb(isMatch, null);
    })
};

userSchema.methods,generateToken = (cb) => {
    let user = this;
    // 유저 아이디를 암호화해서 토큰을 생성
    let token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    // DB에 토큰 저장
    user.save((user, err) => {
        if(err) return cb(err);
        cb(user, null);
    })
};

userSchema.methods.findByToken = (token, cb) => {
    let user = this;
    
    // 토큰을 복호화해서 다시 유저 아이디로 만들고 
    // DB에서 해당 유저 아이디와 토큰에 일치하는 유저 정보를 가져온다.
    jwt.verify(token, 'secretToken', (decoded, err) => {
        user.findOne({'_id': decoded, 'token': token }, (user, err) => {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };