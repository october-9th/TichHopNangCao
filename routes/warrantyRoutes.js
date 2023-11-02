const express = require('express');

// import service handling data
const WarrantyService = require('../services/warrantyServices')
const { customerAuthenticate, warrantyAuthenticate } = require('../middleware/auth')

const router = express.Router()


// route for warranty
router.get('/api/warranty', warrantyAuthenticate, async(req, res) => {
    const allWarranty = await WarrantyService.getAllWarranty()
    if (!allWarranty) {
        res.status(404).json({ error: 'cant get all warranty' })
        return
    }
    res.status(200).json({ allWarranty: allWarranty })
})
router.get('/api/warranty/:warrantyID', customerAuthenticate, async(req, res) => {
    const { params: { warrantyID } } = req
    const warranty = await WarrantyService.findWarranty(warrantyID)
    if (!warranty) {
        res.status(404).json({ error: 'warranty not found' })
        return
    }
    res.status(200).json({ warranty: warranty })
})
router.post('/api/warranty', warrantyAuthenticate, async(req, res) => {
    const { body } = req
    const newWarranty = await WarrantyService.createNewWarranty(body)
    if (!newWarranty) {
        res.status(404).json(newWarranty)
        return
    }
    res.status(200).json({ newWarranty: newWarranty })
})

router.put('/api/warranty/:warrantyID', warrantyAuthenticate, async(req, res) => {
    const { body, params: { warrantyID } } = req
    const updatedWarranty = WarrantyService.updateWarranty(body, warrantyID)
    if (!updatedWarranty) {
        res.status(404).json({ error: 'warranty not found' })
        return
    }
    res.status(200).json({ updatedWarranty: updatedWarranty })
})

router.delete('/api/warranty/:warrantyID', warrantyAuthenticate, async(req, res) => {
    const { params: { warrantyID } } = req
    const deletedWarranty = WarrantyService.deleteWarranty(warrantyID)
    if (!deletedWarranty) {
        res.status(404).json({ error: 'warranty not found' })
        return
    }
    res.status(200).json({ deletedWarranty: deletedWarranty })
})

module.exports = router