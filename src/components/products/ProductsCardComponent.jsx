import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductsCardComponent = (props) => {
  const { id, thumbnail, title, description, brand, price } = props.product;
  const { isLogged } = props
  console.log(isLogged);
  return (
    <div className="">
      <div className="card text-start">
        {
          thumbnail ?
            <Image
              src={thumbnail}
              className="card-img-top"
              width={0}
              height={0}
              sizes="100vw"
              alt="..."
              style={{ width: '100%', height: '200px' }} // optional
            />



            :
            <Image
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png'
              className="card-img-top"
              width={0}
              height={0}
              sizes="100vw"
              alt="..."
              style={{ width: '100%', height: '200px' }} // optional
            />

        }
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text description">{description}</p>
          <p>
            Brand: <span>{brand}</span>
          </p>
          <p>
            Price: <span>{price}</span>
          </p>
          {isLogged && <Link
            href={"/products/" + id.toString()}
            className="btn btn-dark text-white"
          >
            See More...
          </Link>}
        </div>
      </div>
    </div>
  );
};

export default ProductsCardComponent;
