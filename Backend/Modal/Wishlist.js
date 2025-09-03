const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: String,   
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
