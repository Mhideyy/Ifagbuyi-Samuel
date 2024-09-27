const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const {user_token} = req.cookies;
    if(!user_token){
        return res.json({ message: "you are not logged in"});

    };
    jwt.verify(user_token, process.env.JWT_SECRETE, (error, info) => {
        if(error){
            return res.json({ message: error.message});
        };
        req.user = info;
    });
    next();
};

module.exports = verify;