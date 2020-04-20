import {ProfileState, ADD_PROFILE, ProfileActionTypes} from '../types/types'

const initialState : ProfileState = {
    profiles: [
        {
            id: 1,
            name: "Andrew",
            aboutMe: "I'm Andrew"
        }
    ]
}

export function profileReducer(state = initialState, action: ProfileActionTypes) : ProfileState {
    switch(action.type){
        case ADD_PROFILE:
            return{
                ...state,
                profiles: [...state.profiles, action.payload]
            }
        default:
            return state;
    }
}