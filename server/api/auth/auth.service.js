import config from '../../config/';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../../api/user/user.model';
var validateJwt = expressJwt({
    secret: config.mySecret
});


/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // console.log(req)
            // allow access_token to be passed through query parameter as well
            if(req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = `Bearer ${req.query.access_token}`;
            }
            // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
            if(req.query && typeof req.headers.authorization === 'undefined') {
                req.headers.authorization = `Bearer ${req.cookies.token}`;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            User.findById(req.user._id).exec()
                .then(user => {
                    if(!user) {
                        return res.status(401).end();
                    }
                    req.user = user;
                    next();
                    return null;
                })
                .catch(err => next(err));
        });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
    if(!roleRequired) {
        throw new Error('Required role needs to be set');
    }

    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if(config.userRoles.indexOf(req.user.role) === config.userRoles.indexOf(roleRequired)) {
                return next();
            } else {
                return res.status(403).send('Forbidden');
            }
        });
}



export function signToken(id, role) {
    return jwt.sign({ _id: id, role }, config.mySecret, {
        expiresIn: 60 * 60 * 5
    });
}
