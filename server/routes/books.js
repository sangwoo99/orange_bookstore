const express = require('express');
const router = express.Router();
const { Book } = require('../models/Book');
const multer = require('multer');

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
    Book.find({}, (err, books) => {
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
    Book.findOne({ _id: req.params.id }, (err, book) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ sucess: true, book });
    });
});

const storage = multer.diskStorage({
    // 사진파일이 저장되는 파일 경로
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    // 저장할때 파일 이름
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }

    //최종적으로 uploads/현재날짜시간_파일이름이 들어가게됨
});

const upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
    // 이미지를 uploads 폴더에 저장
    upload(req, res, err => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});


module.exports = router;
// ** exports를 안하면 아래 오류가 난다.
// Router.use() requires a middleware function but got a Object
// https://codingmania.tistory.com/549