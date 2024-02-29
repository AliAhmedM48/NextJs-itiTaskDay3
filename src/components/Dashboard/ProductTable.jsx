import { productDeleteById, productsGetAll, productsGetOneById } from '@/utlis/productsApis';
import React, { useEffect, useState } from 'react'
import ProductModal from './ProductModal';

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
    const [selectedProductToEdit, setSelectedProductToEdit] = useState(null);

    const fetchData = async () => {
        try {
            const json = await productsGetAll();
            setProducts(json.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    // * It is called initially when the component {mounts} and whenever {isNewProductModalOpen} changes.
    useEffect(() => { fetchData() }, [isNewProductModalOpen, selectedProductToEdit]);

    const handleDeleteProduct = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await productDeleteById(id);
            // Refresh the data after successful deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
        }


    };

    const handleEditProduct = async (id) => {
        console.log(id);
        try {
            const json = await productsGetOneById(id);
            console.log(json.product);
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

    return (<>
        {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

        <div className="container overflow-x-auto py-5">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Brand</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Stock</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">

                    {products.map(p => {
                        return (<>
                            <tr>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{p.title}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{p.price} $</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{p.brand}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{p.stock}</td>
                                <td className="whitespace-nowrap px-4 py-2">
                                    <button
                                        onClick={() => handleEditProduct(p.id)}
                                        href="#"
                                        className="inline-block rounded bg-gray-700 px-4 py-2 text-xs font-medium text-white hover:bg-gray-900"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2">
                                    <button
                                        onClick={() => { handleDeleteProduct(p.id) }}
                                        className="inline-block rounded bg-gray-700 px-4 py-2 text-xs font-medium text-white hover:bg-gray-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </>)
                    })}

                </tbody>
            </table>
        </div>
        <div className='bg-black'>

            <ProductModal selectedProductToEdit={selectedProductToEdit} isOpen={isNewProductModalOpen} onClose={handleCloseModal} />

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
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
            </span>
        </button>
    </>)
}

export default ProductTable