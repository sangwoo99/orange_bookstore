import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    description:{
        type: String
    },
    writer: {
        type: String
    },
    publisher: { // 출판사
        type: String
    },
    price: {
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
    thumbnail: {
        type: String
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    }
}, { timestamps: true });

const Book = mongoose.model('Book', productSchema);

module.exports = { Product };