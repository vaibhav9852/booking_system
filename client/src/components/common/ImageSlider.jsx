import { useState } from "react";

const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        <img
          src={images[currentImageIndex]}
          alt="slider"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            onClick={prevImage}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={nextImage}
            className="bg-black  bg-opacity-50 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>
    );
  };
  
  export default ImageSlider;
