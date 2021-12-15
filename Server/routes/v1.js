const express = require('express')
const router = express();
const userController = require('../controller/user-controller')
const { body } = require('express-validator');

router.post('/register',

[
    body('UserData.username', 'Username should be more than 5 letters').isLength({min: 5}),
    body('UserData.email', 'Please enter a valid email').not().isEmpty(),
    body('UserData.password', 'Password should be at least 8 letters or numbers').isLength({min: 8}),
    body('UserData.username', 'please enter a valid username').not().isEmpty(),
    body('UserData.password', 'please enter a valid password').not().isEmpty(),

],

userController.Register);

router.post('/login', userController.Login)

router.post('/publisharticle', 

    [
        body('ArticleInfo.title', 'Please enter a valid article title').not().isEmpty(),
        body('ArticleInfo.articleText', 'Please fill the article text').not().isEmpty(),
    ]

,userController.PublishArticle)

router.get('/getallarticles', userController.GetAllArticles)

router.get('/getmyarticles/:author', userController.GetMyArticles)

router.get('/getarticle/:articlename', userController.GetArticle)

module.exports = router;