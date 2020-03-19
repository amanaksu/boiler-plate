const mongoose = require("mongoose");
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

const User = mongoose.model("User", userSchema);

module.exports = { User };