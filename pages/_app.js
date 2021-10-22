import "tailwindcss/tailwind.css";
import initAuth from "../util/initAuth";

initAuth();
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
