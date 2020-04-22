import {ProfileState, ADD_PROFILE, ProfileActionTypes, CHECK_PASS} from '../types/types'

const initialState : ProfileState = {
    profiles: [
        {
            id: 1,
            name: "Andrew",
            aboutMe: "I'm Andrew",
            password: "password"
        }
    ],
    loggedIn: false
}

export function profileReducer(state = initialState, action: ProfileActionTypes) : ProfileState {
    switch(action.type){
        case ADD_PROFILE:
            return{
                ...state,
                profiles: [...state.profiles, action.payload]
            }
        case CHECK_PASS:
            let cred = state.loggedIn;
            const uName = state.profiles.filter(profile => profile.name == action.payload[0]);
            
            if (uName.length){
                if (uName[0].password == action.payload[1])
                    cred = true;
            }
            return{
                ...state,
                loggedIn : cred
            }
        default:
            return state;
    }
}