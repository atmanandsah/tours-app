const Tour = require('./../models/tourModel');
const { findByIdAndUpdate } = require('./../models/tourModel');
const APIFeatures = require('../Utils/apiFeatures');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('../Utils/appError');


// exports.checkId = (req,res,next,val) => {
//     console.log(`id with ${val}`);
//     if(req.params.id*1 > tours.length){
//         return res.status(401).json({
//             status: 'fail',
//             message: 'invalid Id'
//         })
//     }
//     next();
// }
  
// exports.checkBody = (req,res,next) => {
//     if(!req.body.name || !req.body.price){
//         return res.status(400).json({
//             status : 'fail',
//             message : 'please enter the both name and price'
//         })
//     }
//     next();
// }

exports.aliasTopTours = (req,res,next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage, price';
    req.query.field = 'name,price,ratingsAverage,summary,difficulty';
    next();
}


exports.getAllTours = catchAsync (async (req,res,next) => {
    // console.log(req.requestTime);
    //console.log(req.query);
   
        // 1.a Filtering
        // const queryObj = {...req.query};
        // const excludeFeilds = ['limit','page','sort','field'];
        // excludeFeilds.forEach(el => delete queryObj[el]);
        
        // // 1.b Advance filtering
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // //console.log(JSON.parse(queryStr) );
        // let query = Tour.find(JSON.parse(queryStr));
        
        // 2. Sorting
        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     query = query.sort(sortBy);
        // }
        // else{
        //     query = query.sort('-createdAt');
        // }

        //3) field limiting
        // if(req.query.field){
        //     const field = req.query.field.split(',').join(' ');
        //     query = query.select(field);
        // }
        // else{
        //     query = query.select('-__v');
        // }

        // 4 . pagination
        // const page = req.query.page *1 || 1;
        // const limit = req.query.limit *1 || 100;
        // const skip = (page-1) * limit;
        // query = query.skip(skip).limit(limit);
        // if(req.query.page){
        //     const numTours = await Tour.countDocuments();
        //     if(skip >= numTours){
        //         throw new err('this page is no avaliable');
        //     }
        // }
       

        // Execute query
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sorting()
            .field()
            .pagination();
        const tours = await features.query;
       
        res.status(200).json({
            status: 'success',
            //requestedAt: req.requestTime,
            result: tours.length,
            data: {
                tours : tours
            }
        })
         // Hard coded of filtering
        // const tours = await Tour.find({
        //      duration: '5', 
        //      difficulty: 'easy'
        // })   
})


exports.getTour = catchAsync (async(req,res,next) => {
    //console.log(req.params);
    //const id = req.params.id*1;
    
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({_id: req.paramas.id})
        if(!tour){
            return next(new AppError('Tour not found with this id', 404))
        }
   
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })   
})


exports.createTour = catchAsync (async (req,res,next) => {

    // console.log(req.body);// console.log("body");// to save the data to mongodb// const newTour = new Tour({});// newTour.save();
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
})
exports.updateTour = catchAsync (async(req,res,next) => {

        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false
        })
        if(!tour){
            return next(new AppError('Tour not found with this id', 404))
        }
        res.status(200).json({
            status: 'success',
        data: tour
        })
})

exports.deleteTour = catchAsync (async(req,res,next) => {

        const tour = await Tour.findByIdAndDelete(req.params.id,);
        if(!tour){
            return next(new AppError('Tour not found with this id', 404))
        } 
        res.status(204).json({
            status: 'success',
            data: null
        })
       
})