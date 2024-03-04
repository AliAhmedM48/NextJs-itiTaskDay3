import ProductTable from '@/components/Dashboard/ProductTable'
import LoadingScreen from '@/components/LoadingScreen';
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function index() {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        // If user is not logged in, prevent him to reach to dashboard
        if (!session) {
            router.push('/');
        }
    }, [session]);

    if (!session) {
        return <LoadingScreen />;
    }
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