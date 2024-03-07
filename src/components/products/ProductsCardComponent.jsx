import { productDeleteById } from "@/utlis/productsApis";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductsCardComponent = (props) => {
  const { handleEditProduct } = props;
  const { id, thumbnail, title, description, brand, price } = props.product;
  const { isLogged } = props

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await productDeleteById(id);
      // Refresh the data after successful deletion
      // fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

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
          <div className="flex justify-between">

            {isLogged &&
              <>
                <Link
                  href={"/products/" + id.toString()}
                  className="btn btn-dark text-white"
                >
                  See More...
                </Link>

                <div className="space-x-4">
                  <button
                    id="edit-button"
                    onClick={() => handleEditProduct(id)}

                    className="p-2">
                    <svg className="hover:scale-125 transition-all lucide lucide-file-pen-line" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M8 18h1" /><path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" /></svg>
                  </button>
                  <button
                    id="delete-button"
                    onClick={() => handleDeleteProduct(id)}>
                    <svg className="hover:scale-125 transition-all lucide lucide-file-x" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="m14.5 12.5-5 5" /><path d="m9.5 12.5 5 5" /></svg>
                  </button>
                </div>

              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCardComponent;
