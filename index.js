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

// Set MongoDB 
const password = "1234qwer";
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://Kei:${password}@boiler-plate-sdh1y.mongodb.net/test?retryWrites=true&w=majority`, {
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


app.listen(port, () => console.log(`Example app listening on port ${port}!`));