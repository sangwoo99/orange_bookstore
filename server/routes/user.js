const express = require('express');
const router = express.Router();
const { User } = require('../models/User');


// 회원 가입
router.post('register', (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });

});


router.post('/login', (req, res) => {
    User.findOne( { email: req.body.email }, (err, user) => {
        if(!user) {
            return res.status(400).json({
                Success: false, message: '인증 실패 또는 email을 찾지 못했습니다.'
            });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.'});
            
        });
    })
})