const {Schema,model} = require('../connection');

const mySchema=new Schema({
    title:String,
    name:String,
    description:String,
    salary:String,
    address:String,
    experience:String
});

module.exports=model('job',mySchema)