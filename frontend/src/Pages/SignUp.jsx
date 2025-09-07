import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Modal from "../../Modal";
import { Login } from "./Login";
import { toast } from "react-toastify";

export const SignUp = ({ onClose }) => {
  const navigate = useNavigate();
  const [login, setlogin] = useState(false);
  const [creadential, setCreadential] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const modalClose = () => {
    setlogin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: creadential.name,
        email: creadential.email,
        password: creadential.password,
        location: creadential.location,
      }),
    });
    const json = await res.json();
    console.log("json_data:", json);

    if (!json.success) {
      toast.error("Try With Correct Creadentials!", {
        position: "top-center",
        autoClose: 2000,
      });
    }

    if (json.success) {
      localStorage.setItem("userEmail", creadential.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      toast.success(`Welcome ${creadential.email} in ShoesOrbit...`, {
        position: "top-center",
        autoClose: 2000,
      });
      onClose();
      navigate("/");
    }
  };

  const onChangeInputs = (e) => {
    setCreadential({ ...creadential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={creadential.name}
              onChange={onChangeInputs}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={creadential.email}
              onChange={onChangeInputs}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={creadential.password}
              onChange={onChangeInputs}
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              value={creadential.location}
              onChange={onChangeInputs}
              name="location"
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <div
            onClick={() => {
              setlogin(true);
            }}
            className="m-3 btn btn-danger"
          >
            Already a user
          </div>
          {login ? (
            <Modal
              onClose={() => {
                setlogin(false);
              }}
            >
              <Login />
            </Modal>
          ) : null}
        </form>
      </div>
    </>
  );
};
