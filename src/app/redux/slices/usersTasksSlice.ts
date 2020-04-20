import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/task";

const initialState: Task[] = [];

const usersTasksSlice = createSlice({
  name: "usersTasks",
  initialState,
  reducers: {
    setUsersTasks: (state: Task[], action: PayloadAction<Task[]>) => {
      if (state === null) {
        console.log("State is null");
      }
      return action.payload;
    },
    addUsersTasks: (state: Task[], action: PayloadAction<Task>) => {
      if (state === null) {
        console.log("State is null");
      }
      const newState = [action.payload, ...state];
      return newState;
    },
  },
});

export const { setUsersTasks, addUsersTasks } = usersTasksSlice.actions;

export default usersTasksSlice.reducer;
