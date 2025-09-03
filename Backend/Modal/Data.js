const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Kids", "New Arrival", "Women's", "Men's", "Bestsellers"] // customize categories
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  size: [
    {
      type: Map,   
      of: String,   
      required: true
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("AllShoes", shoeSchema);
