const express = require('express');
const router = express.Router();


// Auth 
const AuthController = require('../Controllers/AuthController');
const validateAuth = require('../Middleware/validateAuth');

router.post('/register', validateAuth.validateRegister, AuthController.register);
router.post('/login', validateAuth.validateLogin, AuthController.login);

// ------ CMS ----------- //

// User Module
const UserController = require('../Controllers/UserController');
router.get('/users', UserController.getUsers);
router.post('/users', UserController.createUser);

module.exports = router;