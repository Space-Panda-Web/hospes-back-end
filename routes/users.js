const express = require("express");

const router = express.Router()

const userController = require('../controllers/user.js')

const verifyFunctions = require("../utils/verifyToken.js")

//Verifica se o usuário está autenticado
// router.get('/checkauthentication', verifyFunctions.verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in")
// })

// router.get('/checkuser/:id', verifyFunctions.verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in and you can delete you account")
// })

// router.get('/checkadmin/:id', verifyFunctions.verifyUser, (req, res, next) => {
//     res.send("Hello admin, you are logged in and you can delete all account")
// })

//CREATE
router.post('/', userController.createUser)

//UPDATE
router.put('/:id', verifyFunctions.verifyUser, userController.updateUser)

//DELETE
router.delete('/:id', verifyFunctions.verifyUser, userController.deleteUser)

//GET
router.get('/:id', verifyFunctions.verifyUser, userController.getUser)

//GET ALL
router.get('/', verifyFunctions.verifyAdmin, userController.getUsers)


module.exports = router

