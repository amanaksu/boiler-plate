// Hello-World
// From : http://expressjs.com/en/starter/hello-world.html

// Set Default Env Using ExpressJS  
const express = require('express');
const app = express();
const port = 5000;

// Get User Schema 
const { User } = require("./models/User");

// Get Body-Parser & Set Options
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));   // application/x-www-form-urlencoded 데이터를 가져올 수 있도록 설정
app.use(bodyParser.json());                         // application/json 데이터를 가져올 수 있도록 설정

const cookieParser = require("cookie-parser");
app.use(cookieParser());                           // cookie 데이터를 가져올 수 있도록 설정

// Set MongoDB 
const config = require("./config/key");
const mongoose = require("mongoose");
mongoose.connect(config.mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("Connected MongoDB!")).catch(err => console.log(err));

// Front-End : App 
app.get('/', (req, res) => {
    res.send('Hi!!')
});

// Route "회원가입"
app.post("/register", (req, res) => {
    // 회원 가입시 필요한 정보를 Client에서 가져오면
    // 정보를 DB에 넣어준다. 

    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) {                  // 저장 실패
            return res.json({
                success: false,
                err
            });
        } else {                    // 저장 성공
            return res.status(200).json({
                success: true
            });
        }
    });
});


// Route "로그인"
app.post("/login", (req, res) => {
    // 요청된 이메일을 DB 에서 찾는다. 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        } else {
            // (요청한 이메일이 DB 에 있을 때) 비밀번호가 일치하는지 확인한다. 
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({
                        loginSuccess: false, 
                        message: "비밀번호가 틀렸습니다."
                    });
                } else {
                    // (비밀번호가 일치하면) 사용자 토큰을 생성한다. 
                    user.generateToken((err, user) => {
                        if (err) {
                            return res.status(400).send(err);
                        } else {
                            // 토큰을 저장한다. 
                            // Where? Cookies, Local Storage, .....
                            res.cookie("x_auth", user.token).status(200).json({
                                loginSuccess: true,
                                userId: user._id
                            });                            
                        }
                    });
                }
            });
        }
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));