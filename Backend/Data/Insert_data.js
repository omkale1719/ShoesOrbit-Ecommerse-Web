const mongoose = require("mongoose");
// const initdata = require("./data.js");
// const DataSchema = require("../Modal/Data.js");
const initdata = require("./Categories.js");
const DataSchema = require("../Modal/Categories.js");

const MongoUrl= "mongodb+srv://omkale0107:KpQXxecPPRt7WAin@cluster0.9e6ps.mongodb.net/ShoesOrbit?retryWrites=true&w=majority";


// Connect to MongoDB
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Error found", err);
    });

async function main() {
    try {
        await mongoose.connect(MongoUrl, {
           
        });
        console.log("Connection successful");
    } catch (err) {
        console.log("Connection error", err);
    }
}

const initDB = async () => {
    try {
        console.log("Initializing database...");
        console.log("Data to be inserted:", initdata.data);

        // Delete existing data
        await DataSchema.deleteMany({});
        console.log("Existing data cleared.");

        // Insert new data
        await DataSchema.insertMany(initdata.data);
        console.log("Data was initialized successfully.");
    } catch (err) {
        console.log("Error while initializing data:", err);  // Log any errors
    }
};

// Initialize the database
initDB();
