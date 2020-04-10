import App from "../components/App";
import Profile from "../components/mypage/Profile";
import Button from "../components/mypage/Button";
import Pet from "../components/mypage/Pet";

export default () => {
  return (
    <App>
      <h3>マイページ</h3>
      <Profile />
      <Pet />
      <Button />
    </App>
  );
};
