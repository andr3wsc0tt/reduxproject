import {
  ProfileState,
  ADD_PROFILE,
  ProfileActionTypes,
  CHECK_PASS,
  LOG_OUT,
  UPDATE_PROFILE,
  Profile
} from "../types/types";

let initialState: ProfileState = {
  // Our base initial state - We have 2 profiles with their fields, a loggedIn state set initially to false, and the number of users numUsers after we add another profile.
  profiles: [
    {
      id: 0,
      name: "",
      aboutMe: "",
      password:"10293uj1o4nn,xv9c092304jlkmxldk09fd4",
      loggedIn:false,
      city: "",
      cohort: "",
      programming: "",
      spoken: ""
    },
    {
      id: 1,
      name: "Andrew",
      aboutMe: "I'm Andrew",
      password: "password",
      loggedIn: false,
      city: "",
      cohort: "",
      programming: "",
      spoken: ""
    },
    {
      id: 2,
      name: "Mo",
      aboutMe: "I'm Mo",
      password: "pass",
      loggedIn: false,
      city: "",
      cohort: "",
      programming: "",
      spoken: ""
    },

    {
      id: 3,
      name: "Cailenys",
      aboutMe: "I'm Cailenys",
      password: "12345",
      loggedIn: false,
      city: "",
      cohort: "",
      programming: "",
      spoken: ""
    }

  ],
  loggedIn: false,
  numUsers: 4
};

// The following 6 lines keep our state in a global sessionStorage just in case someone refreshes a page, or manually enters a URL
let update = sessionStorage.getItem("profiles");
let log = sessionStorage.getItem("loggedIn");

let updateState: Profile[];
if (update !== null) {
  updateState = JSON.parse(update);
  initialState = {
    profiles: updateState,
    loggedIn: (log === 'true'),
    numUsers: updateState.length + 1
  };
}

// Our REDUCER!
export function profileReducer(
  state = initialState, // Our initial state is pushed
  action: ProfileActionTypes
): ProfileState {
  switch (action.type) {
    // The addProfile reducer
    case ADD_PROFILE:
      action.payload.id = state.numUsers; // If you're adding a new profile, get the number of users so far and set the profile id to that numUsers

      return {
        ...state,
        loggedIn: true, // change the loggedIn state to true
        profiles: [...state.profiles, action.payload], // push the action.payload (Which is a profile) onto the profile array of the "store State / (initialState)""
        numUsers: ++state.numUsers // Increase the stores number of users variable
      };

    //The checkPass reducer
    case CHECK_PASS:
      let cred = state.loggedIn; // Get the loggedIn state
      let index = 0; // initialize a variable that will tell us what the index of the logged in user is.

      let uName = state.profiles.filter( // store the profile of the user that matches the action.payload[0] which is the username in cred [username, password]
        profile => profile.name === action.payload[0]
      );

      if (uName[0] !== undefined) { // if there was a match
        state.profiles.forEach((profile, i) => { // iterate through each profile
          if (profile.name === uName[0].name) { // until we find the name of that user
            index = i; // and store the index of that profile
          }
        });
      } else // if there was no match
        return { // don't make any changes
          ...state
        };

      if (uName.length) { // if there was a match
        if (uName[0].password === action.payload[1]) { // check if the users password matches the password the user entered
          cred = true; // set cred = true
        }
      }
      return {
        ...state,
        loggedIn: cred, // loggedIn = true or false depending on the match or not
        profiles: [ // push all the unpacked and changed below into the stores profile
          ...state.profiles.slice(0, index), // unpack the profiles up until the users index
          { ...state.profiles[index], loggedIn: cred }, // update the users profile:loggedIn field as either true or false
          ...state.profiles.slice(index + 1) // unpack the profiles after the users index
        ]
      };

    // the logOut REDUCER!
    case LOG_OUT:
      let uNameLog = state.profiles.filter( // find the name of the user that is loggedIn
        profile => profile.name === action.payload.name 
      );
      let indexLog = 0; 
      state.profiles.forEach((profile, i) => { // find the index of the users profile 
        if (profile.name === uNameLog[0].name) {
          indexLog = i;
        }
      });
      return {
        ...state,
        loggedIn: false, // set stores loggedIn as false
        profiles: [ // push all the unpacked store profiles into the stores profile array
          ...state.profiles.slice(0, indexLog),
          { ...state.profiles[indexLog], loggedIn: false }, // set the loggedIn field of the selected users profile
          ...state.profiles.slice(indexLog + 1)
        ]
      };
    
    
      // the updateProfile REDUCER!
    case UPDATE_PROFILE:
      let name = state.profiles.filter(
        profile => profile.name === action.payload[0] // match the profile with the action.payload[0] (username)
      );
      let indexUpdate = 0;
      state.profiles.forEach((profile, i) => {
        if (profile.name === name[0].name) { // find the index of the user who's name matches the payload
          indexUpdate = i;
        }
      });

      return {
        ...state,
        profiles: [
          ...state.profiles.slice(0, indexUpdate), // unpack the states before the chosen user's profile index
          {
            ...state.profiles[indexUpdate], // Update all the changable fields for the user (This can have more functionality where you don't change ones that are empty!)

            city: action.payload[1] === "" ? state.profiles[indexUpdate].city : action.payload[1],
            cohort: action.payload[2] === "" ? state.profiles[indexUpdate].cohort : action.payload[2],
            spoken: action.payload[3] === "" ? state.profiles[indexUpdate].spoken : action.payload[3],
            programming: action.payload[4] === "" ? state.profiles[indexUpdate].programming : action.payload[4],
            aboutMe: action.payload[5] === "" ? state.profiles[indexUpdate].aboutMe : action.payload[5],
          },
          ...state.profiles.slice(indexUpdate + 1)
        ]
      };
    default:
      return state;
  }
}