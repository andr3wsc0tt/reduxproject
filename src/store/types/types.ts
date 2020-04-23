export interface Profile {
    id: number,
    name: string,
    aboutMe: string,
    password: string,
    loggedIn: boolean
}

export interface ProfileState {
    profiles: Profile[],
    loggedIn: boolean
}

export const ADD_PROFILE = "ADD_PROFILE";
export const CHECK_PASS = "CHECK_PASS";
export const LOG_OUT = "LOG_OUT";

interface addProfile {
    type: typeof ADD_PROFILE,
    payload: Profile
}
interface checkPass {
    type: typeof CHECK_PASS,
    payload: string[]
}

interface logOut {
    type: typeof LOG_OUT,
    payload: Profile
}

export type ProfileActionTypes = addProfile | checkPass | logOut;