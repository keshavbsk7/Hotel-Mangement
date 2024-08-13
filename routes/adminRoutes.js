const express = require('express');
const router = express.Router();
const { adminSignup } = require('../controllers/adminCtrl');
const { adminLogin } = require('../controllers/adminCtrl');


router.get('/signup',adminSignup );
router.post('/login',adminLogin);

module.exports = router;
