import fetch from "node-fetch";

import App from "../components/App";
import Profile from "../components/mypage/Profile";
import Pet from "../components/mypage/Pet";
import Task from "../components/mypage/Task";

// ビルド時に実行される
export async function getStaticProps() {
  const tasksRes = await fetch(
    "https://us-central1-taskleapp.cloudfunctions.net/nextApp/api/test"
  );
  const tasksJson = await tasksRes.json();
  // *** DEBUG ***
  console.log(tasksJson);

  return {
    props: {
      tasksJson,
    },
  };
}

const Index = ({ tasksJson }) => {
  return (
    <App>
      <h3>マイページ</h3>
      <Profile />
      <Pet />
      <Task>{tasksJson}</Task>
    </App>
  );
};

export default Index;
