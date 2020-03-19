const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,     // 공백 제거
        unique: 1       // 중복 불가
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,   // 0 : User, 1 : Admin
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {         // token 유효기간
        type: Number
    }
});

const saltRounds = 10;
userSchema.pre("save", function( next ) {
    // Pre-processing

    // 비밀번호를 바꿀 때만 
    // 비밀번호를 암호화한다. 
    let user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                return next(err);
            } else {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                        return next(err);
                    } else {
                        user.password = hash;
                        next();
                    }
                });
            }
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, callback) {
    // plainPassword 1234567  
    // Encrypted Password $2b$10$dbgLhyJ7tK.sz7fCcP0aRebXzp8LS1IVaWJGciaRug1BCWQJ1Ty.i
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, isMatch);
        }
    });
};

userSchema.methods.generateToken = function(callback) {
    // 토큰 생성
    let user = this;
    const token = jwt.sign(user._id.toHexString(), "secretToken");
    user.token = token;
    user.save(function(err, user) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, user);
        }
    })
};

const User = mongoose.model("User", userSchema);

module.exports = { User };