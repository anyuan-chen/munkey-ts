import "tailwindcss/tailwind.css";
import initAuth from "../util/initAuth";
import Head from "next/head";

initAuth();
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Munkey</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Component {...pageProps} />{" "}
    </>
  );
}

export default MyApp;
