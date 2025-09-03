const mongoose=require("mongoose");
const display_data = require("../Display_data/Home_data");

const MongoUrl= "mongodb+srv://omkale0107:KpQXxecPPRt7WAin@cluster0.9e6ps.mongodb.net/ShoesOrbit?retryWrites=true&w=majority";

async function connectMongo() {
 try {
    await mongoose.connect(MongoUrl)
    console.log("Database Connection Successfully!")

    await display_data();

 } catch (error) {
    console.log("Database connection error:",error)
   }
    
}
module.exports=connectMongo