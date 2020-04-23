import * as React from 'react';
/*import { RootState } from '../store';*/
import { connect } from 'react-redux';
/*import {Profile} from '../store/types/types';
import NavBar from '../components/subcomponents/NavBar';*/

export interface ILogOutPageProps {
  match: any,
  /*profiles: Profile[]*/
}

export default class LogOut extends React.Component<ILogOutPageProps> {
  public render() {
    /*let {match, profiles} = this.props;
    let who = profiles[0].name;
    let about = profiles[0].aboutMe;*/


    return (
      <>
        <h2>You are Logged out :(</h2>
        <button onClick={() => sessionStorage.clear()}>Log Out</button>
      </>
    );
  }
}