import { useRouter } from "next/router";
import React from "react";
import CarouselComponent from "./CarouselComponent";
import Image from "next/image";

const ProductDetailsComponent = ({ product }) => {
  const { thumbnail, title, category, rating, price, description, images } = product;
  const router = useRouter();

  function handleBack() {
    //  router.push("/products");
    router.back();
  }
  return (
    <>
      <div className="container card pt-5 pb-4 my-5">
        <figure className="text-center">
          <Image
            className="mx-auto text-center"
            src={thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '50%', height: 'auto' }}
            alt={title}
          />
        </figure>
        <div className="row">
          <div className="col-md-6">
            <CarouselComponent images={images} />
          </div>
          <div className="col-md-6">
            <h1 className="h5">{title}</h1>
            <p>
              Category: <span>{category}</span>
            </p>
            <p>
              Rate: <span>{rating}</span>
            </p>
            <p>
              Description: <span>{description}</span>
            </p>
            <p>
              Price: <span>{price}</span>
            </p>
          </div>
        </div>
        <button onClick={handleBack} className="btn btn-dark text-white mt-4">
          Back
        </button>
      </div>
    </>
  );
};
export default ProductDetailsComponent;
