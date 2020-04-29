import App from "../components/App";
import TimeLineTasks from "../components/timeline/TimeLineTasks";
import { NextPage } from "next";

const Timeline: NextPage = () => (
  <App>
    <p>タイムライン</p>
    <TimeLineTasks />
  </App>
);

export default Timeline;
