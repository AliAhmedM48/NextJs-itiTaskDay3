import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'products.json');

export const readProducts = () => JSON.parse(fs.readFileSync(filePath));

export const writeProducts = (newData) => fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

export default function handler(req, res) {
    if (req.method === 'GET') {
        // * GET ALL
        //#region 
        const data = readProducts();
        res.status(200).json({ status: "success", products: data });
        //#endregion
    }
    else if (req.method === 'POST') {
        // * CREATE ONE
        //#region 
        let data = readProducts();
        req.body.id = data.length + 1
        data.unshift(req.body);
        writeProducts(data);
        res.status(200).json({ status: "success", products: data });
        //#endregion
    }
    else {
        // Return an error for unsupported HTTP methods
        res.status(405).json({ error: "Method Not Allowed" });
    }

}