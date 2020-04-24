import {
  ProfileState,
  ADD_PROFILE,
  ProfileActionTypes,
  CHECK_PASS,
  LOG_OUT,
  UPDATE_PROFILE
} from "../types/types";

import { identifier } from "@babel/types";

let initialState: ProfileState = {
  profiles: [
    {
      id: 1,
      name: "Andrew",
      aboutMe: "I'm Andrew",
      password: "password",
      loggedIn: false,
      city:"",
      cohort: "",
      programming:"",
      spoken: ""
    },
    {
      id: 2,
      name: "Mo",
      aboutMe: "I'm Mo",
      password: "pass",
      loggedIn: false,
      city:"",
      cohort: "",
      programming:"",
      spoken: ""
    }
  ],
  loggedIn: false,
  numUsers: 3
};
let update = sessionStorage.getItem("profiles");
let updateState: ProfileState;
if (update !== null) {
  updateState = JSON.parse(update);
  initialState = updateState;
}

export function profileReducer(
  state = initialState,
  action: ProfileActionTypes
): ProfileState {
  switch (action.type) {
    case ADD_PROFILE:
      action.payload.id = state.numUsers;

      return {
        ...state,
        loggedIn: true,
        profiles: [...state.profiles, action.payload],
        numUsers: ++state.numUsers
      };

    case CHECK_PASS:
      let cred = state.loggedIn;
      let index = 0;
      let uName = state.profiles.filter(
        profile => profile.name === action.payload[0]
      );
      console.log(uName);
      state.profiles.forEach((profile, i) => {
        if (profile.name === uName[0].name) {
          index = i;
        }
      });

      if (uName.length) {
        if (uName[0].password === action.payload[1]) {
          cred = true;
        }
      }
      return {
        ...state,
        loggedIn: cred,
        profiles: [
          ...state.profiles.slice(0, index),
          { ...state.profiles[index], loggedIn: cred },
          ...state.profiles.slice(index + 1)
        ]
      };

    case LOG_OUT:
      let uNameLog = state.profiles.filter(
        profile => profile.name === action.payload.name
      );
      let indexLog = 0;
      state.profiles.forEach((profile, i) => {
        if (profile.name === uNameLog[0].name) {
          indexLog = i;
        }
      });
      return {
        ...state,
        loggedIn: false,
        profiles: [
          ...state.profiles.slice(0, indexLog),
          { ...state.profiles[indexLog], loggedIn: false },
          ...state.profiles.slice(indexLog + 1)
        ]
      };

    case UPDATE_PROFILE:
        let name  = state.profiles.filter(
            profile => profile.name === action.payload[0]
          );
          let indexUpdate = 0;
          state.profiles.forEach((profile, i) => {
            if (profile.name === name[0].name) {
                indexUpdate = i;
            }
          });
        return {
            ...state,
            profiles: [
                ...state.profiles.slice(0, indexUpdate),
                { ...state.profiles[indexUpdate], 
                    city: action.payload[1],
                    cohort: action.payload[2],
                    programming: action.payload[3],
                    spoken: action.payload[4],
                    aboutMe: action.payload[5] },
                ...state.profiles.slice(indexUpdate + 1)
              ]
        };
    default:
      return state;
  }
}
