const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const AdsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload')

router.get('/adofs', AdsController.getAll);

router.get('/adofs/:id', AdsController.getOne);

router.post('/adofs', authMiddleware, imageUpload.single('picture'), AdsController.postOne);

router.delete('/adofs/:id', authMiddleware, AdsController.deleteOne);

router.put('/adofs/:id', authMiddleware, imageUpload.single('picture'), AdsController.putOne);

router.get('/adofs/search/:searchPhrase', AdsController.searchAll);

module.exports = router;
