import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import usersTasksReducer from "./slices/usersTasksSlice";
import timelineTasksReducer from "./slices/timelineTasksSlice";

// 後ほど作成するReducerをcombineReducersに入れる
const rootReducer = combineReducers({
  user: userReducer,
  usersTasks: usersTasksReducer,
  timelineTasks: timelineTasksReducer,
});
// ステートの型を指定するときに使用
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
