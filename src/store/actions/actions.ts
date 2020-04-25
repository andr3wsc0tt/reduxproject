import {
  ProfileActionTypes,
  ADD_PROFILE,
  Profile,
  CHECK_PASS,
  LOG_OUT,
  UPDATE_PROFILE
} from "../types/types";


// The 4 different action definitions we have. These are DEFINED in types.ts
export function addProfile(profile: Profile): ProfileActionTypes {
  return {
    type: ADD_PROFILE,
    payload: profile
  };
}

export function checkPass(password: string[]): ProfileActionTypes {
  return {
    type: CHECK_PASS,
    payload: password
  };
}

export function logOut(profile: Profile): ProfileActionTypes {
  return {
    type: LOG_OUT,
    payload: profile
  };
}

export function updateProfile(fields: string[]) : ProfileActionTypes {
    return {
        type: UPDATE_PROFILE,
        payload: fields
    }
}