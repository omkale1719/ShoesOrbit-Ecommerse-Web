import axios from "axios";
import './MyOrders.css';
import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { Footer } from "../../Components/Footer";

export const MyOrders = () => {
  const [orderData, setOrderData] = useState(null);
  const fetchOrders = async () => {
    try {
      let response = await axios.post(
        "http://localhost:5000/api/display_orders",
        { email: localStorage.getItem("userEmail") }
      );
      console.log(response.data);
      setOrderData(response.data.myOrderdata);
    } catch (error) {
      console.error("order error", error);
      console.log("order error", error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {}, [orderData]);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData && orderData.order_data
            ? orderData.order_data
                .slice(0)
                .reverse()
                .map((order, index) => (
                  <div key={index} className="mb-4">
                    {order[0]?.order_date && (
                    <div className="m-auto mt-3">
                      <h6>Order Date: {order[0].order_date}</h6>
                      <hr />
                    </div>
                  )}
                   <div className="d-flex flex-wrap">
                    {
                      order.filter(item=>!item.order_date)
                      .map((product,idx)=>(
                         <div
                          key={idx}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <div
                            className="card mt-3"
                            style={{ width: "16rem", maxHeight: "360px" }}
                          >
                            <img
                              src={product.image }
                              className="card-img-top"
                              alt={product.title}
                              style={{ height: "190px", objectFit: "fill" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{product.title}</h5>
                              <div className="container w-100 p-0">
                                <span className="m-1">Qty: {product.qty}</span>
                                <span className="m-1">Size: {product.size}</span>
                                <span className="m-1">₹{product.price}/-</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                   </div>
                  </div>
                ))
            : "no data found"}
        </div>
      </div>

      <Footer />
    </div>
  );
};
