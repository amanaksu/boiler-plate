const { User } = require("../models/User");          


let auth = (req, res, next) => {
    // 인증처리 부분

    // 클라이언트 쿠키에서 토큰을 가져온다. 
    let token = req.cookies.x_auth;
    
    // 토큰을 복호화 한 후 사용자를 찾는다. 
    User.findByToken(token, (err, user) => {
        if (err) {
            throw err;
        }

        if (!user) {
            // (사용자가 없으면) 인증 X
            return res.json({
                isAuth: false,
                error: true
            });
        } else {
            // (사용자가 있으면) 인증 O
            req.token = token;
            req.user = user;
            next();
        }        
    });
}

module.exports = { auth };