import React from "react";
import "./BuyNow.css";
import { useCart, useCartDispatch } from "../../Components/createReducer";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const BuyNow = ({ isOpen, onClose }) => {
  let data = useCart();
  let dispatch = useCartDispatch();
  const [userInput, setUserInput] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
    mobile: "",
  });

  const amount = data.reduce((total, item) => total + item.price, 0);

  const onChangeInput = async (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    if (e.target.value === "UPI") {
      handlePayment();
    }
  };

  const HandleCheckoutOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        email: localStorage.getItem("userEmail"),
        customer_name: userInput.name,
        customer_address: userInput.address,
        customer_city: userInput.city,
        mobile: userInput.mobile,
        pincode: userInput.pincode,
        payment_method: userInput.payment,
        No_of_orders: data.length,
        total_price: data.reduce((total, item) => total + item.price, 0),
        date: new Date().toDateString(),
        order_data: data,
      });
      console.log(response.data);
      if (response.status === 200) {
        const orderResponse = await axios.post(
          "https://shoesorbit-ecommerse-web.onrender.com/api/orders",
          {
            email: localStorage.getItem("userEmail"),
            order_data: data,
            order_date: new Date().toDateString(),
          }
        );

        if (orderResponse.status === 200) {
          dispatch({ type: "DROP" });
          alert("✅ Order Placed Successfully!");
          toast.success(
            ` Congrats ${userInput.name} ✅ Order Placed Successfully!`,
            {
              position: "top-center",
              autoClose: 2000,
            }
          );
          onClose();
          if (typeof onSuccess === "function") {
            onSuccess();
          }
        }
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("❌ Failed to place order");
    }
  };

  const handlePayment = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/payment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      console.log("Response status:", res.status);
      const text = await res.text();
      console.log("Raw response:", text);

      let data;

      data = JSON.parse(text);

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
      handler: async (response) => {
        console.log("Payment response:", response);
        // alert(response.razorpay_payment_id);

        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/verify`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await res.json();
          console.log("Verify response:", verifyData);

          if (verifyData.message) {
            toast.success("✅ Payment Successful!", {
              position: "top-center",
              autoClose: 2000,
            });
          } else {
            toast.error("❌ Payment Failed!", {
              position: "top-center",
              autoClose: 2000,
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },
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

        <div className="drawer-content">
          <div className="section">
            <h3>Order Summary</h3>
            <p>No.of Product:{data.length} </p>
            <p>
              Price: ₹ {data.reduce((total, item) => total + item.price, 0)};
            </p>
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
    </>
  );
};
