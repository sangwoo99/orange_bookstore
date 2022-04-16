const { User }= require('../models/User'); 

let auth = (req, res, next) => {
    // 쿠키에 저장된 유저 인증 정보 가져옴
    let token = req.cookies.x_auth; 

    // 인증
    // 토큰을 복호화 후 다시 만들어진 유저 아이디로 해당 유저 정보를 찾는다.
    User.findByToken(token, (user, err) => {
        if(err) throw err;
        // 해당 유저를 찾지 못함 => 인증 실패
        if(!user) return res.json({ isAuth: false, error: true })

        // 인증 성공
        req.token = token;
        req.user = user;
        next();
    });

}

module.exports = { auth };