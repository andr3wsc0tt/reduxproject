import * as React from 'react';
import { RootState } from "../../store";
import { connect } from "react-redux";
import { Menu, Dropdown, Input, Button } from 'semantic-ui-react';
import { Profile } from "../../store/types/types";
import { logOut } from "../../store/actions/actions";
import '../main.css';

export interface INavBarProps {
    goto:string;
    profiles: Profile[];
    logOut: typeof logOut;
    redirect : () => void
}

export interface INavBarState { // our local state variables
    page:string;
  }
  
  

export class NavBar extends React.Component<INavBarProps, INavBarState> {    
    loggedOut = () => { // The function that calls our logOut REDUCER!
        let { logOut, profiles } = this.props; // The store states logOut REDUCER and profiles array
    
        let uName = profiles.filter(profile => profile.loggedIn === true); // filter through the profiles array and return any profile that has it's loggedIn field set to true.
    
        logOut(uName[0]); // Pass the profile to the logOut REDUCER! It takes in a Profile[] as it's payload.
    
        // When we log out we want to save our global state (This might not be necessary anymore)
        sessionStorage.setItem("loggedIn", "false");
        sessionStorage.setItem("userName", ""); // username of the person who is logged in
        window.location.href = "/";
      };

          
    public render() {
       

        let { goto } = this.props; // load in the profiles from the store state
      
        return (
            <Menu stackable className="NavBar">
                               
                <Menu.Item>
                        
                    <Dropdown text="Groups" className ="item1" >
                        <Dropdown.Menu>
                        <Dropdown.Item text="Group 1" />
                        <Dropdown.Item text="Group 2" />
                        <Dropdown.Item text="Group 3" />
                        </Dropdown.Menu>
                    </Dropdown>
         
                </Menu.Item>

              <Menu.Item >
                <Dropdown text="Class Mates" className ="item2">
                        <Dropdown.Menu>
                        <Dropdown.Item text="Andrew" />
                        <Dropdown.Item text="Charles" />
                        <Dropdown.Item text="Cai" />
                        <Dropdown.Item text="Trina" />
                        <Dropdown.Item text="Mohammad" />
                        </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>

                <Menu.Menu position="right">
               <Menu.Item className ="item3">
                 
                    <Input className='icon' icon='search' placeholder='Search...' />
                </Menu.Item>  

                <Menu.Item >
                   <Button.Group className ="item4">
                        <Button color="green" onClick={this.props.redirect}>
                            {goto}
                        </Button>
                        <Button.Or/>
                        <Button color="yellow" onClick={this.loggedOut}>
                            Log Out
                    </Button>
                    </Button.Group>
                </Menu.Item> 
                </Menu.Menu>
            </Menu>
           
        );
    }
}



const mapStateToProps = (state: RootState) => { // mapStateToProps connects the store's initial state variables with ProfilePage component
  return {
    profiles: state.profile.profiles,
    loggedIn: state.profile.loggedIn
  };
};

export default connect(mapStateToProps, { logOut })(NavBar); // connect imports the logOut REDUCER from our store and returns our connected our ProfilePage component 
