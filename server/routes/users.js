const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Book } = require('../models/Book');
const { auth }  = require('../middleware/auth');

// 회원 가입
router.post('/register', (req, res) => {
    console.log('/register', req.body);
    const user = new User(req.body);

    // userSchema에 설정해둔 save시 먼저 동작하는 함수에 의해 비밀번호가 먼저 암호화되고 저장됨
    user.save((err, doc) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });

});

// 로그인
router.post('/login', (req, res) => {
    User.findOne({ id: req.body.id }, (err, user) => {
        if(!user) {
            return res.status(400).json({
                Success: false, message: '인증 실패 또는 email을 찾지 못했습니다.'
            });
        }

        // 사용자가 입력한 비밀번호랑 DB에 저장된 암호화된 비밀번호를 bcrypt를 이용하여 비교
        user.comparePassword(req.body.password, (isMatch, err) => {
            console.log('comparePassword');
            // 비밀번호가 맞지 않을때
            if(!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.'});
            
            // 비밀번호가 맞을때 토큰 생성
            user.generateToken((user, err) => {
                console.log('generateToken err: ', err);
                if(err) return res.status(400).send(err);

                // 쿠키에 토큰 저장
                res.cookie('x_auth', user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user.id })
            })
        });
    })
});

router.get('/auth', auth, (req, res) => { // auth함수를 거쳐 인증이 되면 req에 token과 user정보가 담김
    console.log('/auth');
    res.status(200).json({
        _id: req.user._id,
        // isAdmin: req.user.role === 0 ? false: true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
    })
});

router.get('/logout', auth, (req, res) => {
    // 해당 유저를 찾아 유저의 토큰 정보를 지움 => 이후 API호출시 인증 단계에서 막히게 됨
    User.findOneAndUpdate({ _id: req.user._id }, { token: '', tokenExp: '' },
        (err, user) => {
            if(err) return res.json({ success: false, err});
            return res.status(200).send({
                success: true
            })
        }
    )

});

// auth를 이용하여 인증 후 req.user와 req.token정보를 얻어온다.
router.post('/addInCart', auth, (req, res) => {
    console.log('user._id: ', req.user._id);
    // 1. User Collection에서 해당 정보를 가져오기 
    // 이유 => 기존에 있는 카트 데이터에 새로 추가한 데이터를 붙여야 하므로 
    User.findOne({ _id: req.user._id}, (err, userInfo) => {  // 프로미스 .then()을 써서 cb함수를 넣는게 아니라 바로 findOne안에 콜백함수를 넣는다.
        // 첫번째 인수가 err이고 두번째 인수가 결과
        if(err) return res.status(400).join({ success: false, err})
        // 2. 유저정보에서 카트정보를 가져와서 카트에 넣으려는 상품이 이미 들어 있는지 확인
        let duplicate = false;

        // 배열메서드 => 배열 미존재, 빈 배열일 떄 undefined 에러 뜸 => 배열 미존재, 빈배열 방어 필요
        userInfo.cart && userInfo.cart.length > 0 && userInfo.cart.forEach((book) => {
            duplicate = book.id === req.body.book_id ? true : false;
        })

        if(duplicate) {
            // a. 상품이 이미 있을 때 => 해당 상품의 갯수만 업데이트
            User.findOneAndUpdate(
                { _id: req.user._id, 'cart.id': req.body.book_id },
                { $inc: { 'cart.$.count': 1 } }, // 값을 증가시킨다
                { new: true }, // 업데이트된 정보를 다시 받아옴
                (err, userInfo) => {
                    if(err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true, cart: userInfo.cart})
                }
            )
        } else {
            // b. 상품이 있지 않을 때 => 해당 상품을 추가
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: { // 해당값을 넣는다.
                        cart: {
                            id: req.body.book_id,
                            count: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true }, // 변화된 새로운 결과를 출력하니까 리덕스에 담아 이용하기 유용
                (err, userInfo) => {
                    if(err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true, cart: userInfo.cart})
                }
            )
        }
    });

})

router.get('/getCart', auth, (req, res) => {
    console.log('/showCart')

    // 차후에 $lookup 조인으로도 해보기
    User.findById(req.user._id , (err, userInfo) => {
        if(err) return res.status(400).json({ success: false, err })

        if(userInfo.cart && userInfo.cart.length > 0) {
            let book_id = userInfo.cart.map((cartItem) => {
                return cartItem.id
            });
    
            Book.find({ _id: { $in: book_id } }, (err, books) => { 
                // $in을 이용하면 배열을 넣어 각각 요소들에 해당하는 정보를 모두 가져옴(반복문 쓸 필요 X)
                if(err) return res.status(400).json({ sucess: false, err })
                return res.status(200).json({ success: true, cart: userInfo.cart, books })
            })
        } else {
            return res.status(400).json({ success: false })
        }
    })

})

// cart에서 상품 지우기 
module.exports = router;