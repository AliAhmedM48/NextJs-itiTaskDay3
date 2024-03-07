import React, { useEffect, useState } from "react";
import ProductsCardComponent from "./ProductsCardComponent";
import LoadingScreen from "../LoadingScreen";
import { useSession } from "next-auth/react";
import { productDeleteById, productsGetAll, productsGetOneById } from "@/utlis/productsApis";
import ProductModal from "../Dashboard/ProductModal";
import { useRouter } from "next/router";

const ProdcutsComponent = (props) => {
  // const [initialProducts] = props.initialProducts;
  const [products, setProducts] = useState(props.products)
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [selectedProductToEdit, setSelectedProductToEdit] = useState(null);

  const { data: session } = useSession();
  const [listLength, setListLength] = useState(3);
  let router = useRouter()

  let isLogged = false;

  if (session) { isLogged = true };
  const fetchData = async () => {
    try {
      const json = await productsGetAll();
      setProducts(json.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    if (!session) router.push('/');
    if (session) setListLength(products.length);

    fetchData()

  }, [session, products])

  const handleEditProduct = async (id) => {
    try {
      const json = await productsGetOneById(id);
      console.log(json);
      setSelectedProductToEdit(json.product);
      setIsNewProductModalOpen(true);
    } catch (error) {
      console.error('Error fetching product by id:', error);

    }
  }

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedProductToEdit(null); // Reset selected product
    setIsNewProductModalOpen(false); // Close the modal
  };

  if (!products) return <LoadingScreen />

  return (
    <>

      <div className="text-center">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 gap-4'>
          {products?.slice(0, listLength).map((product) => (
            <ProductsCardComponent handleEditProduct={handleEditProduct} isLogged={isLogged} key={product.id} product={product} />
          ))}
        </div>

      </div>
      <div className='bg-black'>

        <ProductModal product={setProducts} products={products} selectedProductToEdit={selectedProductToEdit} isOpen={isNewProductModalOpen} onClose={handleCloseModal} />

      </div>
      <button
        onClick={() => setIsNewProductModalOpen(true)}
        className="group fixed right-10 bottom-10 inline-block focus:outline-none focus:ring" href="#">
        <span
          className="absolute inset-0 translate-x-1.5 rounded-full translate-y-1.5 bg-gray-800 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
        ></span>

        <span
          className="relative inline-block border-2 border-current rounded-full text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
        </span>
      </button>
    </>
  );
};

export default ProdcutsComponent;
