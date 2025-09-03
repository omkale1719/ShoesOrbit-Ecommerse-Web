const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
   
  }
}, { timestamps: true });

module.exports = mongoose.model("Categories", categorySchema);
