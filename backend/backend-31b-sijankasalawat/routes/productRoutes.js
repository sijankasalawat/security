const router = require('express').Router();
const { Router } = require('express');
const productController = require('../controller/productController')
const authGuard = require('../middleware/auth')

router.post('/createProduct',authGuard,productController.createProduct);
router.get('/getProduct',productController.getProduct);
router.get('/search/:text', productController.searchProduct);
router.get('/getProductByUserId/:userId',authGuard,productController.getProductsByUserId);
router.delete('/deleteProduct/:id',authGuard,productController.deleteProduct);
router.get('/getProductDetailById/:id',productController.getProductDetailById);
router.get('/getProductByCategory/:category',productController.getProductByCategory);
router.put('/updateProduct/:id',authGuard,productController.updateProduct);
module.exports=router;