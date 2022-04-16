const { User }= require('User'); 

let auth = (req, res, next) => {
    // 쿠키에 저장된 유저 인증 정보 가져옴
    let token = req.cookies.x_auth; 

    // 토큰을 복호화 후 해당 유저 정보를 찾는다.
    User.findByToken(token, (user, err) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    });

}

module.exports = { auth };