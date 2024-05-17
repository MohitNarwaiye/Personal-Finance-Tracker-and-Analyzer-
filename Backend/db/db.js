const mongoose = require('mongoose');

const db = async() =>{

    try {
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")
    } catch (error) {
        console.log("db connection err")
        console.log(error)
    }
}

module.exports ={db}