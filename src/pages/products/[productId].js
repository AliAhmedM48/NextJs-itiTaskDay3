import ProductDetailsComponent from '@/components/products/ProductDetailsComponent';
import { productsGetOneById } from '@/utlis/productsApis';
import Head from 'next/head';
import React from 'react';

export async function getStaticPaths() {
    return {
        paths: [
            { params: { productId: '1' } },
            { params: { productId: '2' } },
            { params: { productId: '3' } },
        ],
        fallback: 'blocking',
    }
}
export async function getStaticProps(context) {
    const { params } = context;
    console.log(params.productId);

    const data = await productsGetOneById(params.productId)
    console.log(data);
    return {
        props: {
            details: data
        },
    }
}


const ProductId = ({ details }) => {

    return (
        <>
            <Head>
                <title>Product Details</title>
            </Head>
            <ProductDetailsComponent {...details} />);
        </>
    )
};
export default ProductId;
