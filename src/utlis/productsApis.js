const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

const productsGetAll = async () => {
    const res = await fetch(baseUrl + '/products')
    const data = await res.json();
    return data
}

const productsGetOneById = async (id) => {
    const res = await fetch(baseUrl + '/products/' + id)
    const data = await res.json();
    return data
}
const productUpdateOneById = async (id, newData) => {
    const res = await fetch(baseUrl + '/products/' + id,
        {
            method: 'PUT',
            body: JSON.stringify(newData),
            headers: {
                "Content-Type": "application/json"
            }
        })
    const data = await res.json();
    return data
}

const productDeleteById = async (id) => {
    const res = await fetch(baseUrl + '/products/' + id, { method: "DELETE" })
    const data = await res.json();
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
    return data
}

export {
    productsGetAll,
    productsGetOneById,
    productDeleteById,
    productCreate,
    productUpdateOneById
}