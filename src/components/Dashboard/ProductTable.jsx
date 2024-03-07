import { productDeleteById, productsGetAll, productsGetOneById } from '@/utlis/productsApis';
import React, { useEffect, useState } from 'react'
import ProductModal from './ProductModal';

function ProductTable() {
    const [products, setProducts] = useState([]);

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

    </>)
}

export default ProductTable