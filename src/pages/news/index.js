import NewsPage from '@/components/news/NewsPage';
import { redirect } from 'next/dist/server/api-utils';
import Head from 'next/head';
import React from 'react'

export async function getServerSideProps(context) {
    console.log(context);
    try {
        const api = 'https://newsapi.org/v2/everything?q=tesla&from=2024-01-28&sortBy=publishedAt&apiKey=03e274ff76704186912d79634e8ba545'
        const response = await fetch(api);
        const data = await response.json()
        console.log(data);
        return {
            props: {
                news: data.articles
            }
        }
    } catch (error) {
        console.log(error);
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }
}

export default function index({ news }) {
    return (
        <>
            <Head>
                <title>News</title>
            </Head>
            <div className='container'>

                <NewsPage news={news} />
            </div>
        </>
    )
}
