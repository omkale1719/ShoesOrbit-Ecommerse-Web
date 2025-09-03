import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { CartProvider } from "./Components/createReducer";
import { BuyNow } from "./Pages/BuyNow/BuyNow";
import { Wishlist } from "./Pages/Wishlist/Wishlist.jsx";
import { MyOrders } from "./Pages/MyOrders/MyOrders.jsx";


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
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
