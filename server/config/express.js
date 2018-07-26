import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';



export default function(app) {
    var env = app.get('env');

    if(env === 'development' || env === 'test') {
        app.use(express.static(path.join(config.root, '.tmp')));
    }

    if(env === 'production') {
        app.use(favicon(path.join(config.root, 'apidoc/img', 'favicon.ico')));
    }

    // app.set('appPath', path.join(config.root, 'apidoc'));
    // app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));

    // app.set('views', `${config.root}/server/views`);
    // app.engine('html', require('ejs').renderFile);
    // app.set('view engine', 'html');
    // app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // app.use(methodOverride());
    // app.use(cookieParser());
    app.use(passport.initialize());


    // Persist sessions with MongoStore / sequelizeStore
    // We need to enable sessions for passport-twitter because it's an
    // oauth 1.0 strategy, and Lusca depends on sessions
    app.use(session({
        secret: config.secrets.session,
        saveUninitialized: true,
        resave: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            db: 'test'
        })
    }));

    /**
     * Lusca - express server security
     * https://github.com/krakenjs/lusca
     */
    // if(env !== 'test' && env !== 'development' && !process.env.SAUCE_USERNAME) { // eslint-disable-line no-process-env
        // app.use(lusca({
        //     csrf: true,
        //     xframe: 'SAMEORIGIN',
        //     hsts: {
        //         maxAge: 31536000, //1 year, in seconds
        //         includeSubDomains: true,
        //         preload: true
        //     },
        //     xssProtection: true
        // }));
    // }

    // if(env === 'development' || env === 'test') {
    //     app.use(errorHandler()); // Error handler - has to be last
    // }

    // Cross Domain Method
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Cache-Control, Authorization');
        if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
        } else {
        return next();
        }
    });
}
