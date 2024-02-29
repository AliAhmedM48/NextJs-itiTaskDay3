import { productCreate, productUpdateOneById } from '@/utlis/productsApis';
import { useEffect, useState } from 'react';

function ProductModal({ isOpen, onClose, selectedProductToEdit }) {
    const initialFormValues = {
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        rating: '',
        stock: '',
        brand: '',
        category: '',
        thumbnail: '',
        images: []
    };
    const [formData, setFormData] = useState(initialFormValues);
    console.log(selectedProductToEdit);
    useEffect(() => { if (selectedProductToEdit) setFormData(selectedProductToEdit); else setFormData(initialFormValues); }, [selectedProductToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission
        // For example, you can send formData to an API endpoint
        console.log(formData);
        const { title, price, brand, stock } = formData
        if (!title || !price || !brand || !stock) return alert('invalid data')

        if (selectedProductToEdit) {
            const id = selectedProductToEdit.id;
            console.log(id);
            productUpdateOneById(id, formData).
                then(json => {
                    onClose();
                    console.log();
                    console.log(json.products[json.updatedProductIndex])
                })
                .catch(err => console.error('Error updating product:', err))

        }
        else {
            productCreate(formData)
                .then(res => {
                    onClose();
                    console.log(res);
                })
                .catch(err => console.log('Error creating product:', err));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        console.log(name);

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        {/* <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span> */}
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h1 className='text-center h3'>{selectedProductToEdit ? 'Update' : 'Add'}</h1>
                                    {/* Form fields */}

                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                                        <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">Brand:</label>
                                        <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
                                        <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    {/* Add more form fields for other properties */}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Submit
                                    </button>
                                    <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductModal;
