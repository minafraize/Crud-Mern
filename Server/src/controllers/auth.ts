import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';

import User from '../models/user';
import { errorHandler } from '../utils/error';
import { SignupRequestBody, LoginRequestBody } from '../types/common';

// ----------------------------------------------------------------------

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as SignupRequestBody;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: any = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        };
        const findUser = await User.findOne({ email: body.email });
        if (findUser) {
            return errorHandler('E-Mail address already exists!', 401)
        }
        const email = body.email;
        const name = body.name;
        const password = body.password;

        const hashedPw = await hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPw,
            name: name
        });

        const savedUser = await user.save();
        res.status(201).json({ message: 'User created!', userId: savedUser._id });

    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as LoginRequestBody;
        const email = body.email;
        const password = body.password;
        let loadedUser;

        const user = await User.findOne({ email: email });
        if (!user) {
            return errorHandler('A user with this email could not be found.', 401);
        }
        loadedUser = user;

        const isEqual = await compare(password, user.password);
        if (!isEqual) {
            return errorHandler('Wrong password!', 401);
        };
        const token = jwt.sign(
            {
                email: loadedUser?.email,
                userId: loadedUser?._id.toString()
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedUser?._id.toString() });

    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};