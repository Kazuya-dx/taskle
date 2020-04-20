import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const initialState: User | null = {
  uid: "hogeid",
  name: "hogename",
  point: 123,
  coin: 123,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 認証完了後、ステートにユーザー情報を代入。
    setUser: (state: User | null, action: PayloadAction<User>) => {
      if (state === null) {
        console.log("State is null");
      }
      let newState = {
        uid: action.payload.uid,
        name: action.payload.name,
        point: action.payload.point,
        coin: action.payload.coin,
      };
      return newState;
    },
    // Unmounting時、データをクリア。
    clearUser: (state: User | null, action: PayloadAction<string>) => {
      console.log(action);
      if (state === null) {
        console.log("State is null");
      }
      state = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;