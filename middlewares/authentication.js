const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const authException = require('../exceptions/errorMiddleware');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        throw new authException('Login', 'failedAuthenticate', 400);
    }

    if (token) {
        jwt.verify(token, config.SECRET, (err, DecToken) => {
            if (err) {
                throw new authException('Login', 'failedAuthenticate', 400);
            }
            req.user = DecToken.user;
            req.email = DecToken.email;
        });
    }
    next();
};
