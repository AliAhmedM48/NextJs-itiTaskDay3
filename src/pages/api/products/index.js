import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'products.json');

export const readProducts = () => JSON.parse(fs.readFileSync(filePath));

export const writeProducts = (newData) => fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

export default function handler(req, res) {
    console.log("🚀 ~ handleProducts ~ req.body:", req.body)
    if (req.method === 'GET') {
        // * GET ALL
        //#region 
        console.log('GET ALL');
        const data = readProducts();
        console.log("🚀 ~ handleProducts ~ data:", data)
        res.status(200).json({ status: "success", products: data });
        //#endregion
    }
    else if (req.method === 'POST') {
        // * CREATE ONE
        //#region 
        console.log('CREATE ONE');
        let data = readProducts();
        req.body.id = data.length + 1
        data.unshift(req.body);
        console.log("🚀 ~ handleProducts ~ data:", data)
        writeProducts(data);
        res.status(200).json({ status: "success", products: data });
        //#endregion
    }
    else {
        // Return an error for unsupported HTTP methods
        res.status(405).json({ error: "Method Not Allowed" });
    }

}