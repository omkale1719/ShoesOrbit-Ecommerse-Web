import React, { useState, useEffect } from "react";
import { useCart, useCartDispatch } from "../../Components/createReducer";
import { BuyNow } from "../BuyNow/BuyNow";
import "./Cart.css";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 542);

  const cart = useCart();
  const dispatch = useCartDispatch();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 542);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (cart.length === 0) {
    return <h3 className="text-center mt-3">🛍️ Your Cart is Empty!</h3>;
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <>
      {/*  Table View */}
      {!isMobile && (
        <div
          className="container table-wrapper cart_container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md"
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
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
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
              <tr className="table-info fw-bold total_price">
                <td colSpan="5" style={{ color: "white" }}>
                  Total
                </td>
                <td colSpan="2" style={{ color: "white" }}>
                  ₹ {totalPrice}
                </td>
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
      )}

      {/* Card View */}
      {isMobile && (
        <div className="m-auto ">
          <h2 className="mb-3">🛒 Shopping Cart</h2>

          <div
            className="row"
            style={{
              maxHeight: "550px",
              overflowY: "auto",
            }}
          >
            {cart.map((item, index) => (
              <div className="col-6 col-md-4 mb-2" key={index}>
                <div className="card shadow-sm" style={{ height: "200px" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      display: "block",
                      margin: "0 auto",
                      width: "80px",
                      height: "30px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    className=" d-flex flex-column qty-size-title-price_fontsize"
                    style={{
                      padding: "10px",
                      color: "var(--bs-card-color)",
                    }}
                  >
                    <h5 className="card-title ">{item.title}</h5>
                    <p className=" qty-size">
                      <span className="me-3">Size: {item.size}</span>
                      <span>Qty: {item.qty}</span>
                    </p>
                    <p className="fw-bold text-success price">₹ {item.price}</p>
                    <button
                      className="cross_button"
                      onClick={() => dispatch({ type: "REMOVE", index })}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className=" justify-content-between align-items-center mt-4 p-3 bg-dark text-white rounded">
            <h4 style={{ fontSize: "15px", justifyContent: "center" }}>
              Total: ₹ {totalPrice}
            </h4>

            <div className="d-flex mt-2 ">
              <button
                className="btn btn-warning me-2 "
                onClick={() => dispatch({ type: "DROP" })}
              >
                Clear Cart
              </button>
              <button
                className="btn btn-success "
                onClick={() => setOpen(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Checkout Popup */}
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
      )}
    </>
  );
}
