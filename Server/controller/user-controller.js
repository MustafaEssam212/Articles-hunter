const User = require ('../model/user-model');
const userController = {};
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Articles = require('../model/article-model')
const moment = require('moment')


userController.Register = (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const ArrError = errors.array();
       return  res.send(ArrError) 

   }


    const userData = req.body.UserData;
    
    const newUser = new User ({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        
    })

    if(userData.confirmpassword !== userData.password){
        return res.send({
            msg: `Password does not match`
        })
    }else{
        User.findOne({email: userData.email}, (err, result)=>{
            if(result){
               return res.send({
                   msg: `This Email ${userData.email} already in use`
               })
            }else{
                User.findOne({username: userData.username}, (err, result)=>{
                    if(result){
                        return res.send({
                            msg: `This username ${userData.username} already in use`
                        })
                    }else{
                        newUser.save();
                        res.send({
                            msg: 'Account registered successfully, you can login.'
                        })
                    }
                })
            }
        });
    }

    

}


userController.Login = async (req, res, next) => {
    const LoginData = req.body.LogInData;
    

    try{
        const user = await User.findOne({email: LoginData.email});
        
        if(!user){
            res.send({
                message:  `The email is not in our records`
            })
        }else{
            user.isPasswordMatch(LoginData.password, user.password, (err, success)=>{
                if(success){
                    const secret = process.env.JWT_SECRET;
                    const expire = process.env.JWT_EXPIRATION;
                    
                    const token = jwt.sign({_id: user._id}, secret, {expiresIn: expire});
                    return  res.send({token, user}) 
                }
                res.send({
                    message : `Invaild email or password`
                })
        });
        }
            
    
    }catch(e){
        next(e)
    }

}


userController.PublishArticle = (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const ArrError = errors.array();
       return  res.send(ArrError) 

    }

    const ArticleInfo = req.body.ArticleInfo;
    
    
    const newArticle = new Articles({
        title: ArticleInfo.title,
        articleText: ArticleInfo.articleText,
        author: ArticleInfo.author,
        username: ArticleInfo.username,
        date: moment().format("MMM Do YY")      
    })

    newArticle.save();

    res.send({
        msg: 'Article Published'
    })
    
}


userController.GetAllArticles = (req, res, next) => {
    Articles.find({}, (err, result)=>{
        if(result){
            res.send(result.reverse())
        }else{
            console.log(err)
        }
    })
}


userController.GetMyArticles = (req, res, next) => {
    const author = req.params.author;
    
    Articles.find({author: author}, (err, result)=>{
        if(result){
            res.send(result.reverse())
        }else{
            console.log(err)
        }
    })
}


userController.GetArticle = (req, res, next) => {
    const ArticleName = req.params.articlename;
    
    Articles.findOne({title: ArticleName}, (err, result)=>{
        if(result){
            res.send(result)
        }else{
            console.log(err)
        }
    })

}

module.exports = userController;