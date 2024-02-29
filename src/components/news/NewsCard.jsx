import Image from 'next/image';
import React from 'react';

const NewsCard = (props) => {
    const { article } = props;
    // console.log(article);
    return (
        <article className="overflow-hidden rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <div className='overflow-hidden'>


                {
                    article.urlToImage ?

                        <img
                            alt=""
                            sizes='100vw'
                            width={0}
                            height={0}
                            // src='https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM='
                            src={article.urlToImage}
                            className="h-56 w-full object-cover hover:scale-125 transition-all duration-1000"
                        />
                        :

                        <img
                            alt=""
                            sizes='100vw'
                            width={0}
                            height={0}
                            src='https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM='
                            // src={article.urlToImage}
                            className="h-56 w-full object-cover hover:scale-125 transition-all duration-1000"
                        />
                }



            </div>

            <div className="bg-white p-4 sm:p-6">
                <time dateTime={article.date} className="block text-xs text-gray-500">{article.date}</time>

                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="mt-0.5 text-lg text-gray-900">{article.title}</h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm text-gray-500">{article.description}</p>
            </div>
        </article>
    );
};

export default NewsCard;
