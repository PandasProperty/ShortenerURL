var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    jwt         = require('jsonwebtoken'),
    passport    = require('passport'),
    config          = require('./../config/environment/index'),
    linksController = require('./links/index'),
expressJwt = require('express-jwt');

var validateJwt = expressJwt({ secret: config.session.secret });
router.get('/', function(req, res, next) {
    res.status(200).json({ status: 'Server is up and running.'});
});

router.post('/links', function () {
    return function (req, res, next) {
        validateJwt(req, res, function () {
            return function () {
                next();
            }
        }());
    };
}(), linksController.postLinks);

router.get('/links', passport.authenticationMiddleware(), linksController.getLinks);

router.get('/:shortenUrl', linksController.getLink);

router.post('/auth', function(req, res, next) {
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

router.put('/links/:shortenUrl', passport.authenticationMiddleware(), linksController.updateLink);
router.delete('/links/:shortenUrl', passport.authenticationMiddleware(), linksController.deleteLink);

module.exports = router;
