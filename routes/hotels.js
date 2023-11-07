const express = require('express')

const router = express.Router()

const createError = require('../utils/error.js')

const hotelController = require('../controllers/hotel.js')

const verifyFunctions = require("../utils/verifyToken.js")

//CREATE
router.post('/', verifyFunctions.verifyAdmin, hotelController.createHotel)

//UPDATE
router.put('/:id', verifyFunctions.verifyAdmin, hotelController.updateHotel)

//DELETE
router.delete('/:id', verifyFunctions.verifyAdmin, hotelController.deleteHotel)

//GET
router.get('/find/:id', hotelController.getHotel)

//GET ALL
router.get('/', hotelController.getHotels)
router.get('/countByCity', hotelController.countByCity)
router.get('/countByType', hotelController.countByType)


module.exports = router