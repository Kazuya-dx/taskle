import { AppProps } from "next/app";
import Auth from "../components/Auth";
import "../styles.scss";

// Redux関連のライブラリやファイル
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Provider>
  );
}

export default MyApp;
