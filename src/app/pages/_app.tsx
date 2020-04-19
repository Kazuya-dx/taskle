import { AppProps } from "next/app";
import Auth from "../components/Auth";
import "../styles.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth>
      <Component {...pageProps} />
    </Auth>
  );
}

export default MyApp;
