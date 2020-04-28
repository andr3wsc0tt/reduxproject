export interface Profile { // Template for our Profile type
  id: number;
  name: string;
  aboutMe: string;
  password: string;
  loggedIn: boolean;
  city: string;
  cohort:string;
  spoken: string;
  programming: string
 
}

export interface ProfileState { // Template for our Profile State
  profiles: Profile[];
  loggedIn: boolean;
  numUsers: number;
}
 // The 4 reducers TYPES we have!
export const ADD_PROFILE = "ADD_PROFILE";
export const CHECK_PASS = "CHECK_PASS";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE";


// The templates for our reducers and their TYPE and the payload that they expect!
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

// export the different actions into on ActionType variable
export type ProfileActionTypes = addProfile | checkPass | logOut | updateProfile;
