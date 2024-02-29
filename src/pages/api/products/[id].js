import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'products.json');

export const readProducts = () => JSON.parse(fs.readFileSync(filePath));

export const writeProducts = (newData) => fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

export default function handler(req, res) {
    const { id } = req.query;
    console.log(id);
    // const id = req.headers['x-invoke-path'].split('/')[3];
    // console.log(req.headers['x-invoke-path'].split('/')[3]);
    // console.log(req.query);
    // console.log(id);
    if (req.method === 'GET') {
        // * GET ONE
        //#region 
        console.log('GET ONE');

        const product = readProducts().find(product => product.id === parseInt(id));

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json({ status: 'success', product });
        }

    } else if (req.method === 'PUT') {
        // * UPDATE ONE
        //#region 
        console.log('UPDATE ONE');
        const newDate = req.body;
        console.log("🚀 ~ handler ~ req.body:", req.body)
        const products = readProducts();
        console.log(newDate);
        const productIndex = products.findIndex(product => product.id === parseInt(id));

        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...newDate }
            writeProducts(products)
            res.status(200).json({ status: 'success', products: products, updatedProductIndex: productIndex });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }

    }

    else if (req.method === 'DELETE') {
        console.log('DELETE');
        //#region 4
        const data = readProducts().filter(product => product.id !== parseInt(id));
        writeProducts(data)
        res.status(200).json({ status: "success", products: data });
        //#endregion
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
