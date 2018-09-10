'use strict';

import express from 'express';
import passport from 'passport';
import { signToken } from '../auth.service';
import User from '../../user/user.model';
// import request from 'request';

var router = express.Router();

router.post('/', function (req, res, next) {
    console.log('login running...')
    passport.authenticate('local', function (err, user, info) {
        console.log(err)
        console.log(user)
        console.log(info)
        var error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({ message: 'Something went wrong, please try again.' });
        }

        var token = signToken(user._id, user.role);
        let userId = user._id;
        if (user) {
            return res.status(200).json({ token, userId })
        }
        // if (role == 'company') {
        //     User.findOne({ _id: userId, role: role }).then((company) => {
        //         console.log(company)
        //         var apikey = company.apikey
        //         const url = `https://desktime.com/api/v2/json/company?apiKey=${apikey}`
        //         request({ url, method: 'GET', json: true }, (err, response, body) => {
        //             if (err) return res.status(403).json(err); // URL invalid
        //             if (body.error) return res.status(403).json({ 'message': 'Apikey not valid.' });
        //             else {
        //                 let imageUrl = company.imageUrl;
        //                 if (imageUrl !== null) {
        //                     return res.status(200).json({ imageUrl, body, token, role, userId })
        //                 } else {
        //                     return res.status(200).json({ body, token, role, userId })
        //                 }
        //             }
        //         });
        //     })
        // }
        // else {
        //     let userId = user._id
        //     let role = user.role
        //     let name = user.name
        //     let imageUrl = user.imageUrl;
        //     if (imageUrl !== null) {
        //         res.status(200).json({ imageUrl, token, role, userId, name });
        //     } else {
        //         res.status(200).json({ token, role, userId, name });
        //     }
        // }
    })(req, res, next);
});
export default router;
