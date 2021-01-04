const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./Utils/appError')

var bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json())



app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    //console.log(req.headers.authorization)
    next();
})




app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

app.all('*' , (req,res,next) => {
    // res.status(404).json({
    //     status : 'fail',
    //     message: `cant't find  ${req.originalUrl} on this server!`
    // })
    // const err = new Error(`cant't find  ${req.originalUrl} on this server!`)
    // err.status = 'fail'
    // err.statusCode = 404;
    next(new AppError(`cant't find  ${req.originalUrl} on this server!`, 404));
})

app.use( (err,req,res,next) => {
    //console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status : err.status,
        message: err.message
    })
})

module.exports = app;