const mongoose = require('mongoose');
//create a scimy 
const msgSchema = new mongoose.Schema({
    msg:{
       type:String,
        require:true
    }
})


const Msg = mongoose.model('msg',msgSchema);
//exports it help us to use this file any where
module.exports = Msg;