import LoadingScreen from '@/components/LoadingScreen';
import ProdcutsComponent from '@/components/products/ProdcutsComponent';
import { productsGetAll } from '@/utlis/productsApis';
import Head from 'next/head';
import React from 'react';

let isLoading = false;

export async function getServerSideProps() {
    const data = await productsGetAll();
    return {
        props: {
            initialProducts: data
        }
    }
}

// export async function getStaticProps() {
//     const data = await productsGetAll();
//     console.log(data);
//     return {
//         props: {
//             products: data
//         }

//     }
// }

const index = ({ initialProducts }) => {
    if (isLoading) return <LoadingScreen />
    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <div className='container'><ProdcutsComponent {...initialProducts} /></div>
        </>
    );
};

export default index;

