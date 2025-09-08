import React from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { Footer } from "../Components/Footer";
import { OfferText } from "../Components/OfferText/OfferText";
import { Card } from "../Components/Cards/Card";
import { useState } from "react";
import { useEffect } from "react";
import js from "@eslint/js";
import Carousel from "../Components/Carousel";

export const Home = () => {
  const [shoesCat, setShoesCat] = useState([]);
  const [shoesItem, setShoesItem] = useState([]);
  const [search, setsearch] = useState("");

  const LoadData = async () => {
    let response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/api/displayData`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    // console.log(response);
    setShoesItem(response[0]);
    setShoesCat(response[1]);
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <>
      <Navbar />
      <OfferText />
      <div>
        <div
          id="carouselExampleControlsNoTouching"
          className="carousel slide"
          data-bs-touch="true"
          data-bs-interval="3000"
        >
          <div className="carousel-inner" id="carousel">
            {/* 🔍 Search Box */}
            <div
              className="carousel-caption d-flex justify-content-center align-items-center"
              style={{ zIndex: "10" }}
            >
              <form className="d-flex flex-wrap w-75 w-md-50 w-lg-40">
                <input
                  className="form-control me-2 mb-2 mb-md-0"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setsearch(e.target.value)}
                />
                {/* <button className="btn btn-success w-100 w-md-auto" type="submit">
            Search
          </button> */}
              </form>
            </div>

            {/* Carousel Items */}
            <div className="carousel-item active">
              <img
                src="https://img.freepik.com/free-vector/modern-sale-banner-with-product-description_1361-1259.jpg?semt=ais_hybrid&w=740&q=80"
                className="d-block w-100 img-fluid"
                style={{
                  filter: "brightness(30%)",
                  objectFit: "cover",
                  height: "70vh",
                }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.freepik.com/free-psd/sneakers-template-design_23-2151796603.jpg"
                className="d-block w-100 img-fluid"
                style={{
                  filter: "brightness(30%)",
                  objectFit: "cover",
                  height: "70vh",
                }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThcq0DqlxRHaR-mOZwq4O-IeGJY39oQz58asfpfkPwXAcFv97a4YQhsOHK8QitCtNWBkE&usqp=CAU"
                className="d-block w-100 img-fluid"
                style={{
                  filter: "brightness(30%)",
                  objectFit: "cover",
                  height: "70vh",
                }}
                alt="..."
              />
            </div>
          </div>

          {/* Prev/Next Buttons */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="card-container">
        {shoesCat.length !== 0
          ? shoesCat.map((catItem) => {
              return (
                <div key={catItem._id} className="row mb-3">
                  <div className="fs-3 m-3">{catItem.category}</div>

                  <hr />

                  {shoesItem.length !== 0
                    ? shoesItem
                        .filter(
                          (item) =>
                            item.category == catItem.category &&
                            item.title
                              .toLowerCase()
                              .includes(search.toLocaleLowerCase())
                        )
                        .map((filterItem) => {
                          return (
                            <div
                              key={filterItem._id}
                              className="col-6 col-md-4 col-lg-3"
                            >
                              <Card
                                cardShoesItem={filterItem}
                                shoesSize={filterItem.size[0]}
                              ></Card>
                            </div>
                          );
                        })
                    : ""}
                </div>
              );
            })
          : ""}
      </div>

      <Footer />
    </>
  );
};
