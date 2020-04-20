import App from "../components/App";
import Profile from "../components/mypage/Profile";
import Pet from "../components/mypage/Pet";
import Task from "../components/mypage/Task";

const Index = () => {
  return (
    <App>
      <Profile />
      <Pet />
      <Task />
    </App>
  );
};

export default Index;
