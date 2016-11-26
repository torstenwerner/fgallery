function Auth() {
    var _auth = this;
    var users = require('./users');
    var fs = require('fs');
    var jwt = require('jsonwebtoken');
    var configuration = require('./config');
    var crypto = require('crypto');

    _auth.performAuthentication = function (username, password) {
        if (!username || !password)
            throw new Error('Username or password not provided');
        
        var users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        var hashedPassword = crypto.createHash('sha256').update(password, 'utf8').digest('hex');
        
        users = users.filter(function(user) {
            return user.username == username && user.password == hashedPassword;
        });

        if (users.length == 0) {
            throw new Error('Wrong username or password');
        }

        return jwt.sign({
            user: users[0]
        }, configuration.authentication.secretKey, {
            expiresIn: configuration.authentication.expiresIn
        });
    }

    return {
        authenticate: function (req, res) {
            var response;
            try {
                var token = _auth.performAuthentication(req.body.username, req.body.password);
                response = {
                    success: true,
                    token: token
                };
            } catch (e) {
                response = {
                    success: false,
                    message: e.message
                }
            }

            res.json(response);
        },

        checkAuthentication: function (req, res, next) {
            var token = req.body.token || req.query.token || req.headers['authorization'];

            if (token) {

                jwt.verify(token, configuration.authentication.secretKey, function (err, decoded) {
                    if (err) {
                        return res.json(401, {
                            success: false
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });

            } else {
                return res.status(401).send({
                    success: false
                });

            }
        }
    }
}

module.exports = Auth;