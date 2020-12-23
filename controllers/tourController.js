const Tour = require('./../models/tourModel');
const { findByIdAndUpdate } = require('./../models/tourModel');


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

exports.getAllTours = async (req,res) => {
    // console.log(req.requestTime);
    //console.log(req.query);
    try{
        // 1.a Filtering
        const queryObj = {...req.query};
        const excludeFeilds = ['limit','page','sort','field'];
        excludeFeilds.forEach(el => delete queryObj[el]);
        
        // 1.b Advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        //console.log(JSON.parse(queryStr) );
        let query = Tour.find(JSON.parse(queryStr));
        
        // 2. Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }
        else{
            query = query.sort('-createdAt');
        }

        //3) field limiting
        if(req.query.field){
            const field = req.query.field.split(',').join(' ');
            query = query.select(field);
        }
        else{
            query = query.select('-__v');
        }

        // 4 . pagination
        const page = req.query.page *1 || 1;
        const limit = req.query.limit *1 || 100;
        const skip = (page-1) * limit;
        query = query.skip(skip).limit(limit);
        if(req.query.page){
            const numTours = await Tour.countDocuments();
            if(skip >= numTours){
                throw new err('this page is no avaliable');
            }
        }
       

        // Execute query
        const tours = await query;
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

    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
   
}
exports.getTour = async(req,res) => {
    //console.log(req.params);
    //const id = req.params.id*1;
    try{
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({_id: req.paramas.id})
   
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'err'
        })
    }
    
}
exports.createTour = async (req,res) => {

    // console.log(req.body);
    // console.log("body");
    // to save the data to mongodb
    // const newTour = new Tour({});
    // newTour.save();

    try{
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
   
    
    //res.status(201).send("Done");
}
exports.updateTour = async(req,res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false
        })
        

    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'bad request'
        })

    }
}
exports.deleteTour = async(req,res) => {
   try{
        await Tour.findByIdAndDelete(req.params.id,);
        res.status(204).json({
            status: 'success',
            data: null
        })
   }
   catch(err){
    res.status(400).json({
        status: 'fail',
        message: 'Cannot find the object with corresponding Id'
    })

   }
    
}