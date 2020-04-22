import * as React from 'react';
import { RootState } from '../store';
import { connect } from 'react-redux';
import {Profile} from '../store/types/types'

export interface IProfilePageProps {
  match: any,
  profiles: Profile[]
}

export class ProfilePage extends React.Component<IProfilePageProps> {
  public render() {
    let {match, profiles} = this.props;
<<<<<<< HEAD
    let who = match.params.userId;
    let about = "";
    if (who === profiles[0].id)
    {
      who = profiles[0].name;
      about = profiles[0].aboutMe;
    }
    else{
      who = "Stranger";
      about = "Who are you?"
    }
=======
    let who = profiles[0].name;
    let about = profiles[0].aboutMe;

>>>>>>> 8e771e1b5f8a4f32747cad3fb1ccbc2d06cd36fb

    return (
      <>
        <h2>Welcome {who}!</h2>
        <h3>About Me: {about}</h3>
        <button onClick={() => sessionStorage.clear()}>Log Out</button>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps : IProfilePageProps) => {
  return {
    profiles: state.profile.profiles
  }
}

export default connect(
  mapStateToProps,
)(ProfilePage);