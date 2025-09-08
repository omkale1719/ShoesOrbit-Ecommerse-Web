import React, { useState } from "react";
import "./BuyNow.css";
import { useCart, useCartDispatch } from "../../Components/createReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const BuyNow2 = ({ isOpen, onClose, product }) => {
  const location = useLocation();
  // const { product } = location.state || {};
  if (!product) return <h3>No product selected!</h3>;

  const data = useCart();
  const dispatch = useCartDispatch();

  const [userInput, setUserInput] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
    mobile: "",
  });

  // single product असल्यामुळे फक्त price वापरा
  const amount = product.price || 0;

  const onChangeInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    if (e.target.value === "UPI") {
      handlePayment();
    }
  };

  const HandleCheckoutOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/checkout`,
        {
          email: localStorage.getItem("userEmail"),
          customer_name: userInput.name,
          customer_address: userInput.address,
          customer_city: userInput.city,
          mobile: userInput.mobile,
          pincode: userInput.pincode,
          payment_method: userInput.payment,
          No_of_orders: 1,
          total_price: amount,
          date: new Date().toDateString(),
          order_data: [product], // array मध्ये wrap केलं
        }
      );

      if (response.status === 200) {
        const orderResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_HOST_URL}/payment`,
          {
            email: localStorage.getItem("userEmail"),
            order_data: [product],
            order_date: new Date().toDateString(),
          }
        );

        if (orderResponse.status === 200) {
          dispatch({ type: "DROP" });
          toast.success(
            `Congrats ${userInput.name} ✅ Order Placed Successfully!`,
            { position: "top-center", autoClose: 2000 }
          );
        }
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Delivery is Not Available!");
    }
  };

  const handlePayment = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/payment`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );
      const data = await res.json();
      handlePaymentVerify(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: data.currency,
      name: "ShoesOrbit",
      description: "Test Payment",
      order_id: data.id,
      handler: (response) => {
        toast.success("✅ Payment Successful!", {
          position: "top-center",
          autoClose: 2000,
        });
      },
      theme: { color: "#3399cc" },
      method: { upi: true, card: true, netbanking: true, wallet: true },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2 style={{ color: "black" }}>Checkout</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="checkout-page">
          
          <div className="drawer-content">
            <h2>Checkout</h2>
            <div className="section">
              <h3>Order Summary</h3>
              <p>Product: {product.title}</p>
              <p>Price: ₹{product.price}</p>
              <p>Date: {new Date().toDateString()}</p>
            </div>

            <div className="section">
              <h3>Shipping Address</h3>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={userInput.name}
                onChange={onChangeInput}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={userInput.address}
                onChange={onChangeInput}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={userInput.city}
                onChange={onChangeInput}
              />
              <input
                type="text"
                placeholder="Pincode"
                name="pincode"
                value={userInput.pincode}
                onChange={onChangeInput}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                name="mobile"
                value={userInput.mobile}
                onChange={onChangeInput}
              />
            </div>

            <div className="section">
              <h3>Payment</h3>
              <select
                name="payment"
                value={userInput.payment}
                onChange={onChangeInput}
              >
                <option>UPI</option>
                <option>Cash on Delivery</option>
              </select>
            </div>

            <button className="place-btn" onClick={HandleCheckoutOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
