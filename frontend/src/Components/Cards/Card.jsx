import React, { use } from "react";
import "./Card.css";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useCart, useCartDispatch } from "../createReducer";
import { BuyNow } from "../../Pages/BuyNow/BuyNow";
import axios from "axios";
import { Login } from "../../Pages/Login";
import Modal from "../../../Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Card = (props) => {
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [login, setlogin] = useState(false);
  let priceref = useRef();
  let shoesSize = props.shoesSize;
  let propOption = Object.keys(shoesSize);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  let finalprice = qty * parseInt(shoesSize[size]);
  useEffect(() => {
    setsize(priceref.current.value);
  }, []);

  const dispatch = useCartDispatch();
  const data = useCart();

  const HandleAdd_to_Cart = async () => {
    await dispatch({
      type: "ADD",
      id: props.cardShoesItem._id,
      title: props.cardShoesItem.title,
      image: props.cardShoesItem.image,
      qty: qty,
      size: size,
      price: finalprice,
    });
    toast.success("🛒 Item added to cart!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const HandleWishlist = async () => {
    try {
      let response = await axios.post("https://shoesorbit-ecommerse-web.onrender.com/api/wishlist", {
        user: localStorage.getItem("userEmail"),
        id: props.cardShoesItem._id,
        title: props.cardShoesItem.title,
        image: props.cardShoesItem.image,
        description: props.cardShoesItem.description,
        qty: qty,
        size: size,
        price: finalprice,
        date: new Date().toDateString(),
      });
      console.log(response.data);
    } catch (error) {}
  };

  return (
    <>
      <div className="card " style={{  margin: "1rem" }}>
        {localStorage.getItem("authToken") ? (
          <div
            className="wishlist-button position-absolute"
            style={{ top: "10px", right: "10px" }}
          >
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className="heartBtn"
            >
              <i
                onClick={HandleWishlist}
                className={`fa-${
                  liked ? "solid" : "regular"
                } fa-heart heartIcon`}
                style={{ color: liked ? "red" : "#ccc" }}
              ></i>
            </button>
          </div>
        ) : (
          <>
            <div
              className="wishlist-button position-absolute"
              style={{ top: "10px", right: "10px" }}
              onClick={() => setlogin(true)}
            >
              <button type="button" className="heartBtn">
                <i
                  className={`fa-${
                    liked ? "solid" : "regular"
                  } fa-heart heartIcon`}
                  style={{ color: liked ? "red" : "#ccc" }}
                ></i>
              </button>
            </div>

            {login && (
              <Modal onClose={() => setlogin(false)}>
                <Login onClose={() => setlogin(false)} />
              </Modal>
            )}
          </>
        )}

        <img
          src={props.cardShoesItem.image}
          className="card-img-top"
          alt={props.cardShoesItem.title}
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            width: "100%",
          }}
        />

        <div className="card-body  d-flex flex-column">
          <h5 className="card-title fw-bold">{props.cardShoesItem.title}</h5>
          <p className="card-text text-muted" style={{ fontSize: "14px" }}>
            {/* {props.cardShoesItem.description} */}
          </p>

          <div className="d-flex justify-content-between align-items-center ">
            <select
              className="form-select form-select-sm w-50 m-1  "
              onChange={(e) => setqty(e.target.value)}
            >
              <option disabled selected>
                Qty
              </option>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="form-select form-select-sm w-50 m-1"
              ref={priceref}
              onChange={(e) => setsize(e.target.value)}
            >
              {propOption.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>

        
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="fs-6 fw-bold text-success">₹ {finalprice}</div>
            <>
              {localStorage.getItem("authToken") ? (
                
                  <button
                    onClick={HandleAdd_to_Cart}
                    className="btn btn-success btn-sm px-3"
                  >
                    Add To Cart <ToastContainer />
                  </button>
                 
               
              ) : (
                <>
                  <button
                    onClick={() => setlogin(true)}
                    className="btn btn-success btn-sm px-3"
                  >
                    Add To Cart
                  </button>

                  {login && (
                    <Modal onClose={() => setlogin(false)}>
                      <Login onClose={() => setlogin(false)} />
                    </Modal>
                  )}
                </>
              )}
            </>

            {/* <button   onClick={() => setOpen(true)}   className="btn btn-success btn-sm px-3">
              Buy Now
            </button>
            {open &&(<BuyNow isOpen={open} onClose={()=>setOpen(false)}></BuyNow>)} */}
          </div>
        </div>
      </div>
    </>
  );
};
