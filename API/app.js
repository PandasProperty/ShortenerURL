var express             = require('express'),
    cors                = require('cors'),
    bodyParser          = require('body-parser'),
    cookieParser        = require('cookie-parser'),
    path                = require('path'),
    mongoose            = require('mongoose'),
    passport            = require('passport'),
    session             = require('express-session'),
    sessionStore        = require("sessionstore"),
    flash               = require('connect-flash'),
    app                 = express(),
    http                = require('http'),
    config              = require('./config/environment/index'),
    expressJwt = require('express-jwt');

var validateJwt = expressJwt({ secret: config.session.secret });

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

require('./config/passport')(passport);

app.use(cors({credentials: true, origin: 'http://localhost:8889'}));

app.use(session({
    secret: config.secret.session,
    saveUninitialized: false,
    resave: false,
    store: sessionStore.createSessionStore()
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

passport.authenticationMiddleware = function authenticationMiddleware () {
    return function (req, res, next) {
        validateJwt(req, res, next);
    };
};

app.use('/v1', require('./api/index'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500).json({error: err});
});

var server = http.createServer(app);

server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

module.exports = app;
