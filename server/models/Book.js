const mongoose = require('mongoose');
const { Schema } = require('mongoose'); // 잊지말자
// import mongoose from 'mongoose'; // ES6를 해석해주는 babel이 없으면 쓸 수 없음

const bookSchema = mongoose.Schema({
    title: { //책 제먹
        type: String,
        maxlength: 50
    },
    description:{ // 책 내용 요약
        type: String
    },
    writer: { // 저자
        type: String
    },
    publisher: { // 출판사
        type: String
    },
    price: { // 가격
        type: Number,
        default: 0
    },
    bookIndex: { // 책 목차
        type: String
    },
    stock: { // 재고
        type: Number,
        default: 0
    },
    soldCount: { // 판매량
        type: Number,
        default: 0
    },
    buyer: { // 구매자 정보
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    images: {
        type: Array,
        default: []
    },
    filePath: {
        type: String
    },
    category: { // 책 카테고리
        type: String
    },
    used: { // 중고 책 여부
        type: Boolean
    },
    averageScore: { // 평점
        type: Number
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };