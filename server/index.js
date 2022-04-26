const express = require('express');
const app = express();
const config = require('./config/key');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,
// {
//     usenewUrlParser: true, useUnifiedTopology: true,
//     useCreateIndex: true, useFindAndModify: false
// }
)
.then(() => console.log('MongDB Connected...'))
.catch(err => console.log(err));

//application/x-www-form
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/books', require('./routes/books'));

// 노드 서버에 있는 정적 이미지를 클라이언트에 보여질 수 있게 함
// [참고] https://expressjs.com/ko/starter/static-files.html
app.use('/uploads', express.static('uploads'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Server Listening on ${port}`)
});