import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/task";

const initialState: Task[] = [];

const usersTasksSlice = createSlice({
  name: "usersTasks",
  initialState,
  reducers: {
    setUsersTasks: (state: Task[] | null, action: PayloadAction<Task[]>) => {
      console.log(action);
      if (state === null) {
        console.log("State is null");
      }
      return action.payload;
    },
  },
});

export const { setUsersTasks } = usersTasksSlice.actions;

export default usersTasksSlice.reducer;
