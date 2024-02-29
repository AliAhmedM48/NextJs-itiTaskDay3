import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductsCardComponent from "./products/ProductsCardComponent";
import LoadingScreen from "./LoadingScreen";
import NewsCard from "./news/NewsCard";
const HomeComponent = () => {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getProducts() {
    setIsLoading(true);

    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(json => {
        setIsLoading(false)
        setProducts(json.products)
        console.log(products);
      })
      .catch(err => {
        console.log(err);
        setProducts(null)
      })
  }
  function getNews() {
    const api = 'https://newsapi.org/v2/everything?q=tesla&from=2024-01-28&sortBy=publishedAt&apiKey=03e274ff76704186912d79634e8ba545'

    setIsLoading(true);
    fetch(api)
      .then(res => res.json())
      .then(json => {
        setIsLoading(false)
        setNews(json.articles)
      })
      .catch(err => {
        console.log(err);

        setNews(null)
      })

  }
  useEffect(() => {
    getProducts();
    getNews();
  }, []);
  if (isLoading) return <LoadingScreen />;
  return (
    <>
      <section className="bg-gray-50 h-full">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
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
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
              dicta incidunt est ipsam, officia dolor fugit natus?
            </p>
          </header>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products?.slice(0, 4).map((product) => (
              <ProductsCardComponent key={product.id} product={product} />
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-gray-800 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/products"
            >
              All Products
            </Link>


          </div>
        </div>
      </section>
      <section>
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
      </section>
    </>
  );
};

export default HomeComponent;
