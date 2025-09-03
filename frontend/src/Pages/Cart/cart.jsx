import React from "react";
import { useCart, useCartDispatch } from "../../Components/createReducer";
import { BuyNow } from "../BuyNow/BuyNow";
import { useState } from "react";
import './Cart.css'

export default function Cart() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const dispatch = useCartDispatch();

  if (cart.length === 0) {
    return <h3 className="text-center mt-3">🛍️ Your Cart is Empty!</h3>;
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div
      className="container table-wrapper cart_container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md"
      style={{ maxHeight: "650px", overflowY: "auto", overflowX: "hidden" }}
    >
      <h2 className="mb-3">🛒 Shopping Cart</h2>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Price (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>{item.title}</td>
              <td>{item.size}</td>
              <td>{item.qty}</td>
              <td>₹ {item.price}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch({ type: "REMOVE", index })}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr className="table-info fw-bold total_price" >
            <td colSpan="5" style={{color:"white"}}>Total</td>
            <td colSpan="2" style={{color:"white"}}>₹ {totalPrice}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-warning"
          onClick={() => dispatch({ type: "DROP" })}
        >
          Clear Cart
        </button>
        <button className="btn btn-success" onClick={() => setOpen(true)}>
          Proceed to Checkout
        </button>

        {open && (
          <BuyNow
            isOpen={open}
            onClose={() => setOpen(false)}
            onSuccess={() => {
              dispatch({ type: "DROP" });
              setOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
