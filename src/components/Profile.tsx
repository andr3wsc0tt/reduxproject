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
    let who = match.params.userId;

    console.log(profiles, who);

    return (
        <h2>Welcome {who}!</h2>
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