import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUp } from "./SignUp";
import Modal from "../../Modal";
import { toast } from "react-toastify";

export const Login = ({ onClose }) => {
  const [cartView, setCartView] = useState(false);
  const [userlogin, setuserlogin] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   JSON.stringify({ email: userlogin.email, password: userlogin.password })
    // );
    const responce = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: userlogin.email,
          password: userlogin.password,
        }),
      }
    );
    const json = await responce.json();
    console.log(json);

    if (!json.success) {
      toast.error("Try With Correct Credentials!", {
        position: "top-center",
        autoClose: 2000,
      });
    }

    if (json.success) {
      localStorage.setItem("userEmail", userlogin.email);
      localStorage.setItem("authToken", json.AuthToken);
      console.log(localStorage.getItem("authToken"));
      toast.success("Login Successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      onClose();
      navigate("/");
    }
  };

  const onchange = async (event) => {
    setuserlogin({ ...userlogin, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userlogin.email}
            onChange={onchange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={userlogin.password}
            onChange={onchange}
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <div
          className="m-3 btn btn-danger"
          onClick={() => {
            setCartView(true);
          }}
        >
          I'am new user
        </div>
        {cartView ? (
          <Modal
            onClose={() => {
              setCartView(false);
            }}
          >
            <SignUp />
          </Modal>
        ) : null}
      </form>
    </div>
  );
};
