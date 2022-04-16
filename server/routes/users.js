const express = require('express');
const { append } = require('express/lib/response');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models/User');

// 회원 가입
router.post('/register', (req, res) => {

    const user = new User(req.body);

    // userSchema에 설정해둔 save시 먼저 동작하는 함수에 의해 비밀번호가 먼저 암호화되고 저장됨
    user.save((err, doc) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });

});

// 로그인
router.post('/login', (req, res) => {
    User.findOne( { email: req.body.email }, (err, user) => {
        if(!user) {
            return res.status(400).json({
                Success: false, message: '인증 실패 또는 email을 찾지 못했습니다.'
            });
        }

        // 사용자가 입력한 비밀번호랑 DB에 저장된 암호화된 비밀번호를 bcrypt를 이용하여 비교
        user.comparePassword(req.body.password, (isMatch, err) => {
            // 비밀번호가 맞지 않을때
            if(!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.'});
            
            // 비밀번호가 맞을때 토큰 생성
            user.generateToken((user, err) => {
                if(err) return res.status(400).send(err);

                // 쿠키에 토큰 저장
                res.cookie('x_auth', user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        });
    })
})

router.get('/auth', (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.userole === 0 ? false: true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
    })
})


router.get('/logout', (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, { token: '' },
        (err, user) => {
            if(err) return res.json({ success: false, err});
            return res.status(200).send({
                success: true
            })
        }
    )

})

module.exports = router;