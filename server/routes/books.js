const express = require('express');
const router = express.Router();
const { Book } = require('../models/Book');

// node.js 로그
// [참고] https://yceffort.kr/2021/02/logging-in-nodejs
// winston을 주로 씀 => DB에도 로그 저장가능

// 중고 도서 등록 또는 어드민 계정으로 책 등록
router.post('/register', (req, res) => {
    const book = new Book(req.body);

    book.save((err, doc) => {
        if(err) return res.status(400).json({ success: false, err});
        return res.status(200).json({ success: true });
    });
});

// 책 목록 조회(전체, 국내도서, 외국도서, 중고도서, 문구?)
router.get('/list', (req, res) => {
    book.find({}, (err, books) => {
        if(err) return res.status(400).json({ success: false, err});
        return res.status(200).json({ success: true, books });
    });
});

// router.get('/list/:category', (req, res) => {
//     book.find({}, (err, books) => {
//         if(err) return res.status(400).json({ success: false, err});
//         return res.status(200).json({ success: true, books });
//     });
// });

// 책 검색
router.get('/search/:target', (req, res) => {

});

// 책 상세 조회
router.get('/detail/:id', (req, res) => {
    book.findOne({ _id: req.params.id }, (err, book) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ sucess: true, book });
    });
});

module.exports = router;
// ** exports를 안하면 아래 오류가 난다.
// Router.use() requires a middleware function but got a Object
// https://codingmania.tistory.com/549