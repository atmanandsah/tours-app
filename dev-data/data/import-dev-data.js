const fs = require('fs');
const mongoose  = require('mongoose');
const colors = require('colors');
const Tour = require('./../../models/tourModel');

const DB = 'mongodb+srv://atmanand:9934158052@mongodb0.n1qwp.azure.mongodb.net/natours?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    //console.log(connection.connection);
    console.log(`database connected`.bgGreen);
}).catch( err => {
    console.log(`${err.message}`);
    //process.exit(-1);
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
//console.log(tour);

const importData = async () => {
    try{
        await Tour.create(tours); 
        console.log("Tour created");
    }
    catch(err){
        console.log(err);
    }
    process.exit();
};

const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log("DELETED");
    }
    catch(err){
        console.log(err);
    }
    process.exit();
};

if(process.argv[2] === 'importData'){
    importData();
}
else if(process.argv[2] === 'deleteData'){
    deleteData();
}
//console.log(process.argv);
