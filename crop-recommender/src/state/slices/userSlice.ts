import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserProfile = {
  location: string;
  state: string;
  acreage: number;
  soilType: string;
  budget: number;
  season?: string;
  multipleCrops: boolean;
  coordinates?: {
    lat: number;
    lon: number;
  };
};

type UserState = {
  profile: UserProfile;
};

const initialState: UserState = {
  profile: {
    location: "",
    state: "Karnataka",
    acreage: 5,
    soilType: "Loamy",
    budget: 50000,
    season: "Kharif",
    multipleCrops: false,
    coordinates: undefined
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
    },
    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      state.profile = { ...state.profile, ...action.payload };
    }
  }
});

export const { setProfile, updateProfile } = userSlice.actions;
export default userSlice.reducer;
