import { NextPage } from "next";
import App from "../components/App";
import Profile from "../components/mypage/Profile";
import Task from "../components/mypage/Task";

const Index: NextPage = () => {
  return (
    <App>
      <Profile />
      <Task />
    </App>
  );
};

export default Index;
