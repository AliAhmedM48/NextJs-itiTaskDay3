import React from 'react'
import StarRating from './StarRating'

function TestimonialCard() {
    const feedbak = {
        image: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        name: "Ali",
        description: "llll",
        rating: "3"
    }
    return (
        <>
            <div className="mb-8 sm:break-inside-avoid">
                <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                    <div className="flex items-center gap-4">
                        <img
                            alt=""
                            src={feedbak.image}
                            className="size-14 rounded-full object-cover"
                        />

                        <div>
                            <div className="flex justify-center gap-0.5 text-green-500">

                                {[1, 2, 3].map(() => <StarRating key={Math.random()} />)}
                            </div>

                            <p className="mt-0.5 text-lg font-medium text-gray-900">
                                {feedbak.name}
                            </p>
                        </div>
                    </div>

                    <p className="mt-4 text-gray-700">
                        {feedbak.description}

                    </p>
                </blockquote>
            </div>

        </>
    )
}

export default TestimonialCard