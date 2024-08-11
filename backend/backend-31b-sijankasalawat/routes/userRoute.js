const router = require('express').Router();
const userController = require('../controller/userController');
const authGuard = require('../middleware/auth');

router.post('/create',userController.createUser);
router.post('/login', userController.loginUser);
router.route("/forgot/password").post(userController.forgotPassword);
router.route("/password/reset/:token").put(userController.resetPassword);
router.route('/getUsers/:id?').get(authGuard,userController.getUsers);
router.route('/updateUser/:id?').patch(authGuard,userController.updateUserProfile);
module.exports=router;