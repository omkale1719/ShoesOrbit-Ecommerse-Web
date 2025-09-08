import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { CartProvider } from "./Components/createReducer";
import {  BuyNow2 } from "./Pages/BuyNow/BuyNow2.jsx";
import { Wishlist } from "./Pages/Wishlist/Wishlist.jsx";
import { MyOrders } from "./Pages/MyOrders/MyOrders.jsx";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/display_orders" element={ <MyOrders/>} />
          <Route path="/wishlist" element={ <Wishlist/>} />
          <Route path="/buy_now2" element={ <BuyNow2/>} />
        </Routes>
         <ToastContainer/>
      </Router>
    </CartProvider>
  );
}

export default App;
