import { StringLiteral } from "@babel/types";

export interface Profile {
  id: number;
  name: string;
  aboutMe: string;
  password: string;
  loggedIn: boolean;
  city: string;
  cohort:string;
  programming: string;
  spoken: string
}

export interface ProfileState {
  profiles: Profile[];
  loggedIn: boolean;
  numUsers: number;
}

export const ADD_PROFILE = "ADD_PROFILE";
export const CHECK_PASS = "CHECK_PASS";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

interface addProfile {
  type: typeof ADD_PROFILE;
  payload: Profile;
}
interface checkPass {
  type: typeof CHECK_PASS;
  payload: string[];
}

interface logOut {
  type: typeof LOG_OUT;
  payload: Profile;
}

interface updateProfile {
    type: typeof UPDATE_PROFILE,
    payload: string[]
}

export type ProfileActionTypes = addProfile | checkPass | logOut | updateProfile;
