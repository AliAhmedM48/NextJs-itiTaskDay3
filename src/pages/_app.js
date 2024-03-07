import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import "bootstrap/dist/css/bootstrap.css"

// ! import "bootstrap/dist/css/bootstrap.min.js"
import { useEffect } from "react";
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  // * firstly create DOM, then import bootstrap js
  useEffect(() => { import("bootstrap/dist/js/bootstrap.min.js") }, []);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <>
      <SessionProvider session={session}>
        <div className="">
          <Navbar />
          <div className="">
            <Component {...pageProps} />
          </div>
        </div>
      </SessionProvider>
    </>
  );
}
