require('dotenv').config({ path: '../.env' })
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const UserService = require('../services/userServices')
const bcrypt = require('bcrypt');

const jwt_secret = process.env.JWT_SECRET

exports.register = async(req, res, next) => {
    const { body } = req

    const user = UserService.createNewUser(body)
    if (user) {
        const maxAge = 30 * 60 * 3
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role },
            jwt_secret, {
                expiresIn: maxAge
            }
        )
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })

        res.status(201).json({
            message: "User successfully created",
            user: user._id,
        })
    } else {
        res.status(400).json({
            message: "User not successful created",
            error: error.message,
        })
    }
}

exports.login = async(req, res, next) => {
    const { email, password } = req.body
        // Check if username and password is provided
    if (!email || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(401).json({
                    message: "Login not successful",
                    error: "invalid password",
                })
            } else {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign({ id: user._id, email: user.email, role: user.role },
                    jwt_secret, {
                        expiresIn: maxAge, // 3hrs in sec
                    }
                );
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000, // 3hrs in ms
                });
                res.status(201).json({
                    message: "User successfully Logged in",
                    user: user._id,
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

exports.adminAuthenticate = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwt_secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "admin") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

exports.customerAuthenticate = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwt_secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "customer") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

exports.warrantyAuthenticate = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwt_secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "technician" || decodedToken.role !== "accountant") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

exports.accountantAuthenticate = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwt_secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "accountant") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}