import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import axios from "axios";
import { Navbar } from "../../Components/Navbar/Navbar";
import { Footer } from "../../Components/Footer";

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const currentUser=localStorage.getItem("userEmail");
  const wishlistData = async () => {
    const response = await fetch(`https://shoesorbit-ecommerse-web.onrender.com/api/wishlist/${currentUser}`);
    const data = await response.json();
    setWishlist(data);
  };

  const handleremovewishlist = async (item_id) => {
    try {
      console.log("item_id:", item_id);
      const res = await axios.post(
        `https://shoesorbit-ecommerse-web.onrender.com/api/wishlist_remove/${item_id}`,
        {}
      );
      console.log(res.data);
      if (res.data?.success) {
        setWishlist((prev) => prev.filter((it) => it._id !== item_id));
      } else {
        console.log("Delete failed:", res.data);
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
   
    <Navbar/>
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlist && wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="card" style={{ width: "18rem" }} key={item._id}>
              <img src={item.image} className="card-img-top" alt={item.title} />
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
                  <button className="buy-btn">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in wishlist</p>
      )}
    </div>
    <Footer/>
     </>
  );
};
