import Image from "next/image";
import React from "react";

const CarouselComponent = (props) => {
  const { images } = props;
  console.log(images);
  return (
    <>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {
            images?.map((url) => (
              <div key={Math.random()} className="carousel-item active">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={url}
                  className="d-block w-100"
                  alt="..."
                  style={{ height: 300, width: "100%" }}
                />
              </div>
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default CarouselComponent;
