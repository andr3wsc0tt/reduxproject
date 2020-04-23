import * as React from 'react';
import { RootState } from '../store';
import { connect } from 'react-redux';
import {Profile} from '../store/types/types'
import { Image } from 'semantic-ui-react'

export interface IProfilePageProps {
  match: any,
  profiles: Profile[]
}

// const ImageExampleCircular = () => (
//   <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='tiny' circular />
// )

export class ProfilePage extends React.Component<IProfilePageProps> {
  public render() {
    let {match, profiles} = this.props;
    let who = profiles[0].name;
    let about = profiles[0].aboutMe;


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