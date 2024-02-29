import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Error = () => {
    return (
        <>
            <Head>
                <title>Not Found</title>
            </Head>
            <div className='bg-dark text-white fs-1 d-flex flex-column gap-5 align-items-center justify-content-center vh-100'>
                <h1>404 - Page not found</h1>
                <Link className='rounded btn btn-warning h4 text-dark px-4 py-2' href="/">Home</Link>
            </div>
        </>
    );
};

export default Error;

Error.getLayout = (page) => <>{page}</>;