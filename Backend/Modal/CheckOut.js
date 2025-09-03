
const mongoose = require("mongoose");

const checkout = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_address: {
    type: String,
    required: true,
  },
  customer_city: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/  
  },
  pincode: {
    type: String,
    required: true,
    match: /^[0-9]{6}$/ 
  },
  payment_method: {
    type: String,
    enum: ["UPI", "Credit Card", "Debit Card", "Cash on Delivery"],
    // required: true,
  },
  No_of_orders: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,   
    default: new Date().toDateString(),
  },
  order_data: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model("checkout", checkout);
