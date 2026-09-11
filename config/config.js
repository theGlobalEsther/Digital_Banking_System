const mongoose = require("mongoose");
const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected successfully")
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}
module.exports = db;