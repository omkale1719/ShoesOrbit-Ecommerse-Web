import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import axios from "axios";
import { Navbar } from "../../Components/Navbar/Navbar";
import { Footer } from "../../Components/Footer";
import { useCartDispatch } from "../../Components/createReducer";
import { useNavigate } from "react-router-dom";
import { BuyNow2 } from "../BuyNow/BuyNow2";

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useCartDispatch();
  const currentUser = localStorage.getItem("userEmail");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Buy Now button click झाल्यावर product data सोबत दुसऱ्या page ला नेतो
  const handleBuyNow = (product) => {
    // console.log("product",product);
    setOpen(true);
    setSelectedProduct(product);
  };

  const wishlistData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/wishlist/${currentUser}`
    );
    const data = await response.json();
    setWishlist(data);
  };

  const handleremovewishlist = async (item_id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/wishlist_remove/${item_id}`,
        {}
      );
      if (res.data?.success) {
        setWishlist((prev) => prev.filter((it) => it._id !== item_id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    wishlistData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="wishlist-container">
        <h2>My Wishlist</h2>
        {wishlist && wishlist.length > 0 ? (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div className="card" style={{ width: "18rem" }} key={item._id}>
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    Size: {item.size} | Qty: {item.qty} | Price: ₹{item.price}
                  </p>
                  <div className="card-actions">
                    <button
                      className="remove-btn"
                      onClick={() => handleremovewishlist(item._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleBuyNow(item)} // ✅ product सोबत next page ला जातो
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {open && selectedProduct && (
              <BuyNow2
                isOpen={open}
                onClose={() => setOpen(false)}
                product={selectedProduct} // ✅ direct props मध्ये पाठव
                onSuccess={() => {
                  dispatch({ type: "DROP" });
                  setOpen(false);
                }}
              />
            )}
          </div>
        ) : (
          <p>No items in wishlist</p>
        )}
      </div>
      <Footer />
    </>
  );
};
