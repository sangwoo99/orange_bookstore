const express = require('express');
const app = express();
const config = require('./config/key');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const connect = mongoose.connect(config.mongoURI,
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

app.use('api/users', require('./routes/users'));


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