const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { themeController, postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', themeController.getThemes);
router.get('/strollersLength', themeController.getStrollersLength) 
router.post('/', auth(), themeController.createTheme);
router.put('/:strollerId/edit' , auth(), themeController.editStroller);
router.delete('/:strollerId/delete' , auth() , themeController.deleteStroller);
router.put('/:strollerId/like' , auth() , themeController.likeStroller);
router.put('/:strollerId/unlike' , auth() , themeController.unlikeStroller);
router.get('/search' , themeController.strollersBySearch);
router.get('/searchLength' , themeController.strollersBySearchLength);
router.get('/userStrollers/:userId' , auth() , themeController.getUserStrollers);
router.get('/userStrollersLength/:userId' , auth() , themeController.getUserStrollersLength);

router.get('/:themeId', themeController.getTheme);
router.post('/:strollerId/createPost', auth(), postController.createPost);
router.put('/:themeId', auth(), themeController.subscribe);
router.put('/:themeId/posts/:postId', auth(), postController.editPost);
router.delete('/:themeId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router