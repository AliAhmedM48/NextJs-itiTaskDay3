import React, { useEffect, useState } from "react";
import ProductsCardComponent from "./ProductsCardComponent";
import LoadingScreen from "../LoadingScreen";
import { useSession } from "next-auth/react";

const ProdcutsComponent = (props) => {
  const { products } = props;
  const { data: session } = useSession();
  const [listLength, setListLength] = useState(3);

  let isLogged = false;

  if (session) { isLogged = true };
  console.log(isLogged);

  useEffect(() => {
    if (session) setListLength(products.length);
    console.log(listLength);
    console.log(session);
  }, [session])

  if (!products) return <LoadingScreen />
  return (
    <div className="text-center">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 gap-4'>
        {products?.slice(0, listLength).map((product) => (
          <ProductsCardComponent isLogged={isLogged} key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProdcutsComponent;
