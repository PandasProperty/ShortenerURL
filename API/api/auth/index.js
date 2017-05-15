var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    jwt         = require('jsonwebtoken'),
    config      = require('./../../config/environment/index');

router.post('/', function(req, res, next) {
    passport.authenticate('local-strategy', function(error, user) {
        if(error) {
            return res.status(401).json(error);
        }

        req.login(user, function(error) {
            if (error) {
                return next(error);
            }
            var token = jwt.sign(user, config.session.secret);
            res.json({
                token: token
            });
        });
    })(req, res, next);
});

module.exports = router;
