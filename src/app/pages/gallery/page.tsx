"use client";
import React, { useEffect, useState } from "react";
import images from "../../image.js";
import styles from "./page.module.css";
import Image from "next/image";
import Head from "next/head";
import { FaHeart } from "react-icons/fa";

async function getData() {
  const res = await fetch("https://api.example.com/...");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [doubleClicked, setDoubleClicked] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);
  const token = localStorage.getItem("token");


  useEffect(() => {}, []);

  const handleDoubleClick = () => {
    setDoubleClicked(!doubleClicked);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilteredImages(category, query); // Update filtered images when category changes
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setQuery(query);
    updateFilteredImages(selectedCategory, query); // Update filtered images when search query changes
  };

  const updateFilteredImages = (category: string, query: string) => {
    let updatedImages = images;

    if (category !== "all") {
      updatedImages = updatedImages.filter((image) => image.category === category);
    }

    if (query !== "") {
      updatedImages = updatedImages.filter((image) => image.title.includes(query));
    }

    setFilteredImages(updatedImages);
  };

  return (
    <div className="vh-100 margin-gallery">
      {token ? (
        <>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <button
              onClick={() => handleCategoryChange("all")}
              className={selectedCategory === "all" ? "active" : "image6"}
            >
              All
            </button>
            <button
              className={selectedCategory === "nature" ? "active" : ""}
              onClick={() => handleCategoryChange("nature")}
            >
              Nature
            </button>
            <button
              className={selectedCategory === "animals" ? "active" : ""}
              onClick={() => handleCategoryChange("animals")}
            >
              Animals
            </button>
            <form>
              {/* <input type="text" name="search" onChange={(e) => handleSearch(e)} placeholder="Search images..." /> */}
              <input type="text" name="search" value={query} onChange={handleSearch} placeholder="Search images..." />
              <button type="submit">Search</button>
            </form>
            {/* Add more category buttons */}
          </div>
          <div>
            {filteredImages.map((image) => (
              <>
                <Image
                  key={image.src}
                  className="gallery-image"
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={160}
                  placeholder="blur"
                  loading="lazy"
                  blurDataURL="data:image/jpeg..."
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  // style={{ height: "100%", width: "100%" }}
                  layout="intrinsic"
                  onDoubleClick={handleDoubleClick}
                />
                {/* {doubleClicked && <FaHeart className="heartIcon" />} */}
                {/* <main className={styles.main}>
              <div className={styles.grid}>
                {images.map((image, index) => (
                  <div key={index} className="gallery-container">
                    <Image
                      src={`${image.src}`}
                      alt={image.alt}
                      className="gallery-image"
                      width={320}
                      height={200}
                      priority
                    />
                  </div>
                ))}
              </div>
            </main> */}
              </>
            ))}
          </div>
        </>
      ) : (
        <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
          <h1>Authentication Error</h1>
        </div>
      )}
    </div>
  );
}

export default Gallery;
