import config from '../../config/';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
// import compose from 'composable-middleware';
// import User from '../api/user/user.model';

// var validateJwt = expressJwt({
//     secret: config.secrets.session
// });




export function signToken(id, role) {
    return jwt.sign({ _id: id, role }, config.mySecret, {
        expiresIn: 60 * 60 * 5
    });
}
