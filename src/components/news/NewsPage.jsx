import React from 'react'
import NewsCard from './NewsCard'

function NewsPage(props) {
    const { news } = props;
    console.log(news);
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 gap-4'>
                {news.map(item => (<NewsCard key={Math.random()} article={item} />))}
            </div>
        </>
    )
}

export default NewsPage