const express = require('express');
const app = express();

const mongoose = require('mongoose');
const connect = mongoose.connect(onfig.mongoURI,
    {
        usenewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongDB Connected...'))
    .catch(err => console.log(err));

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