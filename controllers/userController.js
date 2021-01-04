const User = require('../models/userModel');
const AppError = require('../Utils/appError');
const catchAsync = require('./../Utils/catchAsync')

//const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

// exports.checkId = (req,res,next,val) => {
//     console.log(`id withe ${val}`);
//     if(req.params.id > users.length ){
//         return res.status(401).json({
//             status: 'fail',
//             message : 'invalid id'
//         })
//     }
//     next();
// } 

exports.getAllUsers = catchAsync( async (req,res,next) => {

        const users = await User.find();
        
        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users
            }
        })    
})
exports.createUser = (req,res) => {
    //console.log(req.body);
    const newUserId = users[users.length -1].id +1;
    console.log(newUserId);
    const newUser = Object.assign({id : newUserId},req.body);
    users.push(newUser);
    fs.writeFile(`${__dirname}/dev-data/data/users.json`,JSON.stringify(newUser),err => {
        res.status(201).json({
            status :'success',
            result: users.length,
            data: {
                users
            }
        })
    })
};

exports.getUser = (req,res) =>{
    const id = req.params.id*1;
    const user = users.find(el => el.id === id);
    
    res.status(200),json({
        status : 'success',
        data : {
            user
        }
    })
};
exports.updateUser = (req,res) => {
    
    res.status(200).json({
        status : 'success',
        message : '<user updated>'
    })
}

exports.deleteUser = async (req,res) => {
    try{
        console.log(req.params.id)
        await User.findByIdAndDelete(req.params.id);
        // if(!user){
            //     return next(new AppError('User not found',404))
            // }
            res.status(204).json({
                status : 'success',
                data: 'null',
                message : 'user deleted'
            })
            console.log(req.params.id)
    }
    catch(e) {
        throw e;
    }
}
