const User = require('../models/user')
const bcrypt = require('bcrypt')
const getAllUser = async() => {
    try {
        const allUser = await User.find()
        return allUser
    } catch (Error) {
        return Error
    }
}

const hashPasswd = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
}
const createNewUser = async(body) => {
    const checkUser = await User.findOne({ email: body.email })
    if (checkUser) {
        return { error: "user already exists" }
    }
    const hashedPasswd = await hashPasswd(body.password)
    const newUser = new User({
        name: body.name,
        role: body.role,
        password: hashedPasswd,
        email: body.email
    })

    try {
        const insertUser = await newUser.save()
        return insertUser
    } catch (error) {
        return error
    }
}

const getUser = async(email) => {
    const user = await User.findOne({ email: email })
    return user
}

const findUser = async(userID) => {
    const findUser = await User.findById(userID)
    return findUser
}

const findTechnician = async(userID) => {
    const findUser = await User.findOne({
        _id: userID,
        role: 'technician'
    })
    return findUser
}

const updateUser = async(body, email) => {
    const updatedUser = await User.findOneAndUpdate({ 'email': email }, body, option = { new: true })
    if (!updatedUser) {
        return null
    }
    return updatedUser;
}

const deleteUser = async(email) => {
    const deleteUser = await User.findOneAndDelete({ 'email': email })
    return deleteUser
}

module.exports = {
    createNewUser,
    updateUser,
    getUser,
    getAllUser,
    deleteUser,
    findUser,
    findTechnician
}