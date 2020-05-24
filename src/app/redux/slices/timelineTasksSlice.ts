import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  uid: string;
  user_name: string;
  title: string;
  text: string;
  created_at: string;
  good: number;
  is_private: boolean;
  tags: { id: string; name: string }[];
}

const initialState: Task[] = [];

const timelineTasksSlice = createSlice({
  name: "timelineTasks",
  initialState,
  reducers: {
    setTimelineTasks: (state: Task[], action: PayloadAction<Task[]>) => {
      if (state === null) {
        console.log("State is null");
      }
      return action.payload;
    },
  },
});

export const { setTimelineTasks } = timelineTasksSlice.actions;

export default timelineTasksSlice.reducer;
