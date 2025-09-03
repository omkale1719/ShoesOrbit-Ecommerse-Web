import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { SignUp } from "../../Pages/SignUp";
import Modal from "../../../Modal";
import { Login } from "../../Pages/Login";
import CartModal from "../../../CartModal";
import Cart from "../../Pages/Cart/cart";
import { BuyNow } from "../../Pages/BuyNow/BuyNow";

export const Navbar = () => {
  const [signup, setsignup] = useState(false);
  const [login, setlogin] = useState(false);
  const [cartView, setCartView] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("navbarNavDropdown");
      if (sidebar && !sidebar.contains(event.target)) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(sidebar);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid ">
          <Link className="navbar-brand fst-italic" to="/">
            ShoesOrbit
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse custom-sidebar"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/display_orders"
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <ul className="navbar-nav">
                <div className="nav-item">
                  <div
                    className="nav-link active"
                    style={{ cursor: "pointer" }}
                    onClick={() => setlogin(true)}
                  >
                    Login
                  </div>
                  {login && (
                    <Modal onClose={() => setlogin(false)}>
                      <Login onClose={() => setlogin(false)} />
                    </Modal>
                  )}
                </div>

                <div className="nav-item">
                  <div
                    className="nav-link active"
                    style={{ cursor: "pointer" }}
                    onClick={() => setsignup(true)}
                  >
                    SignUp
                  </div>
                  {signup && (
                    <Modal onClose={() => setsignup(false)}>
                      <SignUp onClose={() => setsignup(false)} />
                    </Modal>
                  )}
                </div>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <div
                    className="nav-link active"
                    style={{ cursor: "pointer" }}
                    onClick={() => setCartView(true)}
                  >
                    <i className="fa-solid fa-cart-arrow-down cart_icon"></i>
                  </div>
                  {cartView ? (
                    <CartModal
                      onClose={() => {
                        setCartView(false);
                      }}
                    >
                      <Cart />
                    </CartModal>
                  ) : null}
                </li>
                <li
                  className="nav-item"
                  style={{ position: "relative" }}
                  ref={dropdownRef}
                >
                  <div
                    className="nav-link active"
                    style={{ cursor: "pointer" }}
                    onClick={() => setProfileOpen((prev) => !prev)}
                  >
                    <i className="fa-solid fa-user user_icon"></i>
                  </div>

                  {profileOpen && (
                    <ul className="user_options">
                      <Link
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                          color: "black",
                          textDecorationLine: "none",
                        }}
                        to="/wishlist"
                      >
                        Wishlist
                      </Link>
                      <li
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                          color: "black",
                        }}
                        onClick={() =>
                          alert("Setting Page is Under Construction!")
                        }
                      >
                        Settings
                      </li>
                      <li
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
