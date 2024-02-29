import React from 'react'
import TestimonialCard from './TestimonialCard';

function Testimonial() {
    return (
        <>
            <section className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Read trusted reviews from our customers
                    </h2>

                    <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
                        {
                            [1, 2, 3, 4, 5].slice(0, 3).map(t => <TestimonialCard key={Math.random()} />)
                        }


                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonial