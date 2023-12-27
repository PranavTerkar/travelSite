const mongoose = require("mongoose"); 

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected" , connect.connection.host) ;
        
    } catch (error) {
        console.log(error); 
        process.exit(1); 
    }
}

module.exports = dbConnect; 