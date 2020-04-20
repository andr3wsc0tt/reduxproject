import {ProfileActionTypes, ADD_PROFILE, Profile} from '../types/types'

export function addProfile(profile: Profile) : ProfileActionTypes {
    return {
        type: ADD_PROFILE,
        payload: profile
    }
}