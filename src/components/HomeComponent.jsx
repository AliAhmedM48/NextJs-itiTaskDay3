import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductsCardComponent from "./products/ProductsCardComponent";
import LoadingScreen from "./LoadingScreen";
import NewsCard from "./news/NewsCard";
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { productsGetAll, productsGetOneById } from "@/utlis/productsApis";
import ProductModal from "./Dashboard/ProductModal";

const HomeComponent = (props) => {
  // const { products } = props;
  const [products, setProducts] = useState(props.products)
  const [selectedProductToEdit, setSelectedProductToEdit] = useState(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  // const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let router = useRouter()

  const handleButtonClick = () => { isLogged ? router.push('/products') : toast.error('Go to Sign In!') };
  const { data: session } = useSession();
  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedProductToEdit(null); // Reset selected product
    setIsNewProductModalOpen(false); // Close the modal
  };
  const fetchData = async () => {
    try {
      const json = await productsGetAll();
      setProducts(json.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


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


  useEffect(() => {
    fetchData()

  }, [session, products])

  let isLogged = false;

  if (session) { isLogged = true };

  // function getProducts() {
  //   setIsLoading(true);

  //   fetch('https://dummyjson.com/products')
  //     .then(res => res.json())
  //     .then(json => {
  //       setIsLoading(false)
  //       setProducts(json.products)
  //       console.log(products);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setProducts(null)
  //     })
  // }


  // function getNews() {
  //   const api = 'https://newsapi.org/v2/everything?q=tesla&apiKey=03e274ff76704186912d79634e8ba545'

  //   setIsLoading(true);
  //   fetch(api)
  //     .then(res => res.json())
  //     .then(json => {
  //       setIsLoading(false)
  //       setNews(json.articles)
  //     })
  //     .catch(err => {
  //       console.log(err);

  //       setNews(null)
  //     })

  // }
  // useEffect(() => { getProducts(); getNews(); }, []);
  // if (isLoading) return <LoadingScreen />;
  return (
    <>
      <Toaster position="bottom-center" />

      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl  px-4 py-32 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to
              <strong className="font-extrabold text-red-700 sm:block">Our Website!  </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Discover the latest trends and innovations in our industry-leading products.          </p>
            <p>Stay informed with our reliable news updates.</p>

            {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-gray-800 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/products"
              >
                Products
              </Link>

              <Link
                className="block w-full rounded px-12 py-3 text-sm font-medium text-gray-800 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                href="/news"
              >
                News
              </Link>
            </div> */}
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 h-screen py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
              dicta incidunt est ipsam, officia dolor fugit natus?
            </p>
          </header>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products?.slice(0, 4).map((product) => (
              <ProductsCardComponent handleEditProduct={handleEditProduct} key={product.id} product={product} />
            ))}
          </ul>
          <div className="mt-20 flex flex-wrap justify-center gap-4">
            <button

              onClick={handleButtonClick}
              className="block w-full rounded bg-gray-800 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            // href="/products"
            >
              Show more...
            </button>


          </div>
        </div>
      </section>
      {/*  <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Latest News</h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
              dicta incidunt est ipsam, officia dolor fugit natus?
            </p>
          </header>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {news?.slice(0, 4).map(item => (<NewsCard key={Math.random()} article={item} />))}
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-gray-800 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/news"
            >
              All News
            </Link>


          </div>
        </div>
      </section> */}

      <div className='bg-black'>

        <ProductModal product={setProducts} products={products} selectedProductToEdit={selectedProductToEdit} isOpen={isNewProductModalOpen} onClose={handleCloseModal} />

      </div>

      {/* {isLogged &&
        <button
          onClick={() => setIsNewProductModalOpen(true)}
          className="group fixed right-10 bottom-10 inline-block focus:outline-none focus:ring" href="#">
          <span
            className="absolute inset-0 translate-x-1.5 rounded-full translate-y-1.5 bg-gray-800 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>

          <span
            className="relative inline-block border-2 border-current rounded-full text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
          </span>
        </button>} */}
    </>
  );
};

export default HomeComponent;
