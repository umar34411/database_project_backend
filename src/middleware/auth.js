
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');



const auth = (req, res, next) => {


    let token = req.headers['authorization'];
    console.log(token)

    if (!token) {
        res.send('unauthorized')
    } else {

        jwt.verify(token, keys.secret, (error, payload) => {
            if (error) {
                res.send("unauthorized");
            } else {
                req.body.email= payload;
                next()
            }
        })



    }
}

module.exports = auth;