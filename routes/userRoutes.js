const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

//router.param('id',userController.checkId);

router.post('/Signup', authController.SignUp)
router.post('/login', authController.login)

router.route('/')
    .get(authController.protect,userController.getAllUsers)
    .post(userController.createUser);
router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;