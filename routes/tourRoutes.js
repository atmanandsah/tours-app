const express = require('express')
const router = express.Router();

const tourcontroller = require('./../controllers/tourController');


//router.param('id', tourcontroller.checkId)
router
    .route('/top-5-cheap').get(tourcontroller.aliasTopTours, tourcontroller.getAllTours);

router
    .route('/')
    .get(tourcontroller.getAllTours)
    .post( tourcontroller.createTour);

router
    .route('/:id')
    .get(tourcontroller.getTour)
    .patch(tourcontroller.updateTour)
    .delete(tourcontroller.deleteTour);

module.exports = router;