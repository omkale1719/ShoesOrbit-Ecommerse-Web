import React from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { Footer } from "../Components/Footer";
import { OfferText } from "../Components/OfferText/OfferText";
import { Card } from "../Components/Cards/Card";
import { useState } from "react";
import { useEffect } from "react";
import js from "@eslint/js";

export const Home = () => {
  const [shoesCat, setShoesCat] = useState([]);
  const [shoesItem, setShoesItem] = useState([]);
  const [search, setsearch] = useState("");

  const LoadData = async () => {
    let response = await fetch("http://localhost:5000/api/displayData", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
    });

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

      <div className="container">
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
                              className="col-12 col-md-6 col-lg-3"
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
