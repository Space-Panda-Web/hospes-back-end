const express = require("express");

const router = express.Router()

// router.get("/rooms", (req, res) => {
//     res.send("Hello, this is rooms endpoint ")
// })

const roomController = require('../controllers/room.js')

const verifyFunctions = require("../utils/verifyToken.js")

//CREATE
router.post('/:hotelid', verifyFunctions.verifyAdmin, roomController.createRoom)

//UPDATE
router.put('/:id', verifyFunctions.verifyAdmin, roomController.updateRoom)

//DELETE
router.delete('/:id/:hotelid', verifyFunctions.verifyAdmin, roomController.deleteRoom)

//GET
router.get('/:id', roomController.getRoom)

//GET ALL
router.get('/', roomController.getRooms)

module.exports = router

