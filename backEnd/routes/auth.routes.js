const express = require('express');
const routers = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');
const photoController = require('../controllers/photo.controller'); // Adjust the path according to your project structure
const { ensureAuthenticated, ensureAdmin } = require('../middleware/adminCheck');
const authenticateToken = require('../middleware/auth');

// Auth Routes
routers.post('/signup', authController.register);
routers.post('/login', passport.authenticate('local'), authController.login);
routers.put('/updateProfile', authController.updateProfile);
routers.get('/users/:id', authenticateToken, authController.getUserById); // Ensure getUserById is a function
routers.post('/logout', authController.logout);
routers.get('/dashboard', authController.isLoggedIn , (req, res) => {
    res.json({ message: 'Welcome to the dashboard', user: req.user });
  });

// Product Routes
routers.get('/products', productController.getAllProducts);
routers.get('/product', productController.getProducts);
routers.get('/products/:id', productController.getProductById);
routers.post('/products', ensureAuthenticated, ensureAdmin, productController.addProduct);
routers.post('/card' , productController.card);
routers.put('/products/:id', ensureAuthenticated, ensureAdmin, productController.updateProduct);
routers.delete('/products/:id', ensureAuthenticated, ensureAdmin, productController.deleteProduct);

routers.get('/photos', photoController.getAllPhotos);
routers.post('/photos', photoController.uploadPhoto);


module.exports = routers;
