import {ProfileActionTypes, ADD_PROFILE, Profile, CHECK_PASS} from '../types/types'

export function addProfile(profile: Profile) : ProfileActionTypes {
    return {
        type: ADD_PROFILE,
        payload: profile
    }
}

export function checkPass(password: string[]) : ProfileActionTypes {
    return {
        type: CHECK_PASS,
        payload: password
    }
}