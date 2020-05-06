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
    deleteUsersTasks: (state: Task[], action: PayloadAction<Task>) => {
      const newState = state.filter((value) => {
        return action.payload.id !== value.id;
      });
      return newState;
    },
  },
});

export const {
  setUsersTasks,
  addUsersTasks,
  deleteUsersTasks,
} = usersTasksSlice.actions;

export default usersTasksSlice.reducer;
