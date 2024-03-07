import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from "next/router";

export default function Navbar() {
  const { data: session } = useSession();
  let isLogged = false;

  if (session) { isLogged = true };
  let router = useRouter()


  return (
    <>
      <nav className="bg-gray-800 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">Logo
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                {isLogged && <Link href="/products" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Products
                </Link>}
                {/* {isLogged && <Link href="/news" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  News
                </Link>} */}
                {/* {isLogged && <Link href="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>} */}
                {/* <Link href="/concepts" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Next.JS Concepts
                </Link> */}
                {isLogged && <Link legacyBehavior href="/api/auth/signout" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <a onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}>sign Out</a>
                </Link>}
                {!isLogged && <Link legacyBehavior href="/api/auth/signin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <a onClick={(e) => {
                    e.preventDefault()
                    signIn()
                      .then(res => {

                        router.push('/dashboard');
                        console.log(res)
                      })


                  }}>sign In</a>
                </Link>}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
