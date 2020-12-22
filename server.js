const mongoose  = require('mongoose');
const app = require('./index');
const colors = require('colors');


const DB = 'mongodb+srv://atmanand:9934158052@mongodb0.n1qwp.azure.mongodb.net/natours?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindModify: false,
    useUnifiedTopology: true
}).then(() => {
    //console.log(connection.connection);
    console.log(`database connected`.bgGreen);
}).catch( err => {
    console.log(`${err.message}`);
    //process.exit(-1);
})

const port = 3000;
app.listen(port, () => {
    console.log(`app is running at ${port}... `);
})


