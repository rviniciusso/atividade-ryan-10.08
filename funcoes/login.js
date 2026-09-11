const jwt = require("jsonwebtoken");

const login = (email, senha) => {
    if (email === "123@gmail.com" && senha === "123") {
        const token = jwt.sign({email}, process.env.JWT-SECRET-KEY, {expiresIn: "1h"})
        return { token };
    }else{ 
        return null;
    }
}