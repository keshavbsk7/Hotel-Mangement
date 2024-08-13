const express = require('express')
const { loginController, registerController, searchController, getUserById} = require('../controllers/userCtrl')
const { analyticalQueryController } = require('../controllers/userCtrl');
const { yearwiseCitywiseRevenueController } = require('../controllers/userCtrl');
const { getTopCustomersByBranch } = require('../controllers/userCtrl');
const { getTopHotelsByYear } = require('../controllers/userCtrl');

const router = express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
router.post('/search',searchController)
router.post('/userId',getUserById);
router.get('/analytical-query', analyticalQueryController);
router.get('/yearwise-citywise-revenue', yearwiseCitywiseRevenueController);
router.get('/top-customers-by-branch', getTopCustomersByBranch);
router.get('/top-hotels', getTopHotelsByYear);

module.exports = router