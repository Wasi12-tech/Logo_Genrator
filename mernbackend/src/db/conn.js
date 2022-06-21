const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/Registration', (req, res) => {
    if(req){
        console.log.log(`Unable to Connect`);
    }
    console.log(`Connected...`);
} )