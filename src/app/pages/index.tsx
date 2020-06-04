import { NextPage } from "next";
import App from "../components/App";
import Profile from "../components/mypage/Profile";
import TaskList from "../components/mypage/TaskList";

const Index: NextPage = () => {
  return (
    <App>
      <Profile />
      <TaskList />
    </App>
  );
};

export default Index;
