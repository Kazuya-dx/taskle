import { NextPage } from "next";
import App from "../components/App";
import ShopList from "../components/shop/ShopList";

const Shop: NextPage = () => (
  <App>
    <p>ショップ</p>
    <ShopList />
  </App>
);

export default Shop;
