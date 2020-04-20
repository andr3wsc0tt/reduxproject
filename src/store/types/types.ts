export interface Profile {
    id: number,
    name: string,
    aboutMe: string
}

export interface ProfileState {
    profiles: Profile[]
}

export const ADD_PROFILE = "ADD_PROFILE";

interface addProfile {
    type: typeof ADD_PROFILE,
    payload: Profile
}

export type ProfileActionTypes = addProfile;