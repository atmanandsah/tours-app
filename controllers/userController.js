const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

exports.checkId = (req,res,next,val) => {
    console.log(`id withe ${val}`);
    if(req.params.id > users.length ){
        return res.status(401).json({
            status: 'fail',
            message : 'invalid id'
        })
    }
    next();
} 

exports.getAllUsers = (req,res) => {
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    })
}
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

exports.deleteUser = (req,res) => {
    res.status(204).json({
        status : 'null',
        message : '<user deleted>'
    })
}
