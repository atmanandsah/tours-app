const jwt = require('jsonwebtoken'); 
const User = require('./../models/userModel')
const appError = require('./../Utils/appError')
const catchAsync = require('./../Utils/catchAsync')
const bcrypt = require('bcryptjs');
const app = require('..');


const signToken = (id) =>{
    return jwt.sign({id}, 'here-is-my-secret',{
        expiresIn: '23d'
    })
}

exports.SignUp = catchAsync(async(req,res,next) => {
    //console.log(req.body)
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id)
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }

    })
})


exports.login = catchAsync( async (req,res,next)  => {
    const {email, password} = req.body

    //1. Check if email and password exits
    if(!email || !password){
        return next(new appError('enter the password and email!',400))
    }

    //2. check if user exits and password is correct
    const user = await User.findOne({email : email}).select('+password')
    //console.log(user)
    
    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new appError('Incorrect email or password', 401))
    }
    const token = signToken(user._id)
    //3. If everything ok, send token to client
    res.status(200).json({
        status: 'success',
        token
        
    })


})


exports.protect = catchAsync(async (req,res,next) => {
    let token;
    //1. Getting token and checkof it's there
    if(req.headers.authorization){
        token = req.headers.authorization
    }
    if(!token){
        return next(new appError('you are not logged in! Please log in to get access',401))
    }

    //2. Verification token
    const decode = await jwt.verify(token,'here-is-my-secret')
    console.log('decoding =================>',decode)
    //3. Check if user still exists

    //4. Check if user changed password after the token was issued
    next();
})