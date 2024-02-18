"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Gallery = () => {
  const numberOfImages = 58;
  const [selectedImg, setSelectedImg] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [images, setImages] = useState([]);

  // Function to shuffle array, defined outside of useEffect to ensure it's only created once
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
    return shuffledArray;
  };

  // useEffect to initialize images only on component mount
  useEffect(() => {
    const initialImages = Array.from(
      { length: numberOfImages },
      (_, index) => `Image${index + 1}.jpeg`
    );
    setImages(shuffleArray(initialImages)); // Shuffle and set images only once
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleImageClick = (imgSrc) => {
    setSelectedImg(imgSrc);
    setIsZoomed(true);
  };

  return (
    <div className="relative">
      <div
        className="min-h-screen bg-fixed bg-cover bg-center p-4"
        style={{ backgroundImage: "url('/background-image.avif')" }}
      >
        <div className="opacity-90 backdrop-filter backdrop-blur-lg rounded-lg p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
            {images.map((filename, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleImageClick(`/images/${filename}`)}
              >
                <Image
                  src={`/images/${filename}`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  height={800}
                  width={500}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedImg && isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <div className="max-w-3xl max-h-full p-4">
            <img
              src={selectedImg}
              alt="Zoomed"
              className="max-w-full max-h-screen rounded-lg shadow-xl transform transition-all duration-500 ease-in-out"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
