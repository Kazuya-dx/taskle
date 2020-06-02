import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const initialState: User | null = {
  uid: "",
  name: "",
  bio: "",
  icon: "0",
  owned_icons: [],
  background: "#fff",
  point: 0,
  coin: 0,
  is_guest: false,
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
        bio: action.payload.bio,
        icon: action.payload.icon,
        owned_icons: action.payload.owned_icons,
        background: action.payload.background,
        point: action.payload.point,
        coin: action.payload.coin,
        is_guest: action.payload.is_guest,
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
