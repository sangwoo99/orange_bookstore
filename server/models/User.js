const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    id: {
        type: String,
        unique: 1
    },
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
        trim: true
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    },
    cart: {
        type: Array,
        default: []
    }
});

// 각 API에서 save하면 먼저 동작하는 함수
userSchema.pre('save', function(next) { // next를 파라미터로 받아줘야함
    let user = this; // this를 가져오기 위해서 화살표 함수가 아닌 function함수(일반함수)로 써야함

    console.log('presave user:', user);
    if(user.isModified('password')) {
        // 비밀번호를 암호화함
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            console.log('genSalt');
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next(); // next() 안해주면 다음 함수로 안넘어감
    }
});

//bcrypt로 입력받은 비밀번호와 암호화된 비밀번호를 비교
userSchema.methods.comparePassword = (plainPassword, cb) => {
    bcrypt.compare(plainPassword, this.password, (isMatch, err) => {
        if(err) return cb(err);
        cb(isMatch, null);
    })
};

// 화살표 함수가 아니라 일반 함수 써야함
// methods: 해당 메서드를 호출한 객체가 메서드 내의 this가 됨
// statics: 호출한 객체에 상관없이 모델 자체가 this
userSchema.methods.generateToken = function(cb) {
    let user = this; // 호출한 객체
    console.log('user1', user);
    // 유저 아이디를 암호화해서 토큰을 생성
    let token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    // DB에 토큰 저장
    console.log('user2',user);
    user.save((user, err) => {
        if(err) return cb(err);
        cb(user, null);
    })
};

userSchema.statics.findByToken = function(token, cb) {
    let user = this; // 모델자체, 그래서 아래에서 바로 findOne()를 쓸 수 있음
    
    // 토큰을 복호화해서 다시 유저 아이디로 만들고 
    // DB에서 해당 유저 아이디와 토큰에 일치하는 유저 정보를 가져온다.
    // **JsonWebTokenError: jwt must be provided 는 인수 token이 undefined나 null 일때 나타남
    jwt.verify(token, 'secretToken', (err, decoded) => { // **콜백함수의 파라미터의 첫번째는 err여야 한다.
        console.log('decoded: ', decoded);
        user.findOne({'_id': decoded, 'token': token }, (user, err) => {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };