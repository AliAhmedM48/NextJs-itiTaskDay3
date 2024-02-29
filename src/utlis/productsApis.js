const baseUrl = 'http://localhost:3000/api';

const productsGetAll = async () => {
    const res = await fetch(baseUrl + '/products')
    const data = await res.json();
    // console.log(data);
    return data
}

const productsGetOneById = async (id) => {
    console.log(id);
    const res = await fetch(baseUrl + '/products/' + id)
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data
}
const productUpdateOneById = async (id, newData) => {
    console.log(id);
    const res = await fetch(baseUrl + '/products/' + id,
        {
            method: 'PUT',
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json"
            }
        })
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data
}

const productDeleteById = async (id) => {
    const res = await fetch(baseUrl + '/products/' + id, { method: "DELETE" })
    const data = await res.json();
    console.log(data);
    return data
}
const productCreate = async (newProduct) => {
    const res = await fetch(baseUrl + '/products', {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
            "Content-Type": "application/json"
        }

    })
    const data = await res.json();
    console.log('PRODUCT_APIS-CREATE', data);
    return data
}

export {
    productsGetAll,
    productsGetOneById,
    productDeleteById,
    productCreate,
    productUpdateOneById
}