const jwt = require("jsonwebtoken");
require('dotenv').config()

function login (email, senha) {
    if (email === "123@gmail.com" && senha === "123") {
        const token = jwt.sign(
            {sub: 1, role: "admin"},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "1h"}
        )
        return { token };
    }else{ 
        return null;
    }
}

module.exports = { login };