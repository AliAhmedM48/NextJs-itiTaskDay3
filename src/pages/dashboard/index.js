import ProductTable from '@/components/Dashboard/ProductTable'
import Head from 'next/head'

function index() {

    return (
        <div className='py-4'>
            <Head>
                <title>Dashboard</title>
            </Head>
            <h1 className='text-center'>Products Management [CRUD operations]</h1>
            <ProductTable />
        </div>
    )
}

export default index