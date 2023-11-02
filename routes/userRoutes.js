const express = require('express');

// import service handling data
const UserService = require('../services/userServices')
const { adminAuthenticate } = require('../middleware/auth')

const router = express.Router()

// route for user
router.get('/api/user', adminAuthenticate, async(req, res) => {
    const allUser = await UserService.getAllUser()
    if (allUser instanceof Error) {
        res.status(404).json({ message: allUser.error })
        return;
    }
    res.status(200).json({ allUser: allUser })
})

router.get('/api/user/:email', adminAuthenticate, async(req, res) => {
    const { params: { email } } = req
    const user = await UserService.getUser(email)
    if (!user) {
        res.status(404).json({ error: "user not found" })
        return
    }
    res.status(200).json({ user: user })
})


router.put('/api/user/:email', adminAuthenticate, async(req, res) => {
    const { body, params: { email } } = req
    const user = await UserService.updateUser(body, email)
    if (!user) {
        res.status(404).json({ error: "user not found" })
        return
    }
    res.status(200).json({ user: user })
})

router.delete('/api/user/:email', adminAuthenticate, async(req, res) => {
    const { params: { email } } = req
    const deletedUser = await UserService.deleteUser(email)
    if (!deletedUser) {
        res.status(404).json({ error: "can't delete user" })
        return
    }
    res.status(200).json({ message: "delete user success", deletedUser: deletedUser })
})

module.exports = router